import { NavigationContainer } from "@react-navigation/native"
import { StatusBar } from "expo-status-bar"
import { NativeBaseProvider } from "native-base"
import { StyleSheet, Text, View } from "react-native"
import RouteStack from "./src/routes/RouteStack"

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <RouteStack />
      </NavigationContainer>
    </NativeBaseProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
})
