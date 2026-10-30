import { Link } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
export default function HomeScreen() {
  return (
    <View style={styles.Container}>
      <Text style={styles.Title}>Home </Text>

      <Link href="./profile" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>GO</Text>
        </TouchableOpacity>
      </Link>
      <Text></Text>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    padding: 20,
    backgroundColor: "Blue",
  },

  Title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },

  button: {
    backgroundColor: "red",
    padding: 20,
    borderRadius: 10,
    marginTop: 10,
  },

  buttonText: {
    color: "blue",
    fontSize: 20,
    fontWeight: "bold",
  },
});
export { styles };
