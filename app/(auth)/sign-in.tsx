import { View, Text, Alert } from "react-native";
import React from "react";
import { Link, router } from "expo-router";
import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { signIn } from "@/lib/appwrite";
import { Controller, useForm } from "react-hook-form";
import { useAuthStore } from "../../store/auth.store";

const SignIn = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { fetchAuthenticatedUser } = useAuthStore();

  async function handleSignIn(data: { email: string; password: string }) {
    const cleanedData = {
      email: data.email.trim(),
      password: data.password.trim(),
    };

    try {
      await signIn(cleanedData);
      await fetchAuthenticatedUser();
      router.replace("/");
    } catch (error) {
      Alert.alert("Error", "Failed to sign in. Please check your credentials.");
      console.error("Sign-in error:", error);
    }
  }

  return (
    <View className="gap-10 bg-white rounded-lg p-5 mt-5">
      <Controller
        control={control}
        name="email"
        rules={{
          required: "Email is required",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Enter a valid email",
          },
        }}
        render={({ field }) => {
          return (
            <CustomInput
              placeholder="Enter your email"
              value={field.value}
              onChangeText={field.onChange}
              label="Email"
              keyboardType="email-address"
              error={errors.email?.message!}
            />
          );
        }}
      />

      <Controller
        control={control}
        name="password"
        rules={{ required: "Password is required" }}
        render={({ field }) => {
          return (
            <CustomInput
              placeholder="Enter your password"
              value={field.value}
              onChangeText={field.onChange}
              label="Password"
              secureTextEntry={true}
              error={errors.password?.message!}
            />
          );
        }}
      ></Controller>
      <CustomButton
        title="Sign In"
        isLoading={isSubmitting}
        onPress={handleSubmit(handleSignIn)}
      />

      <View className="flex justify-center mt-5 flex-row gap-2">
        <Text className="base-regular text-gray-100">
          Don&apos;t have an account?{" "}
        </Text>
        <Link href="/sign-up" className="base-bold text-primary">
          Sign up
        </Link>
      </View>
    </View>
  );
};

export default SignIn;
