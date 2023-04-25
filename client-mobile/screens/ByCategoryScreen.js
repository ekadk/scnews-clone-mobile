import { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  Text,
} from "react-native";

import Card from "../components/Card";
import { SelectList } from "react-native-dropdown-select-list";
import { useQuery } from "@apollo/client";
import { GET_ALL_POST_AND_CATEGORIES } from "../queries/post";

export default function ByCategoryScreen({ navigation, route }) {
  let { loading, error, data } = useQuery(GET_ALL_POST_AND_CATEGORIES);
  const [selected, setSelected] = useState("All");

  function categoriesList() {
    let temp = [{ id: null, value: "All" }];
    if (data) {
      data.getAllCategories.forEach((el) => {
        temp.push({ id: el.id, value: el.name });
      });
      return temp;
    }
  }

  function news() {
    if (selected === "All") return data.getAllPost;
    else {
      const filtered = data.getAllPost.filter(
        (el) => el.category.name === selected
      );
      return filtered;
    }
  }

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
          <View>
            <SelectList
              setSelected={(val) => setSelected(val)}
              data={categoriesList}
              save="value"
              placeholder="All"
            />
          </View>
          <View
            style={{
              marginTop: 32,
              marginBottom: 32,
            }}>
            {news().map((el) => {
              return <Card key={el.id} data={el} navigation={navigation} />;
            })}
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
    marginBottom: 32,
  },
  navTitle: {
    fontWeight: "bold",
    fontSize: 32,
  },
});
