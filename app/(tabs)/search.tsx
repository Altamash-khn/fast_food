import { FlatList, Text, View } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import useFetch from "@/lib/useFetch";
import { getCategories, getMenu } from "@/lib/appwrite";
import { useLocalSearchParams } from "expo-router";
import CartButton from "@/components/CartButton";
import MenuCard from "@/components/MenuCard";
import { Category, MenuItem } from "@/type";
import SearchBar from "@/components/SearchBar";
import Filter from "@/components/Filter";

export default function Search() {
  const { category, query } = useLocalSearchParams<{
    category?: string;
    query?: string;
  }>();

  const { data, refetch, loading } = useFetch({
    fn: getMenu,
    params: {
      category: category || "",
      query: query || "",
      limit: 10,
    },
  });

  const { data: categories, loading: categoriesLoading } = useFetch({
    fn: getCategories,
  });

  useEffect(() => {
    refetch({ category: category || "", query: query || "", limit: 10 });
  }, [category, query]);

  return (
    <SafeAreaView className="bg-white h-full">
      <FlatList
        data={data}
        renderItem={({ item, index }) => {
          const isFirstRightColItem = index % 2 === 0;
          return (
            <View
              className={`flex-1 w-[48%] ${!isFirstRightColItem ? "mt-10" : ""}`}
            >
              <MenuCard item={item as unknown as MenuItem} />
            </View>
          );
        }}
        keyExtractor={(item) => item.$id}
        numColumns={2}
        columnWrapperClassName="gap-7"
        contentContainerClassName="gap-7 px-5 pb-32"
        ListHeaderComponent={() => {
          return (
            <View className="my-5 gap-5">
              <View className="justify-between flex-row w-full">
                <View className="flex-start">
                  <Text className="small-bold uppercase text-primary">
                    Search
                  </Text>
                  <View className="flex-start flex-row gap-x-1 mt-0.5">
                    <Text className="paragraph-semibold text-dark-100">
                      Find your favourite food
                    </Text>
                  </View>
                </View>

                <CartButton />
              </View>

              <SearchBar />

              <Filter categories={categories as unknown as Category[]} />
            </View>
          );
        }}
        ListEmptyComponent={() => !loading && <Text>No results found</Text>}
      />
    </SafeAreaView>
  );
}
