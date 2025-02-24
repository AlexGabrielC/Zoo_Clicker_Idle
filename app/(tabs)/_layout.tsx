import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { Tabs } from 'expo-router';
import { GameProvider } from '@/context/GameContext';  // Assurez-vous que ce chemin est correct
import { AuthProvider } from '@/context/AuthContext';  // Assurez-vous que ce chemin est correct
import CustomButton from '@/components/CustomButton';  // Assurez-vous que ce chemin est correct

export default function Layout() {
    return (
        // <AuthProvider>
            <GameProvider>
                <SafeAreaView style={styles.container}>
                    <Tabs>
                        <Tabs.Screen
                            name="clicker"
                            options={{
                                title: 'Clicker',
                                headerShown: false,  // Masque la barre de navigation en haut
                                tabBarStyle: { display: 'none' },  // Masque la navbar en bas
                            }}
                        />
                        <Tabs.Screen
                            name="quetes"
                            options={{
                                title: 'Quêtes',
                                headerShown: false,  // Masque la barre de navigation en haut
                                tabBarStyle: { display: 'none' },  // Masque la navbar en bas
                            }}
                        />
                        <Tabs.Screen
                            name="upgrades"
                            options={{
                                title: 'Améliorations',
                                headerShown: false,  // Masque la barre de navigation en haut
                                tabBarStyle: { display: 'none' },  // Masque la navbar en bas
                            }}
                        />
                        <Tabs.Screen
                            name="TimeClicker"
                            options={{
                                title: 'Contre la Montre',
                                headerShown: false,  // Masque la barre de navigation en haut
                                tabBarStyle: { display: 'none' },  // Masque la navbar en bas
                            }}
                        />
                    </Tabs>

                    {/* Les boutons flottants */}
                    <View style={styles.buttonContainer}>
                        <CustomButton icon={require('@/assets/images/icon.png')} screenName="/clicker" />
                        <CustomButton icon={require('@/assets/icones/quest.png')} screenName="/quetes" />
                        <CustomButton icon={require('@/assets/icones/upgrade.png')} screenName="/upgrades" />
                        <CustomButton icon={require('@/assets/icones/time.png')} screenName="/TimeClicker" />
                    </View>
                </SafeAreaView>
            </GameProvider>
        // </AuthProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,  // Le conteneur prend toute la hauteur de l'écran.
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingBottom: 20,
        backgroundColor: 'transparent',
        zIndex: 1,
    },
});
