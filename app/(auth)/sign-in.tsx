import {
  View,
  Text,
  Alert,
  Animated,
  TouchableOpacity,
  Modal,
} from "react-native"; // add Modal
import React, { useRef, useState } from "react";
import { Link, router } from "expo-router";
import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { signIn } from "@/lib/appwrite";
import { Controller, useForm } from "react-hook-form";
import { useAuthStore } from "../../store/auth.store";
import Svg, { Circle, Path, Line, G } from "react-native-svg";

const SuccessIllustration = () => (
  <View className="items-center justify-center my-6">
    <Svg width={160} height={160} viewBox="0 0 160 160">
      <Circle
        cx="80"
        cy="80"
        r="60"
        stroke="#F97316"
        strokeWidth="2"
        strokeDasharray="6 5"
        fill="none"
        opacity={0.35}
      />
      <Circle
        cx="80"
        cy="80"
        r="44"
        stroke="#F97316"
        strokeWidth="2.5"
        fill="none"
      />
      <Circle cx="80" cy="80" r="32" fill="#F97316" />
      <Path
        d="M66 80 L76 90 L96 70"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
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

const SignIn = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { email: "", password: "" },
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const translateY = useRef(new Animated.Value(300)).current;
  const { fetchAuthenticatedUser } = useAuthStore();

  async function handleSignIn(data: { email: string; password: string }) {
    const cleanedData = {
      email: data.email.trim(),
      password: data.password.trim(),
    };
    try {
      await signIn(cleanedData);
      setShowSuccess(true);
      Animated.timing(translateY, {
        toValue: 0,
        duration: 350,
        useNativeDriver: true,
      }).start();
    } catch (error) {
      Alert.alert("Error", "Failed to sign in. Please check your credentials.");
      console.error("Sign-in error:", error);
    }
  }

  return (
    <View className="flex-1">
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
          render={({ field }) => (
            <CustomInput
              placeholder="Enter your email"
              value={field.value}
              onChangeText={field.onChange}
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
          render={({ field }) => (
            <CustomInput
              placeholder="Enter your password"
              value={field.value}
              onChangeText={field.onChange}
              label="Password"
              secureTextEntry={true}
              error={errors.password?.message!}
            />
          )}
        />
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

      <Modal visible={showSuccess} transparent animationType="fade">
        <View className="flex-1 justify-end">
          <View className="absolute inset-0 bg-black/80" />

          <Animated.View
            style={{ transform: [{ translateY }] }}
            className="bg-white pt-2 pb-10 px-6 rounded-t-3xl shadow-xl"
          >
            <View className="w-10 h-1 bg-gray-200 rounded-full self-center mb-2" />

            <SuccessIllustration />

            <Text className="text-xl font-bold text-center text-dark-100">
              Login Successful
            </Text>
            <Text className="text-gray-400 text-center mt-2 text-sm">
              You&apos;re all set to continue where you left off.
            </Text>

            <TouchableOpacity
              onPress={async () => {
                await fetchAuthenticatedUser();
                router.replace("/(tabs)");
              }}
              className="bg-orange-500 mt-6 p-4 rounded-full"
            >
              <Text className="text-white text-center font-bold text-base">
                Go to Homepage
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
};

export default SignIn;
