import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";
import {
  Trophy, Medal, Crown, Target, Shield, TrendingUp, Swords, Zap, Users
} from "lucide-react";
import { motion } from "framer-motion";
import Layout from "../components/Layout"; // ✅ pour garder ton menu + footer

// Joueurs de démonstration si pas encore de données
const demoUsers = [
  {
    email: "demo1@findmyduo.com",
    riot_id: "ShadowStrike",
    current_rank: "Diamond",
    total_xp: 15000,
    teamplay_score: 92,
    reliability_score: 88,
    performance_score: 85,
    tournament_points: 2500,
    team_5v5_rating: 1850,
    arena_rating: 1920,
    duel_1v1_rating: 1780,
    avatar_url: ""
  },
  {
    email: "demo2@findmyduo.com",
    riot_id: "DragonSlayer",
    current_rank: "Platinum",
    total_xp: 12500,
    teamplay_score: 85,
    reliability_score: 90,
    performance_score: 82,
    tournament_points: 2100,
    team_5v5_rating: 1720,
    arena_rating: 1850,
    duel_1v1_rating: 1690,
    avatar_url: ""
  },
];

export default function Leaderboard() {
  const [category, setCategory] = useState("level");

  // ✅ Nouvelle requête vers ton backend Express (plus de base44)
  const { data: realUsers = [], isLoading } = useQuery({
    queryKey: ['leaderboard-users'],
    queryFn: async () => {
      const res = await fetch('http://localhost:5000/users');
      if (!res.ok) throw new Error("Erreur lors du chargement des utilisateurs");
      return await res.json();
    },
  });

  // Utiliser les vrais utilisateurs ou les démos
  const users = realUsers.length > 0 ? realUsers : demoUsers;

  const getSortedUsers = () => {
    const filteredUsers = [...users];
    switch (category) {
      case "level": return filteredUsers.sort((a, b) => (b.total_xp || 0) - (a.total_xp || 0));
      case "teamplay": return filteredUsers.sort((a, b) => (b.teamplay_score || 0) - (a.teamplay_score || 0));
      case "reliability": return filteredUsers.sort((a, b) => (b.reliability_score || 0) - (a.reliability_score || 0));
      case "performance": return filteredUsers.sort((a, b) => (b.performance_score || 0) - (a.performance_score || 0));
      default: return filteredUsers;
    }
  };

  const sortedUsers = getSortedUsers();
  const topThree = sortedUsers.slice(0, 3);
  const rest = sortedUsers.slice(3);

  const getCategoryIcon = () => {
    switch (category) {
      case "level": return Trophy;
      case "teamplay": return Shield;
      case "reliability": return Target;
      case "performance": return TrendingUp;
      default: return Trophy;
    }
  };

  const getCategoryValue = (user) => {
    switch (category) {
      case "level": return Math.floor((user.total_xp || 0) / 1000) + 1;
      case "teamplay": return user.teamplay_score || 0;
      case "reliability": return user.reliability_score || 0;
      case "performance": return user.performance_score || 0;
      default: return 0;
    }
  };

  const getCategoryLabel = () => {
    switch (category) {
      case "level": return "Niveau";
      case "teamplay": return "Teamplay";
      case "reliability": return "Fiabilité";
      case "performance": return "Performance";
      default: return "Score";
    }
  };

  const CategoryIcon = getCategoryIcon();

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-900 p-6">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Classement</h1>
              <p className="text-gray-400">Les meilleurs joueurs de la communauté</p>
            </div>
            <Trophy className="w-12 h-12 text-yellow-400" />
          </div>

          {realUsers.length === 0 && (
            <Card className="bg-blue-600/10 border-blue-500/30">
              <CardContent className="p-4 text-center">
                <p className="text-blue-300 text-sm">
                  📊 Classement de démonstration - Inscrivez-vous pour apparaître dans le vrai classement !
                </p>
              </CardContent>
            </Card>
          )}

          {/* Category Tabs */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-6">
              <Tabs value={category} onValueChange={setCategory}>
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 bg-gray-900/50 gap-1">
                  <TabsTrigger value="level" className="data-[state=active]:bg-yellow-600/20 data-[state=active]:text-yellow-400">
                    <Trophy className="w-4 h-4 mr-2" />
                    Niveau
                  </TabsTrigger>
                  <TabsTrigger value="teamplay" className="data-[state=active]:bg-green-600/20 data-[state=active]:text-green-400">
                    <Shield className="w-4 h-4 mr-2" />
                    Teamplay
                  </TabsTrigger>
                  <TabsTrigger value="reliability" className="data-[state=active]:bg-blue-600/20 data-[state=active]:text-blue-400">
                    <Target className="w-4 h-4 mr-2" />
                    Fiabilité
                  </TabsTrigger>
                  <TabsTrigger value="performance" className="data-[state=active]:bg-purple-600/20 data-[state=active]:text-purple-400">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Performance
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </CardContent>
          </Card>

          {/* Top 3 */}
          <div className="grid md:grid-cols-3 gap-6">
            {topThree.map((user, index) => (
              <PodiumCard
                key={user.email}
                user={user}
                rank={index + 1}
                value={getCategoryValue(user)}
                valueLabel={getCategoryLabel()}
                CategoryIcon={CategoryIcon}
              />
            ))}
          </div>

          {/* Classement complet */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Classement complet</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto" />
                </div>
              ) : (
                <div className="space-y-2">
                  {rest.map((user, index) => (
                    <LeaderboardRow
                      key={user.email}
                      user={user}
                      rank={index + 4}
                      value={getCategoryValue(user)}
                      valueLabel={getCategoryLabel()}
                      CategoryIcon={CategoryIcon}
                    />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}

function PodiumCard({ user, rank, value, valueLabel, CategoryIcon }) {
  const colors = {
    1: "from-yellow-600/40 to-yellow-600/10 border-yellow-500/50",
    2: "from-gray-400/40 to-gray-400/10 border-gray-400/50",
    3: "from-orange-600/40 to-orange-600/10 border-orange-500/50",
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: rank * 0.1 }}>
      <Card className={`bg-gradient-to-br ${colors[rank]} border-2 overflow-hidden`}>
        <CardContent className="p-6 text-center relative">
          <Avatar className="w-24 h-24 mx-auto ring-4 ring-white/20 mb-4">
            <AvatarImage src={user.avatar_url} />
            <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white text-2xl font-bold">
              {user.riot_id?.[0] || "U"}
            </AvatarFallback>
          </Avatar>
          <h3 className="text-xl font-bold text-white mb-1">{user.riot_id}</h3>
          <Badge className="bg-gray-900/30 text-gray-300 border-gray-700 mb-3">
            {user.current_rank || "Unranked"}
          </Badge>
          <div className="p-4 bg-gray-900/30 rounded-lg">
            <CategoryIcon className="w-6 h-6 mx-auto mb-2 text-yellow-400" />
            <div className="text-sm text-gray-400 mb-1">{valueLabel}</div>
            <div className="text-2xl font-bold text-white">{value}</div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function LeaderboardRow({ user, rank, value, valueLabel, CategoryIcon }) {
  return (
    <div className="flex items-center gap-4 p-4 bg-gray-900/50 rounded-lg hover:bg-gray-900/70 transition-all">
      <div className="w-8 text-center font-bold text-gray-400">#{rank}</div>
      <Avatar className="w-12 h-12 ring-2 ring-gray-700">
        <AvatarImage src={user.avatar_url} />
        <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white">
          {user.riot_id?.[0] || "U"}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <h4 className="font-semibold text-white">{user.riot_id}</h4>
        <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/50 mt-1">
          {user.current_rank || "Unranked"}
        </Badge>
      </div>
      <div className="flex flex-col items-end">
        <div className="flex items-center gap-2">
          <CategoryIcon className="w-5 h-5 text-blue-400" />
          <span className="text-xl font-bold text-white">{value}</span>
        </div>
        <span className="text-xs text-gray-400">{valueLabel}</span>
      </div>
    </div>
  );
}
