import { useNavigation } from "@react-navigation/native"
import { Box, Center, Button, VStack } from "native-base"
import { StackParamList } from "../../routes/RouteStack"
import { StackNavigationProp } from "@react-navigation/stack"

const Home = () => {
  const navigation = useNavigation<StackNavigationProp<StackParamList>>()

  return (
    <Box flex={1} alignItems={"center"} justifyContent={"center"}>
      <VStack space={5}>
        <Button
          onPress={() => {
            navigation.push("Pelanggan")
          }}
          alignContent={"center"}
          bg={"blueGray.400"}
          borderRadius={5}
          fontWeight={"semibold"}
        >
          Create Master Pelanggan
        </Button>
        <Button bg={"blueGray.400"} borderRadius={5} fontWeight={"semibold"}>
          Create Master Barang
        </Button>
        <Button bg={"blueGray.400"} borderRadius={5} fontWeight={"semibold"}>
          Create Penjualan
        </Button>
      </VStack>
    </Box>
  )
}

export default Home
