import { View, Text, Button } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import seed from "@/lib/seed";

export default function Search() {
  return (
    <SafeAreaView>
      <Text>Search</Text>
      <Button title="Seed Data" onPress={() => seed()} />
    </SafeAreaView>
  );
}
