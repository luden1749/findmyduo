import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { motion } from "framer-motion";
import {
  Trophy,
  TrendingUp,
  Users,
  Star,
  Award,
  Zap,
  Shield,
  Clock,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { startOfWeek, addDays, format, subDays } from "date-fns";
import { fr } from "date-fns/locale";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import Link from "next/link";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔹 Données de démo
  const demoUser = {
    riot_id: "Joueur***",
    full_name: "Utilisateur",
    email: "user@example.com",
    total_xp: 3500,
    teamplay_score: 75,
    current_rank: "Gold II",
    winrate: 58,
    kda: 2.8,
    reliability_score: 82,
    performance_score: 71,
    badges: ["Friendly", "Team Player"],
  };

  const demoMatches = [
    { id: 1, status: "completed", created_date: new Date().toISOString() },
    { id: 2, status: "completed", created_date: new Date(Date.now() - 86400000).toISOString() },
    { id: 3, status: "completed", created_date: new Date(Date.now() - 172800000).toISOString() },
  ];

  const displayUser = user || demoUser;
  const displayMatches = user ? [] : demoMatches;
  const isGuest = !user;

  const level = Math.floor((displayUser.total_xp || 0) / 1000) + 1;
  const xpForNextLevel = level * 1000 - (displayUser.total_xp || 0);
  const completedMatches = displayMatches.length;

  // 🔹 Graphiques de démo
  const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 });
  const currentWeeklyData = Array.from({ length: 7 }, (_, i) => {
    const date = addDays(weekStart, i);
    return {
      day: format(date, "EEE", { locale: fr }),
      matches: i % 2 === 0 ? 2 : 1,
    };
  });

  const currentXpProgressData = Array.from({ length: 7 }, (_, i) => {
    const date = subDays(new Date(), 6 - i);
    return {
      day: format(date, "EEE", { locale: fr }),
      xp: 500 + i * 500,
    };
  });

  const availableBadges = [
    { name: "Friendly", icon: "😊", description: "10 évaluations positives", unlocked: true },
    { name: "Strategist", icon: "🧠", description: "20 matchs + 55% winrate", unlocked: false },
    { name: "Clutch Player", icon: "🔥", description: "KDA > 3.0", unlocked: false },
    { name: "Team Player", icon: "🤝", description: "Score teamplay > 70", unlocked: true },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-900 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
              <p className="text-gray-400">Bienvenue {displayUser.riot_id || displayUser.full_name} !</p>
            </div>
            <Link href="/matchmaking">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Zap className="w-4 h-4 mr-2" />
                Trouver un match
              </Button>
            </Link>
          </div>

          {/* Cartes de stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard title="Niveau" value={level} icon={Trophy} color="yellow" subtitle={`${xpForNextLevel} XP avant le niveau ${level + 1}`} />
            <StatsCard title="Matchs joués" value={completedMatches} icon={Users} color="blue" subtitle="Total de matchs terminés" />
            <StatsCard title="Score Teamplay" value={displayUser.teamplay_score || 50} icon={Shield} color="green" subtitle="Évaluation moyenne" />
            <StatsCard title="XP Total" value={displayUser.total_xp || 0} icon={Star} color="purple" />
          </div>

          {/* Graphiques */}
          <div className="grid lg:grid-cols-2 gap-6">
            <ChartCard title="Activité de la semaine">
              <BarChartComponent data={currentWeeklyData} />
            </ChartCard>
            <ChartCard title="Progression XP">
              <LineChartComponent data={currentXpProgressData} />
            </ChartCard>
          </div>

          {/* Badges */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Award className="w-5 h-5 text-yellow-400" />
                Mes Badges
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {availableBadges.map((badge, index) => (
                  <motion.div
                    key={badge.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 rounded-xl text-center relative ${
                      badge.unlocked
                        ? "bg-gradient-to-br from-yellow-600/20 to-yellow-600/5 border-2 border-yellow-500/50"
                        : "bg-gray-900/50 border-2 border-gray-700 opacity-50"
                    }`}
                  >
                    <div className="text-4xl mb-2">{badge.icon}</div>
                    <div className="font-semibold text-white text-sm">{badge.name}</div>
                    <div className="text-xs text-gray-400 mt-1">{badge.description}</div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}

// 🔹 Composant carte statistique
function StatsCard({ title, value, icon: Icon, color, subtitle }) {
  const colors = {
    yellow: "from-yellow-600/30 to-yellow-600/10 border-yellow-500/30 text-yellow-400",
    blue: "from-blue-600/30 to-blue-600/10 border-blue-500/30 text-blue-400",
    green: "from-green-600/30 to-green-600/10 border-green-500/30 text-green-400",
    purple: "from-purple-600/30 to-purple-600/10 border-purple-500/30 text-purple-400",
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <Card className={`bg-gradient-to-br ${colors[color]} border overflow-hidden`}>
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm text-gray-400 mb-1">{title}</p>
              <h3 className="text-3xl font-bold text-white">{value}</h3>
            </div>
            <div className="p-3 rounded-xl bg-gray-900/30">
              <Icon className={`w-6 h-6 ${colors[color].split(" ")[2]}`} />
            </div>
          </div>
          {subtitle && <p className="text-xs text-gray-400">{subtitle}</p>}
        </CardContent>
      </Card>
    </motion.div>
  );
}

// 🔹 Composant graphique en barres
function BarChartComponent({ data }) {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis dataKey="day" stroke="#9CA3AF" />
        <YAxis stroke="#9CA3AF" />
        <Tooltip contentStyle={{ backgroundColor: "#1F2937", border: "1px solid #374151", borderRadius: "8px" }} labelStyle={{ color: "#F9FAFB" }} />
        <Bar dataKey="matches" fill="#3B82F6" radius={[8, 8, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

// 🔹 Composant graphique en ligne
function LineChartComponent({ data }) {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis dataKey="day" stroke="#9CA3AF" />
        <YAxis stroke="#9CA3AF" />
        <Tooltip contentStyle={{ backgroundColor: "#1F2937", border: "1px solid #374151", borderRadius: "8px" }} labelStyle={{ color: "#F9FAFB" }} />
        <Line type="monotone" dataKey="xp" stroke="#8B5CF6" strokeWidth={3} dot={{ fill: "#8B5CF6", r: 4 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}

// 🔹 Conteneur graphique
function ChartCard({ title, children }) {
  return (
    <Card className="bg-gray-800/50 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
