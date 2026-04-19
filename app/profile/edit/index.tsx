import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomHeader from "@/components/CustomHeader";
import { useForm, Controller } from "react-hook-form";
import { useAuthStore } from "@/store/auth.store";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import { UpdateUserProps, User } from "@/type";
import { updateUser } from "@/lib/appwrite";
import { router } from "expo-router";

const ProfileEdit = () => {
  const { user, setUser } = useAuthStore();

  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      email: user?.email || "",
      name: user?.name || "",
      contact: user?.contact || "",
      password: "",
    },
  });

  const watchedEmail = watch("email");
  const emailChanged = watchedEmail !== user?.email;

  async function onSubmit(data: UpdateUserProps) {
    if (!user) return;

    try {
      const updatedUser = await updateUser(user.$id, {
        ...data,
        currentEmail: user.email,
      });
      setUser(updatedUser as unknown as User);

      router.replace("/(tabs)/profile");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <SafeAreaView className="px-5 my-5">
      <CustomHeader title="Edit Profile" />

      <View className="mt-6 gap-5">
        <Controller
          control={control}
          name="name"
          rules={{ required: "Name is required" }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <CustomInput
              label="Full Name"
              placeholder="Enter your name"
              value={value}
              onChangeText={onChange}
              error={error?.message!}
            />
          )}
        />

        <Controller
          control={control}
          name="email"
          rules={{
            required: "Email is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Invalid email",
            },
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <CustomInput
              label="Email"
              placeholder="Enter your email"
              value={value}
              onChangeText={onChange}
              keyboardType="email-address"
              error={error?.message!}
            />
          )}
        />

        {emailChanged && (
          <Controller
            control={control}
            name="password"
            rules={{
              required: "Password is required to change email",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <CustomInput
                label="Current Password"
                placeholder="Enter password to confirm email change"
                value={value}
                onChangeText={onChange}
                secureTextEntry
                error={error?.message!}
              />
            )}
          />
        )}

        <Controller
          control={control}
          name="contact"
          rules={{
            required: "Phone number is required",
            minLength: {
              value: 10,
              message: "Enter valid number",
            },
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <CustomInput
              label="Phone Number"
              placeholder="Enter your number"
              value={value}
              onChangeText={onChange}
              keyboardType="phone-pad"
              error={error?.message!}
            />
          )}
        />

        <CustomButton
          title="Save Changes"
          onPress={handleSubmit(onSubmit)}
          style="bg-primary py-4 mt-4"
        />
      </View>
    </SafeAreaView>
  );
};

export default ProfileEdit;
