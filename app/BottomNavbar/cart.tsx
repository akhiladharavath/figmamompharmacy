import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import Cart1 from '../Orders/Cart'

const Cart = () => {
  return (
    <View style={styles.screen}>
      {/* <TopNavbar /> */}
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
    </View>
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
})



export default Cart