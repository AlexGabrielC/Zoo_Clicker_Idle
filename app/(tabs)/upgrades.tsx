import { useState, useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { GameContext } from "../../context/GameContext"; // Ajustez le chemin selon votre structure
import React from "react";

interface Upgrade {
    bought: boolean;
    cost: number;
    effect: number;
}

const Upgrades: React.FC = () => {
    const { caca, setCaca, setCacaPerClick, setCacaPerSecond } = useContext(GameContext);
    const [upgrades, setUpgrades] = useState<Record<string, Upgrade>>({
        peanutButter: { bought: false, cost: 10, effect: 1 }, // +1 caca par clic
        miel: { bought: false, cost: 50, effect: 5 }, // +5 caca par clic
        ruche: { bought: false, cost: 100, effect: 10 }, // +10 caca par seconde
        abeilles: { bought: false, cost: 200, effect: 20 }, // +20 caca par seconde
        saumon: { bought: false, cost: 500, effect: 50 }, // +50 caca par clic
        thon: { bought: false, cost: 1000, effect: 100 }, // +100 caca par seconde
        pluieDeCaca: { bought: false, cost: 2000, effect: 200 }, // +200 caca par seconde
        avalancheDeCaca: { bought: false, cost: 5000, effect: 500 }, // +500 caca par clic
        cacaDor: { bought: false, cost: 10000, effect: 1000 }, // +1000 caca par seconde
        cacaArcEnCiel: { bought: false, cost: 15000, effect: 1500 }, // +1500 caca par seconde
        cacaRose: { bought: false, cost: 20000, effect: 2000 }, // +2000 caca par seconde
    });

    const buyUpgrade = (upgradeKey: string) => {
        const upgrade = upgrades[upgradeKey];
        if (caca >= upgrade.cost && !upgrade.bought) {
            setCaca(caca - upgrade.cost); // Dépenser le caca
            setUpgrades({
                ...upgrades,
                [upgradeKey]: { ...upgrade, bought: true },
            });

            // Appliquer l'effet de l'amélioration
            if (
                upgradeKey === "peanutButter" ||
                upgradeKey === "miel" ||
                upgradeKey === "saumon" ||
                upgradeKey === "avalancheDeCaca"
            ) {
                setCacaPerClick((prev: number) => prev + upgrade.effect); // Amélioration par clic
            } else {
                setCacaPerSecond((prev: number) => prev + upgrade.effect); // Amélioration passive
            }
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Améliorations disponibles :</Text>

            {Object.entries(upgrades).map(([key, upgrade]) => (
                <TouchableOpacity
                    key={key}
                    style={[styles.upgradeButton, upgrade.bought && styles.boughtButton]}
                    onPress={() => buyUpgrade(key)}
                    disabled={upgrade.bought || caca < upgrade.cost}
                >
                    <Text style={styles.upgradeText}>
                        {key} - Coût : {upgrade.cost} caca
                    </Text>
                    <Text style={styles.upgradeEffect}>
                        Effet : {upgrade.effect} {key.includes("Clic") ? "par clic" : "par seconde"}
                    </Text>
                    {upgrade.bought && <Text style={styles.boughtText}>Acheté</Text>}
                </TouchableOpacity>
            ))}
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
    boughtText: {
        fontSize: 14,
        color: "green",
        textAlign: "right",
    },
});

export default Upgrades;