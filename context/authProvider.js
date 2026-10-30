import React, { useContext, createContext, useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { account, ID } from "../services/appwrite";

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [busy, setBusy] = useState(false); // ← Auth action qofaaf (UI hin cufu)

  // =========================================================
  // CHECK AUTH (manual)
  // =========================================================
  const checkAuth = async () => {
    try {
      const responseUser = await account.get();
      const responseSession = await account.getSession("current");
      setUser(responseUser);
      setSession(responseSession);
      return { success: true, user: responseUser, session: responseSession };
    } catch {
      setUser(null);
      setSession(null);
      return { success: false };
    }
  };

  // =========================================================
  // JALQABA: Session jiraachuu mirkaneessi
  // =========================================================
  useEffect(() => {
    let isMounted = true;

    const initAuth = async () => {
      try {
        const responseUser = await account.get();
        const responseSession = await account.getSession("current");

        if (isMounted) {
          setUser(responseUser);
          setSession(responseSession);
        }
      } catch {
        if (isMounted) {
          setUser(null);
          setSession(null);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    initAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  // =========================================================
  // HELPER: Argumantii object ykn positional lamaan fudhata
  // =========================================================
  const normalizeSignUpArgs = (a, b, c) => {
    // Yoo jalqabni object ta'e → { fullName, email, password }
    if (a && typeof a === "object") {
      return {
        fullName: a.fullName ?? a.name ?? "",
        email: a.email ?? "",
        password: a.password ?? "",
      };
    }
    // Yoo positional ta'e → (fullName, email, password)
    return {
      fullName: a ?? "",
      email: b ?? "",
      password: c ?? "",
    };
  };

  const normalizeSignInArgs = (a, b) => {
    if (a && typeof a === "object") {
      return { email: a.email ?? "", password: a.password ?? "" };
    }
    return { email: a ?? "", password: b ?? "" };
  };

  // =========================================================
  // SIGN UP
  // Hojii: account.create() erga booda session uumee user galcha
  // =========================================================
  const signUp = async (arg1, arg2, arg3) => {
    const { fullName, email, password } = normalizeSignUpArgs(arg1, arg2, arg3);

    // ✅ MIRKANEESSA — dogoggora "Missing required parameter" fura
    const cleanEmail = String(email).trim().toLowerCase();
    const cleanName = String(fullName).trim();

    if (!cleanEmail) {
      return { success: false, message: "Imeeliin duwwaa ta'uu hin qabu." };
    }
    if (!cleanName) {
      return {
        success: false,
        message: "Maqaan guutuu duwwaa ta'uu hin qabu.",
      };
    }
    if (!password || String(password).length < 8) {
      return {
        success: false,
        message: "Jechi darbii yoo xiqqaate qubee 8 ta'uu qaba.",
      };
    }

    setBusy(true);
    try {
      // 1) Session duraanii haqi (yoo jiraate)
      try {
        await account.deleteSession("current");
      } catch {
        /* Session hin jiru */
      }

      // 2) Herrega uumi
      //    Appwrite signature: account.create(userId, email, password, name)
      await account.create(ID.unique(), cleanEmail, password, cleanName);

      // 3) Session uumi
      const resSession = await account.createEmailPasswordSession(
        cleanEmail,
        password,
      );

      // 4) Fayyadamaa fidi
      const currentUser = await account.get();

      setSession(resSession);
      setUser(currentUser);

      return {
        success: true,
        message: "Herregni milkaa'inaan uumameera!",
        user: currentUser,
        session: resSession,
      };
    } catch (error) {
      console.error("SignUp Auth Error:", error);
      return {
        success: false,
        message: error?.message || "Galmeen hin milkoofne.",
      };
    } finally {
      setBusy(false);
    }
  };

  // =========================================================
  // SIGN IN
  // =========================================================
  const Signin = async (arg1, arg2) => {
    const { email, password } = normalizeSignInArgs(arg1, arg2);

    const cleanEmail = String(email).trim().toLowerCase();

    if (!cleanEmail) {
      return { success: false, error: "Imeeliin duwwaa ta'uu hin qabu." };
    }
    if (!password) {
      return { success: false, error: "Jechi darbii duwwaa ta'uu hin qabu." };
    }

    setBusy(true);
    try {
      // Session duraanii haqi
      try {
        await account.deleteSession("current");
      } catch {
        /* Session hin jiru */
      }

      const resSession = await account.createEmailPasswordSession(
        cleanEmail,
        password,
      );
      const responseUser = await account.get();

      setSession(resSession);
      setUser(responseUser);

      return { success: true, user: responseUser, session: resSession };
    } catch (error) {
      console.log("Signin Context Error:", error);
      setSession(null);
      setUser(null);
      return {
        success: false,
        error: error?.message || "Seensaan hin milkoofne.",
      };
    } finally {
      setBusy(false);
    }
  };

  // =========================================================
  // SIGN OUT
  // =========================================================
  const Signout = async () => {
    setBusy(true);
    try {
      await account.deleteSession("current");
      return { success: true };
    } catch (e) {
      console.log("Session was already inactive:", e?.message);
      return { success: true }; // Session duraan hin jiru — wanti tokko hin ta'e
    } finally {
      setUser(null);
      setSession(null);
      setBusy(false);
    }
  };

  // =========================================================
  // CONTEXT VALUE
  // =========================================================
  const contextData = {
    user,
    loading,
    busy, // ← fuula keessatti spinner agarsiisuuf
    session,

    signUp,
    SignUp: signUp, // alias — lamaan hojjeta
    Signin,
    signIn: Signin, // alias
    Signout,
    signOut: Signout, // alias
    checkAuth,
  };

  // Jalqabaa qofa "Loading..." agarsiisa — signIn/signUp yeroo hojjetu
  // UI hin cufu (busy state fayyadami).
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#ff4d6d" />
        <Text style={styles.text}>Loading...</Text>
      </View>
    );
  }

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    marginTop: 10,
    color: "#333",
  },
});
