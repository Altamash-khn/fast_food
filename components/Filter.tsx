import { View, Text, FlatList, TouchableOpacity, Platform } from "react-native";
import React, { useState } from "react";
import { Category } from "@/type";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { router } from "expo-router";

const Filter = ({ categories }: { categories: Category[] }) => {
  const searchParams = useLocalSearchParams();

  const initialCategory = Array.isArray(searchParams?.category)
    ? searchParams.category[0]
    : searchParams?.category || "all";
  const [active, setActive] = useState<string>(initialCategory);

  function handleCategoryPress(categoryId: string) {
    setActive(categoryId);

    if (categoryId === "all") router.setParams({ category: "" });
    else router.setParams({ category: categoryId });
  }

  const filteredData = categories
    ? [{ $id: "all", name: "All" }, ...categories]
    : [{ $id: "all", name: "All" }];

  return (
    <FlatList
      data={filteredData}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.$id}
      contentContainerClassName="gap-x-3 pb-3"
      renderItem={({ item }) => (
        <TouchableOpacity
          key={item.$id}
          className={`filter ${active === item.$id ? "bg-amber-500" : "bg-white"}`}
          style={
            Platform.OS === "android"
              ? { elevation: 5, shadowColor: "#878787" }
              : {}
          }
          onPress={() => handleCategoryPress(item.$id)}
        >
          <Text
            className={`body-medium ${active === item.$id ? "text-white" : "text-gray-200"}`}
          >
            {item.name}
          </Text>
        </TouchableOpacity>
      )}
    />
  );
};

export default Filter;
