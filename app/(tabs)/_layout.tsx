import { Tabs } from "expo-router";
import { GameProvider } from "../../context/GameContext"; // Ajustez le chemin selon votre structure
import React from "react";

export default function TabLayout() {
    return (
        <GameProvider>
            <Tabs>
                <Tabs.Screen
                    name="idle zoo clicker"
                    options={{ title: "Clicker" }}
                />
                <Tabs.Screen
                    name="quest"
                    options={{ title: "Quest" }}
                />
                <Tabs.Screen
                    name="upgrade"
                    options={{ title: "Améliorations" }}
                />
            </Tabs>
        </GameProvider>
    );
}