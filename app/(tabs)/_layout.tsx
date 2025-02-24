import { Tabs } from "expo-router";
import { GameProvider } from "../../context/GameContext"; // Ajustez le chemin selon votre structure
import React from "react";

export default function TabLayout() {
    return (
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
    );
}

