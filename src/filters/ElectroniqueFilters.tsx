import {
  RadioCheckboxGroup,
  CheckboxGroupCarre,
  CaracteristiquesFilter,
  RangeFilter,
  CheckboxGroupRound,
  CaracteristiquesFilterRound,
} from "./BaseFilters";
import { FcDocument } from "react-icons/fc";
import { TbUserScreen } from "react-icons/tb";
import { TfiAlarmClock } from "react-icons/tfi";
import { AiOutlineEuro } from "react-icons/ai";
import { PiGasPump, PiRuler, PiSortAscending } from "react-icons/pi";
import { useMemo } from "react";

interface Props {
  draft: any;
  setFilter: (name: string, value: string) => void;
  isValueSelected: (name: string, value: string) => boolean;
  handleCheckboxChange: (name: string, value: string, checked: boolean) => void;
  excludedFilterNames?: string[];
}

// ===================== TAILLES PAR TYPE D'ORDINATEUR =====================

const TAILLEECRAN_OPTIONS_BY_ORDINATEURTYPE: Record<
  string,
  { value: string; label: string }[]
> = {
  fixe: [
    {
      value: "jusqua-24-pouces-60cm",
      label: "Jusqu'à 24” (60cm)",
    },
    {
      value: "24-26-pouces-60-66cm",
      label: "24 à 26” (60 à 66cm)",
    },
    {
      value: "26-28-pouces-66-71cm",
      label: "26 à 28” (66 à 71cm)",
    },
    {
      value: "28-30-pouces-71-76cm",
      label: "28 à 30” (71 à 76cm)",
    },
    {
      value: "31-pouces-80cm-plus",
      label: "31” (80cm) et plus",
    },
  ],

  portable: [
    {
      value: "jusqua-12-pouces-32cm",
      label: "Jusqu’à 12” (32cm)",
    },
    {
      value: "12-14-pouces-33-37cm",
      label: "12 à 14” (33cm à 37cm)",
    },
    {
      value: "15-16-pouces-38-42cm",
      label: "15 à 16” (38cm à 42cm)",
    },
    {
      value: "17-pouces-43cm-plus",
      label: "17” (43cm) et plus",
    },
  ],

  "unite-centrale-seule": [],
};

// ===================== MARQUES PAR PRODUIT (TABLETTES / LISEUSES) =====================

const MARQUE_OPTIONS_BY_TABLETTESLISEUSESPRODUIT: Record<
  string,
  { value: string; label: string }[]
> = {
  tablette: [
    { value: "apple", label: "Apple" },
    { value: "samsung", label: "Samsung" },
    { value: "lenovo", label: "Lenovo" },
    { value: "huawei", label: "Huawei" },
    { value: "microsoft", label: "Microsoft" },
    { value: "xiaomi", label: "Xiaomi" },
    { value: "autre", label: "Autres" },
  ],
  liseuse: [
    { value: "kindle", label: "Kindle (Amazon)" },
    { value: "kobo", label: "Kobo" },
    { value: "vivlio", label: "Vivlio" },
    { value: "autre", label: "Autres" },
  ],
};

// ===================== MODÈLES PAR MARQUE (TÉLÉPHONES & OBJETS CONNECTÉS) =====================

const MODELE_OPTIONS_BY_TELEPHONESMARQUE: Record<
  string,
  { value: string; label: string }[]
