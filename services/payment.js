// services/paymentService.js
import { account } from "./appwrite";

/**
 * Kaffaltii galchii, DEMO keessatti Of-mirkaneessi.
 * Production irratti: status: "pending" qofa olkaa'i,
 * admin mirkaneessuu eegi.
 */
export async function submitPaymentAndUnlock({
  courseId,
  courseTitle,
  amount,
  receiptNo,
  method = "Telebirr",
  autoApprove = true, // ← DEMO: true; PRODUCTION: false
}) {
  // 1) Fayyadamaa ammaa fi prefs isaa fidi
  const me = await account.get();
  const prefs = me.prefs || {};
  const payments = Array.isArray(prefs.payments) ? prefs.payments : [];

  // 2) Galmee kaffaltii haaraa uumi
  const newPayment = {
    id: `pay_${Date.now()}`,
    courseId,
    courseTitle,
    amount: Number(amount) || 0,
    receiptNo: String(receiptNo).trim(),
    method,
    status: autoApprove ? "approved" : "pending",
    createdAt: new Date().toISOString(),
  };

  // 3) Prefs haaromsi
  const updatedPrefs = {
    ...prefs,
    payments: [...payments, newPayment],
    paymentStatus: autoApprove ? "approved" : "pending",
    status: autoApprove ? "active" : "pending",
    isPaid: autoApprove ? true : false,
    activeCourseId: courseId,
    activeCourseTitle: courseTitle,
  };

  await account.updatePrefs(updatedPrefs);

  // 4) Fayyadamaa haaromsame deebisi
  const fresh = await account.get();
  return fresh;
}
