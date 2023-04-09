import { Box, Center, Button, VStack } from "native-base"

const Home = () => {
  return (
    <Box flex={1} alignItems={"center"} justifyContent={"center"}>
      <VStack space={5}>
        <Button
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