> = {
  apple: [
    { value: "iphone-4", label: "iPhone 4" },
    { value: "iphone-4s", label: "iPhone 4s" },
    { value: "iphone-5", label: "iPhone 5" },
    { value: "iphone-5s", label: "iPhone 5s" },
    { value: "iphone-5c", label: "iPhone 5c" },
    { value: "iphone-se", label: "iPhone SE" },
    { value: "iphone-6", label: "iPhone 6" },
    { value: "iphone-6s", label: "iPhone 6s" },
    { value: "iphone-6s-plus", label: "iPhone 6s Plus" },
    { value: "iphone-7", label: "iPhone 7" },
    { value: "iphone-7-plus", label: "iPhone 7 Plus" },
    { value: "iphone-8", label: "iPhone 8" },
    { value: "iphone-8-plus", label: "iPhone 8 Plus" },
    { value: "iphone-x", label: "iPhone X" },
    { value: "iphone-xr", label: "iPhone XR" },
    { value: "iphone-xs", label: "iPhone XS" },
    { value: "iphone-xs-max", label: "iPhone XS Max" },
    { value: "iphone-11", label: "iPhone 11" },
    { value: "iphone-11-pro", label: "iPhone 11 Pro" },
    { value: "iphone-11-pro-max", label: "iPhone 11 Pro Max" },
    { value: "iphone-12-mini", label: "iPhone 12 Mini" },
    { value: "iphone-12", label: "iPhone 12" },
    { value: "iphone-12-pro", label: "iPhone 12 Pro" },
    { value: "iphone-12-pro-max", label: "iPhone 12 Pro Max" },
    { value: "iphone-13-mini", label: "iPhone 13 Mini" },
    { value: "iphone-13", label: "iPhone 13" },
    { value: "iphone-13-pro", label: "iPhone 13 Pro" },
    { value: "iphone-13-pro-max", label: "iPhone 13 Pro Max" },
    { value: "iphone-14", label: "iPhone 14" },
    { value: "iphone-14-plus", label: "iPhone 14 Plus" },
    { value: "iphone-14-pro", label: "iPhone 14 Pro" },
    { value: "iphone-14-pro-max", label: "iPhone 14 Pro Max" },
    { value: "iphone-14-se", label: "iPhone 14 SE" },
    { value: "iphone-15", label: "iPhone 15" },
    { value: "iphone-15-plus", label: "iPhone 15 Plus" },
    { value: "iphone-15-pro", label: "iPhone 15 Pro" },
    { value: "iphone-15-pro-max", label: "iPhone 15 Pro Max" },
    { value: "iphone-16", label: "iPhone 16" },
    { value: "iphone-16-plus", label: "iPhone 16 Plus" },
    { value: "iphone-16-pro", label: "iPhone 16 Pro" },
    { value: "iphone-16-pro-max", label: "iPhone 16 Pro Max" },
    { value: "iphone-16e", label: "iPhone 16e" },
    { value: "autre", label: "Autre" },
  ],
  huawei: [
    { value: "mate-10-pro", label: "Mate 10 Pro" },
    { value: "mate-20-lite", label: "Mate 20 Lite" },
    { value: "mate-20-pro", label: "Mate 20 Pro" },
    { value: "p10", label: "P10" },
    { value: "p10-lite", label: "P10 Lite" },
    { value: "p8-lite", label: "P8 Lite" },
    { value: "p9", label: "P9" },
    { value: "p9-lite", label: "P9 Lite" },
    { value: "p20", label: "P20" },
    { value: "p20-pro", label: "P20 Pro" },
    { value: "p20-lite", label: "P20 Lite" },
    { value: "p30", label: "P30" },
    { value: "p30-pro", label: "P30 Pro" },
    { value: "p30-lite", label: "P30 Lite" },
    { value: "p40", label: "P40" },
    { value: "p40-pro", label: "P40 Pro" },
    { value: "nova-8i", label: "Nova 8i" },
    { value: "nova-9", label: "Nova 9" },
    { value: "p40-pro-plus", label: "P40 Pro +" },
    { value: "p40-lite-e", label: "P40 lite E" },
    { value: "p-smart", label: "P smart" },
    { value: "mate-40-pro", label: "mate 40 Pro" },
    { value: "mate-xs", label: "mate xs" },
    { value: "p50", label: "P50" },
    { value: "p50-pro", label: "P50 Pro" },
    { value: "p50-pocket", label: "P50 Pocket" },
    { value: "p60", label: "P60" },
    { value: "mate-60", label: "Mate 60" },
    { value: "p70", label: "P70" },
    { value: "mate-70", label: "Mate 70" },
    { value: "mate-xt", label: "Mate XT" },
    { value: "autre", label: "Autre" },
  ],
  techno: [], // pas de modèles listés
  samsung: [
    { value: "galaxy-a12", label: "Galaxy A12" },
    { value: "galaxy-a3", label: "Galaxy A3" },
    { value: "galaxy-a300fu", label: "Galaxy A300FU" },
    { value: "galaxy-a5", label: "Galaxy A5" },
    { value: "galaxy-a500fu", label: "Galaxy A500FU" },
    { value: "galaxy-note-2", label: "Galaxy Note 2" },
    { value: "galaxy-note-3", label: "Galaxy Note 3" },
    { value: "galaxy-note-4", label: "Galaxy Note 4" },
    { value: "galaxy-note-8", label: "Galaxy Note 8" },
    { value: "galaxy-note-9", label: "Galaxy Note 9" },
    { value: "galaxy-s3", label: "Galaxy S3" },
    { value: "galaxy-s4", label: "Galaxy S4" },
    { value: "galaxy-s5", label: "Galaxy S5" },
    { value: "galaxy-s5-4g-plus", label: "Galaxy S5 4G+" },
    { value: "galaxy-s5-mini", label: "Galaxy S5 Mini" },
    { value: "galaxy-s6", label: "Galaxy S6" },
    { value: "galaxy-s6-edge", label: "Galaxy S6 Edge" },
    { value: "galaxy-s6-edge-plus", label: "Galaxy S6 Edge Plus" },
    { value: "galaxy-s7", label: "Galaxy S7" },
    { value: "galaxy-s7-edge", label: "Galaxy S7 Edge" },
    { value: "galaxy-s8", label: "Galaxy S8" },
    { value: "galaxy-s8-plus", label: "Galaxy S8+" },
    { value: "galaxy-s9", label: "Galaxy S9" },
    { value: "galaxy-s9-plus", label: "Galaxy S9+" },
    { value: "galaxy-s10", label: "Galaxy S10" },
    { value: "galaxy-s10-plus", label: "Galaxy S10+" },
    { value: "galaxy-s10e", label: "Galaxy S10e" },
    { value: "galaxy-s10-lite", label: "Galaxy S10 Lite" },
    { value: "galaxy-note-10", label: "Galaxy Note 10" },
    { value: "galaxy-fold", label: "Galaxy Fold" },
    { value: "galaxy-j3", label: "Galaxy J3" },
    { value: "galaxy-s20", label: "Galaxy S20" },
    { value: "galaxy-s20-plus", label: "Galaxy S20+" },
    { value: "galaxy-s20-ultra", label: "Galaxy S20 Ultra" },
    { value: "galaxy-note-20", label: "Galaxy Note 20" },
    { value: "galaxy-note-20-ultra", label: "Galaxy Note 20 Ultra" },
    { value: "galaxy-s21", label: "Galaxy S21" },
    { value: "galaxy-s21-plus", label: "Galaxy S21+" },
    { value: "galaxy-s21-ultra", label: "Galaxy S21 Ultra" },
    { value: "galaxy-s22", label: "Galaxy S22" },
    { value: "galaxy-s22-plus", label: "Galaxy S22+" },
    { value: "galaxy-s22-ultra", label: "Galaxy S22 Ultra" },
    { value: "galaxy-s23", label: "Galaxy S23" },
    { value: "galaxy-s23-plus", label: "Galaxy S23+" },
    { value: "galaxy-s23-ultra", label: "Galaxy S23 Ultra" },
    { value: "galaxy-s24", label: "Galaxy S24" },
    { value: "galaxy-s24-plus", label: "Galaxy S24+" },
    { value: "galaxy-s24-ultra", label: "Galaxy S24 Ultra" },
    { value: "galaxy-s25", label: "Galaxy S25" },
    { value: "galaxy-s25-plus", label: "Galaxy S25+" },
    { value: "galaxy-s25-ultra", label: "Galaxy S25 Ultra" },
    { value: "galaxy-z-fold-3", label: "Galaxy Z Fold 3" },
    { value: "galaxy-z-fold-4", label: "Galaxy Z Fold 4" },
    { value: "galaxy-z-fold-5", label: "Galaxy Z Fold 5" },
    { value: "galaxy-z-fold-6", label: "Galaxy Z Fold 6" },
    { value: "galaxy-z-fold-7", label: "Galaxy Z Fold 7" },
    { value: "galaxy-z-flip-3", label: "Galaxy Z Flip 3" },
    { value: "galaxy-z-flip-2", label: "Galaxy Z Flip 2" },
    { value: "galaxy-z-flip", label: "Galaxy Z Flip" },
    { value: "galaxy-z-flip-4", label: "Galaxy Z Flip 4" },
    { value: "galaxy-z-flip-5", label: "Galaxy Z Flip 5" },
    { value: "galaxy-z-flip-6", label: "Galaxy Z Flip 6" },
    { value: "galaxy-z-flip-7", label: "Galaxy Z Flip 7" },
    { value: "galaxy-a72", label: "Galaxy A72" },
    { value: "galaxy-a71", label: "Galaxy A71" },
    { value: "galaxy-a52", label: "Galaxy A52" },
    { value: "galaxy-m32", label: "Galaxy M32" },
    { value: "galaxy-m12", label: "Galaxy M12" },
    { value: "galaxy-xcover-5", label: "Galaxy XCover 5" },
    { value: "a32-5g", label: "A32 5G" },
    { value: "a52s-5g", label: "A52s 5G" },
    { value: "a22-5g", label: "A22 5G" },
    { value: "autre", label: "Autre" },
  ],
  xiaomi: [
    { value: "mi-4", label: "Mi 4" },
    { value: "mi-5", label: "Mi 5" },
    { value: "mi-5s", label: "Mi 5S" },
    { value: "mi-6", label: "Mi 6" },
    { value: "mi-7", label: "Mi 7" },
    { value: "mi-8-lite", label: "Mi 8 Lite" },
    { value: "mi-8-pro", label: "Mi 8 Pro" },
    { value: "mi-9", label: "Mi 9" },
    { value: "mi-9se", label: "Mi 9SE" },
    { value: "mi-9t", label: "Mi 9T" },
    { value: "mi-a1", label: "Mi A1" },
    { value: "mi-a2", label: "Mi A2" },
    { value: "mi-a2-lite", label: "Mi A2 Lite" },
    { value: "mi-max-2", label: "Mi Max 2" },
    { value: "mi-mix-2", label: "Mi MIX 2" },
    { value: "mi-mix-2s", label: "Mi MIX 2S" },
    { value: "mi-mix-3", label: "Mi MIX 3" },
    { value: "mi-note", label: "Mi Note" },
    { value: "mi-note-2", label: "Mi Note 2" },
    { value: "pocophone-f1", label: "Pocophone F1" },
    { value: "redmi-2", label: "Redmi 2" },
    { value: "redmi-4a", label: "Redmi 4A" },
    { value: "redmi-4i", label: "Redmi 4i" },
    { value: "redmi-4x", label: "Redmi 4X" },
    { value: "redmi-5-plus", label: "Redmi 5 Plus" },
    { value: "redmi-6", label: "Redmi 6" },
    { value: "redmi-6a", label: "Redmi 6A" },
    { value: "redmi-go", label: "Redmi Go" },
    { value: "redmi-note-4", label: "Redmi Note 4" },
    { value: "redmi-note-4g", label: "Redmi Note 4G" },
    { value: "redmi-note-5", label: "Redmi Note 5" },
    { value: "redmi-note-5a", label: "Redmi Note 5A" },
    { value: "redmi-note-6-pro", label: "Redmi Note 6 Pro" },
    { value: "redmi-note-7", label: "Redmi Note 7" },
    { value: "redmi-9c", label: "Redmi 9C" },
    { value: "redmi-note-9-pro", label: "Redmi Note 9 Pro" },
    { value: "redmi-10", label: "Redmi 10" },
    { value: "redmi-note-10", label: "Redmi Note 10" },
    { value: "redmi-note-10-pro", label: "Redmi Note 10 Pro" },
    { value: "redmi-note-10s", label: "Redmi Note 10S" },
    { value: "redmi-s2", label: "Redmi S2" },
    { value: "mi-10", label: "Mi 10" },
    { value: "mi-11", label: "Mi 11" },
    { value: "11t-pro", label: "11T Pro" },
    { value: "11t", label: "11T" },
    { value: "11-lite", label: "11 Lite" },
    { value: "mi-11-ultra", label: "Mi 11 Ultra" },
    { value: "mi-10t-pro", label: "Mi 10TPro" },
    { value: "mi-10t-lite", label: "Mi 10TLite" },
    { value: "mi-10t", label: "Mi 10T" },
    { value: "12t", label: "12T" },
    { value: "12t-pro", label: "12T Pro" },
    { value: "14", label: "14" },
    { value: "14-pro", label: "14 Pro" },
    { value: "14-ultra", label: "14 Ultra" },
    { value: "15", label: "15" },
    { value: "15-pro", label: "15 Pro" },
    { value: "15-ultra", label: "15 Ultra" },
    { value: "mix-flip", label: "Mix Flip" },
    { value: "poco-x3-pro", label: "Poco X3 Pro" },
    { value: "poco-m4-pro", label: "Poco M4 Pro" },
    { value: "autre", label: "Autre" },
  ],
  alcatel: [
    { value: "1", label: "1" },
    { value: "1x", label: "1X" },
    { value: "3l", label: "3L" },
    { value: "3x", label: "3X" },
    { value: "5", label: "5" },
    { value: "5v", label: "5V" },
    { value: "a3", label: "A3" },
    { value: "a5-led", label: "A5 LED" },
    { value: "idol-3", label: "Idol 3" },
    { value: "idol-4", label: "Idol 4" },
    { value: "idol-4s", label: "Idol 4S" },
    { value: "idol-5s", label: "Idol 5S" },
    { value: "one-pop-4", label: "One Pop 4" },
    { value: "one-touch-995", label: "One Touch 995" },
    { value: "one-touch-idol-alpha", label: "One Touch Idol Alpha" },
    { value: "one-touch-pixi-3", label: "One Touch Pixi 3" },
    { value: "one-touch-pixi-3-3.5", label: "One Touch Pixi 3 (3.5)" },
    { value: "one-touch-pixi-4", label: "One Touch Pixi 4" },
    { value: "pixi-4", label: "Pixi 4" },
    { value: "pixi-4-4", label: "Pixi 4(4')" },
    { value: "one-touch-pop-4", label: "One Touch Pop 4" },
    { value: "one-touch-c7", label: "One Touch C7" },
    { value: "pop-c1", label: "Pop C1" },
    { value: "u3", label: "U3" },
    { value: "u5", label: "U5" },
    { value: "v3-ultra", label: "V3 Ultra" },
    { value: "v3-pro", label: "V3 Pro" },
    { value: "v3-classic", label: "V3 Classic" },
    { value: "autre", label: "Autre" },
  ],
  archos: [
    { value: "50-cobalt", label: "50 Colbalt" },
    { value: "50-titanium", label: "50 Titanium" },
    { value: "50d-neon", label: "50D Neon" },
    { value: "50d-oxygen-plus", label: "50D Oxygen Plus" },
    { value: "55-helium", label: "55 Helium" },
    { value: "55-helium-plus", label: "55 Helium Plus" },
    { value: "55-platinum", label: "55 Platinum" },
    { value: "55b-platinum", label: "55B Platinum" },
    { value: "60-platinum", label: "60 Platinum" },
    { value: "diamond-omega", label: "Diamond omega" },
    { value: "diamond-x", label: "Diamond X" },
    { value: "diamond-alpha", label: "Diamond Alpha" },
    { value: "sense-50dc", label: "Sense 50DC" },
    { value: "x67-5g", label: "X67 5G" },
    { value: "autre", label: "Autre" },
  ],
  asus: [
    { value: "padfone", label: "PadFone" },
    { value: "rog-phone", label: "ROG Phone" },
    { value: "zenfone-2", label: "ZenFone 2" },
    { value: "zenfone-2-laser", label: "ZenFone 2 Laser" },
    { value: "zenfone-3-deluxe", label: "ZenFone 3 Deluxe" },
    { value: "zenfone-3-laser", label: "ZenFone 3 Laser" },
    { value: "zenfone-3-max", label: "ZenFone 3 Max" },
    { value: "zenfone-3-max-plus", label: "ZenFone 3 Max Plus" },
    { value: "zenfone-3-ultra", label: "ZenFone 3 Ultra" },
    { value: "zenfone-4", label: "ZenFone 4" },
    { value: "zenfone-4-max", label: "ZenFone 4 Max" },
    { value: "zenfone-4-max-plus", label: "ZenFone 4 Max Plus" },
    { value: "zenfone-5", label: "ZenFone 5" },
    { value: "zenfone-5-lite", label: "ZenFone 5 Lite" },
    { value: "zenfone-5z", label: "ZenFone 5Z" },
    { value: "zenfone-go", label: "ZenFone Go" },
    { value: "zenfone-live", label: "ZenFone Live" },
    { value: "zenfone-live-plus", label: "ZenFone Live Plus" },
    { value: "zenfone-max-pro-m1", label: "ZenFone Max Pro M1" },
    { value: "zenfone-selfie", label: "ZenFone Selfie" },
    { value: "zenfone-zoom", label: "ZenFone Zoom" },
    { value: "zenfone-8", label: "ZenFone 8" },
    { value: "zenfone-7", label: "ZenFone 7" },
    { value: "zenfone-7-pro", label: "ZenFone 7 Pro" },
    { value: "zenfone-8-flip", label: "ZenFone 8 Flip" },
    { value: "rog-phone-5s", label: "ROG Phone 5s" },
    { value: "rog-phone-5s-pro", label: "ROG Phone 5s Pro" },
    { value: "rog-phone-6", label: "ROG Phone 6" },
    { value: "rog-phone-7", label: "ROG Phone 7" },
    { value: "rog-phone-8", label: "ROG Phone 8" },
    { value: "rog-phone-9", label: "ROG Phone 9" },
    { value: "autre", label: "Autre" },
  ],
  blackberry: [
    { value: "9700", label: "9700" },
    { value: "9720", label: "9720" },
    { value: "bold-9000", label: "Bold 9000" },
    { value: "bold-9700", label: "Bold 9700" },
    { value: "bold-9790", label: "Bold 9790" },
    { value: "bold-9900", label: "Bold 9900" },
    { value: "bold-9930", label: "Bold 9930" },
    { value: "bold-touch-9900", label: "Bold Touch 9900" },
    { value: "classic", label: "Classic" },
    { value: "curve-8500", label: "Curve 8500" },
    { value: "curve-8520", label: "Curve 8520" },
    { value: "curve-9300", label: "Curve 9300" },
    { value: "curve-9360", label: "Curve 9360" },
    { value: "dt50", label: "DT50" },
    { value: "dtek-50", label: "Dtek 50" },
    { value: "key-2-le", label: "Key 2 LE" },
    { value: "keyone", label: "Keyone" },
    { value: "leap", label: "Leap" },
    { value: "passport", label: "Passport" },
    { value: "priv", label: "Priv" },
    { value: "psmart", label: "Psmart" },
    { value: "q10", label: "Q10" },
    { value: "q20", label: "Q20" },
    { value: "q5", label: "Q5" },
    { value: "storm-9530", label: "Storm 9530" },
    { value: "torch", label: "Torch" },
    { value: "z10", label: "Z10" },
    { value: "z30", label: "Z30" },
    { value: "evolve", label: "Evolve" },
    { value: "evolvex", label: "EvolveX" },
    { value: "motion", label: "Motion" },
    { value: "autre", label: "Autre" },
  ],
  fairphone: [
    { value: "fairphone-3", label: "Fairphone 3" },
    { value: "fairphone-3-plus", label: "Fairphone 3+" },
    { value: "fairphone-4", label: "Fairphone 4" },
    { value: "fairphone-5", label: "Fairphone 5" },
    { value: "fairphone-6", label: "Fairphone 6" },
    { value: "autre", label: "Autre" },
  ],
  google: [
    { value: "pixel", label: "Pixel" },
    { value: "pixel-xl", label: "Pixel XL" },
    { value: "pixel-2", label: "Pixel 2" },
    { value: "pixel-2-xl", label: "Pixel 2 XL" },
    { value: "pixel-3", label: "Pixel 3" },
    { value: "pixel-3-xl", label: "Pixel 3 XL" },
    { value: "pixel-4", label: "Pixel 4" },
    { value: "pixel-4-xl", label: "Pixel 4 XL" },
    { value: "pixel-5", label: "Pixel 5" },
    { value: "pixel-5a", label: "Pixel 5A" },
    { value: "pixel-6", label: "Pixel 6" },
    { value: "pixel-6-pro", label: "Pixel 6 Pro" },
    { value: "pixel-7", label: "Pixel 7" },
    { value: "pixel-8", label: "Pixel 8" },
    { value: "pixel-9", label: "Pixel 9" },
    { value: "autre", label: "Autre" },
  ],
  honor: [
    { value: "5", label: "5" },
    { value: "5a", label: "5A" },
    { value: "5c", label: "5C" },
    { value: "5x", label: "5X" },
    { value: "6", label: "6" },
    { value: "6-plus", label: "6 Plus" },
    { value: "6a", label: "6A" },
    { value: "6c", label: "6C" },
    { value: "6c-pro", label: "6C Pro" },
    { value: "6x", label: "6X" },
    { value: "6x-pro", label: "6X Pro" },
    { value: "7a", label: "7A" },
    { value: "7c", label: "7C" },
    { value: "7s", label: "7S" },
    { value: "7x", label: "7X" },
    { value: "8a", label: "8A" },
    { value: "8x", label: "8X" },
    { value: "8x-max", label: "8X Max" },
    { value: "8-lite", label: "8 Lite" },
    { value: "8-pro", label: "8 Pro" },
    { value: "9", label: "9" },
    { value: "9x", label: "9X" },
    { value: "9x-pro", label: "9X Pro" },
    { value: "9-lite", label: "9 Lite" },
    { value: "10", label: "10" },
    { value: "10-lite", label: "10 Lite" },
    { value: "view-10", label: "View 10" },
    { value: "view-20", label: "View 20" },
    { value: "20", label: "20" },
    { value: "20-lite", label: "20 Lite" },
    { value: "20-pro", label: "20 Pro" },
    { value: "50", label: "50" },
    { value: "50-lite", label: "50 Lite" },
    { value: "autre", label: "Autre" },
  ],
  htc: [
    { value: "8x", label: "8X" },
    { value: "10", label: "10" },
    { value: "10-evo", label: "10 Evo" },
    { value: "desire-10", label: "Desire 10" },
    { value: "desire-10-lifestyle", label: "Desire 10 Lifestyle" },
    { value: "desire-10-pro", label: "Desire 10 Pro" },
    { value: "desire-12", label: "Desire 12" },
    { value: "desire-20-pro", label: "Desire 20 pro" },
    { value: "desire-21-pro-5g", label: "Desire 21 pro 5G" },
    { value: "desire-530", label: "Desire 530" },
    { value: "desire-610", label: "Desire 610" },
    { value: "desire-620", label: "Desire 620" },
    { value: "desire-626", label: "Desire 626" },
    { value: "desire-628", label: "Desire 628" },
    { value: "desire-650", label: "Desire 650" },
    { value: "desire-820", label: "Desire 820" },
    { value: "desire-825", label: "Desire 825" },
    { value: "one", label: "One" },
    { value: "one-mini", label: "One Mini" },
    { value: "one-mini-2", label: "One Mini 2" },
    { value: "oneplus", label: "OnePlus" },
    { value: "one-x", label: "One X" },
    { value: "one-x-plus", label: "One X Plus" },
    { value: "one-8", label: "One 8" },
    { value: "one-a9", label: "One A9" },
    { value: "one-m7", label: "One M7" },
    { value: "one-m8", label: "One M8" },
    { value: "one-m9", label: "One M9" },
    { value: "one-m9-plus", label: "One M9 Plus" },
    { value: "one-x9", label: "One X9" },
    { value: "one-x10", label: "One X10" },
    { value: "u11", label: "U11" },
    { value: "uplay", label: "UPlay" },
    { value: "autre", label: "Autre" },
  ],
  lenovo: [
    { value: "c2", label: "C2" },
    { value: "k5", label: "K5" },
    { value: "k5-note", label: "K5 Note" },
    { value: "k6", label: "K6" },
    { value: "k6-note", label: "K6 Note" },
    { value: "medio", label: "Medio" },
    { value: "moto-c-plus", label: "Moto C Plus" },
    { value: "moto-g4", label: "Moto G4" },
    { value: "moto-g4-plus", label: "Moto G4 Plus" },
    { value: "moto-g5", label: "Moto G5" },
    { value: "moto-g5-plus", label: "Moto G5 Plus" },
    { value: "p2", label: "P2" },
    { value: "s5-pro", label: "S5 Pro" },
    { value: "z6", label: "Z6" },
    { value: "z6-pro", label: "Z6 Pro" },
    { value: "autre", label: "Autre" },
  ],
  lg: [
    { value: "g2", label: "G2" },
    { value: "g3", label: "G3" },
    { value: "g4", label: "G4" },
    { value: "g5", label: "G5" },
    { value: "g6", label: "G6" },
    { value: "g7", label: "G7" },
    { value: "g7-thinq", label: "G7 ThinQ" },
    { value: "g8", label: "G8" },
    { value: "g8s", label: "G8S" },
    { value: "g8-thinq", label: "G8 ThinQ" },
    { value: "google-nexus-4", label: "Google Nexus 4" },
    { value: "l60", label: "L60" },
    { value: "optimus-g", label: "Optimus G" },
    { value: "optimus-f6", label: "Optimus F6" },
    { value: "optimus-l7", label: "Optimus L7" },
    { value: "optimus-l9", label: "Optimus L9" },
    { value: "nexus-5", label: "Nexus 5" },
    { value: "nexus-5x", label: "Nexus 5X" },
    { value: "q-stylus", label: "Q Stylus" },
    { value: "q6", label: "Q6" },
    { value: "v30", label: "V30" },
    { value: "v40", label: "V40" },
    { value: "f70-d315", label: "F70 D315" },
    { value: "k4", label: "K4" },
    { value: "k8", label: "K8" },
    { value: "k10", label: "K10" },
    { value: "k11", label: "K11" },
    { value: "autre", label: "Autre" },
  ],
  microsoft: [
    { value: "lumia-435", label: "Lumia 435" },
    { value: "lumia-532", label: "Lumia 532" },
    { value: "lumia-535", label: "Lumia 535" },
    { value: "lumia-550", label: "Lumia 550" },
    { value: "lumia-640", label: "Lumia 640" },
    { value: "lumia-640-lte", label: "Lumia 640 LTE" },
    { value: "lumia-640-xl", label: "Lumia 640 XL" },
    { value: "lumia-650", label: "Lumia 650" },
    { value: "lumia-735", label: "Lumia 735" },
    { value: "lumia-950", label: "Lumia 950" },
    { value: "lumia-950-xl", label: "Lumia 950 XL" },
    { value: "autre", label: "Autre" },
  ],
  mobiwire: [
    { value: "staractive", label: "Staractive" },
    { value: "starshine-5", label: "Starshine 5" },
    { value: "startrail-7", label: "Startrail 7" },
    { value: "starnaute-3", label: "Starnaute 3" },
    { value: "starxtrem-2", label: "Starxtrem 2" },
    { value: "autre", label: "Autre" },
  ],
  motorola: [
    { value: "one", label: "One" },
    { value: "one-vision", label: "One Vision" },
    { value: "moto-defy", label: "Moto Defy" },
    { value: "moto-defy-plus", label: "Moto Defy +" },
    { value: "moto-e", label: "Moto E" },
    { value: "moto-e4-plus", label: "Moto E4 Plus" },
    { value: "moto-e5", label: "Moto E5" },
    { value: "moto-g", label: "Moto G" },
    { value: "moto-g5", label: "Moto G5" },
    { value: "moto-g5-plus", label: "Moto G5 Plus" },
    { value: "moto-g5s", label: "Moto G5S" },
    { value: "moto-g5s-plus", label: "Moto G5S Plus" },
    { value: "moto-g6", label: "Moto G6" },
    { value: "moto-g6-play", label: "Moto G6 Play" },
    { value: "moto-g7", label: "Moto G7" },
    { value: "moto-g7-play", label: "Moto G7 Play" },
    { value: "moto-g7-plus", label: "Moto G7 Plus" },
    { value: "moto-g7-power", label: "Moto G7 Power" },
    { value: "moto-x4", label: "Moto X4" },
    { value: "moto-x-force", label: "Moto X Force" },
    { value: "moto-x-play", label: "Moto X Play" },
    { value: "moto-x-style", label: "Moto X Style" },
    { value: "moto-z2-force", label: "Moto Z2 Force" },
    { value: "moto-z2-play", label: "Moto Z2 Play" },
    { value: "moto-c-plus", label: "Moto C Plus" },
    { value: "nexus-6", label: "Nexus 6" },
    { value: "razr-hd", label: "RAZR HD" },
    { value: "razr-i", label: "RAZR I" },
    { value: "edge-30-pro", label: "Edge 30 Pro" },
    { value: "g71-5g", label: "g71 5G" },
    { value: "g41", label: "g41" },
    { value: "g22", label: "g22" },
    { value: "autre", label: "Autre" },
  ],
  nokia: [
    { value: "lumia-435", label: "Lumia 435" },
    { value: "lumia-520", label: "Lumia 520" },
    { value: "lumia-530", label: "Lumia 530" },
    { value: "lumia-535", label: "Lumia 535" },
    { value: "lumia-550", label: "Lumia 550" },
    { value: "lumia-610", label: "Lumia 610" },
    { value: "lumia-620", label: "Lumia 620" },
    { value: "lumia-625", label: "Lumia 625" },
    { value: "lumia-630", label: "Lumia 630" },
    { value: "lumia-635", label: "Lumia 635" },
    { value: "lumia-640", label: "Lumia 640" },
    { value: "lumia-710", label: "Lumia 710" },
    { value: "lumia-735", label: "Lumia 735" },
    { value: "lumia-800", label: "Lumia 800" },
    { value: "lumia-820", label: "Lumia 820" },
    { value: "lumia-830", label: "Lumia 830" },
    { value: "lumia-900", label: "Lumia 900" },
    { value: "lumia-920", label: "Lumia 920" },
    { value: "lumia-925", label: "Lumia 925" },
    { value: "lumia-930", label: "Lumia 930" },
    { value: "lumia-950", label: "Lumia 950" },
    { value: "lumia-950-xl", label: "Lumia 950 XL" },
    { value: "lumia-1020", label: "Lumia 1020" },
    { value: "lumia-1320", label: "Lumia 1320" },
    { value: "lumia-1520", label: "Lumia 1520" },
    { value: "1", label: "1" },
    { value: "1-black-blue-bs", label: "1 BLACK BLUE BS" },
    { value: "1-plus", label: "1 Plus" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "3.2", label: "3.2" },
    { value: "5", label: "5" },
    { value: "6", label: "6" },
    { value: "6.1", label: "6.1" },
    { value: "7.1", label: "7.1" },
    { value: "7-plus", label: "7 Plus" },
    { value: "8", label: "8" },
    { value: "8-sirocco", label: "8 Sirocco" },
    { value: "g50", label: "G50" },
    { value: "xr20", label: "XR20" },
    { value: "x20", label: "X20" },
    { value: "x10", label: "X10" },
    { value: "g21", label: "G21" },
    { value: "g20", label: "G20" },
    { value: "g11", label: "G11" },
    { value: "g10", label: "G10" },
    { value: "1.4", label: "1.4" },
    { value: "5.4", label: "5.4" },
    { value: "2.4", label: "2.4" },
    { value: "3.4", label: "3.4" },
    { value: "8.3", label: "8.3" },
    { value: "1.3", label: "1.3" },
    { value: "5.3", label: "5.3" },
    { value: "2.3", label: "2.3" },
    { value: "6.2", label: "6.2" },
    { value: "7.2", label: "7.2" },
    { value: "4.2", label: "4.2" },
    { value: "autre", label: "Autre" },
  ],
  oneplus: [
    { value: "one", label: "One" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "3t", label: "3T" },
    { value: "5", label: "5" },
    { value: "5t", label: "5T" },
    { value: "6", label: "6" },
    { value: "6t", label: "6T" },
    { value: "7", label: "7" },
    { value: "7-pro", label: "7 Pro" },
    { value: "x", label: "X" },
    { value: "8", label: "8" },
    { value: "one-plus-8t", label: "One Plus 8T" },
    { value: "9", label: "9" },
    { value: "9-pro", label: "9 Pro" },
    { value: "10", label: "10" },
    { value: "11", label: "11" },
    { value: "12", label: "12" },
    { value: "13", label: "13" },
    { value: "open", label: "Open" },
    { value: "oneplus-nord-ce-5g", label: "OnePlus Nord CE 5G" },
    { value: "oneplus-nord", label: "OnePlus Nord" },
    { value: "oneplus-nord-2-5g", label: "OnePlus Nord 2 5G" },
    { value: "autre", label: "Autre" },
  ],
  oppo: [
    { value: "find-x3-pro", label: "Find X3 Pro" },
    { value: "find-x5-pro", label: "Find X5 Pro" },
    { value: "find-x5", label: "Find X5" },
    { value: "find-x5-lite", label: "Find X5 Lite" },
    { value: "find-x6", label: "Find X6" },
    { value: "find-x7", label: "Find X7" },
    { value: "find-x8", label: "Find X8" },
    { value: "reno-12", label: "Reno 12" },
    { value: "reno-13", label: "Reno 13" },
    { value: "a94-5g", label: "A94 5G" },
    { value: "a74-4g", label: "A74 4G" },
    { value: "autre", label: "Autre" },
  ],
  wiko: [
    { value: "cink", label: "Cink" },
    { value: "cink-five", label: "Cink Five" },
    { value: "cink-king", label: "Cink King" },
    { value: "cink-peax", label: "Cink Peax" },
    { value: "cink-peax-2", label: "Cink Peax 2" },
    { value: "cink-slim", label: "Cink Slim" },
    { value: "darkside", label: "Darkside" },
    { value: "fever-4g", label: "Fever 4G" },
    { value: "freddy", label: "Freddy" },
    { value: "getaway", label: "Getaway" },
    { value: "goa", label: "GOA" },
    { value: "harry", label: "Harry" },
    { value: "harry-2", label: "Harry 2" },
    { value: "highway", label: "Highway" },
    { value: "highway-4g", label: "Highway 4G" },
    { value: "highway-pure-4g", label: "Highway Pure 4G" },
    { value: "iggy", label: "Iggy" },
    { value: "jerry", label: "Jerry" },
    { value: "jerry-2", label: "Jerry 2" },
    { value: "jerry-3", label: "Jerry 3" },
    { value: "jimmy", label: "Jimmy" },
    { value: "jimmybirdy-4g", label: "JimmyBirdy 4G" },
    { value: "kite-4g", label: "Kite 4G" },
    { value: "lenny", label: "Lenny" },
    { value: "lenny-2", label: "Lenny 2" },
    { value: "lenny-3", label: "Lenny 3" },
    { value: "lenny-4", label: "Lenny 4" },
    { value: "lenny-4-plus", label: "Lenny 4 Plus" },
    { value: "lenny-5", label: "Lenny 5" },
    { value: "lubi-3", label: "Lubi 3" },
    { value: "lubi-4", label: "Lubi 4" },
    { value: "lubi-5", label: "Lubi 5" },
    { value: "lubi-5-plus", label: "Lubi 5 Plus" },
    { value: "lubi-plus", label: "Lubi +" },
    { value: "minz-plus", label: "Minz +" },
    { value: "ozzy", label: "Ozzy" },
    { value: "pulp-4g", label: "Pulp 4G" },
    { value: "pulp-fab-4g", label: "Pulp Fab 4G" },
    { value: "rainbow-4g", label: "Rainbow 4G" },
    { value: "rainbow-jam-4g", label: "Rainbow Jam 4G" },
    { value: "rainbow-lite-4g", label: "Rainbow Lite 4G" },
    { value: "rainbow-up-4g", label: "Rainbow UP 4G" },
    { value: "riff", label: "Riff" },
    { value: "riff-2", label: "Riff 2" },
    { value: "riff-3", label: "Riff 3" },
    { value: "riff-3-plus", label: "Riff 3 Plus" },
    { value: "rige-4g", label: "Rige 4G" },
    { value: "robby", label: "Robby" },
    { value: "stairway", label: "Stairway" },
    { value: "sunny", label: "Sunny" },
    { value: "sunny-2", label: "Sunny 2" },
    { value: "sunny-2-plus", label: "Sunny 2 Plus" },
    { value: "sunny-3", label: "Sunny 3" },
    { value: "t10", label: "T10" },
    { value: "t40", label: "T40" },
    { value: "t50", label: "T50" },
    { value: "t60", label: "T60" },
    { value: "tommy", label: "Tommy" },
    { value: "tommy-2", label: "Tommy 2" },
    { value: "tommy-2-plus", label: "Tommy 2 Plus" },
    { value: "tommy-3", label: "Tommy 3" },
    { value: "u-feel", label: "U Feel" },
    { value: "u-feel-lite", label: "U Feel Lite" },
    { value: "u-feel-prime", label: "U Feel Prime" },
    { value: "u-pulse", label: "U Pulse" },
    { value: "u-pulse-lite", label: "U Pulse Lite" },
    { value: "view", label: "View" },
    { value: "view-2", label: "View 2" },
    { value: "view-2-go", label: "View 2 Go" },
    { value: "view-2-plus", label: "View 2 Plus" },
    { value: "view-2-pro", label: "View 2 Pro" },
    { value: "view-3", label: "View 3" },
    { value: "view-3-lite", label: "View 3 Lite" },
    { value: "view-3-pro", label: "View 3 Pro" },
    { value: "view-go", label: "View Go" },
    { value: "view-lite", label: "View Lite" },
    { value: "view-max", label: "View Max" },
    { value: "view-prime", label: "View Prime" },
    { value: "view-xl", label: "View XL" },
    { value: "wax", label: "Wax" },
    { value: "wim", label: "WIM" },
    { value: "wim-lite", label: "WIM Lite" },
    { value: "y60", label: "Y60" },
    { value: "y80", label: "Y80" },
    { value: "power-u30", label: "Power U30" },
    { value: "power-u20", label: "Power U20" },
    { value: "power-u10", label: "Power U10" },
    { value: "view-5", label: "View 5" },
    { value: "view-4", label: "View 4" },
    { value: "view-5-plus", label: "View 5 Plus" },
    { value: "view-4-lite", label: "View 4 lite" },
    { value: "y81", label: "Y81" },
    { value: "y62", label: "Y62" },
    { value: "y61", label: "Y61" },
    { value: "y51", label: "Y51" },
    { value: "y50", label: "Y50" },
    { value: "autre", label: "Autre" },
  ],
  zte: [
    { value: "axon-7", label: "Axon 7" },
    { value: "axon-7-mini", label: "Axon 7 Mini" },
    { value: "axon-lite", label: "Axon Lite" },
    { value: "axon-mini", label: "Axon Mini" },
    { value: "axon-20-5g", label: "Axon 20 5G" },
    { value: "axon-30", label: "Axon 30" },
    { value: "axon-30-ultra", label: "Axon 30 Ultra" },
    { value: "axon-40", label: "Axon 40" },
    { value: "nubia", label: "Nubia" },
    { value: "blade-3", label: "Blade 3" },
    { value: "blade-a310", label: "Blade A310" },
    { value: "blade-a452", label: "Blade A452" },
    { value: "blade-a506", label: "Blade A506" },
    { value: "blade-a610-plus", label: "Blade A610 Plus" },
    { value: "blade-a51", label: "Blade A51" },
    { value: "blade-a71", label: "Blade A71" },
    { value: "blade-l3", label: "Blade L3" },
    { value: "blade-s6", label: "Blade S6" },
    { value: "blade-v6", label: "Blade V6" },
    { value: "blade-v7", label: "Blade V7" },
    { value: "blade-v7-lite", label: "Blade V7 Lite" },
    { value: "blade-v8", label: "Blade V8" },
    { value: "blade-v8-lite", label: "Blade V8 Lite" },
    { value: "blade-mini", label: "Blade Mini" },
    { value: "f160", label: "F160" },
    { value: "grand-s-flex", label: "Grand S Flex" },
    { value: "stake-4.3", label: "Stake 4.3" },
    { value: "starxtrem", label: "StarXtrem" },
    { value: "autre", label: "Autre" },
  ],
  sony: [
    { value: "xperia-e3", label: "Xperia E3" },
    { value: "xperia-x", label: "Xperia X" },
    { value: "xperia-xa", label: "Xperia XA" },
    { value: "xperia-xa1", label: "Xperia XA1" },
    { value: "xperia-xa2", label: "Xperia XA2" },
    { value: "xperia-xz", label: "Xperia XZ" },
    { value: "xperia-xz1", label: "Xperia XZ1" },
    { value: "xperia-xz2", label: "Xperia XZ2" },
    { value: "xperia-z3", label: "Xperia Z3" },
    { value: "xperia-z5", label: "Xperia Z5" },
    { value: "xperia-1-iii", label: "Xperia 1 III" },
    { value: "xperia-pro-i", label: "Xperia Pro-I" },
    { value: "xperia-5-iii", label: "Xperia 5 III" },
    { value: "xperia-1", label: "Xperia 1" },
    { value: "xperia-10", label: "Xperia 10" },
    { value: "xperia-5", label: "Xperia 5" },
    { value: "xperia-l4", label: "Xperia L4" },
    { value: "autre", label: "Autre" },
  ],
  autre: [], // pour la marque "autre", pas de modèles spécifiques
};

