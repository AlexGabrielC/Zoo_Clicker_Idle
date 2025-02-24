import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { ImageSourcePropType } from 'react-native';

interface CustomButtonProps {
    icon: ImageSourcePropType;  // Utilisation d'un type plus précis pour l'icône
    screenName: '/clicker' | '/quetes' | '/upgrades' | '/TimeClicker';  // Types de chemins précis
}

const CustomButton: React.FC<CustomButtonProps> = ({ icon, screenName }) => {
    const router = useRouter();  // Accès au router

    const handlePress = () => {
        router.push(screenName);  // Pousse l'écran spécifié
    };

    return (
        <TouchableOpacity onPress={handlePress} style={styles.button}>
            <Image source={icon} style={styles.icon} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(79,43,16,0.5)', // Couleur de fond du bouton
        padding: 10,
        margin: 10,
        borderRadius: 20,
        borderColor: '#482b14',
        borderWidth: 3,
    },
    icon: {
        width: 60,   // Ajustez la taille de l'icône PNG
        height: 60,  // Ajustez la taille de l'icône PNG
    },
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',  // Alignement horizontal
        justifyContent: 'space-around',  // Espacement égal entre les boutons
        paddingBottom: 20,  // Espacement en bas
        backgroundColor: 'transparent',
    },
});

export default CustomButton;
