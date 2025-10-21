import React from "react";
import Layout from "../components/Layout";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  Users,
  TrendingUp,
  Shield,
  Zap,
  Star,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const stats = [
    { label: "Équipes créées", value: "500+", icon: Users },
    { label: "Matchs joués", value: "2 500+", icon: Zap },
    { label: "Satisfaction", value: "95%", icon: Star },
  ];

  const steps = [
    {
      number: "01",
      title: "Crée ton profil gamer",
      description:
        "Renseigne ton pseudo LoL, ton rang, tes rôles préférés et ton style de jeu",
      icon: Users,
    },
    {
      number: "02",
      title: "Trouve des partenaires compatibles",
      description:
        "Notre IA analyse des milliers de profils pour te proposer les meilleurs matchs",
      icon: Sparkles,
    },
    {
      number: "03",
      title: "Lance une partie équilibrée",
      description:
        "Joue avec des coéquipiers de ton niveau dans un environnement positif",
      icon: TrendingUp,
    },
  ];

  const testimonials = [
    {
      name: "Team Shadow",
      rank: "Platinum",
      text: "Meilleure plateforme pour trouver des équipes adverses de notre niveau ! Matchs toujours équilibrés.",
      rating: 5,
    },
    {
      name: "Team Phoenix",
      rank: "Diamond",
      text: "Super système de matchmaking entre équipes. On trouve facilement des adversaires compétitifs.",
      rating: 5,
    },
    {
      name: "Team Dragons",
      rank: "Gold",
      text: "Parfait pour organiser des scrims et des matchs amicaux. Interface intuitive et communauté sympa !",
      rating: 5,
    },
  ];

  const features = [
    { text: "Matchmaking intelligent basé sur l'IA", icon: Sparkles },
    { text: "Analyse de compatibilité en temps réel", icon: Shield },
    { text: "Système de ranking social", icon: TrendingUp },
    { text: "Rapports de match personnalisés", icon: CheckCircle2 },
  ];

  return (
    <Layout>
      {/* ✅ Tout le contenu de la page d'accueil est affiché à droite du menu */}
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-blue-900/10 to-gray-900">
        {/* --- HERO --- */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-transparent" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1920')] bg-cover bg-center opacity-5" />

          <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center space-y-8"
            >
              <Badge className="bg-blue-600/20 text-blue-400 border-blue-500/50 px-4 py-1 flex items-center justify-center mx-auto w-fit">
                <Sparkles className="w-4 h-4 mr-2" />
                Matchmaking par équipes
              </Badge>

              <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                Formez votre{" "}
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  équipe
                </span>
                <br />
                Défiez vos rivaux.
              </h1>

              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
                Créez ou rejoignez une équipe, trouvez des adversaires de votre
                niveau, et participez à des matchs amicaux sur League of
                Legends.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
                <Link href="/create-team">
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 text-lg shadow-lg shadow-blue-500/30">
                    Créer mon équipe
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/matchmaking">
                  <Button
                    variant="outline"
                    className="border-gray-700 hover:bg-gray-800 text-white px-8 py-6 text-lg"
                  >
                    Trouver un match
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 max-w-4xl mx-auto">
                {stats.map((stat, i) => (
                  <Card
                    key={i}
                    className="bg-gray-800/50 border-gray-700 backdrop-blur-sm hover:bg-gray-800/70 transition-all"
                  >
                    <CardContent className="p-6 text-center">
                      <stat.icon className="w-8 h-8 mx-auto mb-3 text-blue-400" />
                      <div className="text-3xl font-bold text-white mb-1">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-400">
                        {stat.label}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* --- COMMENT ÇA MARCHE --- */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Comment ça marche ?
              </h2>
              <p className="text-xl text-gray-400">
                Trois étapes simples pour commencer à jouer
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {steps.map((step, i) => (
                <Card
                  key={i}
                  className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border-gray-700 hover:border-blue-500/50 transition-all h-full relative overflow-hidden group"
                >
                  <CardContent className="p-8 relative">
                    <div className="text-6xl font-bold text-blue-600/20 mb-4">
                      {step.number}
                    </div>
                    <step.icon className="w-12 h-12 text-blue-400 mb-4" />
                    <h3 className="text-2xl font-bold text-white mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-400">{step.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* --- FONCTIONNALITÉS --- */}
        <section className="py-24 px-6 bg-gradient-to-b from-transparent to-gray-900/50">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-purple-600/20 text-purple-400 border-purple-500/50 mb-4">
                Fonctionnalités
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Pourquoi choisir FindMyDuo ?
              </h2>
              <p className="text-xl text-gray-400 mb-8">
                Des outils puissants pour améliorer votre expérience de jeu et
                grimper dans le classement.
              </p>
              <div className="space-y-4">
                {features.map((f, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center flex-shrink-0">
                      <f.icon className="w-5 h-5 text-blue-400" />
                    </div>
                    <span className="text-lg text-gray-300">{f.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 to-purple-600/30 rounded-3xl blur-3xl" />
              <img
                src="https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800"
                alt="Gaming setup"
                className="relative rounded-3xl shadow-2xl"
              />
            </div>
          </div>
        </section>

        {/* --- TÉMOIGNAGES --- */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Ce que disent les équipes
            </h2>
            <p className="text-xl text-gray-400">
              Rejoignez des centaines d'équipes satisfaites
            </p>
          </div>

          <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <Card
                key={i}
                className="bg-gray-800/50 border-gray-700 backdrop-blur-sm hover:border-yellow-500/50 transition-all h-full"
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(t.rating)].map((_, j) => (
                      <Star
                        key={j}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-6 italic">"{t.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold">
                      {t.name[0]}
                    </div>
                    <div>
                      <div className="font-semibold text-white">{t.name}</div>
                      <div className="text-sm text-gray-400">{t.rank}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* --- CTA FINAL --- */}
        <section className="py-24 px-6">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-br from-blue-600 to-purple-600 border-none shadow-2xl shadow-blue-500/30">
              <CardContent className="p-12 text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Prêt à former votre équipe ?
                </h2>
                <p className="text-xl text-blue-100 mb-8">
                  Créez votre équipe, invitez vos coéquipiers, et défiez d'autres
                  équipes dès maintenant !
                </p>
                <Link href="/create-team">
                  <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-6 text-lg font-semibold">
                    Commencer maintenant
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </Layout>
  );
}