// ===================== MODÈLES PAR MARQUE (CONSOLES) =====================

const CONSOLES_MODELE_OPTIONS_BY_MARQUE: Record<
  string,
  { value: string; label: string }[]
> = {
  sony: [
    { value: "ps5", label: "PS5" },
    { value: "ps5-slim", label: "PS5 Slim" },
    { value: "ps5-pro", label: "PS5 Pro" },
    { value: "ps4", label: "PS4" },
    { value: "ps4-slim", label: "PS4 Slim" },
    { value: "ps4-pro", label: "PS4 Pro" },
    { value: "ps3", label: "PS3" },
    { value: "ps3-slim", label: "PS3 Slim" },
    { value: "ps2", label: "PS2" },
    { value: "ps2-slim", label: "PS2 Slim" },
    { value: "ps1", label: "PS1" },
    { value: "ps-vita", label: "PS VITA" },
    { value: "psp", label: "PSP" },
    { value: "playstation-classic", label: "PlayStation Classic" },
    { value: "autre", label: "Autre" },
  ],
  nintendo: [
    { value: "2ds", label: "2DS" },
    { value: "3ds", label: "3DS" },
    { value: "3ds-xl", label: "3DS XL" },
    { value: "classic-nes-mini", label: "Classic NES Mini" },
    { value: "classic-snes-mini", label: "Classic SNES Mini" },
    { value: "ds", label: "DS" },
    { value: "ds-lite", label: "DS Lite" },
    { value: "dsi", label: "DSi" },
    { value: "dsi-xl", label: "DSi XL" },
    { value: "game-boy", label: "Game Boy" },
    { value: "game-boy-color", label: "Game Boy Color" },
    { value: "game-boy-advance", label: "Game Boy Advance" },
    { value: "game-cube", label: "Game cube" },
    { value: "n64", label: "N64" },
    { value: "nes", label: "NES" },
    { value: "new-2ds-xl", label: "New 2DS XL" },
    { value: "new-3ds", label: "New 3DS" },
    { value: "new-3ds-xl", label: "New 3DS XL" },
    { value: "super-nintendo-snes", label: "Super Nintendo SNES" },
    { value: "switch", label: "Switch" },
    { value: "switch-oled", label: "Switch Oled" },
    { value: "switch-lite", label: "Switch Lite" },
    { value: "switch-2", label: "Switch 2" },
    { value: "wii", label: "Wii" },
    { value: "wii-u", label: "Wii U" },
    { value: "autre", label: "Autre" },
  ],
  microsoft: [
    { value: "xbox-series-x", label: "Xbox Series X" },
    { value: "xbox-series-s", label: "Xbox Series S" },
    { value: "xbox-one", label: "Xbox One" },
    { value: "xbox-360", label: "Xbox 360" },
    { value: "xbox", label: "Xbox" },
    { value: "autre", label: "Autre" },
  ],
  sega: [
    { value: "game-gear", label: "Game Gear" },
    { value: "master-system", label: "Master system" },
    { value: "master-system-2", label: "Master system 2" },
    { value: "megadrive", label: "Megadrive" },
    { value: "megadrive-mini", label: "Megadrive Mini" },
    { value: "saturn", label: "Saturn" },
    { value: "autre", label: "Autre" },
  ],
  "neo-geo-aes": [
    { value: "neo-geo", label: "Neo-Geo" },
    { value: "neo-geo-pocket", label: "Neo-Geo Pocket" },
    { value: "autre", label: "Autre" },
  ],
  amiga: [
    { value: "600", label: "600" },
    { value: "2000", label: "2000" },
    { value: "2600", label: "2600" },
    { value: "3000", label: "3000" },
    { value: "4000", label: "4000" },
    { value: "5200", label: "5200" },
    { value: "autre", label: "Autre" },
  ],
  atari: [
    { value: "2600", label: "2600" },
    { value: "5200", label: "5200" },
    { value: "7800", label: "7800" },
    { value: "4000t", label: "4000T" },
    { value: "cd-32", label: "CD 32" },
    { value: "flashback", label: "Flashback" },
    { value: "game-brain", label: "Game Brain" },
    { value: "jaguar", label: "Jaguar" },
    { value: "jaguar-cd", label: "Jaguar CD" },
    { value: "lynx", label: "Lynx" },
    { value: "lynx-ii", label: "Lynx II" },
    { value: "stunt-cycle", label: "Stunt Cycle" },
    { value: "vcs", label: "VCS" },
    { value: "video-pinball", label: "Video Pinball" },
    { value: "xegs", label: "XEGS" },
    { value: "autre", label: "Autre" },
  ],
  amstrad: [
    { value: "6128", label: "6128" },
    { value: "6128-plus", label: "6128 Plus" },
    { value: "commodore-64", label: "Commodore 64" },
    { value: "gx4000", label: "GX4000" },
    { value: "autre", label: "Autre" },
  ],
  retrogaming: [
    { value: "anbernic", label: "Anbernic" },
    { value: "autre", label: "Autre" },
  ],
  autre: [], // pas de modèles spécifiques pour "autre"
};


