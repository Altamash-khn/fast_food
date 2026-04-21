import { ID } from "react-native-appwrite";
import { appwriteConfig, databases } from "./appwrite";
import dummyData from "./data";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

interface Category {
  name: string;
  description: string;
}

interface Customization {
  name: string;
  price: number;
  type: "topping" | "side" | "size" | "crust" | string;
}

interface MenuItem {
  name: string;
  description: string;
  image_url: string;
  price: number;
  rating: number;
  calories: number;
  protein: number;
  category_name: string;
  subtitle: string;
  bun_type: string;
  customizations: string[];
}

interface DummyData {
  categories: Category[];
  customizations: Customization[];
  menu: MenuItem[];
}

const data = dummyData as DummyData;

// 🔥 clear collections (safe)
async function clearAll(collectionId: string): Promise<void> {
  const list = await databases.listDocuments(
    appwriteConfig.databaseId,
    collectionId,
  );

  for (const doc of list.documents) {
    await databases.deleteDocument(
      appwriteConfig.databaseId,
      collectionId,
      doc.$id,
    );

    await delay(50); // prevent delete spam
  }
}

async function seed(): Promise<void> {
  console.log("🚀 seeding started");

  // ❗ clear ONLY DB (not storage)
  await clearAll(appwriteConfig.categoriesCollectionId);
  await clearAll(appwriteConfig.customizationCollectionId);
  await clearAll(appwriteConfig.menuCollectionId);
  await clearAll(appwriteConfig.menuCustomizationCollectionId);

  // =========================
  // 1️⃣ Categories
  // =========================
  const categoryMap: Record<string, string> = {};

  for (const cat of data.categories) {
    const doc = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.categoriesCollectionId,
      ID.unique(),
      cat,
    );

    categoryMap[cat.name] = doc.$id;

    await delay(150);
  }

  console.log("✅ categories done");

  // =========================
  // 2️⃣ Customizations
  // =========================
  const customizationMap: Record<string, string> = {};

  for (const cus of data.customizations) {
    const doc = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.customizationCollectionId,
      ID.unique(),
      {
        name: cus.name,
        price: cus.price,
        type: cus.type,
      },
    );

    customizationMap[cus.name] = doc.$id;

    await delay(150);
  }

  console.log("✅ customizations done");

  // =========================
  // 3️⃣ Menu + Relations
  // =========================
  for (const item of data.menu) {
    const doc = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.menuCollectionId,
      ID.unique(),
      {
        name: item.name,
        subtitle: item.subtitle,
        bun_type: item.bun_type,
        description: item.description,
        image_url: item.image_url,
        price: item.price,
        rating: item.rating,
        calories: item.calories,
        protein: item.protein,
        categories: categoryMap[item.category_name],
      },
    );

    await delay(200);

    // 🔥 create relations
    for (const cusName of item.customizations) {
      const cusId = customizationMap[cusName];

      if (!cusId) {
        console.warn("⚠️ Missing customization:", cusName);
        continue;
      }

      await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.menuCustomizationCollectionId,
        ID.unique(),
        {
          menu: doc.$id,
          customizations: cusId,
        },
      );

      await delay(80);
    }

    await delay(250);
  }

  console.log("🎉 SEEDING COMPLETE");
}

export default seed;
