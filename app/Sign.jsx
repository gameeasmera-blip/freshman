// app/Signin.jsx
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useAuth } from "../context/authProvider";
import {  } from "../services/appwrite";

export default function Signin() {
  const router = useRouter();
  const { signIn, signUp } = useAuth();

  const [mode, setMode] = useState("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const isSignup = mode === "signup";

  const handleSubmit = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Hir'ina", "Imeelii fi jecha darbii guutuu qabda.");
      return;
    }
    if (isSignup && !name.trim()) {
      Alert.alert("Hir'ina", "Maaloo maqaa kee galchi.");
      return;
    }
    if (password.length < 6) {
      Alert.alert("Hir'ina", "Jechi darbii qubee 6 ta'uu qaba.");
      return;
    }

    setBusy(true);
    try {
      if (isSignup) await signUp({ name, email, password });
      else await signIn({ email, password });
      router.replace("/HomeScreen");
    } catch (e) {
      Alert.alert(
        isSignup ? "Dogoggora Galmee" : "Dogoggora Seensaa",
        e?.message || "Wanti tokko dogoggora.",
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
          <View style={styles.brandBox}>
            <Text style={styles.logo}>📚</Text>
            <Text style={styles.brandTitle}>Kirraa Learning</Text>
            <Text style={styles.brandSub}>
              {isSignup
                ? "Herrega haaraa uumiitii jalqabi"
                : "Baga deebitee! Seeni"}
            </Text>
          </View>

          <View style={styles.tabs}>
            <TouchableOpacity
              style={[styles.tab, !isSignup && styles.tabActive]}
              onPress={() => setMode("signin")}
            >
              <Text style={[styles.tabText, !isSignup && styles.tabTextActive]}>
                Seeni
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, isSignup && styles.tabActive]}
              onPress={() => setMode("signup")}
            >
              <Text style={[styles.tabText, isSignup && styles.tabTextActive]}>
                Galmaai
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.form}>
            {isSignup && (
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Maqaa Guutuu</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Fak. Abebe Kebede"
                  placeholderTextColor="#94A3B8"
                  value={name}
                  onChangeText={setName}
                />
              </View>
            )}

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Imeelii</Text>
              <TextInput
                style={styles.input}
                placeholder="example@gmail.com"
                placeholderTextColor="#94A3B8"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Jecha Darbii</Text>
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                placeholderTextColor="#94A3B8"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            <TouchableOpacity
              style={[styles.primaryBtn, busy && styles.btnDisabled]}
              onPress={handleSubmit}
              disabled={busy}
            >
              {busy ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <Text style={styles.primaryBtnText}>
                  {isSignup ? "Herrega Uumi" : "Seeni"}
                </Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setMode(isSignup ? "signin" : "signup")}
            >
              <Text style={styles.switchText}>
                {isSignup
                  ? "Herrega qabdaa? Seeni"
                  : "Herrega hin qabduu? Galmaa'i"}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  scroll: { flexGrow: 1, padding: 24, justifyContent: "center" },
  brandBox: { alignItems: "center", marginBottom: 28 },
  logo: { fontSize: 52, marginBottom: 8 },
  brandTitle: { fontSize: 26, fontWeight: "800", color: "#0F172A" },
  brandSub: {
    fontSize: 14,
    color: "#64748B",
    marginTop: 6,
    textAlign: "center",
  },
  tabs: {
    flexDirection: "row",
    backgroundColor: "#E2E8F0",
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
  },
  tab: { flex: 1, paddingVertical: 10, borderRadius: 9, alignItems: "center" },
  tabActive: {
    backgroundColor: "#FFF",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 3,
  },
  tabText: { fontSize: 15, fontWeight: "700", color: "#64748B" },
  tabTextActive: { color: "#2563EB" },
  form: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  inputGroup: { marginBottom: 16 },
  label: { fontSize: 13, fontWeight: "700", color: "#334155", marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: "#0F172A",
    backgroundColor: "#F8FAFC",
  },
  primaryBtn: {
    backgroundColor: "#2563EB",
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 6,
  },
  btnDisabled: { opacity: 0.6 },
  primaryBtnText: { color: "#FFF", fontSize: 16, fontWeight: "800" },
  switchText: {
    textAlign: "center",
    color: "#2563EB",
    fontWeight: "700",
    fontSize: 14,
    marginTop: 16,
  },
});
