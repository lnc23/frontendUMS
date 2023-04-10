import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { FunctionComponent } from "react";
import Home from "../screen/Home";
import Pelanggan from "../screen/Pelanggan";
import Barang from "../screen/Barang";
import Penjualan from "../screen/Penjualan";

export type StackParamList = {
  Home: undefined;
  Pelanggan: undefined;
  Barang: undefined;
  Penjualan: undefined;
};

const Stack = createNativeStackNavigator<StackParamList>();

const RouteStack: FunctionComponent = () => {
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
      <Stack.Screen
        name="Barang"
        component={Barang}
        options={{
          headerTitleAlign: "center",
          headerTitle: "Create Master Barang",
        }}
      />
      <Stack.Screen
        name="Penjualan"
        component={Penjualan}
        options={{
          headerTitleAlign: "center",
          headerTitle: "Create Penjualan",
        }}
      />
    </Stack.Navigator>
  );
};

//TODO: implement Auth flow (private & public page)

export default RouteStack;
