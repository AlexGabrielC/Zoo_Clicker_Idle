import { Tabs } from "expo-router";
import { GameProvider } from "@/context/GameContext"; // Ajustez le chemin selon votre structure
import { AuthProvider } from '@/context/AuthContext';
import React from "react";

export default function TabLayout() {
    return (
        // <AuthProvider>
            <GameProvider>
                <Tabs>
                <Tabs.Screen name="clicker" options={{ title: "Clicker" }} />
                <Tabs.Screen name="quetes" options={{ title: "Quest" }} />
                <Tabs.Screen name="upgrades" options={{ title: "Améliorations" }} />
                <Tabs.Screen name="TimeClicker" options={{ title: "Contre la Montre" }} />
                </Tabs>
            </GameProvider>
        // </AuthProvider>
    );
}

