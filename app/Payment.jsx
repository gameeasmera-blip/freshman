// app/Payment.jsx
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  StatusBar,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import * as Clipboard from "expo-clipboard"; // ← Clipboard galchuu
import { useAuth } from "../context/authProvider";
import { submitPaymentAndUnlock } from "../services/payment";
import { getCourseById } from "../constants/courses";

// ============================================================
// ODEEFFANNOO KAFFALTII (PAYMENT DETAILS)
// ============================================================
const PAYMENT_DETAILS = {
  Telebirr: {
    accountName: "Abebe Kebede",
    accountNumber: "0911000000",
    icon: "📱",
  },
  "CBE Birr": {
    accountName: "Abebe Kebede",
    accountNumber: "1000123456789",
    icon: "🏦",
  },
  Bank: {
    accountName: "Abebe Kebede",
    accountNumber: "1000987654321",
    bankName: "Commercial Bank of Ethiopia (CBE)",
    icon: "🏛️",
  },
};

export default function Payment() {
  const router = useRouter();
  const { checkAuth } = useAuth();
  const { courseId, courseTitle } = useLocalSearchParams();
  const course = getCourseById(courseId);

  const [receiptImage, setReceiptImage] = useState(null);
  const [method, setMethod] = useState("Telebirr");
  const [busy, setBusy] = useState(false);
  const [copiedField, setCopiedField] = useState("");

  const amountLabel = course?.price || "0 ETB";
  const currentPaymentInfo = PAYMENT_DETAILS[method];

  // ==================== COPY FUNCTION ====================
  const copyToClipboard = async (text, fieldName) => {
    await Clipboard.setStringAsync(text);
    setCopiedField(fieldName);
    Alert.alert(
      "Mirkanaa'e ✅",
      `${fieldName} baay'ifameera (copied!): ${text}`,
    );
    setTimeout(() => setCopiedField(""), 3000);
  };

  // ==================== SUURAA FILACHUU ====================
  const pickImageFromGallery = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Hayyama Barbaachisa",
          "Suuraa filachuuf hayyama galarii (gallery) barbaachisa.",
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [3, 4],
        quality: 0.8,
      });

      if (!result.canceled && result.assets?.length > 0) {
        setReceiptImage(result.assets[0]);
      }
    } catch (error) {
      console.error("pickImage error:", error);
      Alert.alert("Dogoggora", "Suuraa filachuun hin danda'amne.");
    }
  };

  // ==================== KAAMERAA FAYYADAMUU ====================
  const takePhotoWithCamera = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Hayyama Barbaachisa",
          "Suuraa kaasuuf hayyama kaameraa barbaachisa.",
        );
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [3, 4],
        quality: 0.8,
      });

      if (!result.canceled && result.assets?.length > 0) {
        setReceiptImage(result.assets[0]);
      }
    } catch (error) {
      console.error("takePhoto error:", error);
      Alert.alert("Dogoggora", "Suuraa kaasuun hin danda'amne.");
    }
  };

  // ==================== POP-UP: FILANNOO ====================
  const handlePickReceipt = () => {
    Alert.alert("Suuraa Nagahee Filadhu", "Mala filadhu:", [
      { text: "📷 Kaameraa", onPress: takePhotoWithCamera },
      { text: "🖼️ Galarii", onPress: pickImageFromGallery },
      { text: "Dhiisi", style: "cancel" },
    ]);
  };

  // ==================== GALCHUU ====================
  const handleSubmit = async () => {
    if (!receiptImage) {
      Alert.alert("Hir'ina", "Maaloo suuraa nagahee filadhu.");
      return;
    }

    setBusy(true);
    try {
      await submitPaymentAndUnlock({
        courseId,
        courseTitle: courseTitle || course?.title,
        amount: course?.amount || 0,
        receiptImage: {
          uri: receiptImage.uri,
          fileName: receiptImage.fileName || `receipt_${Date.now()}.jpg`,
          mimeType: receiptImage.mimeType || "image/jpeg",
          size: receiptImage.fileSize || 0,
        },
        method,
        autoApprove: true, // DEMO
      });

      await checkAuth();

      Alert.alert(
        "Milkaa'e ✅",
        "Kaffaltiin kee mirkanaa'eera! Koorsiin banameera.",
        [
          {
            text: "Koorsii Jalqabi",
            onPress: () =>
              router.replace({
                pathname: "/CourseDetailScreen",
                params: {
                  courseId,
                  courseTitle: courseTitle || course?.title,
                },
              }),
          },
        ],
      );
    } catch (e) {
      console.error("Payment error:", e);
      Alert.alert(
        "Dogoggora",
        e?.message || "Kaffaltiin hin galmoofne. Maaloo irra deebi'i.",
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
        >
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backBtn}
          >
            <Text style={styles.backText}>← Deebii</Text>
          </TouchableOpacity>

          <Text style={styles.title}>Kaffaltii Raawwadhu 💳</Text>
          <Text style={styles.subtitle}>
            Koorsii kana argachuuf kaffaltii raawwadii suuraa nagahee (receipt)
            as galchi.
          </Text>

          {/* ==================== SUMMARY ==================== */}
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Koorsii</Text>
            <Text style={styles.summaryTitle}>
              {courseTitle || course?.title || "Koorsii"}
            </Text>
            <View style={styles.divider} />
            <View style={styles.rowBetween}>
              <Text style={styles.summaryLabel}>Kaffaltii</Text>
              <Text style={styles.amount}>{amountLabel}</Text>
            </View>
          </View>

          {/* ==================== MALA KAFFALTII ==================== */}
          <Text style={styles.sectionTitle}>Mala Kaffaltii Filadhu</Text>
          <View style={styles.methodRow}>
            {["Telebirr", "CBE Birr", "Bank"].map((m) => (
              <TouchableOpacity
                key={m}
                style={[
                  styles.methodChip,
                  method === m && styles.methodChipActive,
                ]}
                onPress={() => setMethod(m)}
              >
                <Text
                  style={[
                    styles.methodText,
                    method === m && styles.methodTextActive,
                  ]}
                >
                  {m}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* ==================== DETAILS BOX (COPYABLE) ==================== */}
          <View style={styles.accountBox}>
            <Text style={styles.accountHeader}>
              {currentPaymentInfo.icon} Odeeffannoo Kaffaltii ({method})
            </Text>

            {currentPaymentInfo.bankName ? (
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Baankii:</Text>
                <Text style={styles.infoValue}>
                  {currentPaymentInfo.bankName}
                </Text>
              </View>
            ) : null}

            {/* Maaqaa Account (Copy Button) */}
            <TouchableOpacity
              style={styles.copyRow}
              onPress={() =>
                copyToClipboard(
                  currentPaymentInfo.accountName,
                  "Maqaa Herregaa",
                )
              }
              activeOpacity={0.7}
            >
              <View style={{ flex: 1 }}>
                <Text style={styles.infoLabel}>Maqaa Herregaa:</Text>
                <Text style={styles.infoValue}>
                  {currentPaymentInfo.accountName}
                </Text>
              </View>
              <View style={styles.copyBadge}>
                <Text style={styles.copyBadgeText}>
                  {copiedField === "Maqaa Herregaa" ? "Copied! ✅" : "📋 Copy"}
                </Text>
              </View>
            </TouchableOpacity>

            {/* Lakkoofsa Account (Copy Button) */}
            <TouchableOpacity
              style={styles.copyRow}
              onPress={() =>
                copyToClipboard(
                  currentPaymentInfo.accountNumber,
                  "Lakkoofsa Herregaa",
                )
              }
              activeOpacity={0.7}
            >
              <View style={{ flex: 1 }}>
                <Text style={styles.infoLabel}>
                  {method === "Telebirr"
                    ? "Lakkoofsa Bilbilaa:"
                    : "Lakkoofsa Herregaa:"}
                </Text>
                <Text style={styles.accountNumberText}>
                  {currentPaymentInfo.accountNumber}
                </Text>
              </View>
              <View style={styles.copyBadge}>
                <Text style={styles.copyBadgeText}>
                  {copiedField === "Lakkoofsa Herregaa"
                    ? "Copied! ✅"
                    : "📋 Copy"}
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* ==================== SUURAA NAGAHEE ==================== */}
          <Text style={styles.sectionTitle}>
            Suuraa Nagahee (Receipt Image)
          </Text>

          {receiptImage ? (
            <View style={styles.previewBox}>
              <Image
                source={{ uri: receiptImage.uri }}
                style={styles.previewImage}
                resizeMode="cover"
              />
              <View style={styles.previewActions}>
                <TouchableOpacity
                  style={styles.previewBtn}
                  onPress={handlePickReceipt}
                >
                  <Text style={styles.previewBtnText}>🔄 Jijjiiri</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.previewBtn, styles.previewBtnDanger]}
                  onPress={() => setReceiptImage(null)}
                >
                  <Text style={styles.previewBtnText}>🗑️ Haqi</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.dropZone}
              onPress={handlePickReceipt}
              activeOpacity={0.7}
            >
              <Text style={styles.dropIcon}>📸</Text>
              <Text style={styles.dropTitle}>Suuraa Nagahee Filadhu</Text>
              <Text style={styles.dropSub}>
                Tuqii kaameraa ykn galarii filachuuf
              </Text>
              <View style={styles.dropHint}>
                <Text style={styles.dropHintText}>
                  PNG • JPG • JPEG (max 5MB)
                </Text>
              </View>
            </TouchableOpacity>
          )}

          {/* ==================== SUBMIT BUTTON ==================== */}
          <TouchableOpacity
            style={[
              styles.primaryBtn,
              (busy || !receiptImage) && styles.btnDisabled,
            ]}
            onPress={handleSubmit}
            disabled={busy || !receiptImage}
            activeOpacity={0.85}
          >
            {busy ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={styles.primaryBtnText}>
                Nagahee Galchii Koorsii Bani
              </Text>
            )}
          </TouchableOpacity>

          <Text style={styles.note}>
            ⚙️ Demo Mode: Erga suuraa nagahee galchitee booda koorsiin
            battalatti banama. Production irratti admin mirkaneessuu eeguu
            qabda.
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  scroll: { padding: 20, paddingBottom: 40 },
  backBtn: { marginBottom: 12 },
  backText: { color: "#2563EB", fontWeight: "700", fontSize: 15 },
  title: { fontSize: 24, fontWeight: "800", color: "#0F172A" },
  subtitle: { fontSize: 14, color: "#64748B", marginTop: 6, marginBottom: 20 },

  summaryCard: {
    backgroundColor: "#FFF",
    borderRadius: 14,
    padding: 18,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginBottom: 22,
  },
  summaryLabel: { fontSize: 13, color: "#64748B", fontWeight: "600" },
  summaryTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#0F172A",
    marginTop: 4,
  },
  divider: { height: 1, backgroundColor: "#E2E8F0", marginVertical: 14 },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  amount: { fontSize: 18, fontWeight: "800", color: "#2563EB" },

  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#334155",
    marginBottom: 10,
  },
  methodRow: { flexDirection: "row", gap: 8, marginBottom: 16 },
  methodChip: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    backgroundColor: "#FFF",
  },
  methodChipActive: { backgroundColor: "#2563EB", borderColor: "#2563EB" },
  methodText: { fontSize: 13, fontWeight: "700", color: "#475569" },
  methodTextActive: { color: "#FFF" },

  // ============ ACCOUNT DETAILS BOX ============
  accountBox: {
    backgroundColor: "#EFF6FF",
    borderWidth: 1,
    borderColor: "#BFDBFE",
    borderRadius: 14,
    padding: 16,
    marginBottom: 22,
  },
  accountHeader: {
    fontSize: 15,
    fontWeight: "800",
    color: "#1E40AF",
    marginBottom: 12,
  },
  infoRow: { marginBottom: 8 },
  infoLabel: { fontSize: 12, color: "#64748B", fontWeight: "600" },
  infoValue: {
    fontSize: 15,
    color: "#0F172A",
    fontWeight: "700",
    marginTop: 2,
  },
  accountNumberText: {
    fontSize: 18,
    color: "#2563EB",
    fontWeight: "800",
    marginTop: 2,
  },
  copyRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DBEAFE",
    padding: 10,
    borderRadius: 10,
    marginTop: 8,
  },
  copyBadge: {
    backgroundColor: "#2563EB",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  copyBadgeText: { color: "#FFF", fontSize: 12, fontWeight: "700" },

  // ============ DROP ZONE ============
  dropZone: {
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#93C5FD",
    borderRadius: 14,
    backgroundColor: "#EFF6FF",
    paddingVertical: 34,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 22,
  },
  dropIcon: { fontSize: 42, marginBottom: 8 },
  dropTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#1E40AF",
    marginBottom: 4,
  },
  dropSub: {
    fontSize: 12,
    color: "#3B82F6",
    textAlign: "center",
    marginBottom: 12,
  },
  dropHint: {
    backgroundColor: "#DBEAFE",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
  },
  dropHintText: { fontSize: 11, color: "#1E40AF", fontWeight: "700" },

  // ============ PREVIEW ============
  previewBox: {
    backgroundColor: "#FFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    padding: 10,
    marginBottom: 22,
  },
  previewImage: {
    width: "100%",
    height: 260,
    borderRadius: 10,
    backgroundColor: "#F1F5F9",
  },
  previewActions: {
    flexDirection: "row",
    gap: 8,
    marginTop: 10,
  },
  previewBtn: {
    flex: 1,
    paddingVertical: 11,
    borderRadius: 9,
    backgroundColor: "#2563EB",
    alignItems: "center",
  },
  previewBtnDanger: { backgroundColor: "#DC2626" },
  previewBtnText: { color: "#FFF", fontWeight: "800", fontSize: 13 },

  // ============ PRIMARY BTN ============
  primaryBtn: {
    backgroundColor: "#2563EB",
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: "center",
  },
  btnDisabled: { opacity: 0.5 },
  primaryBtnText: { color: "#FFF", fontSize: 16, fontWeight: "800" },
  note: {
    fontSize: 12,
    color: "#94A3B8",
    marginTop: 16,
    textAlign: "center",
    lineHeight: 18,
  },
});
