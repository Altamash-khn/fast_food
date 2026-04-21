import {
  View,
  Text,
  ActivityIndicator,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import useFetch from "@/lib/useFetch";
import {
  getCustomizationsByIds,
  getImage,
  getMenuCustomizations,
  getSingleMenu,
} from "@/lib/appwrite";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomHeader from "@/components/CustomHeader";
import { images } from "@/constants";
import MenuOptionItem from "@/components/MenuOptionItem";
import { Feather } from "@expo/vector-icons";
import { useCartStore } from "@/store/cart.store";

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <View className="flex-row items-center gap-1 mb-5">
      {[1, 2, 3, 4, 5].map((star) => (
        <View
          key={star}
          className={`${star <= Math.round(rating) ? "text-orange-400" : "text-gray-200"}`}
        >
          <Image source={images.star} className="size-5" />
        </View>
      ))}
      <Text className="text-[16px] text-gray-500 ml-5">{rating}/5</Text>
    </View>
  );
};

const SingleMenu = () => {
  const [selectedCustomizations, setSelectedCustomizations] = useState<
    string[]
  >([]);
  const hasSeeded = useRef(false); // ✅ ADD THIS
  const { id } = useLocalSearchParams();

  const {
    data: menu,
    loading,
    error,
  } = useFetch({
    fn: () => getSingleMenu(id as string),
  });

  const { items, decreaseQty, increaseQty, addItem, updateCustomizations } =
    useCartStore();
  const isInCart = items.find((cartItem) => cartItem.id === menu?.$id);

  console.log("=== DEBUG ===");
  console.log("menu.$id:", menu?.$id);
  console.log("items in store:", JSON.stringify(items, null, 2));
  console.log("isInCart:", JSON.stringify(isInCart, null, 2));
  console.log("hasSeeded:", hasSeeded.current);
  console.log("selectedCustomizations:", selectedCustomizations);

  useEffect(() => {
    // ✅ Only seed once, and only after menu has loaded
    if (!hasSeeded.current && menu?.$id && isInCart?.customizations?.length) {
      setSelectedCustomizations(isInCart.customizations.map((c) => c.id));
      hasSeeded.current = true; // ✅ never run again for this mount
    }
  }, [menu?.$id, isInCart]);

  const { data: customizations } = useFetch({
    fn: async () => {
      const menuCustomizations = await getMenuCustomizations(id as string);
      const ids = menuCustomizations?.map((item) => item.customizations);
      if (!ids?.length) return [];
      return await getCustomizationsByIds(ids);
    },
  });

  const toppingsData = customizations?.filter(
    (item) => item.type === "topping",
  );
  const sidesData = customizations?.filter((item) => item.type === "side");

  const toggleCustomization = (customizationId: string) => {
    setSelectedCustomizations((prev) => {
      const next = prev.includes(customizationId)
        ? prev.filter((item) => item !== customizationId)
        : [...prev, customizationId];

      // ✅ If already in cart, sync customizations to store immediately
      if (isInCart && menu?.$id) {
        const updatedCustomizations =
          customizations
            ?.filter((c) => next.includes(c.$id))
            .map((c) => ({
              id: c.$id,
              name: c.name,
              price: c.price,
              type: c.type,
            })) ?? [];

        updateCustomizations(menu.$id, updatedCustomizations);
      }

      return next;
    });
  };

  if (loading)
    return (
      <ActivityIndicator
        size="large"
        color="#fb923c"
        className="h-full flex items-center justify-center"
      />
    );

  if (error) return <Text className="text-error">{error}</Text>;

  return (
    <SafeAreaView className="flex-1  bg-white px-5 pt-4">
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        <CustomHeader title="" />

        <View className="flex flex-row justify-between items-start mt-4">
          <View className="flex-1 pr-3">
            <Text className="text-2xl font-quicksand-bold text-dark-100 mb-1">
              {menu?.name}
            </Text>
            <Text className="text-[16px] font-quicksand text-[#878787] mb-3">
              {menu?.subtitle}
            </Text>

            <View className="mb-4">
              <StarRating rating={menu?.rating || 0} />
            </View>

            <View className="flex flex-row mb-6">
              <Text className="text-2xl text-primary font-quicksand-bold">
                $
              </Text>
              <Text className="text-2xl font-quicksand-bold">
                {menu?.price}
              </Text>
            </View>

            <View className="flex flex-row gap-10 mb-6">
              <View>
                <Text className="text-sm text-gray-100 font-quicksand mb-1">
                  Calories
                </Text>
                <Text className="font-quicksand-semibold text-[16px] text-dark-100">
                  {menu?.calories} Cal
                </Text>
              </View>

              <View>
                <Text className="text-sm text-gray-100 font-quicksand mb-1">
                  Protein
                </Text>
                <Text className="font-quicksand-semibold text-[16px] text-dark-100">
                  {menu?.protein}g
                </Text>
              </View>
            </View>

            <View className="mb-3">
              <Text className="text-sm text-gray-100 font-quicksand mb-1">
                Bun Type
              </Text>
              <Text className="font-quicksand-semibold">{menu?.bun_type}</Text>
            </View>
          </View>

          <View className="justify-start">
            <Image
              source={{ uri: menu?.image_url }}
              className="w-[170px] h-[260px]"
              resizeMode="contain"
            />
          </View>
        </View>

        <View className="bg-primary/10 flex flex-row justify-between items-center px-5 py-4 rounded-full mt-6">
          <View className="flex flex-row items-center gap-2">
            <Text className=" text-primary font-extrabold text-lg">$</Text>
            <Text className="text-sm font-quicksand-semibold text-dark-100">
              Free Delivery
            </Text>
          </View>

          <View className="flex flex-row items-center gap-2">
            <Image source={images.clock} className="size-4" />
            <Text className="text-sm font-quicksand-semibold text-dark-100">
              20 - 30 mins
            </Text>
          </View>

          <View className="flex flex-row items-center gap-2">
            <Image source={images.star} className="size-4" />
            <Text className="text-sm font-quicksand-semibold text-dark-100">
              {menu?.rating}
            </Text>
          </View>
        </View>

        <View className="mt-8 mb-14">
          <Text className="font-quicksand text-[16px] text-gray-100 font-medium">
            {menu?.description}
          </Text>
        </View>

        <View className="mb-10">
          <Text className="text-[16px] font-quicksand-bold text-[#000000] mb-3">
            Toppings
          </Text>
          <FlatList
            data={toppingsData}
            horizontal
            keyExtractor={(item) => item.$id}
            contentContainerClassName="gap-4"
            renderItem={({ item }) => (
              <MenuOptionItem
                item={{ name: item.name, image: getImage(item.name) }}
                isSelected={selectedCustomizations.includes(item.$id)}
                onPress={() => toggleCustomization(item.$id)}
              />
            )}
          />
        </View>

        <View className="mb-24">
          <Text className="text-[16px] font-quicksand-bold text-[#000000] mb-3">
            Side Options
          </Text>
          <FlatList
            data={sidesData}
            horizontal
            keyExtractor={(item) => item.$id}
            contentContainerClassName="gap-4"
            renderItem={({ item }) => (
              <MenuOptionItem
                item={{ name: item.name, image: getImage(item.name) }}
                isSelected={selectedCustomizations.includes(item.$id)}
                onPress={() => toggleCustomization(item.$id)}
              />
            )}
          />
        </View>
      </ScrollView>

      <View
        className={`flex-row items-center ${isInCart ? "justify-between" : "justify-center"} bg-white mx-4 mb-5 px-5 py-4 rounded-2xl absolute bottom-5 left-5 right-5`}
        style={
          Platform.OS === "android"
            ? { elevation: 10 }
            : {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 10,
              }
        }
      >
        {isInCart ? (
          <>
            <View className="flex-row items-center gap-4 bg-[#fff4e6] px-4 py-3 rounded-full">
              <TouchableOpacity
                onPress={() =>
                  decreaseQty(
                    menu?.$id!,
                    (isInCart && isInCart.customizations) ?? [],
                  )
                }
                className="w-8 h-8 items-center justify-center rounded-full"
              >
                <Feather name="minus" size={16} color="#FF9C01" />
              </TouchableOpacity>

              <Text className="text-lg font-quicksand-semibold text-dark-100">
                {isInCart?.quantity || 1}
              </Text>

              <TouchableOpacity
                onPress={() =>
                  increaseQty(
                    menu?.$id!,
                    (isInCart && isInCart.customizations) ?? [],
                  )
                }
                className="w-8 h-8 items-center justify-center rounded-full"
              >
                <Image source={images.plus} className="size-4" />
              </TouchableOpacity>
            </View>

            <View className="bg-primary flex-row items-center gap-2 px-6 py-4 rounded-full">
              <Image source={images.bag} className="size-5" tintColor="#fff" />
              <Text className="text-white font-quicksand-semibold">
                Add to cart (${menu?.price})
              </Text>
            </View>
          </>
        ) : (
          <TouchableOpacity
            className="bg-primary flex-row items-center justify-center gap-2 px-6 py-4 rounded-full"
            onPress={() =>
              addItem({
                id: menu?.$id!,
                name: menu?.name!,
                price: menu?.price!,
                image_url: menu?.image_url!,
                selected: true,
                customizations:
                  customizations
                    ?.filter((c) => selectedCustomizations.includes(c.$id))
                    .map((c) => ({
                      id: c.$id,
                      name: c.name,
                      price: c.price,
                      type: c.type,
                    })) ?? [],
              })
            }
          >
            <Image source={images.bag} className="size-5" tintColor="#fff" />
            <Text className="text-white font-quicksand-semibold">
              Add to cart (${menu?.price})
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default SingleMenu;
