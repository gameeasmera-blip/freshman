import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  Alert,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../context/authProvider";
import { createOrGetUserProfile } from "../services/userService";

export default function StudentCoursesScreen() {
  const { user } = useAuth();
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const dummyCourses = [
    { id: "1", title: "Introduction to Computer Science", code: "CS101" },
    { id: "2", title: "Advanced Mathematics", code: "MATH201" },
  ];

  // Action yeeroo koorsiin tuqamu hojjetu
  const handleOpenCourse = (course) => {
    if (!isApproved) {
      Alert.alert(
        "Koorsiin Cufaadha",
        "Koorsii kana banachuuf kaffaltiin keessan mirkanaa'uu qaba.",
      );
      return;
    }
    Alert.alert("Koorsii Banaa", `${course.title} banamaa jira...`);
  };

  useEffect(() => {
    let isMounted = true;

    const checkUserProfileStatus = async () => {
      try {
        if (isMounted) setLoading(true);
        console.log("1. Fetching profile started...");

        const profile = await createOrGetUserProfile();

        if (isMounted) {
          console.log("2. Profile fetched successfully:", profile);
          setUserProfile(profile);
        }
      } catch (error) {
        console.error("Error checking user status:", error);
      } finally {
        if (isMounted) {
          console.log("3. Setting loading to false");
          setLoading(false);
        }
      }
    };

    if (user?.$id) {
      checkUserProfileStatus();
    } else {
      console.log("User ID not available yet. Waiting for user to be set.");
    }

    return () => {
      isMounted = false;
    };
  }, [user?.$id]);

  const isApproved =
    userProfile?.paymentStatus === "approved" || userProfile?.isPaid;

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2563EB" />
        <Text style={styles.loadingText}>
          Odeeffannoo keessan fidaa jira...
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#151617" />

      {/* Header Section */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitleMain}>Student Dashboard 👋</Text>
        </View>

        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="notifications-outline" size={22} color="#0F172A" />
        </TouchableOpacity>
      </View>

      {/* Profile Status Card */}
      <View style={styles.statusCard}>
        <View style={styles.statusInfo}>
          <Text style={styles.statusLabel}>HAALA ACCOUNT</Text>
          <Text style={styles.statusDesc}>
            {isApproved
              ? "Koorsiilee hunda banachuun barachuu dandeessu."
              : "Kaffaltiin keessan mirkanaa'uu irra jira."}
          </Text>
        </View>

        <View
          style={[
            styles.badge,
            isApproved ? styles.badgeApproved : styles.badgePending,
          ]}
        >
          <Ionicons
            name={isApproved ? "checkmark-circle" : "time"}
            size={16}
            color={isApproved ? "#15803D" : "#B45309"}
            style={{ marginRight: 4 }}
          />
          <Text
            style={[
              styles.badgeText,
              isApproved ? styles.badgeTextApproved : styles.badgeTextPending,
            ]}
          >
            {isApproved ? "Approved" : "Pending"}
          </Text>
        </View>
      </View>

      {/* Section Title */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Koorsiileewwan Keessan</Text>
        <Text style={styles.courseCount}>{dummyCourses.length} Courses</Text>
      </View>

      {/* Course List */}
      <FlatList
        data={dummyCourses}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => handleOpenCourse(item)}
            style={styles.courseCard}
          >
            <View style={styles.courseHeader}>
              <View style={styles.courseCodeBadge}>
                <Text style={styles.courseCodeText}>{item.code}</Text>
              </View>

              <Ionicons
                name={isApproved ? "lock-open" : "lock-closed"}
                size={20}
                color={isApproved ? "#16A34A" : "#94A3B8"}
              />
            </View>

            <Text style={styles.courseTitle}>{item.title}</Text>

            <View style={styles.courseFooter}>
              <Text style={styles.instructorText}>
                Instructor: Appwrite Edu
              </Text>
              <Text
                style={[
                  styles.statusTag,
                  { color: isApproved ? "#16A34A" : "#D97706" },
                ]}
              >
                {isApproved ? "Banamaa" : "Cufaa"}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
    backgroundColor: "#151617",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#151617",
  },
  loadingText: { marginTop: 10, color: "#94A3B8", fontWeight: "600" },

  /* Header Styles */
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 10,
  },
  headerTitleMain: {
    fontSize: 22,
    fontWeight: "800",
    color: "#E2E8F0",
    letterSpacing: -0.5,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },

  /* Status Card */
  statusCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 16,
    marginBottom: 24,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  statusInfo: { flex: 1, paddingRight: 10 },
  statusLabel: {
    fontSize: 11,
    fontWeight: "800",
    color: "#94A3B8",
    letterSpacing: 0.5,
  },
  statusDesc: {
    fontSize: 13,
    fontWeight: "600",
    color: "#334155",
    marginTop: 4,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  badgeApproved: { backgroundColor: "#DCFCE7" },
  badgePending: { backgroundColor: "#FEF3C7" },
  badgeText: { fontSize: 12, fontWeight: "700" },
  badgeTextApproved: { color: "#15803D" },
  badgeTextPending: { color: "#B45309" },

  /* Section Header */
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  sectionTitle: { fontSize: 18, fontWeight: "700", color: "#F8FAFC" },
  courseCount: { fontSize: 13, fontWeight: "600", color: "#94A3B8" },

  /* Course Card */
  courseCard: {
    backgroundColor: "#FFF",
    padding: 18,
    borderRadius: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
  },
  courseHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  courseCodeBadge: {
    backgroundColor: "#EFF6FF",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  courseCodeText: { fontSize: 12, fontWeight: "700", color: "#2563EB" },
  courseTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 12,
  },
  courseFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
    paddingTop: 10,
  },
  instructorText: { fontSize: 12, color: "#94A3B8", fontWeight: "500" },
  statusTag: { fontSize: 12, fontWeight: "700" },
});
