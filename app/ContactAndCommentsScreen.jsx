import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  Linking,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useApp } from "../context/AppContext";
import { sendContactMessage } from "../services/appwrite";

export default function ContactAndCommentsScreen() {
  const router = useRouter();
  const appContext = useApp() || {};
  const { theme, t } = appContext;
  const isDark = theme === "dark";

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleContactSubmit = async () => {
    if (!form.name || !form.email || !form.message) {
      Alert.alert("Error", "Please fill in all fields!");
      return;
    }

    setLoading(true);
    try {
      await sendContactMessage(form.name, form.email, form.message);
      Alert.alert("Success!", "Your message has been sent successfully.");
      setForm({ name: "", email: "", message: "" });
    } catch {
      Alert.alert("Error", "Failed to send message. Please try again later!");
    } finally {
      setLoading(false);
    }
  };

  // Social Media Link Helper
  const openLink = (url) => {
    Linking.openURL(url).catch(() =>
      Alert.alert("Error", "Unable to open link"),
    );
  };

  return (
    <ScrollView
      style={[styles.container, isDark ? styles.darkBg : styles.lightBg]}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <Text style={[styles.title, isDark && styles.darkText]}>
          Get in Touch
        </Text>
        <Text style={[styles.subtitle, isDark && styles.darkSubtext]}>
          We d love to hear from you. Send us a message below!
        </Text>
      </View>

      {/* 1. WHY SEND FEEDBACK? (Information Banner) */}
      <View style={[styles.infoBanner, isDark && styles.darkInfoBanner]}>
        <View style={styles.infoIconWrapper}>
          <Ionicons name="sparkles" size={24} color="#1c56ea" />
        </View>
        <View style={styles.infoTextWrapper}>
          <Text style={[styles.infoTitle, isDark && styles.darkText]}>
            Why Share Your Feedback?
          </Text>
          <Text style={[styles.infoDescription, isDark && styles.darkSubtext]}>
            Your questions, suggestions, and feedback help us improve course
            materials, fix issues, and provide better support for all freshman
            students!
          </Text>
        </View>
      </View>

      {/* 2. Main Contact Form Card */}
      <View style={[styles.card, isDark && styles.darkCard]}>
        {/* Name Field */}
        <View style={styles.inputWrapper}>
          <Text style={[styles.label, isDark && styles.darkLabel]}>
            Full Name
          </Text>
          <View
            style={[styles.inputContainer, isDark && styles.darkInputContainer]}
          >
            <Ionicons
              name="person-outline"
              size={20}
              color={isDark ? "#94a3b8" : "#64748b"}
            />
            <TextInput
              style={[styles.input, isDark && styles.darkText]}
              placeholder="John Doe"
              placeholderTextColor={isDark ? "#64748b" : "#94a3b8"}
              value={form.name}
              onChangeText={(text) => setForm({ ...form, name: text })}
            />
          </View>
        </View>

        {/* Email Field */}
        <View style={styles.inputWrapper}>
          <Text style={[styles.label, isDark && styles.darkLabel]}>
            Email Address
          </Text>
          <View
            style={[styles.inputContainer, isDark && styles.darkInputContainer]}
          >
            <Ionicons
              name="mail-outline"
              size={20}
              color={isDark ? "#94a3b8" : "#64748b"}
            />
            <TextInput
              style={[styles.input, isDark && styles.darkText]}
              placeholder="example@mail.com"
              placeholderTextColor={isDark ? "#64748b" : "#94a3b8"}
              keyboardType="email-address"
              autoCapitalize="none"
              value={form.email}
              onChangeText={(text) => setForm({ ...form, email: text })}
            />
          </View>
        </View>

        {/* Message Field */}
        <View style={styles.inputWrapper}>
          <Text style={[styles.label, isDark && styles.darkLabel]}>
            Your Message
          </Text>
          <View
            style={[
              styles.inputContainer,
              styles.textAreaContainer,
              isDark && styles.darkInputContainer,
            ]}
          >
            <Ionicons
              name="chatbox-ellipses-outline"
              size={20}
              color={isDark ? "#94a3b8" : "#64748b"}
              style={styles.textAreaIcon}
            />
            <TextInput
              style={[styles.input, styles.textArea, isDark && styles.darkText]}
              placeholder="Type your feedback or question here..."
              placeholderTextColor={isDark ? "#64748b" : "#94a3b8"}
              multiline
              numberOfLines={4}
              value={form.message}
              onChangeText={(text) => setForm({ ...form, message: text })}
            />
          </View>
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={[styles.sendBtn, loading && styles.sendBtnDisabled]}
          onPress={handleContactSubmit}
          disabled={loading}
          activeOpacity={0.8}
        >
          {loading ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <>
              <Text style={styles.sendBtnText}>Send Message</Text>
              <Ionicons name="paper-plane" size={18} color="#ffffff" />
            </>
          )}
        </TouchableOpacity>
</View>
<View style={{ marginTop: 20, alignItems: "center" }}>
        <TouchableOpacity
                  onPress={() => router.push("/HomeScreen")}
                  style={styles.button}
                  activeOpacity={0.7}
                
                >
                  <Text style={styles.buttonText}>{t?.dar}</Text>
                </TouchableOpacity>
              </View>
      

      {/* 3. FOOTER SECTION WITH SOCIAL MEDIA */}
      <View style={styles.footerContainer}>
        <Text style={[styles.footerTitle, isDark && styles.darkText]}>
          Connect With Us
        </Text>
        <Text style={[styles.footerSub, isDark && styles.darkSubtext]}>
          Follow our community channels for updates and study guides.
        </Text>

        {/* Social Media Icons */}
        <View style={styles.socialRow}>
          <TouchableOpacity
            style={[styles.socialBtn, { backgroundColor: "#0088cc" }]}
            onPress={() => openLink("https://t.me/")}
          >
            <Ionicons name="paper-plane-outline" size={20} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.socialBtn, { backgroundColor: "#25D366" }]}
            onPress={() => openLink("https://wa.me/")}
          >
            <Ionicons name="logo-whatsapp" size={20} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.socialBtn, { backgroundColor: "#1877F2" }]}
            onPress={() => openLink("https://facebook.com")}
          >
            <Ionicons name="logo-facebook" size={20} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.socialBtn, { backgroundColor: "#10b981" }]}
            onPress={() => openLink("tel:+25923466745")}
          >
            <Ionicons name="call-outline" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Copyright */}
        <Text style={[styles.copyright, isDark && styles.darkSubtext]}>
          © 2026 Freshman Guide App. All Rights Reserved.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#2563EB",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    width: "100%",
    shadowColor: "#eb2525",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  lightBg: {
    backgroundColor: "#f8fafc",
  },
  darkBg: {
    backgroundColor: "#0b0f19",
  },
  headerContainer: {
    marginBottom: 16,
    marginTop: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#0f172a",
    letterSpacing: -0.5,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#64748b",
    marginTop: 6,
    textAlign: "center",
    lineHeight: 20,
  },
  darkText: {
    color: "#f8fafc",
  },
  darkSubtext: {
    color: "#94a3b8",
  },

  // Info Banner Styles
  infoBanner: {
    flexDirection: "row",
    backgroundColor: "#eff6ff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: "#1c56ea",
    gap: 12,
  },
  darkInfoBanner: {
    backgroundColor: "#1e293b",
    borderLeftColor: "#3b82f6",
  },
  infoIconWrapper: {
    justifyContent: "flex-start",
    marginTop: 2,
  },
  infoTextWrapper: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1e3a8a",
    marginBottom: 4,
  },
  infoDescription: {
    fontSize: 13,
    color: "#3b82f6",
    lineHeight: 18,
  },

  // Form Card Styles
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#64748b",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
    borderWidth: 1,
    borderColor: "#f1f5f9",
  },
  darkCard: {
    backgroundColor: "#111827",
    borderColor: "#1f2937",
    shadowColor: "#000000",
  },
  inputWrapper: {
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    color: "#475569",
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  darkLabel: {
    color: "#94a3b8",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f5f9",
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  darkInputContainer: {
    backgroundColor: "#1f2937",
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    fontSize: 14,
    color: "#0f172a",
  },
  textAreaContainer: {
    alignItems: "flex-start",
    paddingVertical: 10,
  },
  textAreaIcon: {
    marginTop: 2,
  },
  textArea: {
    height: 90,
    textAlignVertical: "top",
    paddingVertical: 0,
  },
  sendBtn: {
    backgroundColor: "#1c56ea",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 10,
    gap: 8,
    shadowColor: "#1755da",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },
  sendBtnDisabled: {
    opacity: 0.7,
  },
  sendBtnText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 15,
  },

  // Footer Styles
  footerContainer: {
    marginTop: 35,
    alignItems: "center",
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
  },
  footerTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1e293b",
  },
  footerSub: {
    fontSize: 12,
    color: "#64748b",
    marginTop: 4,
    textAlign: "center",
  },
  socialRow: {
    flexDirection: "row",
    gap: 16,
    marginVertical: 16,
  },
  socialBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
  },
  copyright: {
    fontSize: 11,
    color: "#94a3b8",
    marginTop: 8,
  },
});
