// app/AdminDashboardScreen.jsx
import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
  Alert,
  Image,
  RefreshControl,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { account } from "../services/appwrite";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import {
  listPendingPayments,
  approvePaymentDoc,
  rejectPaymentDoc,
} from "../services/databaseService";

export default function AdminDashboardScreen() {
  const router = useRouter();

  const [admin, setAdmin] = useState(null);
  const [pending, setPending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [busyId, setBusyId] = useState(null);

  const [rejectTarget, setRejectTarget] = useState(null);
  const [rejectReason, setRejectReason] = useState("");

  // ---------- LOAD ----------
  const loadPending = useCallback(async () => {
    try {
      const docs = await listPendingPayments();
      setPending(docs || []);
    } catch (e) {
      console.error("loadPending:", e);
      Alert.alert("Dogoggora", e.message || "Kaffaltii fiduun hin danda'amne.");
    }
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await loadPending();
    } finally {
      setRefreshing(false);
    }
  }, [loadPending]);

  // ---------- INIT ----------
  useEffect(() => {
    let isMounted = true;

    const init = async () => {
      try {
        const user = await account.get();
        if (!isMounted) return;

        const hasAdmin =
          user?.prefs?.role === "admin" || user?.labels?.includes("admin");

        if (!hasAdmin) {
          Alert.alert("Dhorkaa", "Fuulli kun admin qofaaf.");
          router.replace("/HomeScreen");
          return;
        }

        setAdmin(user);
        await loadPending();
      } catch (e) {
        console.error("Admin init:", e);
        if (isMounted) router.replace("/LoginScreen");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    init();
    return () => {
      isMounted = false;
    };
  }, [router, loadPending]);

  // ---------- APPROVE ----------
  const handleApprove = (doc) => {
    Alert.alert(
      "✅ Mirkaneessi",
      `Maqaa: ${doc.userName || "N/A"}\nEmail: ${doc.userEmail}\nKoorsii: ${doc.courseTitle}\nKaffaltii: ${doc.amount} ETB\n\nMirkaneessuu barbaadda?`,
      [
        { text: "Dhiisi", style: "cancel" },
        {
          text: "Mirkaneessi ✅",
          onPress: async () => {
            setBusyId(doc.$id);
            try {
              await approvePaymentDoc({
                docId: doc.$id,
                adminId: admin?.$id || "",
                userId: doc.userId,
                courseId: doc.courseId,
              });
              setPending((prev) => prev.filter((d) => d.$id !== doc.$id));
              Alert.alert("Milkaa'e ✅", `${doc.userEmail} amma aksesii qaba.`);
            } catch (e) {
              console.error("approve error:", e);
              Alert.alert(
                "Dogoggora",
                e.message || "Mirkaneessuun hin milkoofne.",
              );
              loadPending();
            } finally {
              setBusyId(null);
            }
          },
        },
      ],
    );
  };

  // ---------- REJECT ----------
  const openRejectModal = (doc) => {
    setRejectTarget(doc);
    setRejectReason("");
  };

  const confirmReject = async () => {
    if (!rejectReason.trim()) {
      Alert.alert("Hir'ina", "Maaloo sababa dhorkii barreessi.");
      return;
    }
    setBusyId(rejectTarget.$id);
    try {
      await rejectPaymentDoc({
        docId: rejectTarget.$id,
        adminId: admin?.$id || "",
        reason: rejectReason.trim(),
      });
      setPending((prev) => prev.filter((d) => d.$id !== rejectTarget.$id));
      Alert.alert("Dhorkame ❌", `${rejectTarget.userEmail} dhorkameera.`);
      setRejectTarget(null);
      setRejectReason("");
    } catch (e) {
      console.error("reject error:", e);
      Alert.alert("Dogoggora", e.message || "Dhorkuun hin milkoofne.");
    } finally {
      setBusyId(null);
    }
  };

  // ---------- LOGOUT ----------
  const handleLogout = () => {
    Alert.alert("Ba'uu", "Admin account irraa ba'uu barbaadda?", [
      { text: "Dhiisi", style: "cancel" },
      {
        text: "Ba'i",
        style: "destructive",
        onPress: async () => {
          try {
            await account.deleteSession("current");
          } catch {}
          router.replace("/LoginScreen");
        },
      },
    ]);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2563EB" />
        <Text style={styles.loadingText}>Kaffaltii fidaa jira...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#151617" />
      <ScrollView
        contentContainerStyle={styles.scroll}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#FFF"
          />
        }
      >
        {/* HEADER */}
        <View style={styles.headerRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.headerSmall}>👑 Admin Dashboard</Text>
            <Text style={styles.headerName}>
              {admin?.name || admin?.email || "Admin"}
            </Text>
          </View>
          <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={18} color="#FFF" />
          </TouchableOpacity>
        </View>

        {/* STATS */}
        <View style={styles.statRow}>
          <View style={styles.statBox}>
            <Text style={styles.statNum}>{pending.length}</Text>
            <Text style={styles.statLabel}>Eegaa Jiran</Text>
          </View>
          <View style={[styles.statBox, styles.statBoxGreen]}>
            <Ionicons name="checkmark-circle" size={22} color="#10B981" />
            <Text style={styles.statLabelGreen}>Mirkaneessuu</Text>
          </View>
          <View style={[styles.statBox, styles.statBoxRed]}>
            <Ionicons name="close-circle" size={22} color="#EF4444" />
            <Text style={styles.statLabelRed}>Dhorki</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Kaffaltii Mirkaneessuu Eegaa</Text>

        {pending.length === 0 ? (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyIcon}>✅</Text>
            <Text style={styles.emptyText}>Kaffaltiin eegaa hin jiru</Text>
            <Text style={styles.emptySub}>
              Yeroo fayyadamaan nagahee galchu, asitti mulata.
            </Text>
            <TouchableOpacity style={styles.refreshBtn} onPress={onRefresh}>
              <Ionicons name="refresh" size={16} color="#2563EB" />
              <Text style={styles.refreshBtnText}>Haaromsi</Text>
            </TouchableOpacity>
          </View>
        ) : (
          pending.map((doc) => {
            const isBusy = busyId === doc.$id;
            return (
              <View key={doc.$id} style={styles.card}>
                <View style={styles.cardHeader}>
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>
                      {(doc.userName || doc.userEmail || "U")
                        .charAt(0)
                        .toUpperCase()}
                    </Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.userName}>{doc.userName || "N/A"}</Text>
                    <Text style={styles.userEmail}>{doc.userEmail}</Text>
                  </View>
                  <View style={styles.pendingBadge}>
                    <Text style={styles.pendingBadgeText}>⏳ Eega</Text>
                  </View>
                </View>

                <View style={styles.infoBox}>
                  <View style={styles.infoRow}>
                    <Ionicons name="book-outline" size={16} color="#94A3B8" />
                    <Text style={styles.infoText}>{doc.courseTitle}</Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Ionicons name="cash-outline" size={16} color="#10B981" />
                    <Text style={styles.infoText}>{doc.amount} ETB</Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Ionicons
                      name="phone-portrait-outline"
                      size={16}
                      color="#94A3B8"
                    />
                    <Text style={styles.infoText}>{doc.method}</Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Ionicons name="time-outline" size={16} color="#94A3B8" />
                    <Text style={styles.infoText}>
                      {new Date(doc.$createdAt).toLocaleString()}
                    </Text>
                  </View>
                </View>

                {doc.receiptFileUrl ? (
                  <View style={styles.receiptWrapper}>
                    <Text style={styles.receiptLabel}>📸 Suuraa Nagahee:</Text>
                    <Image
                      source={{ uri: doc.receiptFileUrl }}
                      style={styles.receiptImg}
                      resizeMode="cover"
                    />
                  </View>
                ) : (
                  <Text style={styles.noImg}>📭 Suuraa nagahee hin jiru</Text>
                )}

                <View style={styles.actionRow}>
                  <TouchableOpacity
                    style={[
                      styles.actionBtn,
                      styles.approveBtn,
                      isBusy && styles.btnDisabled,
                    ]}
                    onPress={() => handleApprove(doc)}
                    disabled={isBusy}
                    activeOpacity={0.8}
                  >
                    {isBusy ? (
                      <ActivityIndicator color="#FFF" size="small" />
                    ) : (
                      <>
                        <Ionicons
                          name="checkmark-circle"
                          size={18}
                          color="#FFF"
                        />
                        <Text style={styles.actionText}>Mirkaneessi</Text>
                      </>
                    )}
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.actionBtn,
                      styles.rejectBtn,
                      isBusy && styles.btnDisabled,
                    ]}
                    onPress={() => openRejectModal(doc)}
                    disabled={isBusy}
                    activeOpacity={0.8}
                  >
                    <Ionicons name="close-circle" size={18} color="#FFF" />
                    <Text style={styles.actionText}>Dhorki</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })
        )}
      </ScrollView>

      {/* REJECT MODAL */}
      <Modal
        visible={!!rejectTarget}
        transparent
        animationType="slide"
        onRequestClose={() => setRejectTarget(null)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.modalOverlay}
        >
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Ionicons name="close-circle" size={26} color="#EF4444" />
              <Text style={styles.modalTitle}>Sababa Dhorkii</Text>
            </View>

            <Text style={styles.modalSub}>
              {rejectTarget?.userEmail} — maaliif akka dhorkame barreessi.
            </Text>

            <TextInput
              style={styles.modalInput}
              placeholder="Fak. Suuraan nagahee ifa miti..."
              placeholderTextColor="#64748B"
              value={rejectReason}
              onChangeText={setRejectReason}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalBtn, styles.modalCancel]}
                onPress={() => setRejectTarget(null)}
                disabled={busyId === rejectTarget?.$id}
              >
                <Text style={styles.modalCancelText}>Dhiisi</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalBtn, styles.modalConfirm]}
                onPress={confirmReject}
                disabled={busyId === rejectTarget?.$id}
              >
                {busyId === rejectTarget?.$id ? (
                  <ActivityIndicator color="#FFF" />
                ) : (
                  <Text style={styles.modalConfirmText}>Dhorki ❌</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
}

// ============================================================
// STYLES
// ============================================================
const styles = StyleSheet.create({
  // ============ CONTAINER ============
  container: {
    flex: 1,
    backgroundColor: "#151617",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#151617",
  },
  loadingText: {
    marginTop: 10,
    color: "#94A3B8",
    fontWeight: "600",
  },
  scroll: {
    padding: 20,
    paddingBottom: 60,
  },

  // ============ HEADER ============
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  headerSmall: {
    fontSize: 13,
    color: "#94A3B8",
    fontWeight: "700",
  },
  headerName: {
    fontSize: 22,
    fontWeight: "800",
    color: "#FFF",
    marginTop: 2,
  },
  logoutBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#1E293B",
    borderWidth: 1,
    borderColor: "#334155",
    alignItems: "center",
    justifyContent: "center",
  },

  // ============ STATS ============
  statRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 24,
  },
  statBox: {
    flex: 1,
    backgroundColor: "#1E293B",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#334155",
    minHeight: 80,
  },
  statBoxGreen: { borderColor: "#065F46" },
  statBoxRed: { borderColor: "#7F1D1D" },
  statNum: {
    fontSize: 26,
    fontWeight: "800",
    color: "#FFF",
  },
  statLabel: {
    fontSize: 11,
    color: "#94A3B8",
    marginTop: 4,
    fontWeight: "700",
  },
  statLabelGreen: {
    fontSize: 11,
    color: "#10B981",
    marginTop: 4,
    fontWeight: "700",
  },
  statLabelRed: {
    fontSize: 11,
    color: "#EF4444",
    marginTop: 4,
    fontWeight: "700",
  },

  // ============ SECTION ============
  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#FFF",
    marginBottom: 14,
  },

  // ============ EMPTY ============
  emptyBox: {
    alignItems: "center",
    paddingVertical: 60,
    backgroundColor: "#1E293B",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#334155",
  },
  emptyIcon: { fontSize: 48, marginBottom: 10 },
  emptyText: {
    color: "#FFF",
    fontSize: 15,
    fontWeight: "700",
  },
  emptySub: {
    color: "#94A3B8",
    fontSize: 12,
    marginTop: 6,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  refreshBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 16,
    backgroundColor: "#1E3A8A",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  refreshBtnText: {
    color: "#60A5FA",
    fontWeight: "800",
    fontSize: 13,
  },

  // ============ CARD ============
  card: {
    backgroundColor: "#1E293B",
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#334155",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#2563EB",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  avatarText: {
    color: "#FFF",
    fontWeight: "800",
    fontSize: 17,
  },
  userName: {
    fontSize: 15,
    fontWeight: "800",
    color: "#FFF",
  },
  userEmail: {
    fontSize: 12,
    color: "#94A3B8",
    marginTop: 2,
  },
  pendingBadge: {
    backgroundColor: "#78350F",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  pendingBadgeText: {
    color: "#FCD34D",
    fontSize: 11,
    fontWeight: "800",
  },

  // ============ INFO ============
  infoBox: {
    backgroundColor: "#0F172A",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    gap: 8,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  infoText: {
    color: "#E2E8F0",
    fontSize: 13,
    fontWeight: "600",
    flex: 1,
  },

  // ============ RECEIPT ============
  receiptWrapper: { marginBottom: 12 },
  receiptLabel: {
    color: "#94A3B8",
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 6,
  },
  receiptImg: {
    width: "100%",
    height: 220,
    borderRadius: 10,
    backgroundColor: "#0F172A",
  },
  noImg: {
    color: "#64748B",
    fontSize: 12,
    fontStyle: "italic",
    textAlign: "center",
    marginBottom: 12,
  },

  // ============ ACTIONS ============
  actionRow: {
    flexDirection: "row",
    gap: 8,
  },
  actionBtn: {
    flex: 1,
    flexDirection: "row",
    gap: 6,
    paddingVertical: 13,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  approveBtn: { backgroundColor: "#10B981" },
  rejectBtn: { backgroundColor: "#EF4444" },
  btnDisabled: { opacity: 0.6 },
  actionText: {
    color: "#FFF",
    fontWeight: "800",
    fontSize: 14,
  },

  // ============ MODAL ============
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "flex-end",
  },
  modalCard: {
    backgroundColor: "#1E293B",
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    padding: 22,
    paddingBottom: 32,
    borderTopWidth: 2,
    borderTopColor: "#EF4444",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#FFF",
  },
  modalSub: {
    fontSize: 13,
    color: "#94A3B8",
    marginBottom: 16,
    lineHeight: 19,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: "#334155",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: "#FFF",
    backgroundColor: "#0F172A",
    minHeight: 90,
    marginBottom: 16,
  },
  modalActions: {
    flexDirection: "row",
    gap: 8,
  },
  modalBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  modalCancel: { backgroundColor: "#334155" },
  modalCancelText: {
    color: "#E2E8F0",
    fontWeight: "800",
    fontSize: 14,
  },
  modalConfirm: { backgroundColor: "#EF4444" },
  modalConfirmText: {
    color: "#FFF",
    fontWeight: "800",
    fontSize: 14,
  },
});
