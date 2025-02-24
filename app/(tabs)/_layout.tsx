import { Tabs } from "expo-router";
import { GameProvider } from "@/context/GameContext"; // Ajustez le chemin selon votre structure
import { AuthProvider } from '@/context/AuthContext';
import React from "react";

export default function TabLayout() {
    return (
<<<<<<< HEAD
        <AuthProvider>
            <GameProvider>
                <Tabs>
                <Tabs.Screen name="idle zoo clicker" options={{ title: "Clicker" }} />
                <Tabs.Screen name="quest" options={{ title: "Quest" }} />
                <Tabs.Screen name="upgrade" options={{ title: "Améliorations" }} />
                <Tabs.Screen name="timedClicker" options={{ title: "Contre la Montre" }} />
                </Tabs>
            </GameProvider>
        </AuthProvider>
=======
        <GameProvider>
            <Tabs>
                <Tabs.Screen
                    name="Clicker"
                    options={{ title: "Clicker" }}
                />
                <Tabs.Screen
                    name="Quetes"
                    options={{ title: "Quetes" }}
                />
                <Tabs.Screen
                    name="upgrade"
                    options={{ title: "Améliorations" }}
                />
                <Tabs.Screen
                    name="timedClicker"
                    options={{ title: "Contre la Montre" }}
                />
            </Tabs>
        </GameProvider>
>>>>>>> 174bd7b36e53135ae2ad615d02c188265810f291
    );
}

