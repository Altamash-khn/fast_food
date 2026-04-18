import CustomButton from "@/components/CustomButton";
import CustomHeader from "@/components/CustomHeader";
import { images } from "@/constants";
import { appwriteConfig, logout } from "@/lib/appwrite";
import { useAuthStore } from "@/store/auth.store";
import { UserInfoProps } from "@/type";
import { router } from "expo-router";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
  const { user } = useAuthStore();
  const { setUser, setIsAuthenticated } = useAuthStore();
  const imageUrl = `https://fra.cloud.appwrite.io/v1/storage/buckets/${appwriteConfig.bucketId}/files/${user?.fileId}/view?project=${appwriteConfig.projectId}`;

  return (
    <SafeAreaView className="px-6 my-3">
      <CustomHeader title="Profile" />
      <View>
        <View className="flex items-center mb-4">
          <Image
            source={{ uri: imageUrl }}
            className="w-32 h-32 rounded-full"
          />
        </View>

        <View className="bg-[#f7f7f7] border border-gray-50 px-5 rounded-2xl mb-10">
          <UserInfo value={user?.name!} label="Full Name" image={images.user} />
          <UserInfo
            value={user?.email!}
            label="Email"
            image={images.envelope}
          />
          <UserInfo
            value={`+91 ${user?.contact}`}
            label="Phone number"
            image={images.phone}
          />
        </View>

        <CustomButton
          title="Edit Profile"
          style="bg-[#fff4e6] py-4 border border-[#FE8C00] mb-5"
          textStyle="text-primary"
        />

        <CustomButton
          onPress={async () => {
            await logout();
            setIsAuthenticated(false);
            setUser(null);
            router.replace("/(auth)/sign-in");
          }}
          title="Logout"
          style="bg-[#feecec] py-4 border border-[#F14141] mb-5"
          textStyle="text-[#F14141]"
          icon={images.logout}
        />
      </View>
    </SafeAreaView>
  );
}

const UserInfo = ({ image, label, value }: UserInfoProps) => (
  <View className="flex flex-row items-center my-5 gap-5">
    <View className="flex items-center justify-center h-14 w-14 rounded-full bg-primary/10">
      <Image source={image} className="size-6" />
    </View>

    <View>
      <Text className="text-sm font-quicksand text-gray-200 font-medium">
        {label}
      </Text>
      <Text className="font-quicksand-semibold">{value}</Text>
    </View>
  </View>
);
