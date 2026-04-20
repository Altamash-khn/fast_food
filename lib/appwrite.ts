import {
  CreateUserParams,
  GetMenuParams,
  SignInParams,
  UpdateUserProps,
} from "@/type";
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";
import {
  Account,
  Client,
  Databases,
  ID,
  Query,
  Storage,
} from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
  bucketId: process.env.EXPO_PUBLIC_APPWRITE_BUCKET_ID!,
  platform: "com.ayan.movieapp",
  usersCollectionId: process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!,
  categoriesCollectionId:
    process.env.EXPO_PUBLIC_APPWRITE_CATEGORIES_COLLECTION_ID!,
  menuCollectionId: process.env.EXPO_PUBLIC_APPWRITE_MENU_COLLECTION_ID!,
  customizationCollectionId:
    process.env.EXPO_PUBLIC_APPWRITE_CUSTOMIZATION_COLLECTION_ID!,
  menuCustomizationCollectionId:
    process.env.EXPO_PUBLIC_APPWRITE_MENU_CUSTOMIZATION_COLLECTION_ID!,
  imageStorageBucketId:
    process.env.EXPO_PUBLIC_APPWRITE_IMAGE_STORAGE_BUCKET_ID!,
};

export const client = new Client();
client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

export async function createUser({
  name,
  email,
  password,
  contact,
  fileId,
}: CreateUserParams) {
  try {
    const newAccount = await account.create(ID.unique(), email, password, name);
    if (!newAccount) throw Error;

    await signIn({ email, password });

    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      ID.unique(),
      {
        name,
        email,
        accountId: newAccount.$id,
        contact,
        fileId,
      },
    );

    return newUser;
  } catch (error) {
    throw new Error(error as string);
  }
}

export async function signIn({ email, password }: SignInParams) {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    throw new Error(error as string);
  }
}

export async function logout() {
  try {
    const result = await account.deleteSession("current");
    return result;
  } catch (error) {
    Alert.alert("Failed to logout");
    console.error("error", error);
  }
}

export async function getCurrentUser() {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;

    const result = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      [Query.equal("accountId", currentAccount.$id)],
    );

    if (result.documents.length === 0) throw Error;

    const currentUser = result.documents[0];
    return currentUser;
  } catch (error) {
    throw new Error(error as string);
  }
}

export async function getMenu({ category, query, limit }: GetMenuParams) {
  try {
    const queries: string[] = [];

    if (category) queries.push(Query.equal("categories", category));
    if (query) queries.push(Query.search("name", query));
    if (limit) queries.push(Query.limit(limit));

    const menu = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.menuCollectionId,
      queries,
    );

    return menu.documents;
  } catch (error) {
    throw new Error(error as string);
  }
}

export async function getCategories() {
  try {
    const categories = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.categoriesCollectionId,
    );
    return categories.documents;
  } catch (error) {
    throw new Error(error as string);
  }
}

export async function pickImage() {
  const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (!permission.granted) {
    alert("Permission required!");
    return;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    quality: 0.8,
  });

  if (!result.canceled) {
    return result.assets[0];
  }
}

export async function uploadImage(file: ImagePicker.ImagePickerAsset) {
  try {
    const response = await storage.createFile(
      appwriteConfig.imageStorageBucketId,
      ID.unique(),
      {
        uri: file.uri,
        name: file.fileName || "image.jpg",
        type: file.mimeType || "image/jpeg",
        size: file.fileSize || 0,
      },
    );

    return response.$id;
  } catch (error) {
    console.log("Upload error:", error);
  }
}

export async function updateUser(userId: string, data: UpdateUserProps) {
  try {
    await account.updateName(data.name);
    
    if (data.email !== data.currentEmail && data.password) {
      await account.updateEmail(data.email, data.password);
    }

    const response = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      userId,
      {
        name: data.name,
        email: data.email,
        contact: data.contact,
      },
    );

    return response;
  } catch (error) {
    console.log("Update user error:", error);
    throw error;
  }
}

export async function getSingleMenu(menuId: string) {
  try {
    const menu = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.menuCollectionId,
      [Query.equal("$id", menuId)],
    );
    return menu.documents[0];
  } catch (error) {
    Alert.alert("Failed to fetch menu");
    console.error("error", error);
  }
}