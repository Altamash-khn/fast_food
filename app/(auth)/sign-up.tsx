import { View, Text, Alert, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Link, router } from "expo-router";
import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { createUser, pickImage, uploadImage } from "@/lib/appwrite";
import { Controller, useForm } from "react-hook-form";
import { useAuthStore } from "../../store/auth.store";
import { CreateUserParams } from "@/type";
import * as ImagePicker from "expo-image-picker";

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
      contact: "",
    },
  });

  const [imageUri, setImageUri] = useState("");
  const [selectedFile, setSelectedFile] =
    useState<ImagePicker.ImagePickerAsset | null>(null);
  const { fetchAuthenticatedUser } = useAuthStore();

  async function handleSignUp(data: CreateUserParams) {
    try {
      if (!selectedFile) {
        Alert.alert("Please select an image");
        return;
      }

      const uploadedFileId = (await uploadImage(selectedFile)) || "";

      if (!uploadedFileId) {
        Alert.alert("Image upload failed");
        return;
      }

      const cleanedData = {
        name: data.name.trim(),
        email: data.email.trim(),
        password: data.password.trim(),
        contact: data.contact.trim(),
        fileId: uploadedFileId,
      };

      await createUser(cleanedData);
      await fetchAuthenticatedUser();

      router.replace("/(tabs)");
    } catch (error) {
      Alert.alert("Error", "Failed to sign up...");
      console.error("Sign-up error:", error);
    }
  }

  async function handlePickImage() {
    const file = await pickImage();
    if (!file) return;

    setImageUri(file.uri);
    setSelectedFile(file);
  }

  return (
    <View className="gap-10 bg-white rounded-lg p-5 mt-5">
      <Controller
        control={control}
        name="name"
        rules={{ required: "Name is required" }}
        render={({ field: { value, onChange } }) => (
          <CustomInput
            placeholder="Enter your full name"
            value={value}
            onChangeText={onChange}
            label="Full Name"
            error={errors.name?.message!}
          />
        )}
      />

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
        render={({ field: { value, onChange } }) => (
          <CustomInput
            placeholder="Enter your email"
            value={value}
            onChangeText={onChange}
            label="Email"
            keyboardType="email-address"
            error={errors.email?.message!}
          />
        )}
      />

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
        render={({ field: { value, onChange } }) => (
          <CustomInput
            placeholder="Enter your password"
            value={value}
            onChangeText={onChange}
            label="Password"
            secureTextEntry
            error={errors.password?.message!}
          />
        )}
      />

      <Controller
        control={control}
        name="contact"
        rules={{
          required: "Contact is required",
          minLength: {
            value: 10,
            message: "Enter valid number",
          },
        }}
        render={({ field: { value, onChange } }) => (
          <CustomInput
            placeholder="Enter your contact number"
            value={value}
            onChangeText={onChange}
            label="Contact"
            keyboardType="phone-pad"
            error={errors.contact?.message!}
          />
        )}
      />

      <TouchableOpacity
        onPress={handlePickImage}
        className="border-2 border-dashed border-gray-300 rounded-xl p-6 items-center justify-center gap-2"
      >
        <Text>Select Profile Image</Text>
      </TouchableOpacity>

      {imageUri ? (
        <Image
          source={{ uri: imageUri }}
          style={{ width: 100, height: 100, marginTop: 10 }}
        />
      ) : null}

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
