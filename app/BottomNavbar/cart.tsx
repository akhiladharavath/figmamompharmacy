import { COLOR } from '@/constants/color';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Cart1 from '../Orders/Cart';

const Cart = () => {
  return (
    <SafeAreaView style={styles.screen}>
      {/* <TopNavbar /> */}
      <View style={styles.headerRow}>
        <TouchableOpacity
          style={styles.headerBackButton}
          onPress={() => router.back()}
        >
          <MaterialIcons name="arrow-back" size={28} color={COLOR.primary} />
        </TouchableOpacity>
      </View>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >

        {/* <View style={styles.container}>
          <View style={{ paddingHorizontal: 10 }}>
            <UploadPrescription />
          </View>
          <Ordering />
          <Medicines limit={2} />
          <Categories1 />

          <Footer />
        </View> */}
        <Cart1 />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',

  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,

  },
  container: {
    backgroundColor: '#fff',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  headerBackButton: {
    marginRight: 8,
    padding: 4,
    left: 20
  },
})



export default Cart