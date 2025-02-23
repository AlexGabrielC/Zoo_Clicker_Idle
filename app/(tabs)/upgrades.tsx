import React, { useState, useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { GameContext } from "@/context/GameContext"; 

interface Upgrade {
    name: string;
    baseCost: number;
    costMultiplier: number;
    baseEffect: number;
    effectMultiplier: number;
    count: number;
    type: "click" | "passive"; // Type d'amélioration
}

const Upgrades: React.FC = () => {
    const { caca, setCaca, setCacaPerClick, setCacaPerSecond } = useContext(GameContext);

    // Liste des améliorations
    const [upgrades, setUpgrades] = useState<Upgrade[]>([
        { name: "Peanut Butter", baseCost: 10, costMultiplier: 1.15, baseEffect: 1, effectMultiplier: 1.1, count: 0, type: "click" },
        { name: "Miel", baseCost: 50, costMultiplier: 1.15, baseEffect: 5, effectMultiplier: 1.1, count: 0, type: "click" },
        { name: "Ruche", baseCost: 100, costMultiplier: 1.15, baseEffect: 10, effectMultiplier: 1.1, count: 0, type: "passive" },
        { name: "Abeilles", baseCost: 200, costMultiplier: 1.15, baseEffect: 20, effectMultiplier: 1.1, count: 0, type: "passive" },
        { name: "Saumon", baseCost: 500, costMultiplier: 1.15, baseEffect: 50, effectMultiplier: 1.1, count: 0, type: "click" },
        { name: "Thon", baseCost: 1000, costMultiplier: 1.15, baseEffect: 100, effectMultiplier: 1.1, count: 0, type: "passive" },
        { name: "Pluie de caca", baseCost: 2000, costMultiplier: 1.15, baseEffect: 200, effectMultiplier: 1.1, count: 0, type: "click" },
        { name: "Avalanche de caca", baseCost: 4000, costMultiplier: 1.15, baseEffect: 400, effectMultiplier: 1.1, count: 0, type: "passive" },
        { name: "Caca d’or", baseCost: 8000, costMultiplier: 1.15, baseEffect: 800, effectMultiplier: 1.1, count: 0, type: "click" },
        { name: "Caca arc en ciel", baseCost: 16000, costMultiplier: 1.15, baseEffect: 1600, effectMultiplier: 1.1, count: 0, type: "passive" },
    ]);

    // Fonction pour acheter une amélioration
    const buyUpgrade = (upgrade: Upgrade) => {
        const cost = Math.floor(upgrade.baseCost * Math.pow(upgrade.costMultiplier, upgrade.count));
        if (caca >= cost) {
            setCaca(caca - cost); // Dépenser le caca

            // Mettre à jour le nombre d'achats
            const updatedUpgrades = upgrades.map((u) =>
                u.name === upgrade.name ? { ...u, count: u.count + 1 } : u
            );
            setUpgrades(updatedUpgrades);

            // Appliquer l'effet de l'amélioration
            const effect = Math.floor(upgrade.baseEffect * Math.pow(upgrade.effectMultiplier, upgrade.count));
            if (upgrade.type === "click") {
                setCacaPerClick((prev: number) => prev + effect); // Amélioration par clic
            } else {
                setCacaPerSecond((prev: number) => prev + effect); // Amélioration passive
            }
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Améliorations disponibles :</Text>

            {upgrades.map((upgrade) => {
                const cost = Math.floor(upgrade.baseCost * Math.pow(upgrade.costMultiplier, upgrade.count));
                const effect = Math.floor(upgrade.baseEffect * Math.pow(upgrade.effectMultiplier, upgrade.count));

                return (
                    <TouchableOpacity
                        key={upgrade.name}
                        style={[styles.upgradeButton, upgrade.count > 0 && styles.boughtButton]}
                        onPress={() => buyUpgrade(upgrade)}
                        disabled={caca < cost}
                    >
                        <Text style={styles.upgradeText}>
                            {upgrade.name} (Niveau {upgrade.count + 1})
                        </Text>
                        <Text style={styles.upgradeText}>Coût : {cost} caca</Text>
                        <Text style={styles.upgradeEffect}>
                            Effet : +{effect} {upgrade.type === "click" ? "par clic" : "par seconde"}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    upgradeButton: {
        backgroundColor: "#ddd",
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    boughtButton: {
        backgroundColor: "#a0a0a0",
    },
    upgradeText: {
        fontSize: 16,
    },
    upgradeEffect: {
        fontSize: 14,
        color: "#555",
    },
});

export default Upgrades;
