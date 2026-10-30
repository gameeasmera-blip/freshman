import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from "react-native";
import { useRouter } from "expo-router";
import ContactAndCommentsScreen from "./ContactAndCommentsScreen";
import Header from "../components/Header";
import { AppProvider, useApp } from "../context/AppContext";



// 1. Component FreshmanWelcome
export function FreshmanWelcome({ navigation }) {

  const router = useRouter();
  const { theme, t } = useApp();
  const isDark = theme === "dark";
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View
        style={[
          localStyles.body,
          isDark ? localStyles.darkBody : localStyles.lightBody,
        ]}
      >
        {/* Welcome Text */}
        <Text
          style={[
            localStyles.text,
            isDark ? localStyles.darkText : localStyles.lightText,
          ]}
        >
          {t.welcome}
        </Text>

        {/* Card Odeeffannoo Freshman */}
        <View
          style={[
            localStyles.infoCard,
            isDark ? localStyles.darkCard : localStyles.lightCard,
          ]}
        >
          <Text
            style={[
              localStyles.cardTitle,
              isDark ? localStyles.darkText : localStyles.lightText,
            ]}
          >
            {t?.game || t?.welcome}
          </Text>

          <Text
            style={[
              localStyles.cardDescription,
              isDark ? localStyles.darkSubText : localStyles.lightSubText,
            ]}
          >
            {t?.bony}
          </Text>

          {/* Tarree Odeeffannoo Gabaabaa */}
          <View style={localStyles.bulletList}>
            <Text
              style={[
                localStyles.bulletItem,
                isDark ? localStyles.darkText : localStyles.lightText,
              ]}
            >
              {t?.lali}
            </Text>
            <Text
              style={[
                localStyles.bulletItem,
                isDark ? localStyles.darkText : localStyles.lightText,
              ]}
            >
              {t?.lami}
            </Text>
            <Text
              style={[
                localStyles.bulletItem,
                isDark ? localStyles.darkText : localStyles.lightText,
              ]}
            >
              {t?.bilo}
            </Text>
          </View>
        </View>

        {/* Button Gara Barnoota Keessaniitti Geessu */}
        <TouchableOpacity
          onPress={() => router.push("/HomeScreen")}
          style={localStyles.button}
          activeOpacity={0.7}
        
        >
          <Text style={localStyles.buttonText}>{t?.dare}</Text>
        </TouchableOpacity>
      </View>
      <ContactAndCommentsScreen />
      
    </ScrollView>
  );
}


// 2. Main App Component
export default function App() {
  return (
    <AppProvider>
      <View style={styles.container}>
        <StatusBar barStyle="auto" />
        <Header />
        <FreshmanWelcome />
        <ContactAndCommentsScreen />
      
      </View>
    </AppProvider>
  );
}

// Style FreshmanWelcome (Cufamni }); dabalameera)
const localStyles = StyleSheet.create({
  // Body & Container Styles (Defined)
  body: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  lightBody: {
    backgroundColor: "#857373",
  },
  darkBody: {
    backgroundColor: "#0b0e16",
  },

  // Text Styles (Defined)
  text: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  
  },
  lightText: {
    color: "#0F172A",
  },
  darkText: {
    color: "#F8FAFC",
  },

  // Card Styles
  infoCard: {
    padding: 16,
    borderRadius: 12,
    marginVertical: 16,
    width: "100%",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  lightCard: {
    backgroundColor: "#F8F9FA",
    borderWidth: 1,
    borderColor: "#E9ECEF",
  },
  darkCard: {
    backgroundColor: "#1E293B",
    borderWidth: 1,
    borderColor: "#334155",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  lightSubText: {
    color: "#4B5563",
  },
  darkSubText: {
    color: "#9CA3AF",
  },
  bulletList: {
    marginTop: 4,
    gap: 6,
  },
  bulletItem: {
    fontSize: 14,
  },

  // Button Styles
  button: {
    backgroundColor: "#2563EB",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    width: "100%",
    shadowColor: "#2563EB",
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
});
// App Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  lightBody: { backgroundColor: "#2b3137" },
  darkBody: { backgroundColor: "#1e1e1e" },
  lightText: { color: "#111827", fontSize: 18, fontWeight: "bold" },
  darkText: { color: "#dde2e6", fontSize: 18, fontWeight: "bold" },
});
