import { useEffect, useState } from "react";

type DeviceType = "smartphone" | "tablet" | "desktop";

export function useDeviceType(): DeviceType {
  const [device, setDevice] = useState<DeviceType>("desktop");

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;

    if (/iphone|ipod|android.*mobile|windows phone/i.test(ua)) {
      setDevice("smartphone");
    } else if (
      (/ipad|tablet|android(?!.*mobile)/i.test(ua) && isTouch) ||
      (window.innerWidth >= 600 && window.innerWidth <= 1024 && isTouch)
    ) {
      // Tablette = tactile + écran intermédiaire
      setDevice("tablet");
    } else {
      setDevice("desktop");
    }

    // Optional: handle resize
    const handleResize = () => {
      const width = window.innerWidth;
      if (isTouch && width >= 600 && width <= 1024) {
        setDevice("tablet");
      } else if (isTouch && width < 600) {
        setDevice("smartphone");
      } else {
        setDevice("desktop");
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return device;
}
