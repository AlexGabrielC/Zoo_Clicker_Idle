import { useRouter } from 'expo-router';
import React, { useEffect, useState } from "react";
import * as Notifications from 'expo-notifications';

export default function Index() {
    const [isMounted, setIsMounted] = useState(false);
    const router = useRouter();

    useEffect(() => {
        // Marquer le composant comme monté
        setIsMounted(true);

        // Demander la permission pour les notifications
        const requestPermission = async () => {
            const { status } = await Notifications.requestPermissionsAsync();
            if (status !== 'granted') {
                alert('Permission refusée');
            }
        };

        requestPermission();

        // Rediriger vers l'onglet "clicker" après la demande de permission
        if (isMounted) {
            router.push('/clicker');
        }
    }, [router, isMounted]);

    return null;  // Rien à afficher dans l'index
}
