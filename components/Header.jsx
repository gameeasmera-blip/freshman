import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useApp } from "../context/AppContext";
import { useRouter } from "expo-router";


export default function Header() {
  
  const router = useRouter();
  const { theme, toggleTheme, lang, setLang, t, user, logout } = useApp();
  const [langModal, setLangModal] = useState(false);
  const [menuModal, setMenuModal] = useState(false);

  const isDark = theme === "dark";

  return (
    <View style={[styles.container, isDark ? styles.darkBg : styles.lightBg]}>
      {/* 1. Language Dropdown Button */}
      <TouchableOpacity
        onPress={() => {
          console.log("User status:", user); // Terminal/Console irratti user jiraachuu isaa fi dhiisuu checks gochuuf
          if (user) {
            // 1. Maqaan faayila keessani app/ProfileScreen.jsx ta'naan:
            router.push("/Signin");

            // 2. Yoo faayilichi app/profile.jsx ykn app/(tabs)/profile.jsx ta'e immoo kanatti fayyadamaa:
            // router.push("/profile");
          } else {
            router.push("/Signin");
          }
        }}
        style={styles.profileBtn}
      >
        <Ionicons
          name={user ? "person-circle" : "person-circle-outline"}
          size={30}
          color={isDark ? "#60a5fa" : "#2563eb"}
        />
      </TouchableOpacity>

      {/* Right Action Icons */}
      <View style={styles.rightContainer}>
        {/* 2. Theme Toggle Switch */}
        <TouchableOpacity style={styles.iconBtn} onPress={toggleTheme}>
          <Ionicons
            name={isDark ? "sunny-outline" : "moon-outline"}
            size={22}
            color={isDark ? "#ffca28" : "#333"}
          />
        </TouchableOpacity>

        {/* 3. My Chart Button */}
        <TouchableOpacity style={styles.chartBtn}>
          <Ionicons name="stats-chart" size={15} color="#fff" />
          <Text style={styles.btnText}>{t?.myChart || "Chart"}</Text>
        </TouchableOpacity>

        {/* 4. Profile Icon Button */}
        <TouchableOpacity
          style={[
            styles.langBtn,
            isDark ? styles.darkBorder : styles.lightBorder,
          ]}
          onPress={() => setLangModal(true)}
        >
          <Ionicons
            name="globe-outline"
            size={18}
            color={isDark ? "#fff" : "#333"}
          />
          <Text
            style={[
              styles.langText,
              isDark ? styles.darkText : styles.lightText,
            ]}
          >
            {lang}
          </Text>
        </TouchableOpacity>

        {/* 5. Hamburger Menu Line Sadii */}
        <TouchableOpacity
          style={styles.iconBtn}
          onPress={() => setMenuModal(true)}
        >
          <Feather name="menu" size={26} color={isDark ? "#fff" : "#333"} />
        </TouchableOpacity>
      </View>

      {/* Modal 1: Afaan Filachuuf */}
      <Modal visible={langModal} transparent animationType="fade">
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setLangModal(false)}
        >
          <View style={[styles.modalContent, isDark && styles.darkModal]}>
            <Text style={[styles.modalTitle, isDark && styles.darkText]}>
              Select Language / Afaan Filadhu
            </Text>
            {[
              { code: "ENG", label: "English" },
              { code: "AMH", label: "አማርኛ" },
              { code: "ORM", label: "Afaan Oromoo" },
            ].map((item) => (
              <TouchableOpacity
                key={item.code}
                style={styles.modalOption}
                onPress={() => {
                  setLang(item.code);
                  setLangModal(false);
                }}
              >
                <Text style={[styles.optionText, isDark && styles.darkText]}>
                  {item.label} ({item.code})
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>

      {/* Modal 2: Menu Dropdown */}
      <Modal visible={menuModal} transparent animationType="slide">
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setMenuModal(false)}
        >
          <View style={[styles.menuContent, isDark && styles.darkModal]}>
            <TouchableOpacity
              onPress={() => {
                setMenuModal(false);
                router.push("/");
              }}
              style={styles.menuItem}
            >
              <Ionicons
                name="home-outline"
                size={20}
                color={isDark ? "#fff" : "#333"}
              />
              <Text style={[styles.menuItemText, isDark && styles.darkText]}>
                HOME
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setMenuModal(false);
               router.push("/AdminLoginScreen"); // React Navigation Name
              }}
              style={styles.menuItem}
            >
              <Ionicons
                name="shield-checkmark-outline"
                size={20}
                color={isDark ? "#fff" : "#333"}
              />
              <Text style={[styles.menuItemText, isDark && styles.darkText]}>
                Admin Login
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setMenuModal(false);
                router.push("/MyCoursesScreen");
              }}
              style={styles.menuItem}
            >
              <Ionicons
                name="book-outline"
                size={20}
                color={isDark ? "#fff" : "#333"}
              />
              <Text style={[styles.menuItemText, isDark && styles.darkText]}>
                COURSES
              </Text>
            </TouchableOpacity>

            {/* Profile (Yoo user-n galmaa'eera ta'e mul'ata) */}
            <TouchableOpacity
              onPress={() => {
                setMenuModal(false);
                router.push("/Signin");
              }}
              style={styles.menuItem}
            >
              <Ionicons
                name="arrow-forward-circle-outline"
                size={20}
                color={isDark ? "#fff" : "#333"}
              />
              <Text style={[styles.menuItemText, isDark && styles.darkText]}>
                Signin
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => setMenuModal(false)}
            >
              <Ionicons
                name="information-circle-outline"
                size={20}
                color={isDark ? "#fff" : "#333"}
              />
              <Text style={[styles.menuItemText, isDark && styles.darkText]}>
                ABOUT
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                setMenuModal(false);
                router.push("/ContactAndCommentsScreen");
              }}
            >
              <Ionicons
                name="call-outline"
                size={20}
                color={isDark ? "#fff" : "#333"}
              />
              <Text style={[styles.menuItemText, isDark && styles.darkText]}>
                CONTACT
              </Text>
            </TouchableOpacity>

            {!user ? (
              <>
                <TouchableOpacity
                  onPress={() => {
                    setMenuModal(false);
                    router.push("/SignUp");
                  }}
                  style={styles.menuItem}
                >
                  <Ionicons
                    name="person-add-outline"
                    size={20}
                    color={isDark ? "#fff" : "#333"}
                  />
                  <Text
                    style={[styles.menuItemText, isDark && styles.darkText]}
                  >
                    SIGNUP
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setMenuModal(false);
                    router.push("/Signin");
                  }}
                  style={styles.menuItem}
                >
                  <Ionicons
                    name="log-in-outline"
                    size={20}
                    color={isDark ? "#fff" : "#333"}
                  />
                  <Text
                    style={[styles.menuItemText, isDark && styles.darkText]}
                  >
                    LOGIN
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  setMenuModal(false);
                  logout && logout();
                }}
                style={styles.menuItem}
              >
                <Ionicons name="log-out-outline" size={20} color="#ef4444" />
                <Text style={[styles.menuItemText, { color: "#ef4444" }]}>
                  LOGOUT
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Dogoggorri sirreeffameera
    paddingHorizontal: 15,
    paddingTop: 50,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  lightBg: { backgroundColor: "#ffffff" },
  darkBg: { backgroundColor: "#121212" },
  lightText: { color: "#333333" },
  darkText: { color: "#ffffff" },
  lightBorder: { borderColor: "#ccc" },
  darkBorder: { borderColor: "#444" },
  langBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    gap: 4,
  },
  langText: { fontSize: 12, fontWeight: "bold" },
  rightContainer: { flexDirection: "row", alignItems: "center", gap: 8 },
  iconBtn: { padding: 4 },
  chartBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2563eb",
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 8,
    gap: 4,
  },
  profileBtn: {
    paddingHorizontal: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: { color: "#fff", fontSize: 12, fontWeight: "600" },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
  },
  darkModal: {
    backgroundColor: "#1e1e1e",
  },
  menuContent: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    position: "absolute",
    top: 90,
    right: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 15 },
  modalOption: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  optionText: { fontSize: 14 },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    gap: 12,
  },
  menuItemText: { fontSize: 16, fontWeight: "600" },
});
