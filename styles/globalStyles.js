import { StyleSheet } from "react-native";

export const globalstyles = StyleSheet.create({
  profileMain: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 15,
  },
  editing: {
    flex: 0.6,
    backgroundColor: "#ff4d6d",
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 5,
  },
  emailname: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2d3436",
    marginTop: 10,
  },
  horzontalLine: {
    flexDirection: "row",
    marginTop: 18,
    gap: 10,
    width: "100%",
  },
  profileMemail: {
    color: "#ff4d6d",
    fontWeight: "600",
    fontSize: 14,
    marginTop: 4,
  },
  Container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  imagePicker: {
    backgroundColor: "#ff4d6d",
    padding: 5,
    borderRadius: 8,
    marginBottom: 20,
    alignContent: "center",
    minHeight: 50,
  },
  imageView: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
  },

  imagePhot: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  disableButton: {
    backgroundColor: "#cccc",
    opacity: 0.7,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)", // Duubni isaa akka dukkanau
    justifyContent: "center", // Gidduu (Vertical)
    alignItems: "center",
  },
  modalContainer: {
    width: "85%", // Bal'ina Modal
    backgroundColor: "white",
    borderRadius: 25,
    padding: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5, // Android irratti gaaddidduu fiduuf
  },
  modalText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
    marginVertical: 20,
  },
  modalButton: {
    paddingHorizontal: 50,
    paddingVertical: 12,
    borderRadius: 15,
    width: "100%", // Button-ni bal'ina modal guutuuf
    alignItems: "center",
  },
  modalButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonSpacer: {
    height: 80,
  },
  containerCentered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    flexDirection: "row", // Amma dalga hiriiruuf qophiidha
    gap: 15, // Icons gidduu fageenya uumuuf kana dabali
  },
  footerBtn: {
    // paddingHorizontal: 50,
    //  width: "100%",
    // borderRadius: 30,
    // backgroundColor: "#ff4d6d",

    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    // padding: 20,
    bottom: 0,
    // flex: 1,
    // elevation: 4,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "nowrap",
    width: "100%",

    alignItems: "center",
    position: "absolute",
    fontSize: 12,
    bottom: 20,
    borderTopWidth: 5,
    borderTopColor: "#ddd",
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#f75c5c",
    borderRadius: 20,
    elevation: 5,
  },

  addBtn: {
    backgroundColor: "#fff",
    width: 54,
    height: 54,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },

  footerText: {
    color: "white",
    fontSize: 12,
    marginTop: 4,
    fontWeight: 600,
    textOverflow: "ellipsis",
  },
  logo: {
    width: 200,
    height: 20,
    resizeMode: "contain",
  },
  HeaderTitle: {
    fontSize: 22,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  profileName: {
    fontSize: 22,
    fontWeight: "bold",
  },
  profileEmail: {
    fontSize: 16,
    color: "#666",
  },
  profilebtn: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileIcon: {
    marginBottm: 8,
  },
  profileText: {
    marginLeft: 8,
    color: "#ff4d6d",
    fontWeight: "bold",
    fontSize: 16,
  },
  cardSavedbtn: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "white",
    padding: 5,
    borderRadius: 100,
    elevation: 6,
    zIndex: 1,
    justifyContent: "center", // Icon gidduu akka galu
    alignItems: "center", // Barreeffamni gidduu akka galu
    shadowColor: "#e8d6d6", // iOS irratti gaaddidduu uuma
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  containerBox: {
    backgroundColor: "#f3eaea", // Adii
    borderRadius: 15, // Goofaree (curved corners)
    padding: 15, // Keessatti fageenya dhiisuu
    marginVertical: 10, // Olii fi gadiin fageenya dhiisuu
    marginHorizontal: 10, // Bitaa fi mirgaan fageenya dhiisuu
    shadowColor: "#000", // Gaaddidduu (Shadow)
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Android irratti gaaddidduu agarsiisuuf
    flexDirection: "column", // Yoo suuraa fi barreeffama wal bukkee gochuu barbaadde
    alignItems: "center",
  },
  profileinfoBox: {
    backgroundColor: "#f3eaea", // Adii
    borderRadius: 15, // Goofaree (curved corners)
    padding: 15, // Keessatti fageenya dhiisuu
    marginVertical: 10, // Olii fi gadiin fageenya dhiisuu
    marginHorizontal: 10, // Bitaa fi mirgaan fageenya dhiisuu
    shadowColor: "#000", // Gaaddidduu (Shadow)
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Android irratti gaaddidduu agarsiisuuf
    flexDirection: "column", // Yoo suuraa fi barreeffama wal bukkee gochuu barbaadde
    alignItems: "center",
  },
  titleText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  priceText: {
    borderTopWidth: 1,
    borderTopColor: "#ec2828",

    fontSize: 20,
    fontWeight: "bold",
    color: "#ee4d6d",
    textAlign: "center",
    marginBottom: 16,
  },

  // Odeeffannoo quunnamtiif (Contact Info)
  contactContainer: {
    borderTopWidth: 1,
    borderTopColor: "#eee", // Sarara baay'ee haphii
    paddingTop: 10,
    marginTop: 5,
  },

  contactText: {
    fontSize: 14,
    color: "#555",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },

  phoneText: {
    fontSize: 14,
    color: "#3498db", // Cuquliisa (bilbila waan ta'eef)
    fontWeight: "500",
  },
  cardImage: {
    width: "100%",
    height: 120,
    resizeMode: "cover",
  },
  contentBox: {
    padding: 10,
    height: "90%",
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 12,
    elevation: 5,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  cardInfo: {
    padding: 12,
    alignItems: "center",
    width: "98%",
  },
  imageName: {
    fontSize: Number,
    color: String,
    textAlign: "center",
  },
  image: {
    borderRadius: 40,
    marginTop: 15,
    marginBottom: 5,
    fontWeight: "bold",
  },
  imageButton: {
    backgroundColor: "#db5b34",
    padding: 12,
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },
  imageSmall: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderRight: 12,
    backgroundColor: "#eee",
  },
  perviewImage: {
    width: "90%",
    height: 250,
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 10,
    alignSelf: "center",
    marginHorizontal: 30,
    marginVertical: 20,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 12,
    margin: 10,
    width: "100%",
    // Gadi fageenya (Shadow) akka qabaatuuf:
    elevation: 3,
  },
  nameSmall: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  profileTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0b0202",
    marginLeft: 10,
    marginTop: 20,
  },
  productImage: {
    width: "150%",
    right: 30,
    height: 100,
    borderRadius: 10,
    marginBottom: 10, // Suuraa fi Maqaa gidduutti space uuma
  },
  priceSmall: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#cc432e", // Qubee magariisa (Green) gatiif gaariidha
    marginTop: 5, // Maqaa fi Gatii gidduutti space uuma
  },
  productName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  productPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2ecc71", // Qubee magariisa (Green) gatiif gaariidha
    marginTop: 5, // Maqaa fi Gatii gidduutti space uuma
  },
  cardGrid: {
    position: "relative",

    elevation: 5,
    backgroundColor: "white",
    borderRadius: 30,
    padding: 20,
    margin: 10,
    overflow: "hidden",
    paddingHorizontal: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    padding: 40,
    paddingBottom: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    elevation: 3,
  },
  log: {
    width: 40,
    height: 40,
    borderRadius: 16,
    alignItems: "center",
  },
  imageKey: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  PropertyImage: {
    marginTop: 15,
    marginBottom: 5,
    fontWeight: "bold",
  },
  proImVie: { flexDirection: "row", flexWrap: "wrap", marginBottom: 10 },
  pickimage: {
    paddingVertical: 15,
    borderRadius: 18,
    alignItems: "center",
    backgroundColor: "#007AFF",
    width: "100%",
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "center",
    // Miira "smart" dabalataa: elevation Android irratti
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  logoutBtn: {
    color: "#ff4d6d",
    padding: 6,
    borderRadius: 20,
    marginLeft: 12,
  },
  containerWithPadding: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  profileBox: {
    backgroundColor: "#fff",
    marginBottmWidth: 1,
    paddingVertical: 32,
    marginBottm: 8,
    alignItems: "center",
    marginBottomColor: "#eee",
  },

  containerGrey: {
    flex: 2,
    backgroundColor: "rgb(248, 248, 248)",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 32,
    textAlign: "center",
  },
  titleLarge: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 32,
    marginTop: 30,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    margin: 16,
  },
  nameText: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },

  categoryList: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 8,
  },
  categoryBtn: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#eee",
    marginRight: 10,
    minWidth: 70,
    alignItems: "center",
    justifyContent: "center",
    height: 36,
  },
  categoryItem: {},
  useIcon: {
    marginBottom: 8,
  },
  categoryContainer: {
    marginTop: 24,
  },
  categoryText: {
    color: "#333",
    fontSize: 15,
    fontWeight: "500",
  },
  categoryTextSelected: {
    color: "#fff",
    fontWeight: "700",
  },
  categorySelected: {
    backgroundColor: "#ff4d6d",
  },

  listingItem: {
    padding: 15,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    marginBottom: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  emptyTextLarge: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#888",
  },
  emptySubText: {
    fontSize: 14,
    color: "#aaa",
  },
  TextInput: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    padding: 10,
    margin: 10,
  },
  infoFlex: {
    backgroundColor: "white",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    // Flexbox fayyadamnee hiriirsuu
    flexDirection: "row",
    alignItems: "center",
  },
  Button: {
    paddingVertical: 20,
    paddingHorizontal: 50,
    borderRadius: 18,
    marginaltop: 40,
    maxWidth: 400,
    alignItems: "center",
    backgroundColor: "#007AFF",
    width: "100%",
    justifyContent: "center",
    elevation: 3,
    marginBottom: 20,
  },
  ButtonText: {
    color: "#FFFFFF", // Halluu barreeffamaa (Adii)
    fontSize: 16, // Guddisa qubeeguddaa
    fontWeight: "bold", // Akka furdatu
    textTransform: "uppercase", // Qubee gurguddaa gochuuf (yoo barbaadde)
  },
  ButtonDisabled: {
    backgroundColor: "#fff",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  categoriesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    gap: 8,
  },
  categoryButton: {
    paddingHorizontal: 10,
    backgroundColor: "#e8e4ed", // 'C' guddaa ta'eera
    borderRadius: 20,
    borderColor: "#07f5a9", // 'C' guddaa ta'eera
    borderWidth: 1, // 'W' guddaa ta'eera
  },
  selectedCtegoryButton: {
    backgroundColor: "#ff4f6f",
    borderColor: "#ff4f6f",
  },
  categoryButtonText: {
    color: "#070707",
    fontSize: 14,
    formweight: "500",
  },
  selectedCategoryButtonText: {
    color: "#ff4f6f",

    fontWeight: "bold",
  },

  cont: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  headerArea: {
    marginBottom: 40,
    alignItems: "center",
  },
  titl: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2D3436",
  },
  subtitle: {
    fontSize: 16,
    color: "#636E72",
    marginTop: 5,
  },
  formArea: {
    width: "100%",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 15,
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    // Elevation for Android
    elevation: 3,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#2D3436",
  },
  button: {
    backgroundColor: "#0984E3", // Bifa cuquliisa bareda
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 20,
    elevation: 5,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 25,
  },
  footerTex: {
    color: "#636E72",
    fontSize: 14,
  },
  linkText: {
    color: "#0984E3",
    fontSize: 14,
    fontWeight: "bold",
  },
  inputError: {
    borderColor: "red",
    borderWidth: 2,
  },
  errorText: {
    color: "red",
    margin: 4,
  },
  profileCard: {
    position: "absolute",
    top: 15,
    right: 15,
    padding: 8,
    backgroundColor: "#f1f2f6",
    borderRadius: 20,
    zIndex: 10,
  },
  styleP: { alignItems: "center", position: "relative" },
  styleG: {
    width: 90,
    height: 90,
    borderRadius: 45,
    alignItems: "center",
    justifyContent: "center",
  },
  style575: {
    position: "absolute",
    bottom: 5,
    right: 5,
    backgroundColor: "#ff4d6d",
    padding: 8,
    borderRadius: 20,
  },
  style595: {
    flexDirection: "row",
    gap: 10,
    marginTop: 15,
    justifyContent: "center",
    width: "100%",
  },
  style607: {
    flex: 1,
    //backgroundColor: isEditing ? "#2ed573" : "#ff4d6d",
    paddingVertical: 10,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  style639: {
    flex: 1,
    backgroundColor: "#e3f2fd",
    paddingVertical: 10,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  style663: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 15,
    marginBottom: 20,
    justifyContent: "space-around",
    elevation: 2,
  },
  style696: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    elevation: 3,
    marginBottom: 20,
  },
  style706: {
    fontSize: 14,
    fontWeight: "700",
    color: "#2d3436",
    marginBottom: 12,
  },
  style717: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    gap: 12,
  },
  style735: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 6,
    fontSize: 14,
    color: "#2d3436",
    marginTop: 3,
    backgroundColor: "#fafafa",
  },
  style757: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    gap: 12,
  },
  style776: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 6,
    fontSize: 14,
    color: "#2d3436",
    marginTop: 3,
    backgroundColor: "#fafafa",
  },
  style810: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 6,
    fontSize: 14,
    color: "#2d3436",
    marginTop: 3,
    backgroundColor: "#fafafa",
  },
  style833: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2d3436",
    marginBottom: 10,
    marginLeft: 5,
  },
  style867: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    flexDirection: "row",
    marginBottom: 10,
    alignItems: "center",
    elevation: 2,
  },
  style879: {
    width: 65,
    height: 65,
    borderRadius: 8,
    backgroundColor: "#f1f2f6",
  },
  style897: { fontSize: 13, color: "#ff4d6d", fontWeight: "700", marginTop: 2 },
  style913: {
    backgroundColor: "#e3f2fd",
    padding: 8,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  style927: {
    backgroundColor: "#e8f5e9",
    padding: 8,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  styl941: {
    backgroundColor: "#ffebee",
    padding: 8,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  style977: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  style985: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    elevation: 5,
  },
  style993: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2d3436",
    marginBottom: 15,
  },
  style1010: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 15,
    marginBottom: 12,
  },
  style1028: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 15,
    marginBottom: 20,
  },
  style1041: {
    flex: 1,
    padding: 12,
    backgroundColor: "#f1f2f6",
    borderRadius: 8,
    alignItems: "center",
  },
  style1057: {
    flex: 1,
    padding: 12,
    backgroundColor: "#2ed573",
    borderRadius: 8,
    alignItems: "center",
  },
  style1095: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  style1103: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2d3436",
    marginBottom: 15,
    textAlign: "center",
  },
  style1115: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f2f6",
  },
  style1135: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f2f6",
  },
  style1155: {
    marginTop: 15,
    paddingVertical: 12,
    backgroundColor: "#f1f2f6",
    borderRadius: 10,
    alignItems: "center",
  },
  savestyle: {},
  cardWrapper: {
    backgroundColor: "#fff",
    marginVertical: 6,
    borderRadius: 12,
    overflow: "hidden",
    elevation: 2,
  },
  cardContent: {
    backgroundColor: "white",
  },
  deleteButton: {
    backgroundColor: "#ff3b30",
    justifyContent: "center",
    alignItems: "center",
    width: 90,
    height: "100%",
  },
  archiveButton: {
    backgroundColor: "#007aff",
    justifyContent: "center",
    alignItems: "center",
    width: 90,
    height: "100%",
  },
  actionText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 11,
    marginTop: 2,
  },
  itemCountText: {
    textAlign: "center",
    marginTop: 50,
    marginBottom: 15,
    fontSize: 18,
    fontWeight: "600",
    color: "#5629f9",
  },
  emptyContaine: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 200,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#555",
    marginTop: 15,
  },
  emptySubTex: {
    color: "#555",
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
  },

  mincardsStyle: {},
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#ffffff",
    borderRadius: 10,
  },
  imageStyle: {
    width: 70,
    height: 70,
    borderRadius: 8,
    backgroundColor: "#e1e1e1", // Fakkichii load hanga ta'utti bakka fakkichaa agarsiisuuf
  },
  infoContainer: {
    marginLeft: 12,
    flex: 1,
    justifyContent: "center",
  },

  carditemStyle: {},
  style34: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  style59: {
    // width: width - 20,
    height: 350,
    resizeMode: "cover",
    backgroundColor: "#f1f2f6",
  },
  style77: {
    position: "absolute",
    top: 15,
    right: 15,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  style97: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
    gap: 5,
  },
  style121: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 4,
  },
  style183: {
    paddingHorizontal: 15,
    paddingBottom: 12,
    paddingTop: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  indexStyle: {},

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContainerr: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: "60%",
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  modalHeader: {
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  dragIndicator: {
    width: 40,
    height: 5,
    backgroundColor: "#ccc",
    borderRadius: 3,
    marginBottom: 8,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#222",
  },
  closeBtn: {
    position: "absolute",
    right: 10,
    top: 10,
  },
  emptyContainerr: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  commentItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    gap: 10,
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#ff4d6d",
    alignItems: "center",
    justifyContent: "center",
  },
  commentUser: {
    fontWeight: "bold",
    fontSize: 13,
    color: "#333",
  },
  commentText: {
    fontSize: 14,
    color: "#444",
  },
  
  commentTime: {
    fontSize: 11,
    color: "#999",
  },
  inputContainerr: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 10,
    gap: 10,
  },
  
  inputt: {
    flex: 1,
    backgroundColor: "#f1f2f6",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    fontSize: 14,
    color: "#333",
  },
});
