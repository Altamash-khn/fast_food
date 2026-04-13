import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { CustomButtonProps } from "@/type";

export default function CustomButton({
  onPress,
  title = "Click Me",
  style,
  textStyle,
  leftIcon,
  isLoading,
}: CustomButtonProps) {
  return (
    <TouchableOpacity className={`custom-btn ${style}`} onPress={onPress}>
      {leftIcon}
      <View className="flex-center flex-row">
        {isLoading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text className={`text-white-100 paragraph-semibold ${textStyle}`}>
            {title}{" "}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}
