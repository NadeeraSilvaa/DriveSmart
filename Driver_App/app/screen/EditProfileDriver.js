import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import UserIdContext from '../../context/AuthContext';
import { db } from '../../FirebaseConfig';
import { addDoc, getDoc, setDoc, query, updateDoc, doc } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';

import Spacing from '../constants/Spacing';
import FontSize from '../constants/FontSize';
import Colors from '../constants/Colors';
import { FontAwesome } from '@expo/vector-icons';

const EditProfileDriver = () => {
  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState('');
  const [nicNo, setNicNo] = useState('');
  const [licenseNo, setLicenseNo] = useState('');
  const [address, setAddress] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [nicError, setNicError] = useState('');
  const [emergencyContactError, setEmergencyContactError] = useState('');
  const { userId } = useContext(UserIdContext);


  const handleProfileImageUpload = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.cancelled) {
        setProfileImage(result.uri);
      }
    } catch (error) {
      console.error('Error uploading profile image:', error);
    }
  };

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateNIC = (nic) => {
    // Implement your NIC validation logic here
    return nic.length === 9 || nic.length === 12; // Assuming NIC can be 9 or 12 digits
  };

  const validateEmergencyContact = (emergencyContact) => {
    // Implement your emergency contact validation logic here
    return emergencyContact.length === 10;
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const docRef = doc(db, `users/${userId}/details`, userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setFullName(data.fullName || '');
          setDob(data.dob || '');
          setNicNo(data.nicNo || '');
          setLicenseNo(data.licenseNo || '');
          setAddress(data.address || '');
          setEmergencyContact(data.emergencyContact || '');
          setEmailAddress(data.emailAddress || '');
          setProfileImage(data.profileImage || null);
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching user details: ', error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchUserDetails();
  }, [userId]);

  const handleSave = async () => {
    setLoading(true);
    try {
      const userDocRef = doc(db, `users/${userId}/details`, userId);
      await setDoc(userDocRef, {
        fullName,
        dob,
        nicNo,
        licenseNo,
        address,
        emergencyContact,
        emailAddress,
        profileImage,
      }, { merge: true });

      console.log('Data updated successfully!');
    } catch (error) {
      console.error('Error updating data: ', error);
    } finally {
      setLoading(false);
    }
  };

  // const handleProfileImageUpload = () => {
  //   // Handle profile image upload
  //   console.log('Upload profile image');
  // };

  const handleEmailChange = (email) => {
    setEmailAddress(email);
    if (!validateEmail(email)) {
      setEmailError('Invalid email address');
    } else {
      setEmailError('');
    }
  };

  const handleNICChange = (nic) => {
    setNicNo(nic);
    if (!validateNIC(nic)) {
      setNicError('Invalid NIC number');
    } else {
      setNicError('');
    }
  };

  const handleEmergencyContactChange = (contact) => {
    setEmergencyContact(contact);
    if (!validateEmergencyContact(contact)) {
      setEmergencyContactError('Invalid emergency contact');
    } else {
      setEmergencyContactError('');
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: Colors.background, flex: 1 }}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.container}>
          <View style={{ alignContent: 'center', alignItems: 'center', }}>
          <TouchableOpacity onPress={handleProfileImageUpload}>
              {profileImage ? (
                <Image source={{ uri: profileImage }} style={styles.profileImage} />
              ) : (
                <FontAwesome name="user-circle" size={120} color={Colors.primary} />
              )}
            </TouchableOpacity>
          </View>
          <View style={{ marginVertical: Spacing * 4 }}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Full Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                value={fullName}
                onChangeText={setFullName}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Date of Birth</Text>
              <TextInput
                style={styles.input}
                placeholder="Date of Birth"
                value={dob}
                onChangeText={setDob}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>NIC No</Text>
              <TextInput
                style={styles.input}
                placeholder="NIC No"
                value={nicNo}
                onChangeText={handleNICChange}
              />
              {nicError ? <Text style={styles.errorText}>{nicError}</Text> : null}
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Driving License No</Text>
              <TextInput
                style={styles.input}
                placeholder="Driving License No"
                value={licenseNo}
                onChangeText={setLicenseNo}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Address</Text>
              <TextInput
                style={styles.input}
                placeholder="Address"
                value={address}
                onChangeText={setAddress}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Emergency Contact No</Text>
              <TextInput
                style={styles.input}
                placeholder="Emergency Contact No"
                value={emergencyContact}
                onChangeText={handleEmergencyContactChange}
              />
              {emergencyContactError ? <Text style={styles.errorText}>{emergencyContactError}</Text> : null}
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Email Address</Text>
              <TextInput
                style={styles.input}
                placeholder="Email Address"
                value={emailAddress}
                onChangeText={handleEmailChange}
              />
              {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
            </View>
          </View>
          <TouchableOpacity
            onPress={handleSave}
            disabled={loading}
            style={{
              padding: Spacing * 1,
              backgroundColor: Colors.primary,
              marginVertical: Spacing / 10,
              borderRadius: Spacing,
              shadowColor: Colors.primary,
              shadowOffset: { width: 0, height: Spacing },
              shadowOpacity: 0.3,
              shadowRadius: Spacing,
            }}>
            <Text style={{ color: Colors.onPrimary, textAlign: "center", fontSize: FontSize.large }}>
              {loading ? 'Saving...' : 'Save'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  container: {
    padding: Spacing * 2,
    paddingBottom: Spacing * 8, // Adjusted padding to accommodate button at the bottom
  },
  inputContainer: {
    marginBottom: Spacing * 2,
  },
  inputLabel: {
    fontSize: FontSize.small,
    marginBottom: Spacing / 2,
  },
  profileImage:{
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  input: {
    fontSize: FontSize.small,
    padding: Spacing * 1.1,
    backgroundColor: Colors.lightPrimary,
    borderRadius: Spacing,
  },
  profileImage: {
    width: 50,
    height: 40,
    borderRadius: 1,
    backgroundColor: Colors.primary,
  },
  errorText: {
    color: 'red',
    fontSize: FontSize.small,
  },
});

export default EditProfileDriver;
