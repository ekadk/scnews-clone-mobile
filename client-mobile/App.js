import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ByCategoryScreen from "./screens/ByCategoryScreen";
import DetailScreen from "./screens/DetailScreen";
import HomeScreen from "./screens/HomeScreen";
import { ApolloProvider } from "@apollo/client";
import client from "./config/index";

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <ApolloProvider
      client={client}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: "#154c79",
            },
            statusBarColor: "#154c79",
            headerTitleAlign: "center",
            headerTitleStyle: {
              fontWeight: "800",
              color: "white",
            },
          }}>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: "ScienceNews",
            }}
          />
          <Stack.Screen
            name="Details"
            component={DetailScreen}
            options={{
              title: "ScienceNews",
            }}
          />
          <Stack.Screen
            name="ByCategory"
            component={ByCategoryScreen}
            options={{
              title: "ScienceNews",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}
