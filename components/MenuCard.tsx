import { Text, TouchableOpacity, Image, Platform } from "react-native";
import { MenuItem } from "@/type";
import { useCartStore } from "@/store/cart.store";

const MenuCard = ({ item }: { item: MenuItem }) => {
  const { addItem } = useCartStore();
  const { $id, name, price, image_url: imageUrl } = item;
  return (
    <TouchableOpacity
      className="menu-card"
      style={
        Platform.OS === "android"
          ? { elevation: 10, shadowColor: "#878787" }
          : {
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 5 },
              shadowOpacity: 0.34,
              shadowRadius: 6.27,
            }
      }
    >
      <Image
        source={{ uri: imageUrl }}
        className="size-32 absolute -top-0 "
        resizeMode="contain"
      />
      <Text
        className="text-center base-bold text-dark-100 mb-2 mt-8"
        numberOfLines={1}
      >
        {name}
      </Text>
      <Text className="body-regular text-gray-200 mb-4">From ${price}</Text>
      <TouchableOpacity
        onPress={() => {
          addItem({
            id: $id,
            name,
            price,
            image_url: imageUrl,
            selected: true,
          });
        }}
        className="bg-primary rounded-full py-2 px-4 self-center"
      >
        <Text className=" text-white">Add to Cart +</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};
export default MenuCard;
