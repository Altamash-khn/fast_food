import { images } from "@/constants";
import { MenuOptionItemProps } from "@/type";
import { Image, Platform, Text, TouchableOpacity, View } from "react-native";

const MenuOptionItem = ({
  item,
  isSelected,
  onPress,
}: {
  item: MenuOptionItemProps;
  isSelected?: boolean;
  onPress?: () => void;
}) => {
  return (
    <TouchableOpacity
      onPress={onPress} // ✅ IMPORTANT
      className={`rounded-2xl w-[110px] h-[125px] shadow-2xl ${
        isSelected ? "bg-primary" : "bg-[#3C2F2F]"
      }`}
      style={
        Platform.OS === "android"
          ? { elevation: 10, shadowColor: "#878787" }
          : {
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.15,
              shadowRadius: 10,
            }
      }
    >
      {/* Top Image */}
      <View className="bg-white flex items-center justify-center rounded-t-2xl py-4">
        <Image source={item.image} className="size-12" />
      </View>

      {/* Bottom Content */}
      <View className="flex-1 flex-row items-center justify-center gap-2 px-2">
        <Text className="text-sm font-quicksand-semibold text-white">
          {item.name}
        </Text>

        {/* 🔥 SWITCH ICON */}
        {isSelected ? (
          <Text className="text-white text-lg">✓</Text> // ✅ selected
        ) : (
          <Image source={images.add} className="size-4" /> // ➕ default
        )}
      </View>
    </TouchableOpacity>
  );
};

export default MenuOptionItem;
