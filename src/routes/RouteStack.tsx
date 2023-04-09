import { useNavigation } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React, { FunctionComponent } from "react"
import Home from "../screen/Home"
import Pelanggan from "../screen/Pelanggan"
import { ArrowBackIcon } from "native-base"

export type StackParamList = {
  Home: undefined
  Pelanggan: undefined
}

const Stack = createNativeStackNavigator<StackParamList>()

const RouteStack: FunctionComponent = () => {
  const navigation = useNavigation()

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="Pelanggan"
        component={Pelanggan}
        options={{
          headerTitleAlign: "center",
          headerTitle: "Create Pelanggan",
        }}
      />
    </Stack.Navigator>
  )
}

//TODO: implement Auth flow (private & public page)

export default RouteStack
