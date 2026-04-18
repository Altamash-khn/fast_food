import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { CustomButtonProps } from "@/type";

export default function CustomButton({
  onPress,
  title = "Click Me",
  style,
  textStyle,
  isLoading,
  icon,
}: CustomButtonProps) {
  return (
    <TouchableOpacity className={`custom-btn ${style}`} onPress={onPress}>
      <View className="flex-row items-center justify-center gap-2">
        {icon && (
          <Image source={icon} className="size-6" resizeMode="contain" />
        )}

        {isLoading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text
            className={`font-quicksand-bold paragraph-semibold ${
              textStyle || "text-white-100"
            }`}
          >
            {title}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}
