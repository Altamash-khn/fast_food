import { View, Text, Alert } from "react-native";
import React, { useState } from "react";
import { Link, router } from "expo-router";
import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { createUser } from "@/lib/appwrite";
import { Controller, useForm } from "react-hook-form";

const SignUp = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function handleSignUp(data: {
    name: string;
    email: string;
    password: string;
  }) {
    const cleanedData = {
      name: data.name.trim(),
      email: data.email.trim(),
      password: data.password.trim(),
    };

    try {
      await createUser(cleanedData);

      router.replace("/");
    } catch (error) {
      Alert.alert("Error", "Failed to sign up...");
      console.error("Sign-up error:", error);
    }
  }
  return (
    <View className="gap-10 bg-white rounded-lg p-5 mt-5">
      <Controller
        control={control}
        name="name"
        rules={{ required: "Name is required" }}
        render={({ field: { value, onChange } }) => {
          return (
            <CustomInput
              placeholder="Enter your full name"
              value={value}
              onChangeText={onChange}
              label="Full Name"
              error={errors.name?.message!}
            />
          );
        }}
      ></Controller>
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
        render={({ field: { value, onChange } }) => {
          return (
            <CustomInput
              placeholder="Enter your email"
              value={value}
              onChangeText={onChange}
              label="Email"
              keyboardType="email-address"
              error={errors.email?.message!}
            />
          );
        }}
      ></Controller>

      <Controller
        control={control}
        name="password"
        rules={{
          required: "Password is required",
          minLength: {
            value: 6,
            message: "Password must be at least 6 characters",
          },
        }}
        render={({ field: { value, onChange } }) => {
          return (
            <CustomInput
              placeholder="Enter your password"
              value={value}
              onChangeText={onChange}
              label="Password"
              secureTextEntry={true}
              error={errors.password?.message!}
            />
          );
        }}
      ></Controller>

      <CustomButton
        title="Sign Up"
        onPress={handleSubmit(handleSignUp)}
        isLoading={isSubmitting}
      />

      <View className="flex justify-center mt-5 flex-row gap-2">
        <Text className="base-regular text-gray-100">
          Already have an account?{" "}
        </Text>
        <Link href="/sign-in" className="base-bold text-primary">
          Sign in
        </Link>
      </View>
    </View>
  );
};

export default SignUp;
