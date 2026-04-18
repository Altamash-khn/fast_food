import { View, TextInput, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { images } from "@/constants";
import useDebounce from "@/lib/useDebounce";

const SearchBar = () => {
  const params = useLocalSearchParams<{ query?: string }>();
  const [query, setQuery] = useState(params.query || "");

  const debouncedQuery = useDebounce(query, 500);

  function handleSearch(text: string) {
    setQuery(text);
  }

  useEffect(() => {
    if (debouncedQuery) router.setParams({ query: debouncedQuery });
    else router.setParams({ query: "" });
  }, [debouncedQuery]);

  return (
    <View className="searchbar">
      <TextInput
        className="flex-1 p-5"
        placeholder="Search for pizzas, burgers..."
        value={query}
        onChangeText={handleSearch}
        placeholderTextColor="#A0A0A0"
      />
      <Image
        source={images.search}
        className="size-6"
        tintColor="#5d5f6d "
        resizeMode="contain"
      />
    </View>
  );
};

export default SearchBar;
