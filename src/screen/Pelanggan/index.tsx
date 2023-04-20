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
import React, { useEffect, useRef } from "react"
import SelectDropdown from "react-native-select-dropdown"
import axios from "axios"
//@ts-ignore
import { API_URL } from "@env"

const Pelanggan = () => {
  const [loading, setLoading] = React.useState(false)
  const [modalDelete, setModalDelete] = React.useState(false)
  const [ID, setID] = React.useState<{
    id_pelanggan: number
    nama: string
    domisili: string
    jenis_kelamin: string
  }>()
  const [modalVisible, setModalVisible] = React.useState(false)
  const [dataPelanggan, setDataPelanggan] = React.useState()
  const [namaPelanggan, setNamaPelanggan] = React.useState("")
  const [Domisili, setDomisili] = React.useState("")
  const [jenisKelamin, setJenisKelamin] = React.useState("")
  const toast = useToast()
  const Gender = ["Laki-laki", "Perempuan"]
  const [editNamaPelanggan, setEditNamaPelanggan] = React.useState("")
  const [editDomisili, setEditDomisili] = React.useState("")
  const [editJenisKelamin, setEditJenisKelamin] = React.useState("")
  const dropdownRef = useRef<any>({})

  const handleCreatePelanggan = () => {
    setLoading(true)
    const obj = {
      nama: namaPelanggan,
      domisili: Domisili,
      jenis_kelamin: jenisKelamin,
    }
    if (!jenisKelamin || !namaPelanggan || !Domisili) {
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
        .post(`${API_URL}/api/pelanggan`, obj)
        .then(function (response) {
          dropdownRef.current.reset()
          setDomisili("")
          setJenisKelamin("")
          setNamaPelanggan("")
          const fetchData = axios
            .get(`${API_URL}/api/pelanggan`)
            .then(function (response) {
              setDataPelanggan(response.data.data)
            })
            .catch(function (e) {
              console.log(e)
            })
          setLoading(false)
          toast.show({
            render: () => {
              return (
                <Box bg="green.600" px="2" py="1" rounded="sm" mb={5}>
                  <Text color={"white"}>Data Pelanggan Berhasil Dicreate</Text>
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

  console.log(dataPelanggan)

  const handleEditPelanggan = (id: any) => {
    setLoading(true)
    const obj = {
      nama: editNamaPelanggan,
      domisili: editDomisili,
      jenis_kelamin: editJenisKelamin,
    }
    if (!editJenisKelamin || !editNamaPelanggan || !editDomisili) {
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
        .put(`${API_URL}/api/pelanggan?id_pelanggan=${id}`, obj)
        .then(function (response) {
          const fetchData = axios
            .get(`${API_URL}/api/pelanggan`)
            .then(function (response) {
              setDataPelanggan(response.data.data)
            })
            .catch(function (e) {
              console.log(e)
            })
          setLoading(false)
          toast.show({
            render: () => {
              return (
                <Box bg="green.600" px="2" py="1" rounded="sm" mb={5}>
                  <Text color={"white"}>Data Pelanggan Berhasil Diedit</Text>
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

  const handleDeletePelanggan = (id: any) => {
    setLoading(true)
    axios
      .delete(`${API_URL}/api/pelanggan?id_pelanggan=${id}`)
      .then(function (response) {
        const fetchData = axios
          .get(`${API_URL}/api/pelanggan`)
          .then(function (response) {
            setDataPelanggan(response.data.data)
          })
          .catch(function (e) {
            console.log(e)
          })
        setLoading(false)
        toast.show({
          render: () => {
            return (
              <Box bg="green.600" px="2" py="1" rounded="sm" mb={5}>
                <Text color={"white"}>Data Berhasil Didelete</Text>
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
                  Data gagal didelete karena memiliki no nota
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
      .get(`${API_URL}/api/pelanggan`)
      .then(function (response) {
        setDataPelanggan(response.data.data)
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
              <Text>Edit Data Pelanggan</Text>
              <Stack space={4} w="100%">
                <Input
                  borderColor={"#b0b1b2"}
                  size="md"
                  placeholder="Nama Pelanggan"
                  value={editNamaPelanggan}
                  onChangeText={(e) => {
                    setEditNamaPelanggan(e)
                  }}
                />
                <Input
                  borderColor={"#b0b1b2"}
                  size="md"
                  placeholder="Domisili"
                  value={editDomisili}
                  onChangeText={(e) => {
                    setEditDomisili(e)
                  }}
                />
                <SelectDropdown
                  ref={dropdownRef}
                  data={Gender}
                  defaultValue={editJenisKelamin}
                  buttonStyle={{
                    width: "100%",
                    borderColor: "#b0b1b2",
                    borderWidth: 1,
                    height: 45,
                    borderRadius: 5,
                  }}
                  buttonTextStyle={{
                    textAlign: "left",
                    fontSize: 14,
                    fontStyle: "normal",
                  }}
                  onSelect={(selectedItem) => {
                    setEditJenisKelamin(selectedItem)
                  }}
                  defaultButtonText={"Jenis Kelamin"}
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
                  onPress={() => handleEditPelanggan(ID)}
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
              <Text>Apakah kamu yakin ingin delete data pelanggan ini?</Text>
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
                  onPress={() => handleDeletePelanggan(ID)}
                >
                  Delete
                </Button>
              </HStack>
            </VStack>
          </View>
        </View>
      </Modal>
      {/* create pelanggan */}
      <Box width={"full"} alignItems={"center"}>
        <Stack space={4} w="100%" maxW="300px" mt={10}>
          <Input
            borderColor={"#b0b1b2"}
            size="md"
            placeholder="Nama Pelanggan"
            value={namaPelanggan}
            onChangeText={(e) => {
              setNamaPelanggan(e)
            }}
          />
          <Input
            borderColor={"#b0b1b2"}
            size="md"
            placeholder="Domisili"
            value={Domisili}
            onChangeText={(e) => {
              setDomisili(e)
            }}
          />
          <SelectDropdown
            data={Gender}
            buttonStyle={{
              width: "100%",
              borderColor: "#b0b1b2",
              borderWidth: 1,
              height: 45,
              borderRadius: 5,
            }}
            buttonTextStyle={{
              textAlign: "left",
              fontSize: 14,
              fontStyle: "normal",
            }}
            onSelect={(selectedItem) => {
              setJenisKelamin(selectedItem)
            }}
            defaultButtonText={"Jenis Kelamin"}
          />
          <Button
            isLoading={loading}
            isLoadingText="Submitting"
            onPress={() => handleCreatePelanggan()}
          >
            Create Pelanggan
          </Button>
        </Stack>
      </Box>

      {/* list data pelanggan */}
      <Text fontWeight={"semibold"} mt={5} fontSize={20}>
        List Data Pelanggan
      </Text>
      <FlatList
        mt={2}
        flex={1}
        width={"full"}
        height={"full"}
        contentContainerStyle={{ flexGrow: 1 }}
        disableVirtualization={false}
        data={dataPelanggan}
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
                  <Text numberOfLines={1}>Nama Pelanggan: {item.nama}</Text>
                  <Text numberOfLines={1}>Domisili: {item.domisili}</Text>
                  <Text numberOfLines={1}>
                    Jenis Kelamin: {item.jenis_kelamin}
                  </Text>
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
                        setID(item.id_pelanggan),
                        setEditNamaPelanggan(item.nama),
                        setEditDomisili(item.domisili),
                        setEditJenisKelamin(item.jenis_kelamin)
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
                      setModalDelete(true), setID(item.id_pelanggan)
                    }}
                  >
                    Delete
                  </Button>
                </VStack>
              </HStack>
            </VStack>
          </Box>
        )}
        keyExtractor={(item: any) => item.id_pelanggan}
      />
    </Container>
  )
}

export default Pelanggan
