import NavBarConnexion from "@/Components/NavBarConnexion";
import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom"

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  general?: string;
}

type AuthMode = "login" | "register";

const SignUp: React.FC = () => {
  const navigate = useNavigate();

  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true);
  const [hasScrolled, setHasScrolled] = useState<boolean>(false);

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password: string): boolean => {
    if (authMode === "login") return password.length >= 8;

    const hasMinLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    return hasMinLength && hasUpperCase && hasNumber;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors.general) {
      setErrors(prev => ({ ...prev, general: undefined }));
    }

    if (name === "email") {
      setErrors((prev) => ({
        ...prev,
        email: validateEmail(value) ? undefined : "Email invalide",
      }));
    }

    if (name === "password") {
      const isValid = validatePassword(value);
      setErrors((prev) => ({
        ...prev,
        password: isValid
          ? undefined
          : authMode === "login"
          ? "Mot de passe invalide"
          : "Le mot de passe doit contenir 8+ caractères, 1 majuscule et 1 chiffre",
      }));

      if (authMode === "register" && formData.confirmPassword) {
        setPasswordsMatch(value === formData.confirmPassword);
      }
    }

    if (name === "confirmPassword" && authMode === "register") {
      const match = value === formData.password;
      setPasswordsMatch(match);
      setErrors((prev) => ({
        ...prev,
        confirmPassword: match
          ? undefined
          : "Les mots de passe ne correspondent pas",
      }));
    }
  };

