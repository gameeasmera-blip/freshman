// app/MyCoursesScreen.jsx
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getAllCourses } from "../constants/courses";
import { useAuth } from "../context/authProvider";
import { getMyPaidCourses } from "../services/databaseService";

export default function MyCoursesScreen() {
  const router = useRouter();
  const { user } = useAuth();

  const [paidCourses, setPaidCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Koorsii bitame fidu
  const loadMyCourses = useCallback(async () => {
    if (!user?.$id) {
      setPaidCourses([]);
      setLoading(false);
      return;
    }

    try {
      const list = await getMyPaidCourses(user.$id);
      setPaidCourses(list);
    } catch (e) {
      console.error("loadMyCourses:", e);
      setPaidCourses([]);
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Yeroo screen banamu (focus) haaromsi
  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      loadMyCourses();
    }, [loadMyCourses]),
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadMyCourses();
    setRefreshing(false);
  }, [loadMyCourses]);

  // ============================================================
  // LOADING
  // ============================================================
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2563EB" />
        <Text style={styles.loadingText}>Koorsii kee fidaa jira...</Text>
      </View>
    );
  }

  // ============================================================
  // EMPTY STATE (koorsii hin bitanne)
  // ============================================================
  if (paidCourses.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
        <View style={styles.header}>
          <Text style={styles.headerTitle}>📚 Koorsiiwwan Koo</Text>
        </View>

        <View style={styles.emptyBox}>
          <Text style={styles.emptyIcon}>📭</Text>
          <Text style={styles.emptyTitle}>Koorsii Hin Bitanne</Text>
          <Text style={styles.emptyText}>
            Amma koorsii hin bitanne. Koorsiiwwan jiran ilaalii, kan barbaaddu
            filachuun barachuu jalqabi.
          </Text>

          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={() => router.push("/CoursesScreen")}
          >
            <Text style={styles.primaryBtnText}>🎓 Koorsiiwwan Ilaali</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // ============================================================
  // KOORSII BITAME AGARSIISI
  // ============================================================
  const allCourses = getAllCourses();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>📚 Koorsiiwwan Koo</Text>
        <Text style={styles.headerSub}>
          {paidCourses.length} koorsii banamaa qabda
        </Text>
      </View>

      <FlatList
        data={paidCourses}
        keyExtractor={(item) => item.courseId}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item }) => {
          const full = allCourses.find((c) => c.id === item.courseId);
          return (
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                router.push({
                  pathname: "/CourseDetailScreen",
                  params: {
                    courseId: item.courseId,
                    courseTitle: item.courseTitle,
                  },
                })
              }
            >
              <View style={styles.cardBadge}>
                <Text style={styles.cardBadgeText}>✅ Banamaa</Text>
              </View>

              <Text style={styles.cardTitle}>
                {full?.title || item.courseTitle}
              </Text>

              <Text style={styles.cardMeta}>
                ⏱ {full?.duration || "—"} | 📊 {full?.level || "—"}
              </Text>

              <Text style={styles.cardPaidAt}>
                💳 Kaffalame: {new Date(item.paidAt).toLocaleDateString()}
              </Text>

              <View style={styles.cardFooter}>
                <Text style={styles.cardCta}>Barachuu Itti Fufi →</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  loadingText: { marginTop: 10, color: "#64748B", fontWeight: "600" },

  header: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 8 },
  headerTitle: { fontSize: 24, fontWeight: "800", color: "#0F172A" },
  headerSub: { fontSize: 13, color: "#64748B", marginTop: 4 },

  list: { padding: 20, paddingBottom: 60 },

  // Empty State
  emptyBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },
  emptyIcon: { fontSize: 60, marginBottom: 12 },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: "#64748B",
    textAlign: "center",
    lineHeight: 21,
    marginBottom: 24,
  },

  // Card
  card: {
    backgroundColor: "#FFF",
    borderRadius: 14,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#ECFDF5",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 8,
  },
  cardBadgeText: { color: "#065F46", fontWeight: "800", fontSize: 11 },
  cardTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 4,
  },
  cardMeta: { fontSize: 13, color: "#475569", fontWeight: "600" },
  cardPaidAt: { fontSize: 12, color: "#64748B", marginTop: 6 },
  cardFooter: {
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
    paddingTop: 10,
  },
  cardCta: { color: "#2563EB", fontWeight: "800", fontSize: 14 },

  primaryBtn: {
    backgroundColor: "#2563EB",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 24,
    alignItems: "center",
  },
  primaryBtnText: { color: "#FFF", fontSize: 15, fontWeight: "800" },
});
