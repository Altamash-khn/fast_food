import { Text, TouchableOpacity, Image, Platform, View } from "react-native";
import { MenuItem } from "@/type";
import { useCartStore } from "@/store/cart.store";
import { images } from "@/constants";
import { Feather } from "@expo/vector-icons";

const MenuCard = ({ item }: { item: MenuItem }) => {
  const { addItem, increaseQty, decreaseQty } = useCartStore();
  const { $id, name, price, image_url: imageUrl } = item;

  const items = useCartStore((state) => state.items);

  const isInCart = items.find((cartItem) => cartItem.id === $id);

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
        className={`${isInCart ? "bg-[#fff4e6]" : "bg-primary"} w-36 h-11 rounded-full self-center justify-center items-center
`}
      >
        <View>
          {isInCart ? (
            <View className="bg-[#fff4e6] flex-row items-center justify-center gap-4 rounded-full self-center">
              <TouchableOpacity
                onPress={() => decreaseQty($id, isInCart.customizations ?? [])}
                className="w-8 h-8 items-center justify-center rounded-full"
              >
                  <Feather name="minus" size={16} color="#FF9C01" />
              </TouchableOpacity>

              <Text className="base-bold text-dark-100">
                {isInCart.quantity}
              </Text>

              <TouchableOpacity
                onPress={() => increaseQty($id, isInCart.customizations ?? [])}
                className="w-8 h-8 items-center justify-center rounded-full"
              >
                <Image
                  source={images.plus}
                  className="size-4"
                />
              </TouchableOpacity>
            </View>
          ) : (
            <Text className="text-white">Add to Cart +</Text>
          )}
        </View>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};
export default MenuCard;
