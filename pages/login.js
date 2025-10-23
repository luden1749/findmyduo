import { useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "../lib/supabaseClient";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    // Vérifie si l'utilisateur est déjà connecté
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        router.push("/dashboard"); // ✅ redirige si connecté
      }
    };
    checkUser();
  }, [router]);

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:3000/login", // ✅ redirige vers cette même page après login
      },
    });
    if (error) console.error("Erreur Google OAuth:", error.message);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 via-blue-900/20 to-gray-900">
      <div className="p-10 rounded-2xl bg-gray-800/60 border border-gray-700 shadow-lg text-center">
        <h1 className="text-3xl font-bold text-white mb-6">Connexion</h1>
        <p className="text-gray-400 mb-8">
          Connecte-toi avec ton compte Google pour accéder à ton tableau de bord.
        </p>
        <button
          onClick={handleLogin}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-all"
        >
          Se connecter avec Google
        </button>
      </div>
    </div>
  );
}
