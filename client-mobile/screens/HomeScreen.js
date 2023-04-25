import { useEffect, useState } from "react";
import {
  Button,
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
  Text,
} from "react-native";
import Card from "../components/Card";
import Hero from "../components/Hero";
import { useQuery } from "@apollo/client";
import { GET_ALL_POST } from "../queries/post";

export default function HomeScreen({ navigation }) {
  const { loading, error, data } = useQuery(GET_ALL_POST)
  return (
    <SafeAreaView
      style={{
        backgroundColor: "white",
        display: "flex",
        flex: 1,
        paddingTop: 16,
      }}>
      {loading ? (
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            flex: 1,
            alignItems: "center",
          }}>
          <ActivityIndicator size={"large"} />
        </View>
      ) : (
        <ScrollView style={styles.container}>
          <Hero latest={data.getAllPost[0]} navigation={navigation} />
          <View
            style={{
              marginTop: 32,
              marginBottom: 32,
            }}>
            {data.getAllPost.slice(1, 3).map((el) => {
              return <Card key={el.id} data={el} navigation={navigation} />;
            })}
          </View>
          <View style={{ marginBottom: 32 }}>
            <TouchableOpacity
              style={{
                display: "flex",
                flexDirection: "row",
                flex: 1,
                justifyContent: "center",
                paddingVertical: 8,
                backgroundColor: "#154c79",
              }}
              onPress={() => navigation.navigate("ByCategory")}>
              <Text
                style={{
                  color: "white",
                  textTransform: "uppercase",
                  fontWeight: "700",
                }}>
                {"More Stories"}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    backgroundColor: "white",
  },
  navTitle: {
    fontWeight: "bold",
    fontSize: 32,
  },
});
