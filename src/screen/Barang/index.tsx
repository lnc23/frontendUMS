import {
  Box,
  Input,
  Stack,
  Button,
  Text,
  useToast,
  FlatList,
  VStack,
  HStack,
  Container,
  View,
} from "native-base"
import { Modal } from "react-native"
import React, { useEffect } from "react"
import axios from "axios"
//@ts-ignore
import { API_URL } from "@env"

const Barang = () => {
  const [loading, setLoading] = React.useState(false)
  const [modalDelete, setModalDelete] = React.useState(false)
  const [ID, setID] = React.useState<{
    kode: number
    nama: string
    kategori: string
    harga: number
  }>()
  const [modalVisible, setModalVisible] = React.useState(false)
  const [dataBarang, setDataBarang] = React.useState()
  const [namaBarang, setNamaBarang] = React.useState("")
  const [Kategori, setKategori] = React.useState("")
  const [Harga, setHarga] = React.useState("")
  const toast = useToast()
  const Gender = ["Laki-laki", "Perempuan"]
  const [editnamaBarang, setEditNamaBarang] = React.useState("")
  const [editKategori, setEditKategori] = React.useState("")
  const [editHarga, setEditHarga] = React.useState("")

  const handleCreateBarang = () => {
    setLoading(true)
    const obj = {
      nama: namaBarang,
      kategori: Kategori,
      harga: Number(Harga),
    }
    console.log(obj)
    if (!Harga || !namaBarang || !Kategori) {
      toast.show({
        render: () => {
          return (
            <Box bg="red.600" px="2" py="1" rounded="sm" mb={5}>
              <Text color={"white"}>Data yang diinput belum lengkap!</Text>
            </Box>
          )
        },
      })
      setLoading(false)
    } else {
      axios
        .post(`${API_URL}/api/barang`, obj)
        .then(function (response) {
          const fetchData = axios
            .get(`${API_URL}/api/barang`)
            .then(function (response) {
              setDataBarang(response.data)
            })
            .catch(function (e) {
              console.log(e)
            })
          setLoading(false)
          toast.show({
            render: () => {
              return (
                <Box bg="green.600" px="2" py="1" rounded="sm" mb={5}>
                  <Text color={"white"}>Data Barang Berhasil Dicreate</Text>
                </Box>
              )
            },
          })
        })
        .catch(function (error) {
          console.log(error)
          setLoading(false)
          toast.show({
            render: () => {
              return (
                <Box bg="red.600" px="2" py="1" rounded="sm" mb={5}>
                  <Text color={"white"}>Data Gagal Dicreate</Text>
                </Box>
              )
            },
          })
        })
    }
  }

  const handleEditBarang = (id: any) => {
    setLoading(true)
    const obj = {
      nama: editnamaBarang,
      kategori: editKategori,
      harga: Number(editHarga),
    }
    if (!editHarga || !editnamaBarang || !editKategori) {
      toast.show({
        render: () => {
          return (
            <Box bg="red.600" px="2" py="1" rounded="sm" mb={5}>
              <Text color={"white"}>Data yang diinput belum lengkap!</Text>
            </Box>
          )
        },
      })
      setLoading(false)
    } else {
      axios
        .put(`${API_URL}/api/barang?kode=${id}`, obj)
        .then(function (response) {
          const fetchData = axios
            .get(`${API_URL}/api/barang`)
            .then(function (response) {
              setDataBarang(response.data)
            })
            .catch(function (e) {
              console.log(e)
            })
          setLoading(false)
          toast.show({
            render: () => {
              return (
                <Box bg="green.600" px="2" py="1" rounded="sm" mb={5}>
                  <Text color={"white"}>Data Barang Berhasil Diedit</Text>
                </Box>
              )
            },
          })
          setModalVisible(false)
        })
        .catch(function (error) {
          console.log(error)
          setLoading(false)
          toast.show({
            render: () => {
              return (
                <Box bg="red.600" px="2" py="1" rounded="sm" mb={5}>
                  <Text color={"white"}>Data Gagal Diedit</Text>
                </Box>
              )
            },
          })
          setModalVisible(false)
        })
    }
  }

  const handleDeleteBarang = (id: any) => {
    setLoading(true)
    axios
      .delete(`${API_URL}/api/barang?kode=${id}`)
      .then(function (response) {
        const fetchData = axios
          .get(`${API_URL}/api/barang`)
          .then(function (response) {
            setDataBarang(response.data)
          })
          .catch(function (e) {
            console.log(e)
          })
        setLoading(false)
        toast.show({
          render: () => {
            return (
              <Box bg="green.600" px="2" py="1" rounded="sm" mb={5}>
                <Text color={"white"}>Barang Berhasil Didelete</Text>
              </Box>
            )
          },
        })
        setModalDelete(false)
      })
      .catch(function (error) {
        console.log(error)
        setLoading(false)
        toast.show({
          render: () => {
            return (
              <Box bg="red.600" px="2" py="1" rounded="sm" mb={5}>
                <Text color={"white"}>
                  Barang gagal didelete karena sudah terdaftar no nota
                </Text>
              </Box>
            )
          },
        })
        setModalVisible(false)
      })
  }

  useEffect(() => {
    axios
      .get(`${API_URL}/api/barang`)
      .then(function (response) {
        setDataBarang(response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  }, [!loading])

  return (
    <Container
      flex={1}
      alignItems={"center"}
      justifyContent={"center"}
      width={"100%"}
      maxWidth={"100%"}
      height={"100%"}
      px={5}
    >
      {/* modal edit */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false)
        }}
      >
        <View
          flex={1}
          px={10}
          justifyContent={"center"}
          alignItems={"center"}
          marginTop={10}
        >
          <View
            my={10}
            backgroundColor={"white"}
            borderRadius={10}
            padding={10}
            alignItems={"center"}
            shadow={"5"}
          >
            <VStack space={5} alignItems={"center"}>
              <Text>Edit Data Barang</Text>
              <Stack space={4} width="100%">
                <Input
                  width={"100%"}
                  borderColor={"#b0b1b2"}
                  size="md"
                  placeholder="Nama Barang"
                  value={editnamaBarang}
                  onChangeText={(e) => {
                    setEditNamaBarang(e)
                  }}
                />
                <Input
                  width={"100%"}
                  borderColor={"#b0b1b2"}
                  size="md"
                  placeholder="Kategori"
                  value={editKategori}
                  onChangeText={(e) => {
                    setEditKategori(e)
                  }}
                />
                <Input
                  borderColor={"#b0b1b2"}
                  size="md"
                  keyboardType="numeric"
                  placeholder="Harga"
                  value={editHarga}
                  onChangeText={(e) => {
                    setEditHarga(e)
                  }}
                />
              </Stack>
              <HStack width={"full"} space={1}>
                <Button
                  flex={1}
                  bg={"red.600"}
                  colorScheme={"secondary"}
                  onPress={() => setModalVisible(false)}
                >
                  Close
                </Button>

                <Button
                  flex={1}
                  isLoading={loading}
                  isLoadingText="Submitting"
                  onPress={() => handleEditBarang(ID)}
                >
                  Save
                </Button>
              </HStack>
            </VStack>
          </View>
        </View>
      </Modal>
      {/* modal delete */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalDelete}
        onRequestClose={() => {
          setModalDelete(false)
        }}
      >
        <View
          flex={1}
          px={10}
          justifyContent={"center"}
          alignItems={"center"}
          marginTop={10}
        >
          <View
            my={10}
            backgroundColor={"white"}
            borderRadius={10}
            padding={10}
            alignItems={"center"}
            shadow={"5"}
          >
            <VStack space={5} alignItems={"center"}>
              <Text>Konfirmasi Delete</Text>
              <Text>Apakah kamu yakin ingin delete data Barang ini?</Text>
              <HStack width={"full"} space={1}>
                <Button
                  flex={1}
                  bg={"red.600"}
                  colorScheme={"secondary"}
                  onPress={() => setModalDelete(false)}
                >
                  Cancel
                </Button>

                <Button
                  flex={1}
                  isLoading={loading}
                  isLoadingText="Submitting"
                  onPress={() => handleDeleteBarang(ID)}
                >
                  Delete
                </Button>
              </HStack>
            </VStack>
          </View>
        </View>
      </Modal>
      {/* create Barang */}
      <Box width={"full"} alignItems={"center"}>
        <Stack space={4} w="100%" maxW="300px" mt={10}>
          <Input
            borderColor={"#b0b1b2"}
            size="md"
            placeholder="Nama Barang"
            value={namaBarang}
            onChangeText={(e) => {
              setNamaBarang(e)
            }}
          />
          <Input
            borderColor={"#b0b1b2"}
            size="md"
            placeholder="Kategori"
            value={Kategori}
            onChangeText={(e) => {
              setKategori(e)
            }}
          />
          <Input
            borderColor={"#b0b1b2"}
            size="md"
            keyboardType="numeric"
            placeholder="Harga"
            value={Harga}
            onChangeText={(e) => {
              setHarga(e)
            }}
          />
          <Button
            isLoading={loading}
            isLoadingText="Submitting"
            onPress={() => handleCreateBarang()}
          >
            Create Barang
          </Button>
        </Stack>
      </Box>

      {/* list data Barang */}
      <Text fontWeight={"semibold"} mt={5} fontSize={20}>
        List Master Barang
      </Text>
      <FlatList
        mt={2}
        flex={1}
        width={"full"}
        height={"full"}
        contentContainerStyle={{ flexGrow: 1 }}
        disableVirtualization={false}
        data={dataBarang}
        renderItem={({ item }: any) => (
          <Box
            borderBottomWidth="1"
            borderBottomColor={"#b0b1b2"}
            _dark={{
              borderColor: "muted.50",
            }}
            borderColor="muted.800"
            pl={["0", "4"]}
            pr={["0", "5"]}
            py="2"
          >
            <VStack>
              <HStack flex={1} alignItems={"center"}>
                <Box flex={1}>
                  <Text numberOfLines={1}>Nama Barang: {item.nama}</Text>
                  <Text numberOfLines={1}>Kategori: {item.kategori}</Text>
                  <Text numberOfLines={1}>Harga: {item.harga}</Text>
                </Box>
                <VStack space={2} alignItems={"center"}>
                  <Button
                    size={7}
                    bgColor={"yellow.600"}
                    alignItems={"center"}
                    w={10}
                    rounded={6}
                    onPress={() => {
                      setModalVisible(true),
                        setID(item.kode),
                        setEditNamaBarang(item.nama),
                        setEditKategori(item.kategori),
                        setEditHarga(item.harga.toString())
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    size={7}
                    bgColor={"red.600"}
                    alignItems={"center"}
                    w={12}
                    rounded={6}
                    onPress={() => {
                      setModalDelete(true), setID(item.kode)
                    }}
                  >
                    Delete
                  </Button>
                </VStack>
              </HStack>
            </VStack>
          </Box>
        )}
        keyExtractor={(item: any) => item.kode}
      />
    </Container>
  )
}

export default Barang
