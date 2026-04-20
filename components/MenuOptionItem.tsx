import { images } from "@/constants";
import { View, ImageSourcePropType, Text, Image, Platform } from "react-native";

const MenuOptionItem = ({
  item,
}: {
  item: { name: string; image: ImageSourcePropType };
}) => {
  return (
    <View
      className="bg-[#3C2F2F] rounded-2xl w-[90px]  shadow-2xl"
      style={
        Platform.OS === "android"
          ? { elevation: 10, shadowColor: "#878787" }
          : {
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.3,
              shadowRadius: 10,
              elevation: 5,
            }
      }
    >
      <View className="bg-white flex items-center justify-center rounded-2xl shadow-xl py-4">
        <Image source={item.image} className="size-12 " />
      </View>
      <View className="flex flex-row items-center justify-center gap-2 py-3 px-2">
        <Text className="text-sm font-quicksand-semibold text-white">
          {item.name}
        </Text>
        <Image source={images.add} className="size-4" resizeMode="contain" />
      </View>
    </View>
  );
};

export default MenuOptionItem;