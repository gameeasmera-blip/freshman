import {
  account,
  databases,
  DATABASE_ID,
  USERS_COLLECTION_ID,
} from "./appwrite";
import { Query } from "react-native-appwrite";

const AUTHORIZED_ADMIN_EMAIL = "gameasmera@gmail.com";


// 1. Fayyadamaa Ammaa (HomeScreen kan fayyadamu)
export const getUserData = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) return null;

    const dbId = DATABASE_ID || "main_db";
    const colId = USERS_COLLECTION_ID || "users";

    try {
      const response = await databases.listDocuments(dbId, colId, [
        Query.equal("userId", currentAccount.$id),
      ]);

      if (response.documents.length > 0) {
        return { ...currentAccount, ...response.documents[0] };
      }
    } catch (_dbErr) {
      // Document dhabamuyyuu account info qofa deebisa
    }

    return currentAccount;
  } catch (error) {
    if (error?.code === 401 || error?.message?.includes("guests")) {
      return null;
    }
    console.error("Error in getUserData:", error);
    return null;
  }
};

// 2. Admin Login
export const loginAdmin = async (email, password) => {
  if (email.trim().toLowerCase() !== AUTHORIZED_ADMIN_EMAIL.toLowerCase()) {
    throw new Error("Eenyummeessaan kun hayyama Admin hin qabu!");
  }

  try {
    await account.deleteSession("current");
  } catch (_err) {
    // Active session yoo hin jirre itti fufa
  }

  try {
    if (typeof account.createEmailPasswordSession === "function") {
      return await account.createEmailPasswordSession(email, password);
    }
    return await account.createEmailSession(email, password);
  } catch (error) {
    throw error;
  }
};

// 3. Admin Users Fetch
export const getAllUserProfiles = async () => {
  try {
    const dbId = DATABASE_ID || "main_db";
    const colId = USERS_COLLECTION_ID || "users";

    const response = await databases.listDocuments(dbId, colId);
    return response.documents || [];
  } catch (error) {
    console.error("Error in getAllUserProfiles:", error);
    throw error;
  }
};

// Default export dabaluu (Dogoggora import jallisuuf)
export default {
  getUserData,
  loginAdmin,
  getAllUserProfiles,
};
