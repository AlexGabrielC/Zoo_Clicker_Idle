import React, { useState, useContext } from "react";
import {View, Text, TouchableOpacity, StyleSheet, Image, ImageSourcePropType, ImageBackground} from "react-native";
import { GameContext } from "@/context/GameContext";

interface Upgrade {
    name: string;
    baseCost: number;
    costMultiplier: number;
    baseEffect: number;
    effectMultiplier: number;
    count: number;
    type: "click" | "passive"; // Type d'amélioration
    icon: ImageSourcePropType; // Propriété pour l'icône de l'amélioration
}

const Upgrades: React.FC = () => {
    const { caca, setCaca, setCacaPerClick, setCacaPerSecond } = useContext(GameContext);

    // Liste des améliorations avec ajout d'une propriété "icon" pour l'image
    const [upgrades, setUpgrades] = useState<Upgrade[]>([
        { name: "Peanut Butter", baseCost: 10, costMultiplier: 1.15, baseEffect: 1, effectMultiplier: 1.1, count: 0, type: "click", icon: require("@/assets/sprites/peanut_butter.svg") },
        { name: "Miel", baseCost: 50, costMultiplier: 1.15, baseEffect: 5, effectMultiplier: 1.1, count: 0, type: "click", icon: require("@/assets/sprites/honey.svg") },
        { name: "Ruche", baseCost: 100, costMultiplier: 1.15, baseEffect: 10, effectMultiplier: 1.1, count: 0, type: "passive", icon: require("@/assets/sprites/hive.svg") },
        // { name: "Abeilles", baseCost: 200, costMultiplier: 1.15, baseEffect: 20, effectMultiplier: 1.1, count: 0, type: "passive", icon: require("@/assets/sprites/bees.png") },
        { name: "Saumon", baseCost: 500, costMultiplier: 1.15, baseEffect: 50, effectMultiplier: 1.1, count: 0, type: "click", icon: require("@/assets/sprites/salmon.svg") },
        { name: "Thon", baseCost: 1000, costMultiplier: 1.15, baseEffect: 100, effectMultiplier: 1.1, count: 0, type: "passive", icon: require("@/assets/sprites/tuna.svg") },
        { name: "Pluie de caca", baseCost: 2000, costMultiplier: 1.15, baseEffect: 200, effectMultiplier: 1.1, count: 0, type: "click", icon: require("@/assets/sprites/rain_of_caca.svg") },
        { name: "Avalanche de caca", baseCost: 4000, costMultiplier: 1.15, baseEffect: 400, effectMultiplier: 1.1, count: 0, type: "passive", icon: require("@/assets/sprites/avalanche_of_caca.svg") },
        // { name: "Caca d’or", baseCost: 8000, costMultiplier: 1.15, baseEffect: 800, effectMultiplier: 1.1, count: 0, type: "click", icon: require("@/assets/sprites/golden_caca.png") },
        // { name: "Caca arc en ciel", baseCost: 16000, costMultiplier: 1.15, baseEffect: 1600, effectMultiplier: 1.1, count: 0, type: "passive", icon: require("@/assets/sprites/rainbow_caca.png") },
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
        <ImageBackground
            source={require("../../assets/images/fond_up.png")}
            style={styles.containerfd}
            imageStyle={{ resizeMode: 'cover', height: '100%', width: '100%' }}
        >
        <View style={styles.container}>
            <Text style={styles.title}>Nourriture disponibles :</Text>

            {upgrades.map((upgrade) => {
                const cost = Math.floor(upgrade.baseCost * Math.pow(upgrade.costMultiplier, upgrade.count));
                const effect = Math.floor(upgrade.baseEffect * Math.pow(upgrade.effectMultiplier, upgrade.count));
                const isAffordable = caca >= cost && upgrade.count === 0;

                return (
                        <TouchableOpacity
                            key={upgrade.name}
                            style={[
                                styles.upgradeButton,
                                upgrade.count > 0 && styles.boughtButton, // Si l'objet a déjà été acheté
                                isAffordable && styles.affordableButton, // Si l'objet est achetable
                            ]}
                            onPress={() => buyUpgrade(upgrade)}
                            disabled={caca < cost}
                        >
                            <View style={styles.iconWrapper}>
                                <Image source={upgrade.icon} style={styles.icon} />
                            </View>
                            <Text style={styles.upgradeText}> {upgrade.name} (Niveau {upgrade.count}) </Text>
                            <Text style={styles.upgradeText}>Coût : {cost} caca </Text>
                            <Text style={styles.upgradeEffect}>
                                Effet : +{effect} {upgrade.type === "click" ? "par clic " : "par seconde "}
                            </Text>
                        </TouchableOpacity>
                );
            })}
        </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    containerfd: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
    },
    container: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
        color: "#a1e164", // Une couleur naturelle, douce et moderne
        textShadowColor: "#000", // Ombre douce, correspondant au dégradé du fond
        textShadowOffset: { width: 3, height: 3 }, // Décalage pour l'effet de bord
        textShadowRadius: 3, // Rayon de l'ombre pour plus de douceur
        fontFamily: "Arial", // Vous pouvez personnaliser la police ici selon vos préférences
    },
    upgradeButton: {
        backgroundColor: "rgb(168,169,168)",
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
        flexDirection: "row", // Disposition en ligne pour l'image et le texte
        alignItems: "center", // Aligner les éléments verticalement
        borderWidth: 4, // Largeur du cadre
        borderColor: "#000", // Couleur du cadre
    },
    boughtButton: {
        backgroundColor: "#71dca9",
    },
    affordableButton: {
        backgroundColor: "#0a693b", // Fond bleu si l'objet est achetable
    },
    iconWrapper: {
        width: 50, // Largeur du cadre
        height: 50, // Hauteur du cadre
        justifyContent: "center", // Centrer l'icône dans le cadre
        alignItems: "center", // Centrer l'icône dans le cadre
        borderWidth: 4, // Largeur du cadre
        borderColor: "#c98d5f", // Couleur du cadre
        borderRadius: 10, // Bordure arrondie
        marginRight: 10, // Espacement entre l'icône et le texte
    },
    icon: {
        width: 40, // Taille de l'icône à l'intérieur du cadre
        height: 40, // Taille de l'icône à l'intérieur du cadre
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
