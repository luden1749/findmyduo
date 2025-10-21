"use client";
import React from "react";
import Link from "next/link";
import {
  Home,
  Search,
  Users,
  Trophy,
  LayoutDashboard,
  History,
  Sparkles,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Layout({ children }) {
  const navigationItems = [
    { title: "Accueil", url: "/", icon: Home },
    { title: "Mes Équipes", url: "/teams", icon: Users },
    { title: "Matchmaking", url: "/matchmaking", icon: Search },
    { title: "Tournois", url: "/tournaments", icon: Trophy },
    { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { title: "Historique", url: "/history", icon: History },
    { title: "Leaderboard", url: "/leaderboard", icon: Trophy },
  ];

  return (
    <div className="min-h-screen flex w-full bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900/95 border-r border-gray-800 flex flex-col justify-between p-4 fixed h-full">
        <div>
          <Link href="/" className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-white text-lg">FindMyDuo</h2>
              <p className="text-xs text-gray-400">LoL Matchmaking</p>
            </div>
          </Link>

          <nav className="space-y-2">
            {navigationItems.map(({ title, url, icon: Icon }) => (
              <Link
                key={title}
                href={url}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-blue-600/10 hover:text-blue-400 transition-all"
              >
                <Icon className="w-5 h-5 text-blue-400" />
                <span>{title}</span>
              </Link>
            ))}
          </nav>
        </div>

        <div className="pt-6 border-t border-gray-800">
          <Button
            variant="outline"
            size="sm"
            className="w-full border-gray-700 hover:bg-red-600/10 hover:text-red-400"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Déconnexion
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 ml-64">
        {children}
      </main>
    </div>
  );
}
