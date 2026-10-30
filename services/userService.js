import { account, databases, DATABASE_ID, COLLECTION_ID } from "./appwrite";
import { Query } from "react-native-appwrite";

/**
 * 1. Profile Fayyadamaa Fiduu ykn Yoo Hin Jirre Haaraa Uumuu
 */
export const createOrGetUserProfile = async () => {
  try {
    if (!databases) {
      throw new Error(
        "Databases instance undefined ta'eera. appwrite.js sakatta'aa.",
      );
    }

    const currentUser = await account.get();
    if (!currentUser?.$id) {
      throw new Error("Fayyadamaan log in godhe hin jiru.");
    }

    try {
      // Profile jiru database irraa fiduu
      return await databases.getDocument(
        DATABASE_ID,
        COLLECTION_ID,
        currentUser.$id,
      );
    } catch (error) {
      // Rate Limit Exceeded (429)
      if (error.code === 429 || error.type === "general_rate_limit_exceeded") {
        console.error("Rate limit qaqqabeera. Daqiiqaa muraasa booda yaala.");
        throw error;
      }

      // Profile yoo hin jirre (404) haaraa uumuu
      if (
        error.code === 404 ||
        error.type === "document_not_found" ||
        error.message?.includes("could not be found")
      ) {
        return await databases.createDocument(
          DATABASE_ID,
          COLLECTION_ID,
          currentUser.$id, // Account ID fi Document ID tokko akka ta'uuf
          {
            userId: currentUser.$id,
            name: currentUser.name || "User",
            email: currentUser.email || "",
            isPaid: false,
            paymentStatus: "pending",
            unlockedCourses: [],
            unlockedCount: 0,
            createdAt: new Date().toISOString(),
          },
        );
      }
      throw error;
    }
  } catch (err) {
    console.error("Profile Error:", err.message);
    throw err;
  }
};

/**
 * 2. Profile Data Fooyyessuu (Update Profile)
 */
export const updateUserProfile = async (updateData) => {
  try {
    const currentUser = await account.get();
    if (!currentUser?.$id) throw new Error("Fayyadamaan log in hin gochise.");

    return await databases.updateDocument(
      DATABASE_ID,
      COLLECTION_ID,
      currentUser.$id,
      updateData,
    );
  } catch (error) {
    console.error("Update Profile Error:", error.message);
    throw error;
  }
};

/**
 * 3. Korsii Haaraa Saaquu (Unlock Course)
 */
export const unlockCourseForUser = async (courseId) => {
  try {
    const profile = await createOrGetUserProfile();
    const currentCourses = profile.unlockedCourses || [];

    // Korsichi duraan saaqamee yoo jiraate dubbisuu qofa
    if (currentCourses.includes(courseId)) {
      return profile;
    }

    const updatedCourses = [...currentCourses, courseId];

    return await databases.updateDocument(
      DATABASE_ID,
      COLLECTION_ID,
      profile.$id,
      {
        unlockedCourses: updatedCourses,
        unlockedCount: updatedCourses.length,
      },
    );
  } catch (error) {
    console.error("Unlock Course Error:", error.message);
    throw error;
  }
};

/**
 * 4. Haala Kaffaltii Fooyyessuu (Update Payment Status)
 */
export const updateUserPaymentStatus = async (status, isPaid = false) => {
  try {
    const currentUser = await account.get();

    return await databases.updateDocument(
      DATABASE_ID,
      COLLECTION_ID,
      currentUser.$id,
      {
        paymentStatus: status, // "approved", "pending", "failed"
        isPaid: isPaid,
      },
    );
  } catch (error) {
    console.error("Payment Update Error:", error.message);
    throw error;
  }
};

/**
 * 5. Barattoota Hunda Database Irraa Fiduu
 */
export const getAllUserProfiles = async () => {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_ID,
      [Query.limit(500)]
    );
    return response.documents;
  } catch (error) {
    console.error("Error Fetching Users:", error.message);
    
    // Yoo MFA Exception uumame:
    if (error.message?.includes("More factors are required") || error.code === 401) {
      console.warn("MFA/Auth Constraint: Appwrite Console -> Collection Permissions irratti 'Any' Read Access hayyami.");
    }
    
    throw error;
  }

};

/**
 * 6. Barataa Kaffaltii Kaffale Approve / Revoke Gochuu (Tokkicha Qofa)
 */
export const toggleUserApproval = async (userId, currentStatus) => {
  try {
    const isCurrentlyApproved =
      currentStatus === "approved" || currentStatus === true;

    const newStatus = isCurrentlyApproved ? "pending" : "approved";
    const newIsPaid = !isCurrentlyApproved;

    return await databases.updateDocument(DATABASE_ID, COLLECTION_ID, userId, {
      paymentStatus: newStatus,
      isPaid: newIsPaid,
    });
  } catch (error) {
    console.error("Error updating approval status:", error.message);
    throw error;
  }
};

/**
 * 7. Admin Login
 */
export const loginAdmin = async (email, password) => {
  // Active Session delete gochuu
  try {
    await account.deleteSession("current");
  } catch {
    // Active session yoo hin jirre hiika hin qabu
  }

  // Session haaraa uumuu
  const session = await account.createEmailPasswordSession(email, password);

  return session;
};
