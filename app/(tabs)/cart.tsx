import CartItem from "@/components/CartItem";
import CustomButton from "@/components/CustomButton";
import CustomHeader from "@/components/CustomHeader";
import EmptyCart from "@/components/EmptyCart";
import { useCartStore } from "@/store/cart.store";
import { CartItemType, PaymentInfoStripeProps } from "@/type";
import React from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Cart() {
  const { items, getTotalItems, getTotalPrice } = useCartStore();

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  return (
    <SafeAreaView className="bg-[#FAFAFA]  h-full">
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
                  label={`Total Items (${totalItems})`}
                  value={`$${totalPrice.toFixed(2)}`}
                />

                <PaymentInfoStripe label={`Delivery Fee`} value={`$5.00`} />
                <PaymentInfoStripe
                  label={`Discount`}
                  value={`-$${(totalPrice * 0.1).toFixed(2)}`}
                  valueStyle="!text-success"
                />

                <View className="border-t border-gray-300 my-2" />

                <PaymentInfoStripe
                  label={`Total`}
                  value={`$${(totalPrice + 5 - totalPrice * 0.1).toFixed(2)}`}
                  labelStyle="base-bold !text-dark-100"
                  valueStyle="base-bold !text-dark-100 !text-right"
                />
              </View>
              <CustomButton title="Order Now" style="mt-5" />
            </View>
          )
        }
        renderItem={({ item }) => (
          <CartItem item={item as unknown as CartItemType} />
        )}
      />
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
