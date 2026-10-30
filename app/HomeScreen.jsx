// app/HomeScreen.jsx
import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  StatusBar,
  Alert,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useAuth } from "../context/authProvider";
import { COURSES } from "../constants/courses";

export default function HomeScreen() {
  const router = useRouter();
  const { user: userData, initializing, refreshUser, signOut } = useAuth();
  const [refreshing, setRefreshing] = useState(false);

  // Auth Guard — yoo hin seenne gara Signin
  useEffect(() => {
    if (!initializing && !userData) router.replace("/Sign");
  }, [initializing, userData, router]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await refreshUser();
    } catch (e) {
      console.error("Refresh:", e);
    } finally {
      setRefreshing(false);
    }
  }, [refreshUser]);

  // Filannoo koorsii fi navigeesshinii
  const handleSelectCourse = (course) => {
    const isPaid =
      userData?.isPaid === true ||
      userData?.paymentStatus === "approved" ||
      userData?.status === "active";

    if (isPaid) {
      router.push({
        pathname: "/CourseDetailScreen",
        params: { courseId: course.id, courseTitle: course.title },
      });
    } else {
      Alert.alert(
        "Kaffaltii Barbaachisa",
        "Koorsii kana argachuuf jalqaba kaffaltii raawwadii sanada kaffaltii (receipt) olfeghuu qabda.",
        [
          { text: "Dhiisi", style: "cancel" },
          {
            text: "Kaffaltiitti Deemi",
            onPress: () =>
              router.push({
                pathname: "/Payment",
                params: { courseId: course.id, courseTitle: course.title },
              }),
          },
        ],
      );
    }
  };

  const handleLogout = () => {
    Alert.alert("Ba'uu", "Nutti aanee ba'uu barbaadda?", [
      { text: "Dhiisi", style: "cancel" },
      {
        text: "Ba'i",
        style: "destructive",
        onPress: async () => {
          await signOut();
          router.replace("/Sign");
        },
      },
    ]);
  };

  if (initializing || !userData) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2563EB" />
        <Text style={styles.loadingText}>Odeeffannoo fidaa jira...</Text>
      </View>
    );
  }

  const isPaid =
    userData?.isPaid === true ||
    userData?.paymentStatus === "approved" ||
    userData?.status === "active";
  const isPending = userData?.paymentStatus === "pending";

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.headerRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.welcomeText}>Baga Nagaan Dhufte 👋,</Text>
            <Text style={styles.userNameText}>
              {userData?.name || userData?.email || "Fayyadamaa"}
            </Text>
          </View>
          <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
            <Text style={styles.logoutText}>Bai</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Haala Account Keeti</Text>
          <Text style={styles.cardStatus}>
            {isPaid
              ? "✅ Kaffaltiin Mirkanaa'eera (Aksesii Qabda)"
              : isPending
                ? "⏳ Kaffaltiin kee mirkaneessuu irra jira"
                : "⏳ Kaffaltiin Hin Mirkanaa'ine"}
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Koorsii Filadhu 📚</Text>

        {COURSES.map((course) => (
          <TouchableOpacity
            key={course.id}
            style={styles.courseCard}
            onPress={() => handleSelectCourse(course)}
            activeOpacity={0.7}
          >
            <View style={styles.courseInfo}>
              <Text style={styles.courseTitle}>{course.title}</Text>
              <Text style={styles.coursePrice}>{course.price}</Text>
            </View>
            <View
              style={[
                styles.badge,
                isPaid ? styles.paidBadge : styles.pendingBadge,
              ]}
            >
              <Text style={styles.badgeText}>
                {isPaid ? "Baradhu ➔" : "Kaffali ➔"}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  loadingText: { marginTop: 10, color: "#64748B", fontWeight: "600" },
  scrollContent: { padding: 20 },
  headerRow: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  welcomeText: { fontSize: 16, color: "#64748B" },
  userNameText: { fontSize: 24, fontWeight: "800", color: "#0F172A" },
  logoutBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#FCA5A5",
    backgroundColor: "#FEF2F2",
  },
  logoutText: { color: "#DC2626", fontWeight: "700", fontSize: 13 },
  card: {
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginBottom: 24,
  },
  cardTitle: { fontSize: 13, color: "#64748B", marginBottom: 4 },
  cardStatus: { fontSize: 15, fontWeight: "700", color: "#0F172A" },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 14,
  },
  courseCard: {
    backgroundColor: "#FFF",
    borderRadius: 14,
    padding: 18,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    elevation: 2,
  },
  courseInfo: { flex: 1, paddingRight: 10 },
  courseTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 4,
  },
  coursePrice: { fontSize: 14, color: "#2563EB", fontWeight: "600" },
  badge: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8 },
  paidBadge: { backgroundColor: "#10B981" },
  pendingBadge: { backgroundColor: "#2563EB" },
  badgeText: { color: "#FFF", fontSize: 13, fontWeight: "700" },
});
