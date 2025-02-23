import { Redirect } from "expo-router";
import React, {useEffect} from "react";
import * as Notifications from 'expo-notifications';


export default function Index() {
    useEffect(() => {
        // Demander la permission pour les notifications
        const requestPermission = async () => {
            const { status } = await Notifications.requestPermissionsAsync();
            if (status !== 'granted') {
                alert('Permission refusée');
            }
        };

        requestPermission();
    }, []);

    return <Redirect href="/clicker" />;
}
