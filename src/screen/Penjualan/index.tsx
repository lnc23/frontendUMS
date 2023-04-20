import {
  Box,
  Input,
  Stack,
  Button,
  Text,
  useToast,
  VStack,
  HStack,
  Container,
  View,
  ScrollView,
} from "native-base"
import { Modal, Platform, TextInput } from "react-native"
import React, { useEffect, useRef, useState } from "react"
import axios from "axios"
//@ts-ignore
import { API_URL } from "@env"
import SelectDropdown from "react-native-select-dropdown"
import moment from "moment"
import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { StackParamList } from "../../routes/RouteStack"

const Penjualan = () => {
  const [editPelanggan, setEditPelanggan] = React.useState<{
    id_pelanggan: number
  }>()
  const [editIdItem, setEditIdItem] = React.useState<any>([])
  const [editBarang, setEditBarang] = React.useState<any>([])
  const [editQuantity, setEditQuantity] = React.useState<any>([])
  const [detailPenjualan, setDetailPenjualan] = React.useState<Array<any>>()
  const [loading, setLoading] = React.useState(false)
  const [modalDelete, setModalDelete] = React.useState(false)
  const [ID, setID] = React.useState<{
    kode: number
    nama: string
    kategori: string
    harga: number
  }>()
  const [modalVisible, setModalVisible] = React.useState(false)
  const [Pelanggan, setPelanggan] = React.useState<{
    id_pelanggan: number
    nama: string
  }>()
  const [dataPenjualan, setDataPenjualan] = React.useState<Array<any>>()
  const [Quantity, setQuanity] = React.useState<any>([])
  const [databarangDropdown, setDatabarangDropdown] = React.useState<any>([])
  const [Tanggal, setTanggal] = React.useState(new Date())
  const toast = useToast()
  const [dataPelanggan, setDataPelanggan] = React.useState<Array<any>>([])
  const [size, setSize] = React.useState(1)
  const [Barang, setBarang] = React.useState<any>([])
  const [modalDetail, setModalDetail] = React.useState(false)
  const [editDataPenjualan, setEditDataPenjualan] = React.useState<any>()
  const [hargaQuantity, setHargaQuantity] = React.useState<
    Array<{ harga: any; quantity: any }>
  >([])
  const [editHargaQuantity, setEditHargaQuantity] = React.useState<
    Array<{ harga: any; quantity: any }>
  >([])
  const inputRef = useRef<any>(null)
  const dropdownRef = useRef<any>({})
  const navigation = useNavigation<StackNavigationProp<StackParamList>>()

  const subTotal = () => {
    let totalHarga = 0
    hargaQuantity.map((item) => {
      totalHarga += item?.harga * item?.quantity
    })
    if (!totalHarga) {
      return 0
    } else {
      return totalHarga
    }
  }

  const editSubtotal = () => {
    let totalHarga = 0
    editHargaQuantity.map((item) => {
      totalHarga += item?.harga * item?.quantity
    })
    if (!totalHarga) {
      return 0
    } else {
      return totalHarga
    }
  }

  const handleCreatePenjualan = () => {
    setLoading(true)
    if (!Tanggal || !Pelanggan || Barang.length === 0) {
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
      const subtotalpayload = hargaQuantity.map((item) => {
        let totalHarga = 0
        totalHarga = totalHarga + item.harga * item.quantity
        return totalHarga
      })

      const combinedData = Barang.splice(0, size).map(
        (barang: any, index: any) => ({
          kode_barang: Number(barang),
          qty: Number(Quantity[index]),
        })
      )

      const obj = {
        tgl: moment(Tanggal).format("DD-MM-YYYY"),
        kode_pelanggan: Number(Pelanggan?.id_pelanggan),
        subtotal: subtotalpayload.reduce((curr, prev) => curr + prev),
        items: combinedData,
      }
      console.log(obj)
      axios
        .post(`${API_URL}/api/penjualan`, obj)
        .then(function (response) {
          navigation.replace("Penjualan")
          setPelanggan({ id_pelanggan: 0, nama: "" })
          setBarang([])
          axios
            .get(`${API_URL}/api/penjualan`)
            .then(function (response) {
              setDataPenjualan(response.data)
            })
            .catch(function (e) {
              console.log(e)
            })
          setLoading(false)
          toast.show({
            render: () => {
              return (
                <Box bg="green.600" px="2" py="1" rounded="sm" mb={5}>
                  <Text color={"white"}>Berhasil Create Penjualan</Text>
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
                  <Text color={"white"}>Gagal Create Penjualan</Text>
                </Box>
              )
            },
          })
        })
    }
  }

  console.log(dataPenjualan)

  const handleEditPenjualan = () => {
    setLoading(true)
    if (!Tanggal || !editPelanggan || editBarang.length === 0) {
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
      const combinedData = editBarang.map((item: any, index: any) => ({
        id_item: Number(editIdItem[index]),
        kode_barang: Number(item),
        qty: Number(editQuantity[index]),
      }))

      const obj = {
        tgl: moment(Tanggal).format("DD-MM-YYYY"),
        kode_pelanggan: Number(editPelanggan?.id_pelanggan),
        subtotal: editSubtotal(),
        items: combinedData,
      }

      console.log(obj)
      axios
        .put(
          `${API_URL}/api/penjualan?id_nota=${editDataPenjualan.id_nota}`,
          obj
        )
        .then(function (response) {
          navigation.replace("Penjualan")
          setLoading(false)
          toast.show({
            render: () => {
              return (
                <Box bg="green.600" px="2" py="1" rounded="sm" mb={5}>
                  <Text color={"white"}>Data Penjualan Berhasil Diedit</Text>
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
                  <Text color={"white"}>Data Penjualan Gagal Diedit</Text>
                </Box>
              )
            },
          })
          setModalVisible(false)
        })
    }
  }

  const handleDeletebarangDropdown = (id: any) => {
    setLoading(true)
    axios
      .delete(`${API_URL}/api/penjualan?id_nota=${id}`)
      .then(function (response) {
        const fetchData = axios
          .get(`${API_URL}/api/penjualan`)
          .then(function (response) {
            setDataPenjualan(response.data)
          })
          .catch(function (e) {
            console.log(e)
          })
        setLoading(false)
        toast.show({
          render: () => {
            return (
              <Box bg="green.600" px="2" py="1" rounded="sm" mb={5}>
                <Text color={"white"}>Penjualan Berhasil Didelete</Text>
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
                  barangDropdown gagal didelete karena sudah terdaftar no nota
                </Text>
              </Box>
            )
          },
        })
        setModalVisible(false)
      })
  }

  useEffect(() => {
    const fetchData = async () => {
      const barang = await axios
        .get(`${API_URL}/api/barang`)
        .then(function (response) {
          return response.data
        })
        .catch(function (error) {
          console.log(error)
        })
      const pelanggan = await axios
        .get(`${API_URL}/api/pelanggan`)
        .then(function (response) {
          return response.data.data
        })
        .catch(function (error) {
          console.log(error)
        })
      const penjualan = await axios
        .get(`${API_URL}/api/penjualan`)
        .then(function (response) {
          return response.data
        })
        .catch(function (error) {
          console.log(error)
        })
      setDatabarangDropdown(barang)
      setDataPelanggan(pelanggan)
      setDataPenjualan(penjualan)
    }
    fetchData()
  }, [!loading])

  const setNamaBarang = (index: number, kode: any) => {
    const tempArr = [...Barang]
    tempArr[index] = kode
    setBarang(tempArr)
  }

  const setTotalQuantity = (index: number, qty: any) => {
    const tempArr = [...Quantity]
    tempArr[index] = qty
    setQuanity(tempArr)
  }

  const setEditNamaBarang = (index: number, kode: any) => {
    const tempArr = [...editBarang]
    tempArr[index] = kode
    setEditBarang(tempArr)
  }

  const setEditTotalQuantity = (index: number, qty: any) => {
    const tempArr = [...editQuantity]
    tempArr[index] = qty
    setEditQuantity(tempArr)
  }

  const generateInput = () => {
    const generate = []
    for (let i = 0; i < size; i++) {
      generate.push(
        <Stack key={i} space={4} w="100%" maxW="300px">
          <Text>Barang ke {i + 1}</Text>
          <SelectDropdown
            ref={dropdownRef}
            data={databarangDropdown}
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
              setNamaBarang(i, selectedItem.kode)
            }}
            renderCustomizedButtonChild={(selectedItem, index) => {
              return (
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingHorizontal: 18,
                  }}
                >
                  <Text>
                    {selectedItem ? selectedItem.nama : "Pilih Barang"}
                  </Text>
                </View>
              )
            }}
            defaultButtonText={"Pilih Barang"}
            renderCustomizedRowChild={(item, index) => {
              return (
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    paddingHorizontal: 18,
                  }}
                >
                  <Text>{item.nama} - {item.warna}</Text>
                </View>
              )
            }}
          />
          <Input
            ref={inputRef}
            keyboardType="numeric"
            borderColor={"#b0b1b2"}
            size="md"
            placeholder="Masukkan Quantity"
            onChangeText={(e) => {
              setTotalQuantity(i, e)
            }}
          />
        </Stack>
      )
    }
    return generate
  }

  // tampung harga dan quantity dengan menyamakan id
  useEffect(() => {
    const tempArr = [...hargaQuantity]

    for (let i = 0; i < Barang.length; i++) {
      const harga = databarangDropdown.find(
        (item: any) => Number(item.kode) === Number(Barang[i])
      ).harga
      const qty = Quantity[i]

      tempArr[i] = { harga: Number(harga), quantity: Number(qty) }
    }

    setHargaQuantity(tempArr)
  }, [Barang, Quantity])

  // tampung edit harga dan edit quantity dengan menyamakan id
  useEffect(() => {
    const tempArr = [...hargaQuantity]

    for (let i = 0; i < editBarang.length; i++) {
      const harga = databarangDropdown.find(
        (item: any) => Number(item.kode) === Number(editBarang[i])
      ).harga
      const qty = editQuantity[i]

      tempArr[i] = { harga: Number(harga), quantity: Number(qty) }
    }

    setEditHargaQuantity(tempArr)
  }, [editBarang, editQuantity])

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
      <ScrollView width={"100%"} height={"100%"}>
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
              width={"full"}
              my={10}
              backgroundColor={"white"}
              borderRadius={10}
              padding={10}
              alignItems={"center"}
              shadow={"5"}
            >
              <ScrollView width={"full"}>
                <VStack alignItems={"center"}>
                  <Text>Edit Data Penjualan</Text>
                  <Stack space={4} w="100%" maxW="300px" mt={10}>
                    <Input
                      isDisabled
                      borderColor={"#b0b1b2"}
                      size="md"
                      placeholder="Tanggal Penjualan"
                      value={moment(Tanggal).format("DD-MM-YYYY")}
                    />
                    <SelectDropdown
                      ref={dropdownRef}
                      data={dataPelanggan}
                      defaultValue={editPelanggan?.id_pelanggan}
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
                        setEditPelanggan({
                          id_pelanggan: Number(selectedItem.id_pelanggan),
                        })
                      }}
                      renderCustomizedButtonChild={(selectedItem, index) => {
                        return (
                          <View
                            style={{
                              flex: 1,
                              flexDirection: "row",
                              justifyContent: "space-between",
                              alignItems: "center",
                              paddingHorizontal: 18,
                            }}
                          >
                            <Text>
                              {selectedItem
                                ? selectedItem.nama
                                : dataPelanggan?.find(
                                    (item: any) =>
                                      Number(item.id_pelanggan) ===
                                      Number(editPelanggan?.id_pelanggan)
                                  )?.nama}
                            </Text>
                          </View>
                        )
                      }}
                      defaultButtonText={"Pilih Pelanggan"}
                      renderCustomizedRowChild={(item, index) => {
                        return (
                          <View
                            style={{
                              flex: 1,
                              flexDirection: "row",
                              justifyContent: "flex-start",
                              alignItems: "center",
                              paddingHorizontal: 18,
                            }}
                          >
                            <Text>{item.nama}</Text>
                          </View>
                        )
                      }}
                    />
                    <Text>Subtotal Harga : {editSubtotal()}</Text>
                    {editDataPenjualan?.item_penjualan?.map(
                      (item: any, i: number) => (
                        <Stack key={i} space={4} w="100%" maxW="300px">
                          <Text>Barang ke {i + 1}</Text>
                          <SelectDropdown
                            defaultValue={editBarang[i]}
                            ref={dropdownRef}
                            data={databarangDropdown}
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
                              setEditNamaBarang(i, selectedItem.kode)
                            }}
                            renderCustomizedButtonChild={(selectedItem) => {
                              return (
                                <View
                                  style={{
                                    flex: 1,
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    paddingHorizontal: 18,
                                  }}
                                >
                                  <Text>
                                    {selectedItem
                                      ? selectedItem.nama
                                      : databarangDropdown?.find(
                                          (item: any) =>
                                            Number(item.kode) ===
                                            Number(editBarang[i])
                                        )?.nama}
                                  </Text>
                                </View>
                              )
                            }}
                            defaultButtonText={"Pilih Barang"}
                            renderCustomizedRowChild={(item, index) => {
                              return (
                                <View
                                  style={{
                                    flex: 1,
                                    flexDirection: "row",
                                    justifyContent: "flex-start",
                                    alignItems: "center",
                                    paddingHorizontal: 18,
                                  }}
                                >
                                  <Text>{item.nama}</Text>
                                </View>
                              )
                            }}
                          />
                          <Input
                            ref={inputRef}
                            keyboardType="numeric"
                            borderColor={"#b0b1b2"}
                            size="md"
                            value={editQuantity[i].toString()}
                            placeholder="Masukkan Quantity"
                            onChangeText={(e) => {
                              setEditTotalQuantity(i, e)
                            }}
                          />
                        </Stack>
                      )
                    )}
                  </Stack>
                  <HStack width={"full"} mt={5} space={1}>
                    <Button
                      flex={1}
                      bg={"red.600"}
                      colorScheme={"secondary"}
                      onPress={() => {
                        setModalVisible(false)
                      }}
                    >
                      Close
                    </Button>

                    <Button
                      flex={1}
                      isLoading={loading}
                      isLoadingText="Submitting"
                      onPress={() => handleEditPenjualan()}
                    >
                      Save
                    </Button>
                  </HStack>
                </VStack>
              </ScrollView>
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
                <Text>Apakah kamu yakin ingin delete data penjualan ini?</Text>
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
                    onPress={() => handleDeletebarangDropdown(ID)}
                  >
                    Delete
                  </Button>
                </HStack>
              </VStack>
            </View>
          </View>
        </Modal>

        {/* modal Detail */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalDetail}
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
              <VStack space={5}>
                <Text alignSelf={"center"}>Detail Penjualan</Text>
                {detailPenjualan?.map((item: any, index) => (
                  <Box key={index}>
                    <Text>Barang Ke {index + 1}</Text>
                    <Text>
                      Nama Barang:{" "}
                      {
                        databarangDropdown?.find(
                          (data: any) =>
                            Number(data.kode) === Number(item.kode_barang)
                        )?.nama
                      }
                    </Text>
                    <Text>Quantity: {item.qty}</Text>
                  </Box>
                ))}

                <HStack width={"full"} space={1}>
                  <Button
                    flex={1}
                    bg={"red.600"}
                    colorScheme={"secondary"}
                    onPress={() => setModalDetail(false)}
                  >
                    Close
                  </Button>
                </HStack>
              </VStack>
            </View>
          </View>
        </Modal>

        {/* create Penjualan */}
        <Box width={"full"} alignItems={"center"}>
          <Stack space={4} w="100%" maxW="300px" mt={10}>
            <Input
              isDisabled
              borderColor={"#b0b1b2"}
              size="md"
              placeholder="Tanggal Penjualan"
              value={moment(Tanggal).format("DD-MM-YYYY")}
            />
            <SelectDropdown
              ref={dropdownRef}
              data={dataPelanggan}
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
                setPelanggan({
                  id_pelanggan: Number(selectedItem.id_pelanggan),
                  nama: selectedItem.nama,
                })
              }}
              renderCustomizedButtonChild={(selectedItem, index) => {
                return (
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingHorizontal: 18,
                    }}
                  >
                    <Text>
                      {selectedItem ? selectedItem.nama : "Pilih Pelanggan"}
                    </Text>
                  </View>
                )
              }}
              defaultButtonText={"Pilih Pelanggan"}
              renderCustomizedRowChild={(item, index) => {
                return (
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      paddingHorizontal: 18,
                    }}
                  >
                    <Text>{item.nama}</Text>
                  </View>
                )
              }}
            />
            <Text>Subtotal Harga : {subTotal()}</Text>
            <HStack space={2}>
              <Button
                w={10}
                bg={"red.600"}
                disabled={size <= 1}
                onPress={() => setSize(size - 1)}
              >
                -
              </Button>
              <Button w={10} bg={"green.600"} onPress={() => setSize(size + 1)}>
                +
              </Button>
            </HStack>

            {generateInput()}

            <Button
              isLoading={loading}
              isLoadingText="Submitting"
              onPress={() => handleCreatePenjualan()}
            >
              Create Penjualan
            </Button>
          </Stack>
        </Box>

        {/* list data barangDropdown */}
        <Text fontWeight={"semibold"} mt={5} fontSize={20}>
          List Penjualan
        </Text>
        <VStack>
          {dataPenjualan?.length === 0
            ? null
            : dataPenjualan?.map((item: any, index) => (
                <Box
                  key={index}
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
                  <VStack key={index}>
                    <HStack flex={1} alignItems={"center"}>
                      <Box flex={1}>
                        <Text numberOfLines={1}>No Nota: {item.id_nota}</Text>
                        <Text numberOfLines={1}>
                          Nama Pelanggan:{" "}
                          {
                            dataPelanggan?.find(
                              (data: any) =>
                                Number(data?.id_pelanggan) ===
                                Number(item?.kode_pelanggan)
                            )?.nama
                          }
                        </Text>
                        <Text numberOfLines={1}>
                          Harga Pembelian: {item.subtotal}
                        </Text>
                      </Box>
                      <VStack space={2} alignItems={"center"}>
                        <Button
                          size={7}
                          bgColor={"gray.600"}
                          alignItems={"center"}
                          w={12}
                          rounded={6}
                          onPress={() => {
                            setModalDetail(true)
                            setDetailPenjualan(item.item_penjualan)
                          }}
                        >
                          Detail
                        </Button>
                        <Button
                          size={7}
                          bgColor={"yellow.600"}
                          alignItems={"center"}
                          w={10}
                          rounded={6}
                          onPress={() => {
                            setModalVisible(true),
                              setEditDataPenjualan(item),
                              setEditPelanggan({
                                id_pelanggan: item?.kode_pelanggan,
                              })
                            const tempArrBarang = [...editBarang]
                            const tempArrQuantity = [...editQuantity]
                            const tempArrIdItem = [...editIdItem]
                            item.item_penjualan.map((data: any, index: any) => {
                              tempArrBarang[index] = data?.kode_barang
                              tempArrQuantity[index] = data?.qty
                              tempArrIdItem[index] = data.id_item
                              setEditBarang(tempArrBarang)
                              setEditQuantity(tempArrQuantity)
                              setEditIdItem(tempArrIdItem)
                            })
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
                            setModalDelete(true), setID(item.id_nota)
                          }}
                        >
                          Delete
                        </Button>
                      </VStack>
                    </HStack>
                  </VStack>
                </Box>
              ))}
        </VStack>
      </ScrollView>
    </Container>
  )
}

export default Penjualan
