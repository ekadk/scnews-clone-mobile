import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  Image,
  View,
  ActivityIndicator,
} from "react-native";
import { GET_POST_BY_ID } from "../queries/post";

export default function DetailScreen({ route }) {
  const { postId } = route.params;
  const { loading, error, data } = useQuery(GET_POST_BY_ID, { variables: {postId}})

  return (
    <>
      {loading ? (
        <View
          style={{
            display: "flex",
            flexDirection: 'column',
            justifyContent: "center",
            flex: 1,
            backgroundColor: 'white'
          }}>
          <ActivityIndicator size={"large"} style={{
            flex: 1
          }} />
        </View>
      ) : (
        <ScrollView style={styles.container}>
          <View style={{ marginBottom: 64}}>
            <Text
              style={{
                marginBottom: 8,
                fontSize: 16,
                textAlign: "center",
                fontWeight: "900",
                color: "#154c79",
              }}>
              {data.getPostById.category.name}
            </Text>
            <Text
              style={{
                textAlign: "center",
                fontSize: 32,
                fontWeight: "900",
                fontFamily: "serif",
                marginBottom: 32,
              }}>
              {data.getPostById.title}
            </Text>
            <View>
              <Image
                source={{
                  uri: data.getPostById.imgUrl,
                }}
                style={{
                  width: "100%",
                  height: undefined,
                  aspectRatio: 1.25,
                  resizeMode: "cover",
                  marginBottom: 32,
                }}
              />
            </View>
            <Text style={{ fontSize: 14, textAlign: "center" }}>
              By: {data.getPostById.author.email}
            </Text>
            <Text
              style={{ fontSize: 14, textAlign: "center", marginBottom: 32 }}>
              {data.getPostById.createdAt.split("T")[0]}
            </Text>

            {data.getPostById.content.split("\n").map((el, idx) => {
              return (
                <Text
                  key={idx}
                  style={{ marginBottom: 16, fontSize: 16, lineHeight: 24 }}>
                  {el}
                </Text>
              );
            })}

            {/* <Text>{post.Tags}</Text> */}
          </View>
        </ScrollView>
      )}
      </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    paddingHorizontal: 16,
    backgroundColor: "white",
    minHeight: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 32,
  },
});
