import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  ActivityIndicator,
} from "react-native";
import * as Clipboard from "expo-clipboard";
import * as ImagePicker from "expo-image-picker";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export default function PaymentComponent({ onUploadSuccess }) {
  const [selectedMethod, setSelectedMethod] = useState("telebirr");
  const [copiedField, setCopiedField] = useState(false);
  const [receiptImage, setReceiptImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const paymentDetails = {
    telebirr: {
      name: "Telebirr",
      accountName: "Gemechu Asmera",
      accountNumber: "0914794764",
      instructions:
        "Appii Telebirr kee banuun gara lakkoofsa bilbilaa kanaatti kaffaltii raawwadhu.",
    },
    cbe: {
      name: "CBE (Baanki Daldala Itoophiyaa)",
      accountName: "Gemechu Asmera",
      accountNumber: "1000729164244",
      instructions:
        "CBE Birr ykn Appii CBE Mobile Banking fayyadamuun gara lakkoofsa herregaa kanaatti ergi.",
    },
  };

  // Lakkoofsa Copy Gochuuf
  const handleCopy = async (text) => {
    await Clipboard.setStringAsync(text);
    setCopiedField(true);
    Alert.alert(
      "Waraabbameera!",
      "Lakkoofsi herregaa clipboard irratti copypaste ta'eera.",
    );
    setTimeout(() => setCopiedField(false), 2000);
  };

  // Suuraa Nagahee Galmee (Gallery) irraa Filachuu
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Eeyyama Barbaachisa",
        "Suuraa nagahee filachuuf eeyyama galmee (gallery) kennuun barbaachisaadha.",
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setReceiptImage(result.assets[0].uri);
    }
  };

  // Nagahee Ol-fe'uu (Submit Receipt)
  const handleUploadReceipt = async () => {
    if (!receiptImage) {
      Alert.alert(
        "Dogoggora",
        "Mullisaa (screenshot) nagahee kaffaltii dura filadhu.",
      );
      return;
    }

    try {
      setUploading(true);
      // Asitti Appwrite Storage ykn Backend API kee waamuudhaan file upload gochuu dandeessa:
      // eg: await uploadPaymentReceipt(receiptImage, selectedMethod);

      setTimeout(() => {
        setUploading(false);
        Alert.alert(
          "Milkaa'ina!",
          "Nagaheen kaffaltii kee ergameera. Admin biratti mirkanaa'uu eegaa.",
        );
        if (onUploadSuccess) onUploadSuccess(receiptImage);
      }, 1500);
    } catch {
      setUploading(false);
      Alert.alert("Dogoggora", "Nagahee ol-fe'uurratti dogoggorri uumameera.");
    }
  };

  const currentPayment = paymentDetails[selectedMethod];

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.iconBadge}>
          <Ionicons name="shield-checkmark" size={24} color="#059669" />
        </View>
        <Text style={styles.title}>Filannoowwan Kaffaltii</Text>
        <Text style={styles.subtitle}>
          Mala kaffaltii sii mijatu filachuun kaffali
        </Text>
      </View>

      {/* Buttons Selection */}
      <View style={styles.buttonGroup}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setSelectedMethod("telebirr")}
          style={[
            styles.methodBtn,
            selectedMethod === "telebirr" && styles.activeBtnTelebirr,
          ]}
        >
          <Ionicons
            name="phone-portrait-outline"
            size={22}
            color={selectedMethod === "telebirr" ? "#2563EB" : "#94A3B8"}
          />
          <Text
            style={[
              styles.btnText,
              selectedMethod === "telebirr" && styles.activeBtnTextTelebirr,
            ]}
          >
            Telebirr
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setSelectedMethod("cbe")}
          style={[
            styles.methodBtn,
            selectedMethod === "cbe" && styles.activeBtnCbe,
          ]}
        >
          <MaterialCommunityIcons
            name="bank-outline"
            size={22}
            color={selectedMethod === "cbe" ? "#7C3AED" : "#94A3B8"}
          />
          <Text
            style={[
              styles.btnText,
              selectedMethod === "cbe" && styles.activeBtnTextCbe,
            ]}
          >
            CBE Birr / Baankii
          </Text>
        </TouchableOpacity>
      </View>

      {/* Details Card */}
      <View
        style={[
          styles.detailsBox,
          selectedMethod === "telebirr" ? styles.bgTelebirr : styles.bgCbe,
        ]}
      >
        <Text style={styles.labelSmall}>Mala Kaffaltii</Text>
        <Text style={styles.methodTitle}>{currentPayment.name}</Text>

        {/* Account Name */}
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Maqaa Abbaa Herregaa</Text>
          <Text style={styles.infoValue}>{currentPayment.accountName}</Text>
        </View>

        {/* Account Number */}
        <View style={styles.copyRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.infoLabel}>
              {selectedMethod === "telebirr"
                ? "Lakkoofsa Bilbilaa"
                : "Lakkoofsa Herregaa"}
            </Text>
            <Text style={styles.accountNumberText}>
              {currentPayment.accountNumber}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.copyButton}
            onPress={() => handleCopy(currentPayment.accountNumber)}
          >
            <Ionicons
              name={copiedField ? "checkmark-sharp" : "copy-outline"}
              size={20}
              color={copiedField ? "#16A34A" : "#475569"}
            />
          </TouchableOpacity>
        </View>

        {/* Instructions */}
        <Text style={styles.instructionText}>
          <Text style={{ fontWeight: "700" }}>Hubachiisa: </Text>
          {currentPayment.instructions}
        </Text>
      </View>

      {/* --- SECTION UPLOAD RECEIPT (SCREENSHOT) --- */}
      <View style={styles.uploadSection}>
        <Text style={styles.uploadTitle}>Nagahee Kaffaltii (Screenshot)</Text>
        <Text style={styles.uploadSub}>
          Kaffaltii erga raawwattee booda suuraa nagahee asitti ergi.
        </Text>

        {receiptImage ? (
          <View style={styles.previewContainer}>
            <Image
              source={{ uri: receiptImage }}
              style={styles.receiptPreview}
            />
            <TouchableOpacity
              style={styles.removeImageBtn}
              onPress={() => setReceiptImage(null)}
            >
              <Ionicons name="close-circle" size={26} color="#EF4444" />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.pickImageBtn}
            activeOpacity={0.7}
            onPress={pickImage}
          >
            <Ionicons name="cloud-upload-outline" size={32} color="#2563EB" />
            <Text style={styles.pickImageText}>Suuraa Nagahee Filadhu</Text>
          </TouchableOpacity>
        )}

        {/* Submit Button */}
        <TouchableOpacity
          style={[
            styles.submitBtn,
            (!receiptImage || uploading) && styles.disabledSubmitBtn,
          ]}
          disabled={!receiptImage || uploading}
          onPress={handleUploadReceipt}
          activeOpacity={0.8}
        >
          {uploading ? (
            <ActivityIndicator color="#FFFFFF" size="small" />
          ) : (
            <>
              <Ionicons name="paper-plane-outline" size={18} color="#FFFFFF" />
              <Text style={styles.submitBtnText}>Nagahee Ergi</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 16,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  iconBadge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#D1FAE5",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    color: "#1E293B",
  },
  subtitle: {
    fontSize: 13,
    color: "#64748B",
    marginTop: 2,
  },
  buttonGroup: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 16,
  },
  methodBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#E2E8F0",
    backgroundColor: "#F8FAFC",
    gap: 6,
  },
  activeBtnTelebirr: {
    borderColor: "#2563EB",
    backgroundColor: "#EFF6FF",
  },
  activeBtnCbe: {
    borderColor: "#7C3AED",
    backgroundColor: "#F5F3FF",
  },
  btnText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#64748B",
  },
  activeBtnTextTelebirr: {
    color: "#2563EB",
  },
  activeBtnTextCbe: {
    color: "#7C3AED",
  },
  detailsBox: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  bgTelebirr: {
    backgroundColor: "#EFF6FF",
    borderColor: "#BFDBFE",
  },
  bgCbe: {
    backgroundColor: "#F5F3FF",
    borderColor: "#DDD6FE",
  },
  labelSmall: {
    fontSize: 10,
    fontWeight: "700",
    color: "#64748B",
    textTransform: "uppercase",
  },
  methodTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 12,
  },
  infoRow: {
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  infoLabel: {
    fontSize: 11,
    color: "#94A3B8",
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#334155",
  },
  copyRow: {
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  accountNumberText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#0F172A",
  },
  copyButton: {
    padding: 6,
    borderRadius: 6,
    backgroundColor: "#F1F5F9",
  },
  instructionText: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 12,
    lineHeight: 18,
  },

  /* Upload Section Styles */
  uploadSection: {
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
  },
  uploadTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0F172A",
  },
  uploadSub: {
    fontSize: 12,
    color: "#64748B",
    marginBottom: 12,
  },
  pickImageBtn: {
    borderWidth: 1.5,
    borderColor: "#2563EB",
    borderStyle: "dashed",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EFF6FF",
  },
  pickImageText: {
    marginTop: 8,
    fontSize: 13,
    fontWeight: "700",
    color: "#2563EB",
  },
  previewContainer: {
    position: "relative",
    alignItems: "center",
  },
  receiptPreview: {
    width: "100%",
    height: 180,
    borderRadius: 12,
    resizeMode: "cover",
  },
  removeImageBtn: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
  },
  submitBtn: {
    marginTop: 14,
    backgroundColor: "#16A34A",
    paddingVertical: 12,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  disabledSubmitBtn: {
    backgroundColor: "#9CA3AF",
  },
  submitBtnText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 14,
  },
});
