import { Stack } from "expo-router";
import "./global.css";
import { useColorScheme, StatusBar } from "react-native";
import { COLORS } from "@/constants/colors";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const barStyle = colorScheme === "dark" ? "light-content" : "dark-content";
  const theme = COLORS.dark;

  return (
    <>
      <StatusBar barStyle={barStyle} />
      <Stack
        screenOptions={{
          headerShown: false,
          headerStyle: { backgroundColor: theme.background },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="control" />
      </Stack>
    </>
  );
}
