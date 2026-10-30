// app/CoursesScreen.jsx (gabaasa)
import { useEffect, useState } from "react";
import { getAllCourses } from "../constants/courses";
import { useAuth } from "../context/authProvider";
import { getMyPaidCourseIds } from "../services/databaseService";
import {Text, TouchableOpacity, } from "react-native";
import { useRouter } from "expo-router";

export default function CoursesScreen() {
  const { user } = useAuth();
  const [paidIds, setPaidIds] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const load = async () => {
      if (!user?.$id) return;
      const ids = await getMyPaidCourseIds(user.$id);
      setPaidIds(ids);
    };
    load();
  }, [user]);

  const courses = getAllCourses();

  return (
    // ...
    courses.map((course) => {
      const isPaid = paidIds.includes(course.id);
      return (
        <TouchableOpacity
          key={course.id}
          onPress={() =>
            router.push({
              pathname: "/CourseDetailScreen",
              params: { courseId: course.id, courseTitle: course.title },
            })
          }
        >
          <Text>{course.title}</Text>
          {isPaid ? (
            <Text style={{ color: "#10B981", fontWeight: "800" }}>
              ✅ Banamaa
            </Text>
          ) : (
            <Text style={{ color: "#EF4444", fontWeight: "800" }}>
              🔒 Cufaa
            </Text>
          )}
        </TouchableOpacity>
      );
    })
  );
}
