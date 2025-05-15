import DateTimePicker from '@react-native-community/datetimepicker';
import { BlurView } from 'expo-blur';
import { router } from 'expo-router';
import React, { useState } from 'react';

import { Picker } from '@react-native-picker/picker';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { Button, Checkbox } from 'react-native-paper';

import { userAuth } from '../../Context/authContext';
import WelcomeCard from './success';

const SignUpScreen = () => {
  const { ExtractParseToken , getUserDetails } = userAuth();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [gender , setGender] = useState()

  // const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);
  // const validatePhone = (phone: string) => /^[0-9]{10}$/.test(phone);

 



  async function signupUser(){
    const AuthToken = await ExtractParseToken();

    try{
      const options = {
        method:"PUT", 
        headers:{
          "Authorization":`Bearer ${AuthToken}` , 
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          name:`${firstName} ${lastName}` , 
          dateOfBirth:dob , 
          gender,
        })
      }
      const response = await fetch("https://mom-beta-server1.onrender.com/api/user/register" , options)
      console.log(response)
      if(response.ok){
        console.log("this is running")
        await getUserDetails()
        router.replace("/Login/success")
      }else{
        router.replace("/BottomNavbar/home")
      }
    }catch(e){
      console.log("Error in signing up" , e)
    }
  }

  const handleSignUp = async () => {
    if (!firstName.trim()) return Alert.alert('Validation Error', 'First name is required');
    if (!lastName.trim()) return Alert.alert('Validation Error', 'Last name is required');
    if (!dob.trim()) return Alert.alert('Validation Error', 'Date of birth is required');
    if(isChecked){
      signupUser()
    }else{
      Alert.alert("Please accept the terms and conditions")
    }
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    if (event.type === 'set' && selectedDate) {
      const formatted = selectedDate.toISOString().split('T')[0];
      setDob(formatted);
    }
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
  };

  const closeModal = () => setModalVisible(false);

  return (
    <View style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={styles.outerContainer} keyboardShouldPersistTaps="handled">
            <View style={styles.headerRow}>
              <Text style={styles.header}>Sign Up</Text>
             
            </View>

            <Text style={styles.label}>First Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your first name"
              placeholderTextColor="#888"
              value={firstName}
              onChangeText={setFirstName}
            />

            <Text style={styles.label}>Last Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your last name"
              placeholderTextColor="#888"
              value={lastName}
              onChangeText={setLastName}
            />

            <Text style={styles.label}>Date of Birth</Text>
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <TextInput
                style={styles.input}
                placeholder="Select your date of birth"
                placeholderTextColor="#888"
                value={dob}
                editable={false}
                pointerEvents="none"
              />
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                value={dob ? new Date(dob) : new Date()}
                mode="date"
                display="default"
                maximumDate={new Date()}
                onChange={onDateChange}
              />
            )}

            

          <Text style={styles.label}>Gender</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={gender}
                onValueChange={(itemValue) => {
                  setGender(itemValue);
                }}
                style={{ color: gender ? '#000' : '#888' }}
              >
                <Picker.Item label="Select Gender" value="" />
                <Picker.Item label="Male" value="male" />
                <Picker.Item label="Female" value="female" />
                <Picker.Item label="Non-binary" value="non-binary" />
                <Picker.Item label="Prefer not to answer" value="prefer-not" />
              </Picker>
            </View>

            <Button 
              mode="contained" 
              style={styles.signUpButton} 
              onPress={handleSignUp}
              disabled={!isChecked}
            >
              <Text style={styles.signText}>Sign up</Text>
            </Button>

            <View style={styles.checkboxRow}>
              <View style={styles.checkboxBorder}>
                <Checkbox
                  status={isChecked ? 'checked' : 'unchecked'}
                  onPress={() => setIsChecked(!isChecked)}
                  color="#007E71"
                  uncheckedColor="#007E71"
                />
              </View>
              <Text style={styles.checkboxText}>
                By clicking, I accept the{' '}
                <TouchableOpacity onPress={() => router.push('./t_and_c')}>
                  <Text style={styles.link}>terms of services</Text>
                </TouchableOpacity>
                {' '}and{' '}
                <TouchableOpacity onPress={() => router.push('./privacy')}>
                  <Text style={styles.link}>privacy policy</Text>
                </TouchableOpacity>
              </Text>
            </View>



          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={{ flex: 1 }}>
          <BlurView
            intensity={90}
            tint="light"
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 20,
            }}
          >
            <View style={{
              backgroundColor: 'white',
              borderRadius: 20,
              padding: 30,
              alignItems: 'center',
              width: '90%',
              maxWidth: 350,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 10,
              elevation: 5,
            }}>
              <WelcomeCard />
            </View>
          </BlurView>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flexGrow: 1,
    backgroundColor: 'white',
    paddingTop: 60,
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  headerRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  pickerWrapper: {
    backgroundColor: '#e9f0eb',
    borderRadius: 25,
    marginBottom: 4,
  },

  header: {
    fontSize: 28,
    fontWeight: '700',
    color: '#00A99D',
    top: 10,
    left: 10,
  },
  skipText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  label: {
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 6,
    color: '#000',
    alignSelf: 'flex-start',
    paddingLeft: 20,
    fontSize: 20,
  },
  input: {
    width: 326,
    height: 52,
    backgroundColor: '#E8F1F0',
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#000',
  },
  signUpButton: {
    marginTop: 24,
    width: 189,
    height: 52,
    borderRadius: 25,
    backgroundColor: '#007E71',
    justifyContent: 'center',
  },
  signText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  terms: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 12,
  },
  orText: {
    textAlign: 'center',
    marginVertical: 16,
    fontWeight: '600',
    color: '#555',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    marginBottom: 20,
  },
  loginLink: {
    textAlign: 'center',
    color: '#00A99D',
    fontWeight: '600',
    fontSize: 16,
    marginTop: 15,
  },
  socialIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginHorizontal: 10,
  },
  fbIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginHorizontal: 10,
  },
  twit: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginHorizontal: 10,
  },
  skipbox: {
    backgroundColor: '#007E71',
    paddingHorizontal: 18,
    paddingVertical: 6,
    borderRadius: 15,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    paddingHorizontal: 20,
    width: '100%',
  },
  checkboxBorder: {
    borderWidth: 1,
    borderColor: '#007E71',
    borderRadius: 4,
  },
  checkboxText: {
    color: '#333',
    flex: 1,
    flexWrap: 'wrap',
    marginLeft: 8,
    fontSize: 14,
  },
  link: {
    color: '#00A99D',
    textDecorationLine: 'underline',
  },
});

export default SignUpScreen;