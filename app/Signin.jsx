import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Animated,
  Modal,
  StyleSheet,
} from "react-native";
import { useAuth } from "../context/authProvider";
import { account } from "../services/appwrite";

import { Ionicons } from "@expo/vector-icons";
import { globalstyles } from "../styles/globalStyles";
import * as Yup from "yup";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Formik } from "formik";

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email sirrii miti!")
    .required("Email barbaachisaadha"),
  password: Yup.string()
    .min(8, "Baay'ee gabaaba!")
    .required("Password barbaachisaadha"),
});

export default function Signin() {
  const { Signin: authSignIn } = useAuth(); // AuthContext keessaa Signin fudhanna
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { redirectTo } = useLocalSearchParams();

  // Modal States
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  // React Native keessatti toora kanaanis ni danda'ama:
  const [fadeAnim] = useState(() => new Animated.Value(0));
  const [slideAnim] = useState(() => new Animated.Value(50));

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }); // Dependency array asitti sirreeffameera

  const handleSignIn = async (values, { setSubmitting }) => {
    try {
      setSubmitting(true);

      // --- FURMAATA RAKKOO "MISSING SCOPES" ---
      try {
        await account.deleteSession("current");
      } catch {
        console.log("No active session to clear, moving to login.");
      }

      // Amma login goona
      const response = await account.createEmailPasswordSession(
        values.email,
        values.password,
      );

      // AuthProvider keessatti state jijjiiruuf
      if (authSignIn) {
        await authSignIn(response);
      }

      // Dynamic Redirect: Yoo Payment route irraa dhufe achitti deebisa, yoo hin jirre Home-tti deebisa
      if (redirectTo) {
        router.replace(redirectTo);
      } else {
        router.replace("/");
      }
    } catch (error) {
      console.log("Signin error:", error);
      setModalMessage(error.message || "Email ykn Password dogoggora!");
      setModalVisible(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={globalstyles?.cont || { flex: 1, backgroundColor: "#fff" }}
    >
      <Animated.View
        style={{
          flex: 1,
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        }}
      >
        <ScrollView contentContainerStyle={globalstyles?.scrollContainer}>
          <View style={globalstyles?.headerArea}>
            <Text style={globalstyles?.titl}>Sign In</Text>
            <Text style={globalstyles?.subtitle}>
              Welcome back! Please login.
            </Text>
          </View>

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={loginSchema}
            onSubmit={handleSignIn}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              isSubmitting,
            }) => (
              <View style={globalstyles?.formArea}>
                {/* Email Input */}
                <View style={globalstyles?.inputContainer}>
                  <Ionicons
                    name="mail-outline"
                    size={20}
                    color="#666"
                    style={globalstyles?.icon}
                  />
                  <TextInput
                    style={globalstyles?.input}
                    placeholder="Email Address"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={values.email}
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                  />
                </View>
                {touched.email && errors.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}

                {/* Password Input */}
                <View style={globalstyles?.inputContainer}>
                  <Ionicons
                    name="lock-closed-outline"
                    size={20}
                    color="#666"
                    style={globalstyles?.icon}
                  />
                  <TextInput
                    style={globalstyles?.input}
                    placeholder="Password"
                    secureTextEntry={!showPassword}
                    value={values.password}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Ionicons
                      name={showPassword ? "eye-outline" : "eye-off-outline"}
                      size={20}
                      color="#666"
                    />
                  </TouchableOpacity>
                </View>
                {touched.password && errors.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}

                {/* Login Button */}
                <TouchableOpacity
                  style={[
                    globalstyles?.button,
                    { opacity: isSubmitting ? 0.6 : 1 },
                  ]}
                  onPress={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={globalstyles?.buttonText}>Sign In</Text>
                  )}
                </TouchableOpacity>

                {/* Footer */}
                <View style={globalstyles?.footer}>
                  <Text style={globalstyles?.footerTex}>
                    Do not have an account?{" "}
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      router.push({
                        pathname: "/signUp",
                        params: redirectTo ? { redirectTo } : {},
                      })
                    }
                  >
                    <Text style={globalstyles?.linkText}>Sign Up</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Formik>
        </ScrollView>
      </Animated.View>

      {/* Error Modal */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Ionicons name="alert-circle" size={50} color="red" />
            <Text style={styles.modalText}>{modalMessage}</Text>
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => setModalVisible(false)}
            >
              <Text style={{ color: "#fff" }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  errorText: { color: "red", fontSize: 12, marginBottom: 10, marginLeft: 5 },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: { marginVertical: 15, textAlign: "center", fontSize: 16 },
  closeBtn: {
    backgroundColor: "red",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
});
