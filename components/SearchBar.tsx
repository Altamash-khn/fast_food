import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";

const SearchBar = () => {
  const params = useLocalSearchParams<{ query?: string }>();
  const [query, setQuery] = useState(params.query || "");
  return (
    <View className="searchbar">
      <TextInput
        className="flex-1 p-5"
        placeholder="Search for pizzas, burgers..."
      />
    </View>
  );
};

export default SearchBar;
