import {
  View,
  Text,
  ActivityIndicator,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import useFetch from "@/lib/useFetch";
import { getSingleMenu } from "@/lib/appwrite";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomHeader from "@/components/CustomHeader";
import { images, sides, toppings } from "@/constants";
import MenuOptionItem from "@/components/MenuOptionItem";
import { MenuOptionItemProps } from "@/type";
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
  const { id } = useLocalSearchParams();

  const {
    data: menu,
    loading,
    error,
  } = useFetch({
    fn: () => getSingleMenu(id as string),
  });
  const { items, decreaseQty, increaseQty } = useCartStore();
  const isInCart = items.find((cartItem) => cartItem.id === menu?.$id);

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
    <SafeAreaView className="flex-1 bg-[#fbfbfb] px-5 pt-4">
      <ScrollView>
        <CustomHeader title="" />

        <View className="flex flex-row justify-between items-start mt-4">
          <View className="flex-1 pr-3">
            <Text className="text-2xl font-quicksand-bold text-dark-100 mb-1">
              {menu?.name}
            </Text>
            <Text className="text-[16px] font-quicksand text-[#878787] mb-3">
              Cheseburger
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
              <Text className="font-quicksand-semibold">Whole Wheat</Text>
            </View>
          </View>

          {/* Image */}
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
            The Cheeseburger Wendy Burger is a classic fast food burger that
            packs a punch of flavor in every bite. Made with a juicy beef patty
            cooked to perfection, it topped with melted American cheese, crispy
            lettuce, tomato, & crunchy pickles.
          </Text>
        </View>

        <View className="mb-10">
          <Text className="text-[16px] font-quicksand-bold text-[#000000] mb-3">
            Toppings
          </Text>
          <FlatList
            data={toppings}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.name}
            contentContainerClassName="gap-4"
            renderItem={({ item }) => (
              <MenuOptionItem item={item as unknown as MenuOptionItemProps} />
            )}
          />
        </View>

        <View>
          <Text className="text-[16px] font-quicksand-bold text-[#000000] mb-3">
            Side Options
          </Text>
          <FlatList
            data={sides}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.name}
            contentContainerClassName="gap-4"
            renderItem={({ item }) => (
              <MenuOptionItem item={item as unknown as MenuOptionItemProps} />
            )}
          />
        </View>

        <View>
          <View className="bg-[#fff4e6] flex-row items-center justify-center gap-4 rounded-full self-center">
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

            <Text className="base-bold text-dark-100">
              {isInCart?.quantity}
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
          <View></View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SingleMenu;
