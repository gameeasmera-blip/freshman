// services/databaseService.js
import {
  DATABASE_ID,
  PAYMENTS_COLLECTION_ID,
  Query,
  databases,
  getFilePreviewUrl,
} from "./appwrite";

/**
 * 1. Kaffaltiiwwan status "pending" qaban hunda Admin Dashboard-f fida
 */
export const listPendingPayments = async () => {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      PAYMENTS_COLLECTION_ID,
      [
        Query.equal("status", "pending"), // Status 'pending' qofa fida
        Query.orderDesc("$createdAt"), // Kan dhihootti galmaa'e dura fida
      ],
    );

    // Yoo receiptFileId qabaate URL guutuu uumee deebisa
    const formattedDocs = response.documents.map((doc) => ({
      ...doc,
      receiptFileUrl: doc.receiptFileId
        ? getFilePreviewUrl(doc.receiptFileId)
        : doc.receiptFileUrl,
    }));

    return formattedDocs;
  } catch (error) {
    console.error("Error listing pending payments:", error);
    throw error;
  }
};

/**
 * 2. Kaffaltii Mirkaneessuu (Approve Payment)
 */
export const approvePaymentDoc = async ({ docId, adminId }) => {
  try {
    const response = await databases.updateDocument(
      DATABASE_ID,
      PAYMENTS_COLLECTION_ID,
      docId,
      {
        status: "approved",
        approvedBy: adminId,
        updatedAt: new Date().toISOString(),
      },
    );
    return response;
  } catch (error) {
    console.error("Error approving payment:", error);
    throw error;
  }
};

/**
 * 3. Kaffaltii Dhorkuu (Reject Payment)
 */
export const rejectPaymentDoc = async ({ docId, adminId, reason }) => {
  try {
    const response = await databases.updateDocument(
      DATABASE_ID,
      PAYMENTS_COLLECTION_ID,
      docId,
      {
        status: "rejected",
        approvedBy: adminId,
        rejectionReason: reason,
        updatedAt: new Date().toISOString(),
      },
    );
    return response;
  } catch (error) {
    console.error("Error rejecting payment:", error);
    throw error;
  }
};
// services/databaseService.js

/**
 * Koorsii hundaa userId kun kaffale (approved) deebisa.
 * @returns {Promise<string[]>} — courseId walitti qabame (array)
 */
export async function getMyPaidCourseIds(userId) {
  if (!userId) return [];

  try {
    const payments = await databases.listDocuments(
      DATABASE_ID,
      PAYMENTS_COLLECTION_ID,
      [
        Query.equal("userId", userId),
        Query.equal("status", "approved"), // 👈 approved qofa
        Query.orderDesc("$createdAt"),
        Query.limit(100),
      ],
    );

    // courseId hunda walitti qabi (duplicate haquu)
    const ids = payments.documents.map((doc) => doc.courseId).filter(Boolean);

    return [...new Set(ids)]; // unique
  } catch (e) {
    console.error("getMyPaidCourseIds:", e);
    return [];
  }
}

/**
 * Koorsii hundaa barataan bitate, odeeffannoo guutuu waliin deebisa.
 * @returns {Promise<Array>} — [{ courseId, courseTitle, amount, paidAt, status }, ...]
 */
export async function getMyPaidCourses(userId) {
  if (!userId) return [];

  try {
    const payments = await databases.listDocuments(
      DATABASE_ID,
      PAYMENTS_COLLECTION_ID,
      [
        Query.equal("userId", userId),
        Query.equal("status", "approved"),
        Query.orderDesc("$createdAt"),
        Query.limit(100),
      ],
    );

    // courseId hundaaf, kaffaltii dhiyeessaa (latest) qofa fudhadhu
    const map = new Map();
    for (const doc of payments.documents) {
      if (!doc.courseId) continue;
      if (!map.has(doc.courseId)) {
        map.set(doc.courseId, {
          courseId: doc.courseId,
          courseTitle: doc.courseTitle || "Koorsii",
          amount: doc.amount || 0,
          paidAt: doc.$createdAt,
          status: doc.status,
        });
      }
    }

    return Array.from(map.values());
  } catch (e) {
    console.error("getMyPaidCourses:", e);
    return [];
  }
}
