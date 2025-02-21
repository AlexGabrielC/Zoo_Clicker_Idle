import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
      <Tabs>
        <Tabs.Screen name="clicker" options={{ title: "Clicker" }} />
        <Tabs.Screen name="quest" options={{ title: "Quest" }} />
        <Tabs.Screen name="upgrade" options={{ title: "Améliorations" }} />
      </Tabs>
  );
}
