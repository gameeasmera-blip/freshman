import React, { createContext, useState, useContext, useEffect } from "react";
import { account } from "../services/appwrite"; // Path kana mirkaneeffadhaa (e.g., ../services/appwrite)

const AppContext = createContext();

// Hikkaa Afaanotaa (Translations)
const translations = {
  ENG: {
    welcome: "Welcome to our App!",
    game: "🎓 Freshman Student Guide",
    bony: "Welcome to our University Campus! Start your learning journey by exploring first-semester courses, seminars, and exams.",
    lali: "• Common Courses",
    lami: "• Academic Schedule & Exams",
    bilo: "• Academic Support & Guidance",
    dare: "Go to Our Courses ➔",
    dar: "Go to Our Courses ➔",
    myChart: "My Chart",
    signIn: "Sign In",
    settings: "Settings",
    profile: "Profile",
    help: "Help & Support",
  },
  AMH: {
    welcome: "እንኳን ወደ መተግበሪያችን በደህና መጡ!",
    game: "🎓 የFreshman ተማሪዎች መመሪያ",
    bony: "እንኳን ወደ ዩኒቨርሲቲያችን ግቢ በደህና መጡ! የመጀመሪያው ሴሚስተር ኮርሶችን፣ ሴሚናሮችን እና ፈተናዎችን በማየት ትምህርትዎን ይጀምሩ።",
    lali: "• የጋራ ኮርሶች (Common Courses)",
    lami: "• የትምህርት ፕሮግራም እና ፈተናዎች",
    bilo: "• የትምህርት ድጋፍ እና መመሪያ",
    dare: "ወደ ትምህርታችን ይለፉ ➔",
    dar: "ወደ ትምህርታችን ይለፉ ➔",
    myChart: "የእኔ ቻርት",
    signIn: "ግቡ",
    settings: "ማስተካከያ",
    profile: "መገለጫ",
    help: "እርዳታ",
  },
  ORM: {
    welcome: "Baga gara App keenyaa nagaan dhuftan!",
    game: "🎓 Qajeelfama Barattoota Haaraa (Freshman)",
    bony: "Baga gara Mooraa Yuunivarsiitii keenyaa nagaan dhuftan! Koorsiiwwan simesteera jalqabaa, seminaarota, fi qormaatilee ilaaluuf barnoota keessan jalqabaa.",
    lali: "• Koorsiiwwan Hundee (Common Courses)",
    lami: "• Sagantaa Barnootaa & Qormaataa",
    bilo: "• Deeggarsa Barnootaa & Qajeelfama",
    dare: "Gara Barnoota Keenyaa Cee'i ➔",
    dar: "Gara Barnoota Keenyaa Cee'i ➔",
    myChart: "Chart Koo",
    signIn: "Seeni",
    settings: "Setingii",
    profile: "Puroofayilii",
    help: "Gargaarsa",
  },
};

export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState("light"); // 'light' ykn 'dark'
  const [lang, setLang] = useState("ORM"); // 'ENG', 'AMH', 'ORM'
  const [user, setUser] = useState(null); // User State (Initial state null godhameera)
  const [loading, setLoading] = useState(true);

  // Yeroo App-iin saaqamu session check gochuu
  useEffect(() => {

  }, []);

  const checkUserSession = async () => {
    try {
      const loggedInUser = await account.get();
      setUser(loggedInUser); // User yoo jiraate state irratti save godha
    } catch  {
      setUser(null); // User yoo hin jirre/session expaayer ta'e null godha
    } finally {
      setLoading(false);
    }
  };

  // Funxioonii Logout
  const logout = async () => {
    try {
      await account.deleteSession("current");
      setUser(null);
    } catch (error) {
      console.error("Logout Error:", error.message);
    }
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const t = translations[lang] || translations.ENG; // Dynamic translation

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        lang,
        setLang,
        t,
        user,
        setUser,
        logout,
        checkUserSession,
        loading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
