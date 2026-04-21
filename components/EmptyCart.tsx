import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import React from "react";
import { Text, View, Image } from "react-native";

const EmptyCart = () => (
  <View className="flex-1 items-center justify-center px-8 mt-16">
    <View className="relative mb-8">
      <View className="w-48 h-48 rounded-full bg-orange-50 items-center justify-center">
        <View className="w-36 h-36 rounded-full bg-orange-100 items-center justify-center">
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/2038/2038854.png",
            }}
            className="w-24 h-24"
            resizeMode="contain"
          />
        </View>
      </View>

      <View className="absolute top-3 right-3 w-4 h-4 rounded-full bg-orange-400" />
      <View className="absolute top-12 right-[-8px] w-3 h-3 rounded-full bg-orange-300" />
      <View className="absolute bottom-6 left-0 w-3 h-3 rounded-full bg-orange-400" />
      <View className="absolute bottom-2 right-12 w-2 h-2 rounded-full bg-orange-200" />
    </View>

    <Text className="font-quicksand-bold text-dark-100 text-2xl text-center mb-2">
      Your cart is empty
    </Text>
    <Text className="text-gray-400 text-center text-sm leading-5 mb-8">
      Looks like you haven&apos;t added{"\n"}anything to your cart yet.
    </Text>

    <CustomButton
      title="Browse Menu"
      style="w-full"
      onPress={() => router.push("/search")}
    />
  </View>
);

export default EmptyCart;
