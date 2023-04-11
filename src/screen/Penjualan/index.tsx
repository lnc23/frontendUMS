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
  Pressable,
  ScrollView,
} from "native-base";
import { Modal, Platform } from "react-native";
import React, { useEffect } from "react";
import axios from "axios";
//@ts-ignore
import { API_URL } from "@env";
import SelectDropdown from "react-native-select-dropdown";
import moment from "moment";

const Penjualan = () => {
  const [loading, setLoading] = React.useState(false);
  const [modalDelete, setModalDelete] = React.useState(false);
  const [ID, setID] = React.useState<{
    kode: number;
    nama: string;
    kategori: string;
    harga: number;
  }>();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [Pelanggan, setPelanggan] = React.useState<{
    id_pelanggan: number;
    nama: string;
  }>();

  const [Quantity, setQuanity] = React.useState<any>([]);
  const [databarangDropdown, setDatabarangDropdown] = React.useState<any>([]);
  const [Tanggal, setTanggal] = React.useState(new Date());
  const [Kategori, setKategori] = React.useState("");
  const [Harga, setHarga] = React.useState("");
  const toast = useToast();
  const [editnamabarangDropdown, setEditNamabarangDropdown] =
    React.useState("");
  const [editKategori, setEditKategori] = React.useState("");
  const [editHarga, setEditHarga] = React.useState("");
  const [isDate, setIsDate] = React.useState(false);
  const [isEditDate, setIsEditDate] = React.useState(false);
  const [dataPelanggan, setDataPelanggan] = React.useState([]);
  const [size, setSize] = React.useState(1);
  const [Barang, setBarang] = React.useState<any>([]);
  const [hargaQuantity, setHargaQuantity] = React.useState<
    Array<{ harga: any; quantity: any }>
  >([]);

  const subTotal = () => {
    let totalHarga = 0;
    hargaQuantity.map((item) => {
      totalHarga += item.harga * item.quantity;
    });
    return totalHarga;
  };

  const handleCreatePenjualan = () => {
    setLoading(true);
    const subtotalpayload = hargaQuantity.map((item) => {
      let totalHarga = 0;
      totalHarga = totalHarga + item.harga * item.quantity;
      return totalHarga;
    });

    const combinedData = Barang.map((barang: any, index: any) => ({
      kode_barang: Number(barang),
      qty: Number(Quantity[index]),
    }));

    const obj = {
      tgl: moment(Tanggal).format("DD-MM-YYYY"),
      kode_pelanggan: Number(Pelanggan?.id_pelanggan),
      subtotal: subtotalpayload.reduce((curr, prev) => curr + prev),
      items: combinedData,
    };
    console.log(obj);
    if (!obj.subtotal || !obj.tgl || !obj.kode_pelanggan || !obj.items) {
      toast.show({
        render: () => {
          return (
            <Box bg="red.600" px="2" py="1" rounded="sm" mb={5}>
              <Text color={"white"}>Data yang diinput belum lengkap!</Text>
            </Box>
          );
        },
      });
      setLoading(false);
    } else {
      axios
        .post(`${API_URL}/api/penjualan`, obj)
        .then(function (response) {
          const fetchData = axios
            .get(`${API_URL}/api/penjualan`)
            .then(function (response) {
              setDatabarangDropdown(response.data);
            })
            .catch(function (e) {
              console.log(e);
            });
          setLoading(false);
          toast.show({
            render: () => {
              return (
                <Box bg="green.600" px="2" py="1" rounded="sm" mb={5}>
                  <Text color={"white"}>Berhasil Create Penjualan</Text>
                </Box>
              );
            },
          });
        })
        .catch(function (error) {
          console.log(error);
          setLoading(false);
          toast.show({
            render: () => {
              return (
                <Box bg="red.600" px="2" py="1" rounded="sm" mb={5}>
                  <Text color={"white"}>Gagal Create Penjualan</Text>
                </Box>
              );
            },
          });
        });
    }
  };

  const handleEditbarangDropdown = (id: any) => {
    setLoading(true);
    const obj = {
      nama: editnamabarangDropdown,
      kategori: editKategori,
      harga: Number(editHarga),
    };
    if (!editHarga || !editnamabarangDropdown || !editKategori) {
      toast.show({
        render: () => {
          return (
            <Box bg="red.600" px="2" py="1" rounded="sm" mb={5}>
              <Text color={"white"}>Data yang diinput belum lengkap!</Text>
            </Box>
          );
        },
      });
      setLoading(false);
    } else {
      axios
        .put(`${API_URL}/api/barangDropdown?kode=${id}`, obj)
        .then(function (response) {
          const fetchData = axios
            .get(`${API_URL}/api/barangDropdown`)
            .then(function (response) {
              setDatabarangDropdown(response.data);
            })
            .catch(function (e) {
              console.log(e);
            });
          setLoading(false);
          toast.show({
            render: () => {
              return (
                <Box bg="green.600" px="2" py="1" rounded="sm" mb={5}>
                  <Text color={"white"}>
                    Data barangDropdown Berhasil Diedit
                  </Text>
                </Box>
              );
            },
          });
          setModalVisible(false);
        })
        .catch(function (error) {
          console.log(error);
          setLoading(false);
          toast.show({
            render: () => {
              return (
                <Box bg="red.600" px="2" py="1" rounded="sm" mb={5}>
                  <Text color={"white"}>Data Gagal Diedit</Text>
                </Box>
              );
            },
          });
          setModalVisible(false);
        });
    }
  };

  const handleDeletebarangDropdown = (id: any) => {
    setLoading(true);
    axios
      .delete(`${API_URL}/api/barangDropdown?kode=${id}`)
      .then(function (response) {
        const fetchData = axios
          .get(`${API_URL}/api/barangDropdown`)
          .then(function (response) {
            setDatabarangDropdown(response.data);
          })
          .catch(function (e) {
            console.log(e);
          });
        setLoading(false);
        toast.show({
          render: () => {
            return (
              <Box bg="green.600" px="2" py="1" rounded="sm" mb={5}>
                <Text color={"white"}>barangDropdown Berhasil Didelete</Text>
              </Box>
            );
          },
        });
        setModalDelete(false);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
        toast.show({
          render: () => {
            return (
              <Box bg="red.600" px="2" py="1" rounded="sm" mb={5}>
                <Text color={"white"}>
                  barangDropdown gagal didelete karena sudah terdaftar no nota
                </Text>
              </Box>
            );
          },
        });
        setModalVisible(false);
      });
  };

  useEffect(() => {
    axios
      .get(`${API_URL}/api/barang`)
      .then(function (response) {
        setDatabarangDropdown(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    axios
      .get(`${API_URL}/api/pelanggan`)
      .then(function (response) {
        setDataPelanggan(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [!loading]);

  const setNamaBarang = (index: number, kode: any) => {
    const tempArr = [...Barang];
    tempArr[index] = kode;
    setBarang(tempArr);
  };

  const setTotalQuantity = (index: number, qty: any) => {
    const tempArr = [...Quantity];
    tempArr[index] = qty;
    setQuanity(tempArr);
  };

  const generateInput = () => {
    const generate = [];
    for (let i = 0; i < size; i++) {
      generate.push(
        <Stack space={4} w="100%" maxW="300px">
          <Text>Barang ke {i + 1}</Text>
          <SelectDropdown
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
              setNamaBarang(i, selectedItem.kode);
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
                    {selectedItem ? selectedItem.nama : "Pilih barangDropdown"}
                  </Text>
                </View>
              );
            }}
            defaultButtonText={"Pilih barangDropdown"}
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
              );
            }}
          />
          <Input
            keyboardType="numeric"
            borderColor={"#b0b1b2"}
            size="md"
            placeholder="Masukkan Quantity"
            onChangeText={(e) => {
              setTotalQuantity(i, e);
            }}
          />
        </Stack>
      );
    }
    return generate;
  };

  // tampung harga dan quantity
  useEffect(() => {
    const tempArr = [...hargaQuantity];

    for (let i = 0; i < Barang.length; i++) {
      const harga = databarangDropdown.find(
        (item: any) => Number(item.kode) === Number(Barang[i])
      ).harga;
      const qty = Quantity[i];

      tempArr[i] = { harga: Number(harga), quantity: Number(qty) };
    }

    setHargaQuantity(tempArr);
  }, [Barang, Quantity]);

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
            setModalVisible(false);
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
                <Text>Edit Data barangDropdown</Text>
                <Stack space={4} width="100%">
                  <Input
                    width={"100%"}
                    borderColor={"#b0b1b2"}
                    size="md"
                    placeholder="Tanggal Penjualan"
                    value={editnamabarangDropdown}
                    onChangeText={(e) => {
                      setEditNamabarangDropdown(e);
                    }}
                  />
                  <Input
                    borderColor={"#b0b1b2"}
                    size="md"
                    keyboardType="numeric"
                    placeholder="Harga"
                    value={editHarga}
                    onChangeText={(e) => {
                      setEditHarga(e);
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
                    onPress={() => handleEditbarangDropdown(ID)}
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
            setModalDelete(false);
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
                <Text>
                  Apakah kamu yakin ingin delete data barangDropdown ini?
                </Text>
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

        {/* create Penjualan */}
        <Box width={"full"} alignItems={"center"}>
          <Stack space={4} w="100%" maxW="300px" mt={10}>
            <Pressable onPress={() => setIsDate(true)}>
              <Input
                isDisabled
                borderColor={"#b0b1b2"}
                size="md"
                placeholder="Tanggal Penjualan"
                value={Tanggal.toString()}
              />
            </Pressable>
            <SelectDropdown
              data={dataPelanggan}
              defaultValue={Pelanggan?.nama}
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
                });
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
                );
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
                );
              }}
            />
            <Text>Subtotal Harga : {subTotal()}</Text>
            <HStack space={2}>
              <Button w={10} bg={"red.600"} onPress={() => setSize(size - 1)}>
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
          List Master Barang
        </Text>
        {/* <FlatList
          mt={2}
          flex={1}
          width={"full"}
          height={"full"}
          contentContainerStyle={{ flexGrow: 1 }}
          disableVirtualization={false}
          data={databarangDropdown}
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
                          setEditNamabarangDropdown(item.nama),
                          setEditKategori(item.kategori),
                          setEditHarga(item.harga.toString());
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
                        setModalDelete(true), setID(item.kode);
                      }}
                    >
                      Delete
                    </Button>
                  </VStack>
                </HStack>
              </VStack>
            </Box>
          )}
          keyExtractor={(item: any) => item.id_barangDropdown}
        /> */}
      </ScrollView>
    </Container>
  );
};

export default Penjualan;
