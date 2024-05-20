import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Spacing from '../../constants/Spacing';
import FontSize from '../../constants/FontSize';
import Colors from '../../constants/Colors';
import { FontAwesome } from '@expo/vector-icons';

import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../../FirebaseConfig';


const ProfileScreen = () => {
  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState('');
  const [nicNo, setNicNo] = useState('');
  const [policeDepartment, setPoliceDepartment] = useState('');
  const [badgeId, setBadgeId] = useState('');
  const [position, setPosition] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    try {
      setLoading(true);
      // Add a new document with a generated ID to the "PoliceOfficer" collection
      await addDoc(collection(db, 'PoliceOfficer'), {
        fullName,
        dob,
        nicNo,
        policeDepartment,
        badgeId,
        position,
        emailAddress,
        profileImage: profileImage ? profileImage : null, // Store profile image if available
        createdAt: new Date(), // Add timestamp for when the profile was saved
      });
      setLoading(false);
      console.log('Profile data saved to Firestore!');
    } catch (error) {
      console.error('Error saving profile data:', error);
      setLoading(false);
    }
  };

  const handleProfileImageUpload = () => {
    // Handle profile image upload
    console.log('Upload profile image');
  };

  return (
    <SafeAreaView style={{ backgroundColor: Colors.background, flex: 1 }}>
      <View style={styles.container}>
        <View style={{ alignContent: 'center', alignItems: 'center', }}>
          <TouchableOpacity onPress={handleProfileImageUpload}>
            <Image source={profileImage ? { uri: profileImage } : require('../../../assets/splash.png')} style={styles.profileImage} />
          </TouchableOpacity>
        </View>
        <View style={{ marginVertical: Spacing * 4 }}>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={fullName}
            onChangeText={setFullName}
          />
          <TextInput
            style={styles.input}
            placeholder="Date of Birth"
            value={dob}
            onChangeText={setDob}
          />
          <TouchableOpacity style={styles.calendarIcon} onPress={() => console.log('Calendar icon pressed')}>
            <FontAwesome name="calendar" size={FontSize.medium} color={Colors.primary} />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="NIC No"
            value={nicNo}
            onChangeText={setNicNo}
          />
          <TextInput
            style={styles.input}
            placeholder="Police Department"
            value={policeDepartment}
            onChangeText={setPoliceDepartment}
          />
          <TextInput
            style={styles.input}
            placeholder="Badge ID"
            value={badgeId}
            onChangeText={setBadgeId}
          />
          <TextInput
            style={styles.input}
            placeholder="Position"
            value={position}
            onChangeText={setPosition}
          />
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            value={emailAddress}
            onChangeText={setEmailAddress}
          />
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: Spacing * 2
  },
  input: {

    fontSize: FontSize.small,
    padding: Spacing * 1.1,
    backgroundColor: Colors.lightPrimary,
    borderRadius: Spacing,
    marginVertical: Spacing,
  },


  profileImage: {
    width: 50,
    height: 40,
    borderRadius: 1,
    backgroundColor: Colors.primary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'flex-start',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  backButton: {
    marginRight: 129, // Adjusted for a more balanced alignment
  },
  calendarIcon: {
    position: 'absolute',
    right: 12,
    top: '22%',
    transform: [{ translateY: -FontSize.medium / 2 }],


  },
});

export default ProfileScreen;
