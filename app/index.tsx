import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../global.css";

export default function Index() {
  return (
    <SafeAreaView>
      <View className="flex justify-center items-center h-full">
        <Text className="text-blue-500 text-4xl text-center font-quicksand-semibold">
          Edit app/index.tsx to edit this screen.
        </Text>
      </View>
    </SafeAreaView>
  );
}
