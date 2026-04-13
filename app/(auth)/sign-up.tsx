import { View, Text, Alert } from "react-native";
import React, { useState } from "react";
import { Link, router } from "expo-router";
import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { createUser } from "@/lib/appwrite";

const SignUp = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  async function handleSignUp() {
    setIsSubmitting(true);

    try {
      await createUser(formData);
      router.replace("/");
    } catch (error) {
      Alert.alert("Error", "Failed to sign up. Please check your credentials.");
      console.error("Sign-up error:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <View className="gap-10 bg-white rounded-lg p-5 mt-5">
      <CustomInput
        placeholder="Enter your full name"
        value={formData.name}
        onChangeText={(text) => setFormData({ ...formData, name: text })}
        label="Full Name"
      />

      <CustomInput
        placeholder="Enter your email"
        value={formData.email}
        onChangeText={(text) => setFormData({ ...formData, email: text })}
        label="Email"
        keyboardType="email-address"
      />

      <CustomInput
        placeholder="Enter your password"
        value={formData.password}
        onChangeText={(text) => setFormData({ ...formData, password: text })}
        label="Password"
        secureTextEntry={true}
      />
      <CustomButton
        title="Sign Up"
        isLoading={isSubmitting}
        onPress={handleSignUp}
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