// Fonction utilitaire : générer une couleur aléatoire
  const generateRandomColor = (): string => {
  return `#${Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padStart(6, "0")}`;
};

    // Fonction pour créer un profil utilisateur avec typage correct
  const createUserProfile = async (userId: string, username?: string, color_code?: string): Promise<boolean> => {
    try {
      const color = color_code ?? generateRandomColor();
      const { error } = await supabase
        .from('profiles')
        .insert({
          id: userId,
          username: username || null,
          color_code: color, 
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });

      if (error) {
        console.error("Erreur Supabase création profil:", error);
        return false;
      }
      return true;
    } catch (error) {
      console.error("Erreur création profil:", error);
      return false;
    }
  };

 


  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const emailValid = validateEmail(formData.email);
  const passwordValid = validatePassword(formData.password);

  const newErrors: FormErrors = {};

  if (!emailValid) newErrors.email = "Email invalide";
  if (!passwordValid)
    newErrors.password =
      authMode === "login"
        ? "Mot de passe invalide"
        : "Mot de passe trop faible";

  if (authMode === "register") {
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
      setPasswordsMatch(false);
    }
  }

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }

  setIsSubmitting(true);
  setErrors({});

  try {
    // 🔐 LOGIN
    if (authMode === "login") {
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) throw error;

      navigate("/");
    }

    // 🆕 REGISTER
    if (authMode === "register") {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: { username: formData.username || null },
        },
      });

      if (error) throw error;
      if (data.user) {
          await createUserProfile(data.user.id, formData.username);
        }
       // ✅ NOTIFICATION
  alert(
    "Inscription réussie 🎉\nVérifiez votre email pour confirmer votre compte."
  );

  // 🧹 VIDER LES CHAMPS
  setFormData({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  setPasswordsMatch(true);
  setErrors({});


     
    }
  } catch (error: unknown) {
    let message = "Une erreur est survenue";

    if (error instanceof Error) {
      if (error.message.includes("Invalid login credentials"))
        message = "Email ou mot de passe incorrect";
      else if (error.message.includes("User already registered"))
        message = "Un compte existe déjà avec cet email";
      else if (error.message.includes("Password should be"))
        message = "Mot de passe trop court";
      else message = error.message;
    }

    setErrors({ general: message });
  } finally {
    setIsSubmitting(false);
  }
};


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const switchToLogin = () => {
    setAuthMode("login");
    setFormData({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setErrors({});
    setPasswordsMatch(true);
  };

  const switchToRegister = () => {
    setAuthMode("register");
    setFormData({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setErrors({});
    setPasswordsMatch(true);
  };

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Fonction pour réinitialiser le mot de passe avec typage
  const handlePasswordReset = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (!formData.email) {
      alert("Veuillez d'abord saisir votre email");
      return;
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(
        formData.email,
        { 
          redirectTo: `${window.location.origin}/reset-password` 
        }
      );

      if (error) {
        throw new Error(error.message);
      }

      alert("Email de réinitialisation envoyé ! Vérifiez votre boîte mail.");
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert("Erreur: " + error.message);
      } else {
        alert("Une erreur inconnue est survenue");
      }
    }
  };

  return (
    <div className="min-h-screen bg-background-light font-display">
      <NavBarConnexion hasShadow={hasScrolled} />

      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-background-light">
        <div className="w-full max-w-[480px]">
          <div className="text-center mb-8 mt-6">
            <h2 className="text-3xl font-bold tracking-tight text-text-main-light">
              {authMode === "login"
                ? "Content de vous revoir !"
                : "Rejoignez-nous !"}
            </h2>
            <p className="mt-2 text-sm text-text-secondary-light">
              {authMode === "login"
                ? "Connectez-vous pour continuer."
                : "Créez votre compte pour vendre et acheter en toute simplicité."}
            </p>
          </div>

          {errors.general && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center gap-2 text-red-800">
                <span className="material-symbols-outlined">error</span>
                <p className="text-sm font-medium">{errors.general}</p>
              </div>
            </div>
          )}

          <div className="bg-card-light rounded-xl shadow-lg border border-border-light overflow-hidden">
            <div className="grid grid-cols-2 border-b border-border-light">
              <button
                onClick={switchToLogin}
                className={`py-4 text-center text-sm font-bold border-b-2 transition-colors ${
                  authMode === "login"
                    ? "border-primary text-primary bg-primary/5"
                    : "border-transparent text-text-secondary-light hover:text-text-main-light hover:bg-black/5"
                }`}
              >
                Connexion
              </button>
              <button
                onClick={switchToRegister}
                className={`py-4 text-center text-sm font-bold border-b-2 transition-colors ${
                  authMode === "register"
                    ? "border-primary text-primary bg-primary/5"
                    : "border-transparent text-text-secondary-light hover:text-text-main-light hover:bg-black/5"
                }`}
              >
                Inscription
              </button>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                {authMode === "register" && (
                  <div>
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium leading-6 text-text-main-light mb-1.5"
                    >
                      Pseudo (Optionnel)
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        placeholder="Choisissez un pseudo"
                        className="block w-full rounded-lg border-0 py-3 text-text-main-light shadow-sm ring-1 ring-inset ring-border-light placeholder:text-text-secondary-light focus:ring-2 focus:ring-inset focus:ring-primary bg-background-light sm:text-sm sm:leading-6 pl-4 transition-all"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-text-main-light mb-1.5"
                  >
                    Adresse e-mail
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Ex: jean.dupont@email.com"
                      required
                      autoComplete="email"
                      className={`block w-full rounded-lg border-0 py-3 text-text-main-light shadow-sm ring-1 ring-inset placeholder:text-text-secondary-light focus:ring-2 focus:ring-inset bg-background-light sm:text-sm sm:leading-6 pl-4 transition-all ${
                        errors.email
                          ? "ring-red-500 focus:ring-red-500"
                          : "ring-border-light focus:ring-primary"
                      }`}
                    />
                    {errors.email && (
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-red-500">
                        <span className="material-symbols-outlined text-[20px]">
                          error
                        </span>
                      </div>
                    )}
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-600 font-medium flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">
                        warning
                      </span>
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-text-main-light"
                    >
                      Mot de passe
                    </label>
                    {authMode === "login" && (
                      <a
                        href="#"
                        className="text-xs text-primary hover:text-primary-hover font-medium"
                        onClick={handlePasswordReset}
                      >
                        Mot de passe oublié ?
                      </a>
                    )}
                  </div>
                  <div className="relative rounded-lg shadow-sm">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder={
                        authMode === "login"
                          ? "Votre mot de passe"
                          : "8+ caractères"
                      }
                      required
                      autoComplete={
                        authMode === "login"
                          ? "current-password"
                          : "new-password"
                      }
                      className={`block w-full rounded-lg border-0 py-3 text-text-main-light shadow-sm ring-1 ring-inset placeholder:text-text-secondary-light focus:ring-2 focus:ring-inset bg-background-light sm:text-sm sm:leading-6 pl-4 pr-10 transition-all ${
                        errors.password
                          ? "ring-red-500 focus:ring-red-500"
                          : "ring-border-light focus:ring-primary"
                      }`}
                    />
                    <div
                      className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-text-secondary-light hover:text-primary"
                      onClick={togglePasswordVisibility}
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        {showPassword ? "visibility" : "visibility_off"}
                      </span>
                    </div>
                  </div>
                  {errors.password ? (
                    <p className="mt-1 text-xs text-red-600 font-medium flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">
                        warning
                      </span>
                      {errors.password}
                    </p>
                  ) : (
                    authMode === "register" && (
                      <p className="mt-1 text-xs text-text-secondary-light">
                        8 caractères min, 1 majuscule, 1 chiffre.
                      </p>
                    )
                  )}
                </div>

                {authMode === "register" && (
                  <div>
                    <label
                      htmlFor="confirm-password"
                      className="block text-sm font-medium leading-6 text-text-main-light mb-1.5"
                    >
                      Confirmer le mot de passe
                    </label>
                    <div className="relative rounded-lg shadow-sm">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirm-password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="Répétez le mot de passe"
                        required
                        autoComplete="new-password"
                        className={`block w-full rounded-lg border-0 py-3 text-text-main-light shadow-sm ring-1 ring-inset placeholder:text-text-secondary-light focus:ring-2 focus:ring-inset bg-background-light sm:text-sm sm:leading-6 pl-4 pr-10 transition-all ${
                          !passwordsMatch && formData.confirmPassword
                            ? "ring-red-500 focus:ring-red-500"
                            : "ring-border-light focus:ring-primary"
                        }`}
                      />
                      {!passwordsMatch && formData.confirmPassword && (
                        <div className="absolute inset-y-0 right-10 flex items-center pr-3 text-red-500">
                          <span className="material-symbols-outlined text-[20px]">
                            error
                          </span>
                        </div>
                      )}
                      <div
                        className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-text-secondary-light hover:text-primary"
                        onClick={toggleConfirmPasswordVisibility}
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          {showConfirmPassword
                            ? "visibility"
                            : "visibility_off"}
                        </span>
                      </div>
                    </div>
                    {!passwordsMatch && formData.confirmPassword && (
                      <p className="mt-1 text-xs text-red-600 font-medium flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">
                          warning
                        </span>
                        Les mots de passe ne correspondent pas.
                      </p>
                    )}
                  </div>
                )}

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative flex w-full justify-center items-center gap-2 rounded-lg bg-primary px-3 py-4 text-base font-bold text-white shadow-lg hover:bg-primary-hover hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-[0.98]"
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            fill="currentColor"
                          ></path>
                        </svg>
                        {authMode === "login"
                          ? "Connexion en cours..."
                          : "Inscription en cours..."}
                      </>
                    ) : (
                      <>
                        {authMode === "login" ? "Se connecter" : "S'inscrire"}
                        <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform duration-200">
                          arrow_forward
                        </span>
                      </>
                    )}
                  </button>
                </div>
              </form>

              {authMode === "register" && (
                <div className="relative">
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 flex items-center"
                  >
                    <div className="w-full border-t border-border-light"></div>
                  </div>
                </div>
              )}
            </div>

            {authMode === "register" && (
              <div className="px-8 py-4 bg-background-light/50 border-t border-border-light flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-text-secondary-light text-[18px]">
                  lock
                </span>
                <p className="text-xs text-text-secondary-light text-center">
                  Vos données personnelles sont protégées.{" "}
                  <a href="#" className="underline hover:text-primary">
                    En savoir plus
                  </a>
                  .
                </p>
              </div>
            )}
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-text-secondary-light">
              {authMode === "login"
                ? "Pas encore de compte ?"
                : "Déjà un compte ?"}{" "}
              <button
                onClick={
                  authMode === "login" ? switchToRegister : switchToLogin
                }
                className="text-primary font-bold hover:text-primary-hover transition-colors"
              >
                {authMode === "login" ? "Inscrivez-vous" : "Connectez-vous"}
              </button>
            </p>
          </div>
        </div>
      </main>

      <footer className="border-t border-border-light bg-background-light py-8 mt-auto">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-text-secondary-light">
              © 2024 Marketplace. Tous droits réservés.
            </p>
            <div className="flex gap-6">
              <a
                href="#"
                className="text-sm text-text-secondary-light hover:text-primary transition-colors"
              >
                Aide
              </a>
              <a
                href="#"
                className="text-sm text-text-secondary-light hover:text-primary transition-colors"
              >
                Confidentialité
              </a>
              <a
                href="#"
                className="text-sm text-text-secondary-light hover:text-primary transition-colors"
              >
                Conditions
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SignUp;