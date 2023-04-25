import React from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";

export default function Card({ data, navigation }) {
  return (
    <TouchableOpacity onPress={() => navigation.navigate('Details', { postId: data.id }) }>
      <View style={style.card}>
        <View style={style.cardContent}>
          <View style={{ flex: 1, marginRight: 8 }}>
            <Image
              source={{
                uri: data.imgUrl,
              }}
              style={{ flex: 1 }}
            />
          </View>
          <View style={{ flex: 2, flexDirection: "column", marginLeft: 8 }}>
            <Text style={style.category}>{data.category.name}</Text>
            <Text style={style.title}>{data.title}</Text>
            <Text>{data.author.email}</Text>
            <Text>{data.createdAt.split("T")[0]}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  card: {
    margin: 8,
  },

  cardContent: {
    padding: 8,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },

  title: {
    fontWeight: "bold",
    display: "flex",
    flexWrap: "wrap",
    fontFamily: "serif",
    flex: 1,
    fontSize: 18,
    marginBottom: 8,
  },

  category: {
    color: "#154c79",
    textTransform: "uppercase",
    fontWeight: "800",
    fontSize: 12,
  },

  author: {},

  createdAt: {},
});
