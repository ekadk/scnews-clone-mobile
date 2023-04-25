import { TouchableOpacity, Image, Text, View } from "react-native";

export default function Hero({ latest, navigation }) {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Details", { postId: latest.id })}>
      <View
        style={{
          borderBottomColor: "black",
          borderBottomWidth: 0.25,
          paddingBottom: 32,
        }}>
        <Image
          source={{
            uri: latest.imgUrl,
          }}
          style={{
            width: "100%",
            height: undefined,
            aspectRatio: 1.25,
            resizeMode: "cover",
            marginBottom: 12,
          }}
        />
        <Text
          style={{
            color: "#154c79",
            textTransform: "uppercase",
            fontWeight: "800",
            fontSize: 16,
          }}>
          {latest.category.name}
        </Text>
        <Text
          style={{
            fontSize: 28,
            fontFamily: "serif",
            fontWeight: "bold",
            marginBottom: 8,
          }}>
          {latest.title}
        </Text>
        <Text
          style={{
            fontWeight: "800",
            fontSize: 16,
          }}>
          {latest.author.email}
        </Text>
        <Text>{latest.createdAt.split("T")[0]}</Text>
      </View>
    </TouchableOpacity>
  );
}
