import {
  Client,
  Account,
  Databases,
  Storage,
  ID,
  Query,
} from "react-native-appwrite";
import "react-native-url-polyfill/auto";

// ==========================================
// 1. Appwrite Client Set Up
// ==========================================
const client = new Client();

client
  .setEndpoint("https://fra.cloud.appwrite.io/v1")
  .setProject("6a7485ca00362ca7ddc5");

// ==========================================
// 2. Constants (Database, Collection & Storage)
// ==========================================
export const DATABASE_ID = "Oromiyaa-1";
export const PAYMENTS_COLLECTION_ID = "payments";
export const ENROLLMENTS_COLLECTION_ID = "enrollments";
export const CONTACTS_COLLECTION_ID = "contacts";

// ⚠️ RAAKKOON ASII JIRA: Collection ID Profiles/Users asitti dabali
export const COLLECTION_ID = "users"; // Ykn Collection ID profile keessanii
export const USERS_COLLECTION_ID = COLLECTION_ID;

export const STORAGE_BUCKET_ID = "6a770e6400383c00e7a2";

// ==========================================
// 3. Appwrite Services Instances
// ==========================================
export const account = new Account(client);
export const databases = new Databases(client);

// ⚠️ RAAKKOON ASII JIRA: userService.js keessatti 'database' jedhamee import yoo godhame akka bakka bu'uuf:
export const database = databases;

export const storage = new Storage(client);

// Helper Export-oota
export { ID, Query };

// ==========================================
// 4. Helper Functions
// ==========================================

export const sendContactMessage = async (name, email, message) => {
  try {
    const response = await databases.createDocument(
      DATABASE_ID,
      CONTACTS_COLLECTION_ID,
      ID.unique(),
      {
        name,
        email,
        message,
        createdAt: new Date().toISOString(),
      },
    );
    return response;
  } catch (error) {
    console.error("Dogoggora Contact Save Gochuu:", error.message);
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    return currentAccount;
  } catch (error) {
    console.error("User logged in ta'uu dhiisuu danda'a:", error.message);
    return null;
  }
};

export const uploadFileToStorage = async (fileObj) => {
  try {
    const response = await storage.createFile(
      STORAGE_BUCKET_ID,
      ID.unique(),
      fileObj,
    );
    return response;
  } catch (error) {
    console.error("Storage Upload Error:", error.message);
    throw error;
  }
};

export const getFilePreviewUrl = (fileId) => {
  if (!fileId) return null;
  try {
    const result = storage.getFilePreview(STORAGE_BUCKET_ID, fileId);
    return typeof result === "string" ? result : result?.href;
  } catch (error) {
    console.error("Error getting file preview:", error.message);
    return null;
  }
};