export default function ElectroniqueFilters({
  draft,
  setFilter,
  isValueSelected,
  handleCheckboxChange,
  excludedFilterNames = [],
}: Props) {
  // ===================== OPTIONS STATIQUES =====================
  const triOptions = [
    { value: "pertinence", label: "Pertinence" },
    { value: "recent", label: "Plus récentes" },
    { value: "ancien", label: "Plus anciennes" },
    { value: "price-asc", label: "Prix croissants" },
    { value: "price-desc", label: "Prix décroissants" },
  ];

  const typeAnnonceOptions = [
    { value: "offres", label: "Offres" },
    { value: "demandes", label: "Demandes" },
  ];

  const typeVendeursOptions = [
    { value: "particuliers", label: "Particuliers" },
    { value: "professionnels", label: "Professionnels" },
  ];

  const annoncesUrgentesOptions = [
    { value: "true", label: "Annonces urgentes" },
  ];

  const statutAnnonceOptions = [
    { value: "true", label: "Statut de l'annonce" },
  ];

  const protectionPanneOptions = [{ value: "true", label: "Protection Panne" }];

  const ordinateurmarqueOptions = [
    { value: "apple", label: "Apple" },
    { value: "samsung", label: "Samsung" },
    { value: "hp", label: "HP" },
    { value: "dell", label: "Dell" },
    { value: "lenovo", label: "Lenovo" },
    { value: "microsoft", label: "Microsoft" },
    { value: "asus", label: "Asus" },
    { value: "acer", label: "Acer" },
    { value: "msi", label: "MSI" },
    { value: "autre", label: "Autre" },
  ];

  const ordinateurtypeOptions = [
    { value: "fixe", label: "Fixe" },
    { value: "portable", label: "Portable" },
    {
      value: "unite-centrale-seule",
      label: "Unité centrale (seule)",
    },
  ];

  // ===================== DYNAMIC TAILLE OPTIONS =====================
  // Utilise directement la configuration ci-dessus
  const tailleecranOptions = useMemo(() => {
    const selectedUnivers = draft.filters?.ordinateurtype;
    if (!selectedUnivers) return [];
    return TAILLEECRAN_OPTIONS_BY_ORDINATEURTYPE[selectedUnivers] || [];
  }, [draft.filters?.ordinateurtype]);

  // Réinitialisation des tailles quand l'univers change
  const handleOrdinateurTypeChange = (name: string, value: string) => {
    setFilter(name, value);
    if (draft.filters?.tailleecran) {
      setFilter("tailleecran", "");
    }
  };

  // ===================== DYNAMIC TAILLE OPTIONS =====================

  const handleSortChange = (name: string, value: string) => {
    setFilter(name, value);
  };

  // ===================== ÉTAT DÉSACTIVÉ DE LA TAILLE =====================
  const isTailleDisabled = !draft.filters?.ordinateurtype;

  const ordinateurGeneralEtatOptions = [
    { value: "neuf", label: "État neuf" },
    { value: "reconditionne", label: "Reconditionné" },
    { value: "tres-bon-etat", label: "Très bon état" },
    { value: "bon-etat", label: "Bon état" },
    { value: "etat-satisfaisant", label: "État satisfaisant" },
    { value: "pour-pieces", label: "Pour pièces" },
  ];

  const accessoiresinformatiquemarqueOptions = [
    { value: "adobe", label: "Adobe" },
    { value: "amd", label: "AMD" },
    { value: "anker", label: "Anker" },
    { value: "apple", label: "Apple" },
    { value: "asus", label: "Asus" },
    { value: "belkin", label: "Belkin" },
    { value: "canon", label: "Canon" },
    { value: "corsair", label: "Corsair" },
    { value: "dell", label: "Dell" },
    { value: "hp", label: "HP" },
    { value: "intel", label: "Intel" },
    { value: "kingston", label: "Kingston" },
    { value: "lg", label: "LG" },
    { value: "logitech", label: "Logitech" },
    { value: "microsoft", label: "Microsoft" },
    { value: "msi", label: "MSI" },
    { value: "nvidia", label: "NVIDIA" },
    { value: "razer", label: "Razer" },
    { value: "samsung", label: "Samsung" },
    { value: "sandisk", label: "SanDisk" },
    { value: "steelseries", label: "SteelSeries" },
    { value: "ugreen", label: "Ugreen" },
    { value: "westerndigital", label: "Western Digital" },
  ];


  const accessoiresinformatiqueproduitOptions = [
  { value: "carte-graphique", label: "Carte graphique" },
  { value: "carte-mere", label: "Carte mère" },
  { value: "processeur", label: "Processeur" },
  { value: "refroidisseur-ventilateur", label: "Refroidisseur et ventilateur" },
  { value: "logiciel", label: "Logiciel" },
  { value: "ecran-moniteur", label: "Écran / moniteur" },
  { value: "clavier-souris", label: "Clavier et souris" },
  { value: "tapis-souris", label: "Tapis de souris" },
  { value: "imprimante-scanner", label: "Imprimante et scanner" },
  { value: "reseau-modem", label: "Réseau et modem" },
  { value: "webcam-camera", label: "Webcam / caméra" },
  { value: "cable-adaptateur", label: "Câble et adaptateur" },
  { value: "disque-dur-ssd-hdd-lecteur", label: "Disque dur (SSD, HDD) et lecteur" },
  { value: "stockage-leger", label: "Stockage léger (cartes SD, disques, clés USB)" },
  { value: "hub-station-accueil", label: "Hub / station d'accueil" },
  { value: "autre", label: "Autre" },
];


const accessoiresinformatiqueetatOptions = [
  { value: "neuf", label: "État neuf" },
  { value: "tres-bon-etat", label: "Très bon état" },
  { value: "bon-etat", label: "Bon état" },
  { value: "etat-satisfaisant", label: "État satisfaisant" },
  { value: "pour-pieces", label: "Pour pièces" },
];

const tablettesliseusesproduitOptions = [
  { value: "tablette", label: "Tablette" },
  { value: "liseuse", label: "Liseuse" },
];


// Dans le composant, après les autres useMemo, ajoutez :

const tablettesliseusesmarqueOptions = useMemo(() => {
  const selectedProduit = draft.filters?.tablettesliseusesproduit;
  if (!selectedProduit) return [];
  return MARQUE_OPTIONS_BY_TABLETTESLISEUSESPRODUIT[selectedProduit] || [];
}, [draft.filters?.tablettesliseusesproduit]);

// Gestionnaire pour réinitialiser la marque quand le produit change
const handleTablettesLiseusesProduitChange = (name: string, value: string) => {
  setFilter(name, value);
  if (draft.filters?.tablettesliseusesmarque) {
    setFilter("tablettesliseusesmarque", "");
  }
};

// État désactivé de la marque
const isTablettesLiseusesMarqueDisabled = !draft.filters?.tablettesliseusesproduit;

const tablettesliseusestailleecranOptions = [
  { value: "jusqua-7-pouces-18cm", label: "Jusqu'à 7” (18cm)" },
  { value: "8-10-pouces-20-25cm", label: "8 à 10” (20cm à 25cm)" },
  { value: "11-12-pouces-28-30cm", label: "11 à 12” (28cm à 30cm)" },
  { value: "13-pouces-33cm-plus", label: "13” (33cm) et plus" },
];

const tablettesliseusescapacitestockageOptions = [
  { value: "8-go", label: "8 Go" },
  { value: "16-go", label: "16 Go" },
  { value: "32-go", label: "32 Go" },
  { value: "64-go", label: "64 Go" },
  { value: "128-go", label: "128 Go" },
  { value: "256-go", label: "256 Go" },
  { value: "512-go", label: "512 Go" },
  { value: "plus-de-512-go", label: "+ de 512 Go" },
];

 // Couleurs pour tablettes et liseuses
const tablettesliseusescouleurBaseOptions = [
  { value: "argent", label: "Argent / Silver", color: "#C0C0C0" },
  { value: "blanc", label: "Blanc", color: "#FFFFFF" },
  { value: "bleu", label: "Bleu", color: "#0000FF" },
  { value: "gris", label: "Gris", color: "#808080" },
  { value: "jaune", label: "Jaune", color: "#FFFF00" },
  { value: "marron", label: "Marron", color: "#8B4513" },
  { value: "noir", label: "Noir", color: "#000000" },
  { value: "or", label: "Or", color: "#FFD700" },
  { value: "or-rose", label: "Or rose", color: "#FF69B4" },
  { value: "orange", label: "Orange", color: "#FFA500" },
  { value: "rose", label: "Rose", color: "#FFC0CB" },
  { value: "rouge", label: "Rouge", color: "#FF0000" },
  { value: "vert", label: "Vert", color: "#008000" },
  { value: "violet", label: "Violet", color: "#EE82EE" },
  { value: "autre", label: "Autre", color: "#CCCCCC" },
  { value: "multicolore", label: "Multicolore", color: "linear-gradient(90deg, red, orange, yellow, green, blue, purple)" },
];

const tablettesliseusescouleurOptions = tablettesliseusescouleurBaseOptions.map((opt) => ({
  ...opt,
  icon: (
    <span
      style={{
        display: "inline-block",
        width: "20px",
        height: "20px",
        borderRadius: "50%",
        background: opt.color,
        border: "1px solid #ccc",
        marginRight: "8px",
      }}
    />
  ),
}));

const tablettesliseusesetatOptions = [
  { value: "neuf", label: "État neuf" },
  { value: "reconditionne", label: "Reconditionné" },
  { value: "tres-bon-etat", label: "Très bon état" },
  { value: "bon-etat", label: "Bon état" },
  { value: "etat-satisfaisant", label: "État satisfaisant" },
  { value: "pour-pieces", label: "Pour pièces" },
];

const photoaudiovideoMarqueOptions = [
  { value: "apple", label: "Apple" },
  { value: "audio-technica", label: "Audio-Technica" },
  { value: "bang-olufsen", label: "Bang & Olufsen" },
  { value: "beats", label: "Beats" },
  { value: "benq", label: "Benq" },
  { value: "bose", label: "Bose" },
  { value: "canon", label: "Canon" },
  { value: "denon", label: "Denon" },
  { value: "devialet", label: "Devialet" },
  { value: "dji", label: "DJI" },
  { value: "epson", label: "Epson" },
  { value: "fujifilm", label: "Fujifilm" },
  { value: "gopro", label: "GoPro" },
  { value: "harman-kardon", label: "Harman Kardon" },
  { value: "hisense", label: "Hisense" },
  { value: "jabra", label: "Jabra" },
  { value: "jbl", label: "JBL" },
  { value: "jvc", label: "JVC" },
  { value: "kodak", label: "Kodak" },
  { value: "leica", label: "Leica" },
  { value: "lg", label: "LG" },
  { value: "marantz", label: "Marantz" },
  { value: "marshall", label: "Marshall" },
  { value: "nikon", label: "Nikon" },
  { value: "olympus", label: "Olympus" },
  { value: "panasonic", label: "Panasonic" },
  { value: "parrot", label: "Parrot" },
  { value: "pentax", label: "Pentax" },
  { value: "philips", label: "Philips" },
  { value: "pioneer", label: "Pioneer" },
  { value: "polaroid", label: "Polaroid" },
  { value: "samsung", label: "Samsung" },
  { value: "sennheiser", label: "Sennheiser" },
  { value: "sharp", label: "Sharp" },
  { value: "sonos", label: "Sonos" },
  { value: "sony", label: "Sony" },
  { value: "tcl", label: "TCL" },
  { value: "technics", label: "Technics" },
  { value: "toshiba", label: "Toshiba" },
  { value: "ultimate-ears", label: "Ultimate Ears (UE)" },
  { value: "yamaha", label: "Yamaha" },
  { value: "autre", label: "Autre" },
];

const photoaudiovideoproduitOptions = [
  { value: "appareil-photo", label: "Appareil photos" },
  { value: "objectifs-lentilles", label: "Objectifs et Lentilles" },
  { value: "accessoires-photos", label: "Accessoires photos" },
  { value: "camera", label: "Caméra" },
  { value: "drone", label: "Drone" },
  { value: "chaine-hifi", label: "Chaîne HIFI" },
  { value: "enceintes", label: "Enceintes" },
  { value: "ampli-hifi", label: "Ampli HIFI" },
  { value: "casque", label: "Casque" },
  { value: "ecouteurs", label: "Écouteurs" },
  { value: "platine-vinyle", label: "Platine vinyle et tourne disque" },
  { value: "radio-reveil", label: "Radio réveil" },
  { value: "lecteur-cd-dvd", label: "Lecteur CD / DVD" },
  { value: "television", label: "Télévision" },
  { value: "videoprojecteur", label: "Vidéoprojecteur" },
  { value: "decodeur-tv-connectee", label: "Décodeur et boitier TV connecté" },
  { value: "accessoires", label: "Accessoires" },
  { value: "cable-adaptateur", label: "Câble et adaptateur" },
  { value: "autre", label: "Autres" },
];

// Couleurs pour photo, audio & vidéo
const photoaudiovideoCouleurBaseOptions = [
  { value: "argent", label: "Argent / Silver", color: "#C0C0C0" },
  { value: "blanc", label: "Blanc", color: "#FFFFFF" },
  { value: "bleu", label: "Bleu", color: "#0000FF" },
  { value: "gris", label: "Gris", color: "#808080" },
  { value: "jaune", label: "Jaune", color: "#FFFF00" },
  { value: "marron", label: "Marron", color: "#8B4513" },
  { value: "noir", label: "Noir", color: "#000000" },
  { value: "or", label: "Or", color: "#FFD700" },
  { value: "or-rose", label: "Or rose", color: "#FF69B4" },
  { value: "orange", label: "Orange", color: "#FFA500" },
  { value: "rose", label: "Rose", color: "#FFC0CB" },
  { value: "rouge", label: "Rouge", color: "#FF0000" },
  { value: "vert", label: "Vert", color: "#008000" },
  { value: "violet", label: "Violet", color: "#EE82EE" },
  { value: "autre", label: "Autre", color: "#CCCCCC" },
  { value: "multicolore", label: "Multicolore", color: "linear-gradient(90deg, red, orange, yellow, green, blue, purple)" },
];

const photoaudiovideoCouleurOptions = photoaudiovideoCouleurBaseOptions.map((opt) => ({
  ...opt,
  icon: (
    <span
      style={{
        display: "inline-block",
        width: "20px",
        height: "20px",
        borderRadius: "50%",
        background: opt.color,
        border: "1px solid #ccc",
        marginRight: "8px",
      }}
    />
  ),
}));

const photoaudiovideoEtatOptions = [
  { value: "neuf", label: "État neuf" },
  { value: "reconditionne", label: "Reconditionné" },
  { value: "tres-bon-etat", label: "Très bon état" },
  { value: "bon-etat", label: "Bon état" },
  { value: "etat-satisfaisant", label: "État satisfaisant" },
  { value: "pour-pieces", label: "Pour pièces" },
];

const telephonesobjetsconnectesMarqueOptions = [
  { value: "apple", label: "Apple" },
  { value: "huawei", label: "Huawei" },
  { value: "techno", label: "Techno" },
  { value: "samsung", label: "Samsung" },
  { value: "xiaomi", label: "Xiaomi" },
  { value: "alcatel", label: "Alcatel" },
  { value: "archos", label: "Archos" },
  { value: "asus", label: "Asus" },
  { value: "blackberry", label: "Blackberry" },
  { value: "fairphone", label: "Fairphone" },
  { value: "google", label: "Google" },
  { value: "honor", label: "Honor" },
  { value: "htc", label: "HTC" },
  { value: "lenovo", label: "Lenovo" },
  { value: "lg", label: "LG" },
  { value: "microsoft", label: "Microsoft" },
  { value: "mobiwire", label: "Mobiwire" },
  { value: "motorola", label: "Motorola" },
  { value: "nokia", label: "Nokia" },
  { value: "oneplus", label: "One plus" },
  { value: "oppo", label: "Oppo" },
  { value: "wiko", label: "Wiko" },
  { value: "zte", label: "ZTE" },
  { value: "sony", label: "Sony" },
  { value: "autre", label: "Autre" },
];

const telephonesobjetsconnectesProduitOptions = [
  { value: "smartphone", label: "Smartphone" },
  { value: "telephone-fixe", label: "Téléphone fixe" },
  { value: "montre-connectee", label: "Montre connectée" },
  { value: "gps-balise", label: "GPS et balise (AirTag, SmarTag)" },
  { value: "bracelet-connecte", label: "Bracelet connecté" },
  { value: "assistant-vocal", label: "Assistant vocal" },
  { value: "domotique", label: "Domotique" },
  { value: "autres", label: "Autres" },
];
const telephonesobjetsconnectesCapaciteStockageOptions = [
  { value: "8-go", label: "8 Go" },
  { value: "16-go", label: "16 Go" },
  { value: "32-go", label: "32 Go" },
  { value: "64-go", label: "64 Go" },
  { value: "128-go", label: "128 Go" },
  { value: "256-go", label: "256 Go" },
  { value: "512-go", label: "512 Go" },
  { value: "plus-de-512-go", label: "+ de 512 Go" },
];

// Couleurs pour téléphones & objets connectés
const telephonesobjetsconnectesCouleurBaseOptions = [
  { value: "argent", label: "Argent / Silver", color: "#C0C0C0" },
  { value: "blanc", label: "Blanc", color: "#FFFFFF" },
  { value: "bleu", label: "Bleu", color: "#0000FF" },
  { value: "gris", label: "Gris", color: "#808080" },
  { value: "jaune", label: "Jaune", color: "#FFFF00" },
  { value: "marron", label: "Marron", color: "#8B4513" },
  { value: "noir", label: "Noir", color: "#000000" },
  { value: "or", label: "Or", color: "#FFD700" },
  { value: "or-rose", label: "Or rose", color: "#FF69B4" },
  { value: "orange", label: "Orange", color: "#FFA500" },
  { value: "rose", label: "Rose", color: "#FFC0CB" },
  { value: "rouge", label: "Rouge", color: "#FF0000" },
  { value: "vert", label: "Vert", color: "#008000" },
  { value: "violet", label: "Violet", color: "#EE82EE" },
  { value: "autre", label: "Autre", color: "#CCCCCC" },
  { value: "multicolore", label: "Multicolore", color: "linear-gradient(90deg, red, orange, yellow, green, blue, purple)" },
];

const telephonesobjetsconnectesCouleurOptions = telephonesobjetsconnectesCouleurBaseOptions.map((opt) => ({
  ...opt,
  icon: (
    <span
      style={{
        display: "inline-block",
        width: "20px",
        height: "20px",
        borderRadius: "50%",
        background: opt.color,
        border: "1px solid #ccc",
        marginRight: "8px",
      }}
    />
  ),
}));

const telephonesobjetsconnectesEtatOptions = [
  { value: "neuf", label: "État neuf" },
  { value: "reconditionne", label: "Reconditionné" },
  { value: "tres-bon-etat", label: "Très bon état" },
  { value: "bon-etat", label: "Bon état" },
  { value: "etat-satisfaisant", label: "État satisfaisant" },
  { value: "pour-pieces", label: "Pour pièces" },
];



// Modèles dynamiques par marque
const telephonesobjetsconnectesModeleOptions = useMemo(() => {
  const selectedMarque = draft.filters?.telephonesobjetsconnectesmarque;
  if (!selectedMarque) return [];
  return MODELE_OPTIONS_BY_TELEPHONESMARQUE[selectedMarque] || [];
}, [draft.filters?.telephonesobjetsconnectesmarque]);

// Réinitialisation du modèle quand la marque change
const handleTelephonesMarqueChange = (name: string, value: string) => {
  setFilter(name, value);
  if (draft.filters?.telephonesobjetsconnectesmodele) {
    setFilter("telephonesobjetsconnectesmodele", "");
  }
};

// État désactivé du modèle
const isModeleDisabled = !draft.filters?.telephonesobjetsconnectesmarque;




const accessoirestelephoneobjetsconnectesProduitOptions = [
  { value: "bracelet-montre-connectee", label: "Bracelet de montre connectée" },
  { value: "coque-etuis", label: "Coque et étuis" },
  { value: "protecteur-ecran", label: "Protecteur d'écran" },
  { value: "cable-chargeur", label: "Câble et chargeur" },
  { value: "batterie-externe", label: "Batterie externe" },
  { value: "cordon-collier", label: "Cordon et collier de téléphone" },
  { value: "autres", label: "Autres" },
];




// Couleurs pour accessoires téléphone & objets connectés
const accessoirestelephoneobjetsconnectesCouleurBaseOptions = [
  { value: "argent", label: "Argent / Silver", color: "#C0C0C0" },
  { value: "blanc", label: "Blanc", color: "#FFFFFF" },
  { value: "bleu", label: "Bleu", color: "#0000FF" },
  { value: "gris", label: "Gris", color: "#808080" },
  { value: "jaune", label: "Jaune", color: "#FFFF00" },
  { value: "marron", label: "Marron", color: "#8B4513" },
  { value: "noir", label: "Noir", color: "#000000" },
  { value: "or", label: "Or", color: "#FFD700" },
  { value: "or-rose", label: "Or rose", color: "#FF69B4" },
  { value: "orange", label: "Orange", color: "#FFA500" },
  { value: "rose", label: "Rose", color: "#FFC0CB" },
  { value: "rouge", label: "Rouge", color: "#FF0000" },
  { value: "vert", label: "Vert", color: "#008000" },
  { value: "violet", label: "Violet", color: "#EE82EE" },
  { value: "autre", label: "Autre", color: "#CCCCCC" },
  { value: "multicolore", label: "Multicolore", color: "linear-gradient(90deg, red, orange, yellow, green, blue, purple)" },
];

const accessoirestelephoneobjetsconnectesCouleurOptions = accessoirestelephoneobjetsconnectesCouleurBaseOptions.map((opt) => ({
  ...opt,
  icon: (
    <span
      style={{
        display: "inline-block",
        width: "20px",
        height: "20px",
        borderRadius: "50%",
        background: opt.color,
        border: "1px solid #ccc",
        marginRight: "8px",
      }}
    />
  ),
}));


const accessoirestelephoneobjetsconnectesEtatOptions = [
  { value: "neuf", label: "État neuf" },
  { value: "reconditionne", label: "Reconditionné" },
  { value: "tres-bon-etat", label: "Très bon état" },
  { value: "bon-etat", label: "Bon état" },
  { value: "etat-satisfaisant", label: "État satisfaisant" },
  { value: "pour-pieces", label: "Pour pièces" },
];


const consolesTypeOptions = [
  
  { value: "console", label: "Console" },
  { value: "accessoires", label: "Accessoires" },
];
const consolesMarqueOptions = [
  { value: "sony", label: "Sony" },
  { value: "nintendo", label: "Nintendo" },
  { value: "microsoft", label: "Microsoft" },
  { value: "sega", label: "Sega" },
  { value: "neo-geo-aes", label: "Neo-Geo AES" },
  { value: "amiga", label: "Amiga" },
  { value: "atari", label: "Atari" },
  { value: "amstrad", label: "Amstrad" },
  { value: "retrogaming", label: "Retrogaming" },
  { value: "autre", label: "Autre" },
];


// Modèles dynamiques par marque (consoles)
const consolesModeleOptions = useMemo(() => {
  const selectedMarque = draft.filters?.consolesmarque;
  if (!selectedMarque) return [];
  return CONSOLES_MODELE_OPTIONS_BY_MARQUE[selectedMarque] || [];
}, [draft.filters?.consolesmarque]);

// Réinitialisation du modèle quand la marque change
const handleConsolesMarqueChange = (name: string, value: string) => {
  setFilter(name, value);
  if (draft.filters?.consolesmodele) {
    setFilter("consolesmodele", "");
  }
};

// État désactivé du modèle
const isConsolesModeleDisabled = !draft.filters?.consolesmarque;

// Couleurs pour accessoires téléphone & objets connectés
const consolesCouleurBaseOptions = [
  { value: "argent", label: "Argent / Silver", color: "#C0C0C0" },
  { value: "blanc", label: "Blanc", color: "#FFFFFF" },
  { value: "bleu", label: "Bleu", color: "#0000FF" },
  { value: "gris", label: "Gris", color: "#808080" },
  { value: "jaune", label: "Jaune", color: "#FFFF00" },
  { value: "marron", label: "Marron", color: "#8B4513" },
  { value: "noir", label: "Noir", color: "#000000" },
  { value: "or", label: "Or", color: "#FFD700" },
  { value: "or-rose", label: "Or rose", color: "#FF69B4" },
  { value: "orange", label: "Orange", color: "#FFA500" },
  { value: "rose", label: "Rose", color: "#FFC0CB" },
  { value: "rouge", label: "Rouge", color: "#FF0000" },
  { value: "vert", label: "Vert", color: "#008000" },
  { value: "violet", label: "Violet", color: "#EE82EE" },
  { value: "autre", label: "Autre", color: "#CCCCCC" },
  { value: "multicolore", label: "Multicolore", color: "linear-gradient(90deg, red, orange, yellow, green, blue, purple)" },
];
const consolesCouleurOptions = consolesCouleurBaseOptions.map((opt) => ({
  ...opt,
  icon: (
    <span
      style={{
        display: "inline-block",
        width: "20px",
        height: "20px",
        borderRadius: "50%",
        background: opt.color,
        border: "1px solid #ccc",
        marginRight: "8px",
      }}
    />
  ),
}));

const consolesEtatOptions = [
  { value: "neuf", label: "État neuf" },
  { value: "reconditionne", label: "Reconditionné" },
  { value: "tres-bon-etat", label: "Très bon état" },
  { value: "bon-etat", label: "Bon état" },
  { value: "etat-satisfaisant", label: "État satisfaisant" },
  { value: "pour-pieces", label: "Pour pièces" },
];


const jeuxvideoPlateformeOptions = [
  { value: "600", label: "600" },
  { value: "2000", label: "2000" },
  { value: "2600", label: "2600" },
  { value: "3000", label: "3000" },
  { value: "4000", label: "4000" },
  { value: "5200", label: "5200" },
  { value: "6128", label: "6128" },
  { value: "6128-plus", label: "6128 Plus" },
  { value: "commodore-64", label: "Commodore 64" },
  { value: "gx4000", label: "GX4000" },
  { value: "7800", label: "7800" },
  { value: "4000t", label: "4000T" },
  { value: "cd-32", label: "CD 32" },
  { value: "flashback", label: "Flashback" },
  { value: "game-brain", label: "Game Brain" },
  { value: "jaguar", label: "Jaguar" },
  { value: "jaguar-cd", label: "Jaguar CD" },
  { value: "lynx", label: "Lynx" },
  { value: "lynx-ii", label: "Lynx II" },
  { value: "stunt-cycle", label: "Stunt Cycle" },
  { value: "vcs", label: "VCS" },
  { value: "video-pinball", label: "Video Pinball" },
  { value: "xegs", label: "XEGS" },
  { value: "xbox-series-x", label: "Xbox Series X" },
  { value: "xbox-series-s", label: "Xbox Series S" },
  { value: "xbox-one", label: "Xbox One" },
  { value: "xbox-360", label: "Xbox 360" },
  { value: "xbox", label: "Xbox" },
  { value: "neo-geo", label: "Neo-Geo" },
  { value: "neo-geo-pocket", label: "Neo-Geo Pocket" },
  { value: "2ds", label: "2DS" },
  { value: "3ds", label: "3DS" },
  { value: "3ds-xl", label: "3DS XL" },
  { value: "classic-nes-mini", label: "Classic NES Mini" },
  { value: "classic-snes-mini", label: "Classic SNES Mini" },
  { value: "ds", label: "DS" },
  { value: "ds-lite", label: "DS Lite" },
  { value: "dsi", label: "DSi" },
  { value: "dsi-xl", label: "DSi XL" },
  { value: "game-boy", label: "Game Boy" },
  { value: "game-boy-color", label: "Game Boy Color" },
  { value: "game-boy-advance", label: "Game Boy Advance" },
  { value: "game-cube", label: "Game cube" },
  { value: "n64", label: "N64" },
  { value: "nes", label: "NES" },
  { value: "new-2ds-xl", label: "New 2DS XL" },
  { value: "new-3ds", label: "New 3DS" },
  { value: "new-3ds-xl", label: "New 3DS XL" },
  { value: "super-nintendo-snes", label: "Super Nintendo SNES" },
  { value: "switch", label: "Switch" },
  { value: "switch-oled", label: "Switch Oled" },
  { value: "switch-lite", label: "Switch Lite" },
  { value: "switch-2", label: "Switch 2" },
  { value: "wii", label: "Wii" },
  { value: "wii-u", label: "Wii U" },
  { value: "anbernic", label: "Anbernic" },
  { value: "game-gear", label: "Game Gear" },
  { value: "master-system", label: "Master system" },
  { value: "master-system-2", label: "Master system 2" },
  { value: "megadrive", label: "Megadrive" },
  { value: "megadrive-mini", label: "Megadrive Mini" },
  { value: "saturn", label: "Saturn" },
  { value: "ps5", label: "PS5" },
  { value: "ps5-slim", label: "PS5 Slim" },
  { value: "ps5-pro", label: "PS5 Pro" },
  { value: "ps4", label: "PS4" },
  { value: "ps4-slim", label: "PS4 Slim" },
  { value: "ps4-pro", label: "PS4 Pro" },
  { value: "ps3", label: "PS3" },
  { value: "ps3-slim", label: "PS3 Slim" },
  { value: "ps2", label: "PS2" },
  { value: "ps2-slim", label: "PS2 Slim" },
  { value: "ps1", label: "PS1" },
  { value: "ps-vita", label: "PS VITA" },
  { value: "psp", label: "PSP" },
  { value: "playstation-classic", label: "PlayStation Classic" },
  { value: "autre", label: "Autre" },
];

const jeuxvideoEtatOptions = [
  { value: "neuf", label: "État neuf" },
  { value: "reconditionne", label: "Reconditionné" },
  { value: "tres-bon-etat", label: "Très bon état" },
  { value: "bon-etat", label: "Bon état" },
  { value: "etat-satisfaisant", label: "État satisfaisant" },
  { value: "pour-pieces", label: "Pour pièces" },
];


  // ===================== RENDER =====================
  return (
    <div className="space-y-4">
      {/* Prix */}
      {!excludedFilterNames.includes("price") && (
        <RangeFilter
          label="Prix"
          minValue={draft.priceMin}
          maxValue={draft.priceMax}
          unit="€"
          icon={<AiOutlineEuro />}
          onMinChange={(v) => setFilter("priceMin", v)}
          onMaxChange={(v) => setFilter("priceMax", v)}
        />
      )}



      {/* Plateforme jeux vidéo */}
{!excludedFilterNames.includes("jeuxvideoplatforme") && (
  <CaracteristiquesFilter
    title="Plateforme"
    icon={<TfiAlarmClock className="text-sm" />}
    name="jeuxvideoplatforme"
    options={jeuxvideoPlateformeOptions}
    isValueSelected={isValueSelected}
    handleCheckboxChange={handleCheckboxChange}
  />
)}

{/* État jeux vidéo */}
{!excludedFilterNames.includes("jeuxvideoetat") && (
  <CheckboxGroupCarre
    title="État"
    icon={<TfiAlarmClock className="text-sm" />}
    name="jeuxvideoetat"
    options={jeuxvideoEtatOptions}
    isValueSelected={isValueSelected}
    handleCheckboxChange={handleCheckboxChange}
  />
)}


      {/* Type console (gaming) */}
{!excludedFilterNames.includes("consolestype") && (
  <CheckboxGroupCarre
    title="Type"
    icon={<TfiAlarmClock className="text-sm" />}
    name="consolestype"
    options={consolesTypeOptions}
    isValueSelected={isValueSelected}
    handleCheckboxChange={handleCheckboxChange}
  />
)}
{/* Marque console (gaming) */}
{!excludedFilterNames.includes("consolesmarque") && (
  <CaracteristiquesFilterRound
    title="Marque"
    icon={<TfiAlarmClock className="text-sm" />}
    name="consolesmarque"
    options={consolesMarqueOptions}
    isValueSelected={isValueSelected}
     handleCheckboxChange={handleConsolesMarqueChange}  // ← changement ici

  />
)}

{/* Modèle console (gaming) - dynamique */}
{!excludedFilterNames.includes("consolesmodele") && (
  <div className={isConsolesModeleDisabled ? "opacity-60 pointer-events-none" : ""}>
    <CaracteristiquesFilter
      title="Palteforme"
      icon={<TfiAlarmClock className="text-sm" />}
      name="consolesmodele"
      options={consolesModeleOptions}
      isValueSelected={isValueSelected}
      handleCheckboxChange={handleCheckboxChange}
      disabled={isConsolesModeleDisabled}
    />
    {isConsolesModeleDisabled && (
      <p className="text-xs text-gray-400 mt-1">
        Sélectionnez une marque pour voir les modèles disponibles
      </p>
    )}
  </div>
)}

{/* Couleur consoles*/}
{!excludedFilterNames.includes("consolescouleur") && (
  <CaracteristiquesFilter
    title="Couleur"
    icon={<TfiAlarmClock className="text-sm" />}
    name="consolescouleur"
    options={consolesCouleurOptions}
    isValueSelected={isValueSelected}
    handleCheckboxChange={handleCheckboxChange}
  />
)}

{/* État consoles */}
{!excludedFilterNames.includes("consolesetat") && (
  <CheckboxGroupCarre
    title="État"
    icon={<TfiAlarmClock className="text-sm" />}
    name="consolesetat"
    options={consolesEtatOptions}
    isValueSelected={isValueSelected}
    handleCheckboxChange={handleCheckboxChange}
  />
)}

      {/* Produit accessoires téléphone & objets connectés */}
{!excludedFilterNames.includes("accessoirestelephoneobjetsconnectesproduit") && (
  <CaracteristiquesFilter
    title="Produit"
    icon={<TfiAlarmClock className="text-sm" />}
    name="accessoirestelephoneobjetsconnectesproduit"
    options={accessoirestelephoneobjetsconnectesProduitOptions}
    isValueSelected={isValueSelected}
    handleCheckboxChange={handleCheckboxChange}
  />
)}

{/* Couleur accessoires téléphone & objets connectés */}
{!excludedFilterNames.includes("accessoirestelephoneobjetsconnectescouleur") && (
  <CaracteristiquesFilter
    title="Couleur"
    icon={<TfiAlarmClock className="text-sm" />}
    name="accessoirestelephoneobjetsconnectescouleur"
    options={accessoirestelephoneobjetsconnectesCouleurOptions}
    isValueSelected={isValueSelected}
    handleCheckboxChange={handleCheckboxChange}
  />
)}

{/* État accessoires téléphone & objets connectés */}
{!excludedFilterNames.includes("accessoirestelephoneobjetsconnectesetat") && (
  <CheckboxGroupCarre
    title="État"
    icon={<TfiAlarmClock className="text-sm" />}
    name="accessoirestelephoneobjetsconnectesetat"
    options={accessoirestelephoneobjetsconnectesEtatOptions}
    isValueSelected={isValueSelected}
    handleCheckboxChange={handleCheckboxChange}
  />
)}

      {/* Marque téléphones & objets connectés */}
{!excludedFilterNames.includes("telephonesobjetsconnectesmarque") && (
  <CaracteristiquesFilter
    title="Marque"
    icon={<TfiAlarmClock className="text-sm" />}
    name="telephonesobjetsconnectesmarque"
    options={telephonesobjetsconnectesMarqueOptions}
    isValueSelected={isValueSelected}
     handleCheckboxChange={handleTelephonesMarqueChange}  // ← changement ici
  />
)}

{/* Modèle téléphones & objets connectés (dynamique) */}
{!excludedFilterNames.includes("telephonesobjetsconnectesmodele") && (
  <div className={isModeleDisabled ? "opacity-60 pointer-events-none" : ""}>
    <CaracteristiquesFilter
      title="Modèle"
      icon={<TfiAlarmClock className="text-sm" />}
      name="telephonesobjetsconnectesmodele"
      options={telephonesobjetsconnectesModeleOptions}
      isValueSelected={isValueSelected}
      handleCheckboxChange={handleCheckboxChange}
      disabled={isModeleDisabled}
    />
    {isModeleDisabled && (
      <p className="text-xs text-gray-400 mt-1">
        Sélectionnez une marque pour voir les modèles disponibles
      </p>
    )}
  </div>
)}


{/* Produit téléphones & objets connectés */}
{!excludedFilterNames.includes("telephonesobjetsconnectesproduit") && (
  <CaracteristiquesFilter
    title="Produit"
    icon={<TfiAlarmClock className="text-sm" />}
    name="telephonesobjetsconnectesproduit"
    options={telephonesobjetsconnectesProduitOptions}
    isValueSelected={isValueSelected}
    handleCheckboxChange={handleCheckboxChange}
  />
)}

{/* Capacité de stockage téléphones & objets connectés */}
{!excludedFilterNames.includes("telephonesobjetsconnectescapacitestockage") && (
  <CaracteristiquesFilter
    title="Capacité de stockage"
    icon={<TfiAlarmClock className="text-sm" />}
    name="telephonesobjetsconnectescapacitestockage"
    options={telephonesobjetsconnectesCapaciteStockageOptions}
    isValueSelected={isValueSelected}
    handleCheckboxChange={handleCheckboxChange}
  />
)}

{/* Couleur téléphones & objets connectés */}
{!excludedFilterNames.includes("telephonesobjetsconnectescouleur") && (
  <CaracteristiquesFilter
    title="Couleur"
    icon={<TfiAlarmClock className="text-sm" />}
    name="telephonesobjetsconnectescouleur"
    options={telephonesobjetsconnectesCouleurOptions}
    isValueSelected={isValueSelected}
    handleCheckboxChange={handleCheckboxChange}
  />
)}

{/* État téléphones & objets connectés */}
{!excludedFilterNames.includes("telephonesobjetsconnectesetat") && (
  <CheckboxGroupCarre
    title="État"
    icon={<TfiAlarmClock className="text-sm" />}
    name="telephonesobjetsconnectesetat"
    options={telephonesobjetsconnectesEtatOptions}
    isValueSelected={isValueSelected}
    handleCheckboxChange={handleCheckboxChange}
  />
)}




{/* Produit photo, audio & vidéo */}
{!excludedFilterNames.includes("photoaudiovideoproduit") && (
  <CaracteristiquesFilter
    title="Produit"
    icon={<TfiAlarmClock className="text-sm" />}
    name="photoaudiovideoproduit"
    options={photoaudiovideoproduitOptions}
    isValueSelected={isValueSelected}
    handleCheckboxChange={handleCheckboxChange}
  />
)}


      {/* Marque photo, audio & vidéo */}
{!excludedFilterNames.includes("photoaudiovideomarque") && (
  <CaracteristiquesFilter
    title="Marque"
    icon={<TfiAlarmClock className="text-sm" />}
    name="photoaudiovideomarque"
    options={photoaudiovideoMarqueOptions}
    isValueSelected={isValueSelected}
    handleCheckboxChange={handleCheckboxChange}
  />
)}


{/* Couleur photo, audio & vidéo */}
{!excludedFilterNames.includes("photoaudiovideocouleur") && (
  <CaracteristiquesFilter
    title="Couleur"
    icon={<TfiAlarmClock className="text-sm" />}
    name="photoaudiovideocouleur"
    options={photoaudiovideoCouleurOptions}
    isValueSelected={isValueSelected}
    handleCheckboxChange={handleCheckboxChange}
  />
)}

{/* État photo, audio & vidéo */}
{!excludedFilterNames.includes("photoaudiovideoetat") && (
  <CheckboxGroupCarre
    title="État"
    icon={<TfiAlarmClock className="text-sm" />}
    name="photoaudiovideoetat"
    options={photoaudiovideoEtatOptions}
    isValueSelected={isValueSelected}
    handleCheckboxChange={handleCheckboxChange}
  />
)}

















      {/* Produit tablettes et liseuses */}
{!excludedFilterNames.includes("tablettesliseusesproduit") && (
  <RadioCheckboxGroup
    title="Produit"
    icon={<TfiAlarmClock className="text-sm" />}
    name="tablettesliseusesproduit"
    options={tablettesliseusesproduitOptions}
    isValueSelected={isValueSelected}
    handleCheckboxChange={handleTablettesLiseusesProduitChange}  // ← changement ici
  />
)}


{/* Marque tablettes et liseuses (dynamique) */}
{!excludedFilterNames.includes("tablettesliseusesmarque") && (
  <div
    className={isTablettesLiseusesMarqueDisabled ? "opacity-60 pointer-events-none" : ""}
  >
    <CaracteristiquesFilter
      title="Marque"
      icon={<TfiAlarmClock className="text-sm" />}
      name="tablettesliseusesmarque"
      options={tablettesliseusesmarqueOptions}
      isValueSelected={isValueSelected}
      handleCheckboxChange={handleCheckboxChange}
      disabled={isTablettesLiseusesMarqueDisabled}
    />
    {isTablettesLiseusesMarqueDisabled && (
      <p className="text-xs text-gray-400 mt-1">
        Sélectionnez un produit pour voir les marques disponibles
      </p>
    )}
  </div>
)}

{/* Taille d'écran tablettes et liseuses */}
{!excludedFilterNames.includes("tablettesliseusestailleecran") && (
  <CheckboxGroupCarre
    title="Taille d'écran"
    icon={<PiRuler />}
    name="tablettesliseusestailleecran"
    options={tablettesliseusestailleecranOptions}
    isValueSelected={isValueSelected}
    handleCheckboxChange={handleCheckboxChange}
  />
)}

{/* Capacité de stockage tablettes et liseuses */}
{!excludedFilterNames.includes("tablettesliseusescapacitestockage") && (
  <CaracteristiquesFilter
    title="Capacité de stockage"
    icon={<TfiAlarmClock className="text-sm" />}
    name="tablettesliseusescapacitestockage"
    options={tablettesliseusescapacitestockageOptions}
    isValueSelected={isValueSelected}
    handleCheckboxChange={handleCheckboxChange}
  />
)}

{/* Couleur tablettes et liseuses */}
{!excludedFilterNames.includes("tablettesliseusescouleur") && (
  <CaracteristiquesFilter
    title="Couleur"
    icon={<TfiAlarmClock className="text-sm" />}
    name="tablettesliseusescouleur"
    options={tablettesliseusescouleurOptions}
    isValueSelected={isValueSelected}
    handleCheckboxChange={handleCheckboxChange}
  />
)}

{/* État tablettes et liseuses */}
{!excludedFilterNames.includes("tablettesliseusesetat") && (
  <CheckboxGroupCarre
    title="État"
    icon={<TfiAlarmClock className="text-sm" />}
    name="tablettesliseusesetat"
    options={tablettesliseusesetatOptions}
    isValueSelected={isValueSelected}
    handleCheckboxChange={handleCheckboxChange}
  />
)}


      {/* Marque accessoires informatique */}
      {!excludedFilterNames.includes("accessoiresinformatiquemarque") && (
        <CaracteristiquesFilter
          title="Marque"
          icon={<TfiAlarmClock className="text-sm" />}
          name="accessoiresinformatiquemarque"
          options={accessoiresinformatiquemarqueOptions}
          isValueSelected={isValueSelected}
          handleCheckboxChange={handleCheckboxChange}
        />
      )}

      {/* Produit accessoires informatique */}
{!excludedFilterNames.includes("accessoiresinformatiqueproduit") && (
  <CaracteristiquesFilter
    title="Produit"
    icon={<TfiAlarmClock className="text-sm" />}
    name="accessoiresinformatiqueproduit"
    options={accessoiresinformatiqueproduitOptions}
    isValueSelected={isValueSelected}
    handleCheckboxChange={handleCheckboxChange}
  />
)}

{/* État accessoires informatique */}
{!excludedFilterNames.includes("accessoiresinformatiqueetat") && (
  <CheckboxGroupCarre
    title="État"
    icon={<TfiAlarmClock className="text-sm" />}
    name="accessoiresinformatiqueetat"
    options={accessoiresinformatiqueetatOptions}
    isValueSelected={isValueSelected}
    handleCheckboxChange={handleCheckboxChange}
  />
)}

      {/* Marque ordinateur */}
      {!excludedFilterNames.includes("ordinateurmarque") && (
        <CaracteristiquesFilter
          title="Marque"
          icon={<TfiAlarmClock className="text-sm" />}
          name="ordinateurmarque"
          options={ordinateurmarqueOptions}
          isValueSelected={isValueSelected}
          handleCheckboxChange={handleCheckboxChange}
        />
      )}
      {/* Type ordinateur */}
      {!excludedFilterNames.includes("ordinateurtype") && (
        <RadioCheckboxGroup
          title="Type"
          icon={<TfiAlarmClock className="text-sm" />}
          name="ordinateurtype"
          options={ordinateurtypeOptions}
          isValueSelected={isValueSelected}
          handleCheckboxChange={handleOrdinateurTypeChange}
        />
      )}

      {/* Taille écran */}
      {/* Taille - toujours visible mais désactivée tant qu'aucun univers n'est sélectionné */}
      {!excludedFilterNames.includes("tailleecran") && (
        <div
          className={isTailleDisabled ? "opacity-60 pointer-events-none" : ""}
        >
          <CaracteristiquesFilter
            title="Taille d'écran"
            name="tailleecran"
            icon={<PiRuler />}
            options={tailleecranOptions}
            isValueSelected={isValueSelected}
            handleCheckboxChange={handleCheckboxChange}
            disabled={isTailleDisabled}
          />
          {isTailleDisabled && (
            <p className="text-xs text-gray-400 mt-1">
              Sélectionnez un type d'ordinateur pour voir les tailles
              disponibles
            </p>
          )}
        </div>
      )}

      {/* État général */}
      {!excludedFilterNames.includes("ordinateurgeneraletat") && (
        <CheckboxGroupCarre
          title="État"
          icon={<TfiAlarmClock className="text-sm" />}
          name="ordinateurgeneraletat"
          options={ordinateurGeneralEtatOptions}
          isValueSelected={isValueSelected}
          handleCheckboxChange={handleCheckboxChange}
        />
      )}

      {/* Protection Panne */}
      {!excludedFilterNames.includes("protectionpanne") && (
        <CheckboxGroupCarre
          title="Protection Panne"
          icon={<TfiAlarmClock className="text-sm" />}
          name="protectionpanne"
          options={protectionPanneOptions}
          isValueSelected={isValueSelected}
          handleCheckboxChange={handleCheckboxChange}
        />
      )}

      {/* Statut de l'annonce */}
      {!excludedFilterNames.includes("statutannonce") && (
        <CheckboxGroupCarre
          title="Statut de l'annonce"
          icon={<TfiAlarmClock className="text-sm" />}
          name="statutannonce"
          options={statutAnnonceOptions}
          isValueSelected={isValueSelected}
          handleCheckboxChange={handleCheckboxChange}
        />
      )}
      {/* Tri */}
      {!excludedFilterNames.includes("tri") && (
        <RadioCheckboxGroup
          title="Tri"
          icon={<PiSortAscending className="text-sm" />}
          name="tri"
          options={triOptions}
          isValueSelected={isValueSelected}
          handleCheckboxChange={handleSortChange}
        />
      )}
      {/* Type d'annonces */}
      {!excludedFilterNames.includes("typeannonces") && (
        <RadioCheckboxGroup
          title="Type d’annonces"
          icon={<FcDocument className="text-sm" />}
          name="typeannonces"
          options={typeAnnonceOptions}
          isValueSelected={isValueSelected}
          handleCheckboxChange={handleSortChange}
        />
      )}
      {/* Vendeurs */}
      {!excludedFilterNames.includes("typevendeurs") && (
        <CheckboxGroupCarre
          title="Type de vendeurs"
          icon={<TbUserScreen className="text-sm" />}
          name="typevendeurs"
          options={typeVendeursOptions}
          isValueSelected={isValueSelected}
          handleCheckboxChange={handleCheckboxChange}
        />
      )}
      {/* Annonces urgentes */}
      {!excludedFilterNames.includes("annoncesurgentes") && (
        <CheckboxGroupCarre
          title="Annonces urgentes"
          icon={<TfiAlarmClock className="text-sm" />}
          name="annoncesurgentes"
          options={annoncesUrgentesOptions}
          isValueSelected={isValueSelected}
          handleCheckboxChange={handleCheckboxChange}
        />
      )}
    </div>
  );
}
