// app/CourseDetailScreen.jsx
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getCourseById } from "../constants/courses";
import { useAuth } from "../context/authProvider";
import { getMyAccessStatus } from "../services/databaseService";

export default function CourseDetailScreen() {
  const router = useRouter();
  const { user, checkAuth } = useAuth();
  const { courseId, courseTitle } = useLocalSearchParams();

  const course = getCourseById(courseId);
  const title = courseTitle || course?.title || "Koorsii";

  // ============================================================
  // STATE
  // ============================================================
  const [access, setAccess] = useState({
    isPaid: false,
    status: "loading",
    reason: "",
    lastPayment: null,
  });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // ============================================================
  // LOAD INITIAL ACCESS
  // ============================================================
  useEffect(() => {
    let isMounted = true;

    const loadInitial = async () => {
      try {
        if (!user?.$id) {
          if (isMounted) {
            setAccess({
              isPaid: false,
              status: "none",
              reason: "",
              lastPayment: null,
            });
          }
          return;
        }

        const status = await getMyAccessStatus(user.$id);
        if (isMounted) setAccess(status);
      } catch (e) {
        console.error("CourseDetail loadAccess:", e);
        if (isMounted) {
          const fallbackPaid =
            user?.prefs?.isPaid === true ||
            user?.prefs?.paymentStatus === "approved" ||
            user?.prefs?.status === "active";
          setAccess({
            isPaid: fallbackPaid,
            status: user?.prefs?.paymentStatus || "none",
            reason: user?.prefs?.rejectionReason || "",
            lastPayment: null,
          });
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadInitial();

    return () => {
      isMounted = false;
    };
  }, [user]);

  // ============================================================
  // REFRESH
  // ============================================================
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await checkAuth();
      if (user?.$id) {
        const status = await getMyAccessStatus(user.$id);
        setAccess(status);
      }
    } catch (e) {
      console.error("refresh:", e);
    } finally {
      setRefreshing(false);
    }
  }, [checkAuth, user]);

  // ============================================================
  // LOADING VIEW
  // ============================================================
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2563EB" />
        <Text style={styles.loadingText}>Odeeffannoo fidaa jira...</Text>
      </View>
    );
  }

  // ============================================================
  // 🔒 LOCKED / PENDING VIEW (Kaffaltiin Mirkanaa'uu Yoo Baate)
  // ============================================================
  if (!access.isPaid) {
    const isPending = access.status === "pending";
    const isRejected = access.status === "rejected";

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
        <ScrollView
          contentContainerStyle={styles.lockedScroll}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backBtn}
          >
            <Text style={styles.backText}>← Deebii</Text>
          </TouchableOpacity>

          <View style={styles.lockedBox}>
            <Text style={styles.lockIcon}>
              {isPending ? "⏳" : isRejected ? "❌" : "🔒"}
            </Text>

            <Text style={styles.lockedTitle}>
              {isPending
                ? "Mirkaneessuu Irra Jira (Pending)"
                : isRejected
                  ? "Kaffaltiin Dhorkameera"
                  : "Koorsiin Kun Cufaa Jira"}
            </Text>

            <Text style={styles.lockedText}>
              {isPending
                ? `${title} argachuuf kaffaltiin kee admin biraa mirkaneessuu irra (pending) jira. Vidiyoofi Barruun PDF hanga mirkanaa'utti cufaadha.`
                : isRejected
                  ? access.reason ||
                    "Nagaheen kaffaltii hin fudhatamne. Maaloo irra deebi'ii galchi."
                  : `${title} argachuuf jalqaba kaffaltii raawwachuu qabda.`}
            </Text>

            {/* Yoo Rejection Reason Jiraate */}
            {isRejected && access.reason ? (
              <View style={styles.reasonBox}>
                <Text style={styles.reasonTitle}>📌 Sababa Dhorkii:</Text>
                <Text style={styles.reasonText}>{access.reason}</Text>
              </View>
            ) : null}

            {/* Preview Material Section (Cufaa ta'uu isaanii agarsiisuuf) */}
            <View style={styles.previewContainer}>
              <Text style={styles.previewHeader}>
                Qabiyyeewwan Koorsii (Eegumsa Irra):
              </Text>

              <View style={styles.previewCard}>
                <Text style={styles.previewIcon}>📹</Text>
                <View style={{ flex: 1 }}>
                  <Text style={styles.previewTitle}>Vidiyoowwan Barnootaa</Text>
                  <Text style={styles.previewStatusPending}>
                    {isPending ? "⏳ Pending..." : "🔒 Cufaa (Locked)"}
                  </Text>
                </View>
              </View>

              <View style={styles.previewCard}>
                <Text style={styles.previewIcon}>📄</Text>
                <View style={{ flex: 1 }}>
                  <Text style={styles.previewTitle}>Barruulee PDF (Notes)</Text>
                  <Text style={styles.previewStatusPending}>
                    {isPending ? "⏳ Pending..." : "🔒 Cufaa (Locked)"}
                  </Text>
                </View>
              </View>
            </View>

            {/* Buttons */}
            {isPending ? (
              <TouchableOpacity
                style={[styles.primaryBtn, styles.pendingBtn]}
                onPress={onRefresh}
                disabled={refreshing}
              >
                {refreshing ? (
                  <ActivityIndicator color="#FFF" />
                ) : (
                  <Text style={styles.primaryBtnText}>
                    🔄 Haala Kee Haaromsi (Refresh Status)
                  </Text>
                )}
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.primaryBtn}
                onPress={() =>
                  router.replace({
                    pathname: "/Payment",
                    params: { courseId, courseTitle: title },
                  })
                }
              >
                <Text style={styles.primaryBtnText}>
                  💳 Gara Kaffaltiitti Deemi
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // ============================================================
  // ✅ UNLOCKED VIEW (Admin Approved Yeroo Ta'u)
  // ============================================================
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
      <ScrollView
        contentContainerStyle={styles.scroll}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backText}>← Deebii</Text>
        </TouchableOpacity>

        <View style={styles.accessBanner}>
          <Text style={styles.accessIcon}>🎉</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.accessTitle}>Kaffaltiin Kee Mirkanaaeera!</Text>
            <Text style={styles.accessSub}>
              Vidiyoofi Barruulee PDF hundaa daawwachuu dandeessa.
            </Text>
          </View>
        </View>

        <View style={styles.hero}>
          <Text style={styles.heroBadge}>✅ Amma Barachaa Jirtu</Text>
          <Text style={styles.heroTitle}>{title}</Text>
          <Text style={styles.heroMeta}>
            ⏱ {course?.duration || "—"} | 📊 {course?.level || "—"}
          </Text>
        </View>

        {/* Barnoota Vidiyoo fi PDF */}
        <Text style={styles.sectionTitle}>Barnoota Vidiyoo & PDF 📖</Text>

        {(course?.lessons || []).map((lesson, index) => (
          <TouchableOpacity
            key={`${courseId}-${index}`}
            style={styles.lessonCard}
            onPress={() =>
              Alert.alert(
                `Barnoota ${index + 1}`,
                `Vidiyoo ykn PDF ${lesson} saquuf qophaa'eera.`,
              )
            }
          >
            <View style={styles.lessonNumber}>
              <Text style={styles.lessonNumberText}>{index + 1}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.lessonText}>{lesson}</Text>
              <Text style={styles.lessonType}>📹 Vidiyoo + 📄 PDF Note</Text>
            </View>
            <Text style={styles.playIcon}>▶️</Text>
          </TouchableOpacity>
        ))}

        


        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            💡 Hubachiisa: Vidiyoofi PDFwwan barnootaa hundi bananiiru. Yeroo
            barbaaddeetti barachuu dandeessa.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  loadingText: { marginTop: 10, color: "#64748B", fontWeight: "600" },

  scroll: { padding: 20, paddingBottom: 60 },
  lockedScroll: { flexGrow: 1, padding: 20 },

  backBtn: { marginBottom: 12 },
  backText: { color: "#2563EB", fontWeight: "700", fontSize: 15 },

  lockedBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  lockIcon: { fontSize: 56, marginBottom: 12 },
  lockedTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 8,
    textAlign: "center",
  },
  lockedText: {
    fontSize: 14,
    color: "#64748B",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 21,
  },
  reasonBox: {
    backgroundColor: "#FEF2F2",
    borderWidth: 1,
    borderColor: "#FCA5A5",
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    width: "100%",
  },
  reasonTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: "#991B1B",
    marginBottom: 4,
  },
  reasonText: { fontSize: 14, color: "#7F1D1D", lineHeight: 20 },

  // Preview List Items
  previewContainer: {
    width: "100%",
    backgroundColor: "#F1F5F9",
    borderRadius: 12,
    padding: 14,
    marginBottom: 20,
  },
  previewHeader: {
    fontSize: 13,
    fontWeight: "700",
    color: "#475569",
    marginBottom: 10,
  },
  previewCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  previewIcon: { fontSize: 22, marginRight: 10 },
  previewTitle: { fontSize: 14, fontWeight: "700", color: "#1E293B" },
  previewStatusPending: {
    fontSize: 12,
    color: "#D97706",
    fontWeight: "700",
    marginTop: 2,
  },

  pendingBtn: { backgroundColor: "#F59E0B" },

  accessBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ECFDF5",
    borderWidth: 1,
    borderColor: "#A7F3D0",
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
  },
  accessIcon: { fontSize: 32, marginRight: 12 },
  accessTitle: { fontSize: 15, fontWeight: "800", color: "#065F46" },
  accessSub: { fontSize: 13, color: "#047857", marginTop: 2 },

  hero: {
    backgroundColor: "#EFF6FF",
    borderRadius: 14,
    padding: 20,
    borderWidth: 1,
    borderColor: "#BFDBFE",
    marginBottom: 22,
  },
  heroBadge: {
    color: "#10B981",
    fontWeight: "800",
    fontSize: 13,
    marginBottom: 8,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 6,
  },
  heroMeta: { fontSize: 14, color: "#475569", fontWeight: "600" },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 12,
  },
  lessonCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  lessonNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#2563EB",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  lessonNumberText: { color: "#FFF", fontWeight: "800", fontSize: 13 },
  lessonText: { fontSize: 14, color: "#0F172A", fontWeight: "700" },
  lessonType: { fontSize: 12, color: "#64748B", marginTop: 2 },
  playIcon: { fontSize: 16, marginLeft: 8 },

  primaryBtn: {
    backgroundColor: "#2563EB",
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 10,
    width: "100%",
  },
  primaryBtnText: { color: "#FFF", fontSize: 16, fontWeight: "800" },
  ghostBtn: { marginTop: 14, paddingVertical: 12 },
  ghostBtnText: { color: "#64748B", fontWeight: "700", fontSize: 14 },

  allCoursesHeader: { marginTop: 30, marginBottom: 12 },
  allCoursesTitle: { fontSize: 18, fontWeight: "800", color: "#0F172A" },
  allCoursesSub: {
    fontSize: 13,
    color: "#64748B",
    marginTop: 4,
    lineHeight: 18,
  },
  allCourseCard: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  allCourseCardActive: {
    borderColor: "#2563EB",
    backgroundColor: "#EFF6FF",
  },
  allCourseTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 4,
  },
  allCourseMeta: { fontSize: 12, color: "#64748B", fontWeight: "600" },
  allCourseBadge: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: "#10B981",
  },
  allCourseBadgeActive: { backgroundColor: "#2563EB" },
  allCourseBadgeText: { color: "#FFF", fontWeight: "800", fontSize: 12 },

  infoBox: {
    backgroundColor: "#F1F5F9",
    borderRadius: 12,
    padding: 14,
    marginTop: 20,
    borderLeftWidth: 4,
    borderLeftColor: "#2563EB",
  },
  infoText: { fontSize: 13, color: "#475569", lineHeight: 19 },
});
