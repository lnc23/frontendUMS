import { useNavigation } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { FunctionComponent } from "react"
import Home from "../screen/Home"

export type StackParamList = {
  Home: { jancuk: string }
  // About: undefined;
  // Notification: undefined;
  // SemuaEvent: undefined;
  // DetailEvent: undefined;
  // HistoryTransaksiPage: undefined;
  // Withdraw: undefined;
  // TambahRekeningBaru: undefined;
  // WithdrawBank: undefined;
  // DetailWithdrawBank: undefined;
  // Receipt: undefined;
  // Bayar: undefined;
  // ScanPage: undefined;
  // QRBayar: undefined;
}

const Stack = createNativeStackNavigator<StackParamList>()

const RouteStack: FunctionComponent = () => {
  // const navigation = useNavigation()

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerTitleAlign: "center",
        }}
      />
      {/* <Stack.Screen
            name="Notification"
            component={NotificationPage}
            options={{
              ...TransitionPresets.SlideFromRightIOS,
              gestureEnabled: true,
              gestureDirection: 'horizontal',
              headerBackVisible: false,
              headerLeft: props => (
                <ChevronBackButton
                  {...props}
                  onPress={() => {
                    navigation.goBack();
                  }}
                />
              ),
              headerTitleAlign: 'center',
              headerTitle: () => <SectionHeader mainText={'Notifikasi'} />,
              headerStyle: {
                backgroundColor: theme.colors.mainBackground,
              },
            }}
          />
          <Stack.Screen
            name="SemuaEvent"
            component={SemuaEvent}
            options={{
              ...TransitionPresets.SlideFromRightIOS,
              gestureEnabled: true,
              gestureDirection: 'horizontal',
              headerBackVisible: false,
              headerLeft: props => (
                <ChevronBackButton
                  {...props}
                  onPress={() => {
                    navigation.goBack();
                  }}
                />
              ),
              headerTitleAlign: 'center',
              headerTitle: () => <SectionHeader mainText={'Semua Event'} />,
              headerStyle: {
                backgroundColor: theme.colors.mainBackground,
              },
            }}
          />
          <Stack.Screen
            name="DetailEvent"
            component={DetailEvent}
            options={{
              ...TransitionPresets.SlideFromRightIOS,
              gestureEnabled: true,
              gestureDirection: 'horizontal',
              headerBackVisible: false,
              headerLeft: props => (
                <ChevronBackButton
                  {...props}
                  onPress={() => {
                    navigation.goBack();
                  }}
                />
              ),
    
              headerTitle: () => (
                <HeaderDetailEvent
                  mainText={
                    'Stray Kids 2nd World Tour “MANIAC” In JAKARTA Day 2 - November 13'
                  }
                />
              ),
              headerRight: () => <StatusEvent />,
              headerStyle: {
                backgroundColor: theme.colors.mainBackground,
              },
            }}
          />
          <Stack.Screen
            name="HistoryTransaksiPage"
            component={HistoryTransaksiPage}
            options={{
              ...TransitionPresets.SlideFromRightIOS,
              gestureEnabled: true,
              gestureDirection: 'horizontal',
              headerBackVisible: false,
              headerLeft: props => (
                <ChevronBackButton
                  {...props}
                  onPress={() => {
                    navigation.goBack();
                  }}
                />
              ),
              headerTitleAlign: 'center',
              headerTitle: () => <SectionHeader mainText={'Semua Transaksi'} />,
              headerStyle: {
                backgroundColor: theme.colors.mainBackground,
              },
            }}
          />
          <Stack.Screen
            name="Withdraw"
            component={Withdraw}
            options={{
              ...TransitionPresets.SlideFromRightIOS,
              gestureEnabled: true,
              gestureDirection: 'horizontal',
              headerBackVisible: false,
              headerLeft: props => (
                <ChevronBackButton
                  {...props}
                  onPress={() => {
                    navigation.goBack();
                  }}
                />
              ),
              headerTitleAlign: 'center',
              headerTitle: () => <SectionHeader mainText={'Withdraw'} />,
              headerStyle: {
                backgroundColor: theme.colors.mainBackground,
              },
            }}
          />
          <Stack.Screen
            name="TambahRekeningBaru"
            component={TambahRekeningBaru}
            options={{
              ...TransitionPresets.SlideFromRightIOS,
              gestureEnabled: true,
              gestureDirection: 'horizontal',
              headerBackVisible: false,
              headerLeft: props => (
                <ChevronBackButton
                  {...props}
                  onPress={() => {
                    navigation.goBack();
                  }}
                />
              ),
              headerTitleAlign: 'center',
              headerTitle: () => <SectionHeader mainText={'Tambah Rekening'} />,
              headerStyle: {
                backgroundColor: theme.colors.mainBackground,
              },
            }}
          />
          <Stack.Screen
            name="WithdrawBank"
            component={WithdrawBank}
            options={{
              ...TransitionPresets.SlideFromRightIOS,
              gestureEnabled: true,
              gestureDirection: 'horizontal',
              headerBackVisible: false,
              headerLeft: props => (
                <ChevronBackButton
                  {...props}
                  onPress={() => {
                    navigation.goBack();
                  }}
                />
              ),
              headerTitleAlign: 'center',
              headerTitle: () => <SectionHeader mainText={'Withdraw Ke BRI'} />,
              headerStyle: {
                backgroundColor: theme.colors.mainBackground,
              },
            }}
          />
          <Stack.Screen
            name="DetailWithdrawBank"
            component={DetailWithdrawbank}
            options={{
              ...TransitionPresets.SlideFromRightIOS,
              gestureEnabled: true,
              gestureDirection: 'horizontal',
              headerBackVisible: false,
              headerLeft: props => (
                <ChevronBackButton
                  {...props}
                  onPress={() => {
                    navigation.goBack();
                  }}
                />
              ),
              headerTitleAlign: 'center',
              headerTitle: () => <SectionHeader mainText={'Withdraw Ke BRI'} />,
              headerStyle: {
                backgroundColor: theme.colors.mainBackground,
              },
            }}
          />
          <Stack.Screen
            name="Receipt"
            component={Receipt}
            options={{
              ...TransitionPresets.SlideFromRightIOS,
              gestureEnabled: true,
              gestureDirection: 'horizontal',
              headerBackVisible: false,
              headerLeft: props => (
                <ChevronBackButton
                  {...props}
                  onPress={() => {
                    navigation.goBack();
                  }}
                />
              ),
              headerTitleAlign: 'center',
              headerTitle: () => <SectionHeader mainText={'Receipt'} />,
              headerStyle: {
                backgroundColor: theme.colors.mainBackground,
              },
            }}
          />
          <Stack.Screen
            name="Bayar"
            component={Bayar}
            options={{
              ...TransitionPresets.SlideFromRightIOS,
              gestureEnabled: true,
              gestureDirection: 'horizontal',
              headerBackVisible: false,
              headerLeft: props => (
                <ChevronBackButton
                  {...props}
                  onPress={() => {
                    navigation.goBack();
                  }}
                />
              ),
              headerTitleAlign: 'center',
              headerTitle: () => <SectionHeader mainText={'Bayar'} />,
              headerStyle: {
                backgroundColor: theme.colors.mainBackground,
              },
            }}
          />
          <Stack.Screen
            name="ScanPage"
            component={ScanPage}
            options={{
              ...TransitionPresets.SlideFromRightIOS,
              gestureEnabled: true,
              gestureDirection: 'horizontal',
              headerBackVisible: false,
              headerShown: false,
            }}
          /> */}
      {/* <Stack.Screen
            name="QRBayar"
            component={QRBayar}
            options={{
              ...TransitionPresets.SlideFromRightIOS,
              gestureEnabled: true,
              gestureDirection: "horizontal",
              headerBackVisible: false,
              headerLeft: (props) => (
                <Ionicons
                  {...props}
                  name="chevron-back"
                  size={24}
                  color="#DCDCDC"
                  onPress={() => {
                    navigation.goBack()
                  }}
                />
              ),
              headerTitleAlign: "center",
              headerTitle: () => <SectionHeader mainText={"Jumlah Bayar"} />,
              headerStyle: {
                backgroundColor: "#191919",
              },
            }}
          /> */}
    </Stack.Navigator>
  )
}

//TODO: implement Auth flow (private & public page)

export default RouteStack
