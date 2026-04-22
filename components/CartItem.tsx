import { useCartStore } from "@/store/cart.store";
import { CartItemType } from "@/type";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { images } from "@/constants";
import { router } from "expo-router";

const CartItem = ({ item }: { item: CartItemType }) => {
  const {
    increaseQty,
    decreaseQty,
    removeItem,
    toggleSelection,
    updateCustomizations,
  } = useCartStore();

  const customizationTotal =
    item.customizations?.reduce((s, c) => s + c.price, 0) ?? 0;
  const itemTotal = (item.price + customizationTotal) * item.quantity;

    const removeCustomization = (customizationId: string) => {
    const updated = (item.customizations ?? []).filter(
      (c) => c.id !== customizationId,
    );
    updateCustomizations(item.id, updated);
  };

return (
  <TouchableOpacity className="cart-item shadow-xl" onPress={() => router.push(`/menu/${item?.id}`)}>
    <View className="flex flex-row items-center gap-x-3 flex-1 mr-3">
      <TouchableOpacity
        onPress={() => toggleSelection(item.id, item.customizations!)}
        className="size-5 border border-gray-400 rounded flex-center mt-1"
      >
        {item.selected && (
          <View className="size-3 bg-orange-400 rounded-sm" />
        )}
      </TouchableOpacity>

      <View className="cart-item__image">
        <Image
          source={{ uri: item.image_url }}
          className="size-4/5 rounded-lg"
          resizeMode="cover"
        />
      </View>

      <View className="flex-1">
        <Text className="base-bold text-dark-100">{item.name}</Text>
        <Text className="paragraph-bold text-primary mt-1">
          ${item.price.toFixed(2)}
        </Text>

        {item.customizations && item.customizations.length > 0 && (
          <View className="mt-1 flex gap-1">
            {item.customizations.map((c) => (
              <View key={c.id} className="flex-row items-center gap-x-2 mt-0.5">
                <Text className="text-xs text-gray-400 flex-1">
                  + {c.name} (${c.price.toFixed(2)})
                </Text>
                <TouchableOpacity
                  onPress={() => removeCustomization(c.id)}
                  className="p-1"
                >
                  <Image
                    source={images.trash}
                    className="size-4"
                    resizeMode="contain"
                    tintColor="#FF9C01"
                  />
                </TouchableOpacity>
              </View>
            ))}
            <Text className="text-xs font-quicksand-semibold text-dark-100 mt-1">
              Subtotal: ${itemTotal.toFixed(2)}
            </Text>
          </View>
        )}

        <View className="flex flex-row items-center gap-x-4 mt-5">
          <TouchableOpacity
            onPress={() => decreaseQty(item.id, item.customizations!)}
            className="cart-item__actions"
          >
            <Image
              source={images.minus}
              className="size-1/2"
              resizeMode="contain"
              tintColor={"#FF9C01"}
            />
          </TouchableOpacity>

          <Text className="base-bold text-dark-100">{item.quantity}</Text>

          <TouchableOpacity
            onPress={() => increaseQty(item.id, item.customizations!)}
            className="cart-item__actions"
          >
            <Image
              source={images.plus}
              className="size-5"
              resizeMode="contain"
              tintColor={"#FF9C01"}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>

    <TouchableOpacity
      onPress={() => removeItem(item.id, item.customizations!)}
    >
      <Image source={images.trash} className="size-5" resizeMode="contain" />
    </TouchableOpacity>
  </TouchableOpacity>
);
};

export default CartItem;
