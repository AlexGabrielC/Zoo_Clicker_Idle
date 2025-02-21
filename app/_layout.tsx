import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
      <Tabs>
        <Tabs.Screen name="clicker" options={{ title: "Clicker" }} />
        <Tabs.Screen name="shop" options={{ title: "Boutique" }} />
        <Tabs.Screen name="upgrades" options={{ title: "Améliorations" }} />
      </Tabs>
  );
}
