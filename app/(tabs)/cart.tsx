import CartItem from "@/components/CartItem";
import CustomButton from "@/components/CustomButton";
import CustomHeader from "@/components/CustomHeader";
import EmptyCart from "@/components/EmptyCart";
import { useCartStore } from "@/store/cart.store";
import { CartItemType, PaymentInfoStripeProps } from "@/type";
import React, { useRef, useState } from "react";
import { Animated, FlatList, Modal, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Circle, Path, G, Line } from "react-native-svg";
import { router } from "expo-router";

const OrderSuccessIllustration = () => (
  <View className="items-center justify-center my-6">
    <Svg width={160} height={160} viewBox="0 0 160 160">
      <Circle cx="80" cy="80" r="60" stroke="#F97316" strokeWidth="2" strokeDasharray="6 5" fill="none" opacity={0.35} />
      <Circle cx="80" cy="80" r="44" stroke="#F97316" strokeWidth="2.5" fill="none" />
      <Circle cx="80" cy="80" r="32" fill="#F97316" />
      <Path d="M66 80 L76 90 L96 70" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <Circle cx="28" cy="62" r="4" fill="#F97316" opacity={0.8} />
      <Circle cx="132" cy="72" r="5" fill="#F97316" opacity={0.6} />
      <Circle cx="42" cy="110" r="3" fill="#F97316" opacity={0.5} />
      <Circle cx="118" cy="38" r="3" fill="#A855F7" opacity={0.7} />
      <Circle cx="50" cy="38" r="2.5" fill="#A855F7" opacity={0.6} />
      <Circle cx="125" cy="112" r="3.5" fill="#F97316" opacity={0.5} />
      <G stroke="#A855F7" strokeWidth="2" strokeLinecap="round" opacity={0.7}>
        <Line x1="138" y1="55" x2="145" y2="55" />
        <Line x1="141.5" y1="51.5" x2="141.5" y2="58.5" />
      </G>
      <G stroke="#F97316" strokeWidth="2" strokeLinecap="round" opacity={0.6}>
        <Line x1="18" y1="88" x2="25" y2="88" />
        <Line x1="21.5" y1="84.5" x2="21.5" y2="91.5" />
      </G>
      <G stroke="#A855F7" strokeWidth="2" strokeLinecap="round" opacity={0.5}>
        <Line x1="30" y1="130" x2="37" y2="130" />
        <Line x1="33.5" y1="126.5" x2="33.5" y2="133.5" />
      </G>
    </Svg>
  </View>
);

export default function Cart() {
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);

  const [showSuccess, setShowSuccess] = useState(false);
  const translateY = useRef(new Animated.Value(300)).current;

  const selectedItems = items.filter((i) => i.selected);
  const totalItems = selectedItems.reduce((total, item) => total + item.quantity, 0);
  const basePrice = selectedItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const customizationPrice = selectedItems.reduce((total, item) => {
    const customCost = item.customizations?.reduce((s, c) => s + c.price, 0) ?? 0;
    return total + customCost * item.quantity;
  }, 0);
  const totalPrice = basePrice + customizationPrice;

  const handleOrderNow = () => {
    clearCart();
    setShowSuccess(true);
    Animated.timing(translateY, {
      toValue: 0,
      duration: 350,
      useNativeDriver: true,
    }).start();
  };

  return (
    <SafeAreaView className="bg-[#FAFAFA] h-full">
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        contentContainerClassName="pb-28 px-5 pt-5"
        ListHeaderComponent={() => <CustomHeader title="Your Cart" />}
        ListEmptyComponent={() => <EmptyCart />}
        ListFooterComponent={() =>
          totalItems > 0 && (
            <View className="gap-5">
              <View className="mt-6 border border-[#eee] p-5 rounded-2xl">
                <Text className="font-quicksand-bold text-dark-100 mb-5 text-xl">
                  Payment Summary
                </Text>

                <PaymentInfoStripe
                  label={`Items (${totalItems})`}
                  value={`$${basePrice.toFixed(2)}`}
                />

                {customizationPrice > 0 && (
                  <PaymentInfoStripe
                    label="Customizations"
                    value={`+$${customizationPrice.toFixed(2)}`}
                    valueStyle="!text-orange-400"
                  />
                )}

                <PaymentInfoStripe label="Delivery Fee" value="$5.00" />

                <PaymentInfoStripe
                  label="Discount (10%)"
                  value={`-$${(totalPrice * 0.1).toFixed(2)}`}
                  valueStyle="!text-success"
                />

                <View className="border-t border-gray-300 my-2" />

                <PaymentInfoStripe
                  label="Total"
                  value={`$${(totalPrice + 5 - totalPrice * 0.1).toFixed(2)}`}
                  labelStyle="base-bold !text-dark-100"
                  valueStyle="base-bold !text-dark-100 !text-right"
                />
              </View>
              {/* ✅ Now calls handleOrderNow */}
              <CustomButton title="Order Now" style="mt-5" onPress={handleOrderNow} />
            </View>
          )
        }
        renderItem={({ item }) => (
          <CartItem item={item as unknown as CartItemType} />
        )}
      />

      <Modal visible={showSuccess} transparent animationType="fade">
        <View className="flex-1 justify-end mb-10">
          <View className="absolute inset-0 bg-black/80" />

          <Animated.View
            style={{ transform: [{ translateY }] }}
            className="bg-white pt-2 pb-10 px-6 rounded-t-3xl shadow-xl"
          >
            <View className="w-10 h-1 bg-gray-200 rounded-full self-center mb-2" />

            <OrderSuccessIllustration />

            <Text className="text-xl font-bold text-center text-dark-100">
              Order Placed!
            </Text>
            <Text className="text-gray-400 text-center mt-2 text-sm">
              Your order has been placed successfully. We'll get it to you soon!
            </Text>

            <TouchableOpacity
              onPress={() => {
                setShowSuccess(false);
                router.replace("/(tabs)");
              }}
              className="bg-orange-500 mt-6 p-4 rounded-full"
            >
              <Text className="text-white text-center font-bold text-base">
                Back to Home
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const PaymentInfoStripe = ({
  label,
  value,
  labelStyle,
  valueStyle,
}: PaymentInfoStripeProps) => (
  <View className="flex-between flex-row my-2">
    <Text className={`paragraph-medium text-gray-200 ${labelStyle}`}>
      {label}
    </Text>
    <Text className={`paragraph-bold text-dark-100 ${valueStyle}`}>
      {value}
    </Text>
  </View>
);