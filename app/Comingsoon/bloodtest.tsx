import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import * as React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function MomPharmacy() {
  React.useEffect(() => {

  }, []);

  return (
    <SafeAreaView style={styles.container}>
      
        <TouchableOpacity style={styles.backButton} onPress={() => { router.back()}}>
          <Ionicons name="chevron-back" size={24} color="#0d7377" />
        </TouchableOpacity>
       <View >
        <Text style={styles.title}>mom pharmacy</Text>

        
        </View>
        <Text style={styles.subtitle}>Your Doctor, Just a Tap Away</Text>
        <Image
          source={require('../../assets/images/bloodtest.gif')}
          style={styles.ctaIcon}
        />


        <Text style={styles.comingSoon}>Coming soon..</Text>
     
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
  
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
   
height:'100%'
  },
  
  backButton: {
    position: 'absolute',
    top: 24,
    left: 20,
  },
  title: {
    color: '#0d7377',
    fontWeight: '600',
    fontSize: 24,
    marginTop:-200
   
  },
  subtitle: {
    color: '#6b7280',
    fontWeight: '600',
    fontSize: 14,
    marginBottom: 24,
    textAlign: 'center',
  },
  ctaIcon: {
    width: 160,
    height: 160,
    marginBottom: 24,
  },
  comingSoon: {
    color: '#6b7280',
    fontWeight: '600',
    fontSize: 14,
  },
});