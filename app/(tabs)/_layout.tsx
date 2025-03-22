import React from "react";
import { Stack } from "expo-router";
import { FoodProvider } from "../../components/FoodContext"; // Ensure the path is correct

export default function Layout() {
  return (
    <FoodProvider>
      <Stack />
    </FoodProvider>
  );
}
