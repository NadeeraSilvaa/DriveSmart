import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome } from '@expo/vector-icons';
import { db } from '../../FirebaseConfig';
import UserIdContext from '../../context/AuthContext';
import { addDoc, collection, doc, getDoc, setDoc } from 'firebase/firestore';
import Spacing from '../constants/Spacing';
import FontSize from '../constants/FontSize';
import Colors from '../constants/Colors';

const ProfileScreen = () => {
  const { userId } = useContext(UserIdContext);
  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState('');
  const [nicNo, setNicNo] = useState('');
  const [policeDepartment, setPoliceDepartment] = useState('');
  const [badgeId, setBadgeId] = useState('');
  const [position, setPosition] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, 'ProfileOfficer', userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setFullName(data.fullName || '');
          setDob(data.dob || '');
          setNicNo(data.nicNo || '');
          setPoliceDepartment(data.policeDepartment || '');
          setBadgeId(data.badgeId || '');
          setPosition(data.position || '');
          setEmailAddress(data.emailAddress || '');
          setProfileImage(data.profileImage || null);
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchData();
  }, [userId]);

  const handleSave = async () => {
    try {
      setLoading(true);
      const profileData = {
        fullName,
        dob,
        nicNo,
        policeDepartment,
        badgeId,
        position,
        emailAddress,
        profileImage: profileImage ? profileImage : null,
        createdAt: new Date(),
      };

      const hasDataChanged = Object.keys(profileData).some(key => profileData[key] !== '');

      if (hasDataChanged) {
        const docRef = doc(db, 'ProfileOfficer', userId);
        await setDoc(docRef, profileData, { merge: true });
        console.log('Profile data saved to Firestore!');
      } else {
        console.log('No data changed to save.');
      }

      setLoading(false);
    } catch (error) {
      console.error('Error saving profile data:', error);
      setLoading(false);
    }
  };

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

  const validateNIC = (input) => {
    const nicRegex = /^(?:\d{9}(v)|\d{12})$/i;
    return nicRegex.test(input);
  };

  return (
    <SafeAreaView style={{ backgroundColor: Colors.background, flex: 1 }}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          <View style={{ alignContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity onPress={handleProfileImageUpload}>
              {profileImage ? (
                <Image source={{ uri: profileImage }} style={styles.profileImage} />
              ) : (
                <FontAwesome name="user-circle" size={120} color={Colors.primary} />
              )}
            </TouchableOpacity>
            <Text style={styles.profileEmail}>{'UUID: ' + userId}</Text>
          </View>
          <View style={{ marginVertical: Spacing * 4 }}>
            <Text style={styles.fieldName}>Full Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={fullName}
              onChangeText={setFullName}
            />
            <Text style={styles.fieldName}>Date of Birth</Text>
            <TextInput
              style={styles.input}
              placeholder="Date of Birth"
              value={dob}
              onChangeText={setDob}
            />
            <Text style={styles.fieldName}>NIC No</Text>
            <TextInput
              style={styles.input}
              placeholder="NIC No"
              value={nicNo}
              onChangeText={setNicNo}
            />
            {!validateNIC(nicNo) && (
              <Text style={styles.errorText}>NIC number must be 9 digits followed by 'v' or 13 digits.</Text>
            )}
            <Text style={styles.fieldName}>Police Department</Text>
            <TextInput
              style={styles.input}
              placeholder="Police Department"
              value={policeDepartment}
              onChangeText={setPoliceDepartment}
            />
            <Text style={styles.fieldName}>Badge ID</Text>
            <TextInput
              style={styles.input}
              placeholder="Badge ID"
              value={badgeId}
              onChangeText={setBadgeId}
            />
            <Text style={styles.fieldName}>Blood Group</Text>
            <TextInput
              style={styles.input}
              placeholder="Blood Group"
              value={position}
              onChangeText={setPosition}
            />
            <Text style={styles.fieldName}>Email Address</Text>
            <TextInput
              style={styles.input}
              placeholder="Email Address"
              value={emailAddress}
              onChangeText={setEmailAddress}
              keyboardType='email-address'
            />
          </View>
          <TouchableOpacity
            onPress={handleSave}
            disabled={loading}
            style={styles.saveButton}>
            <Text style={styles.saveButtonText}>
              {loading ? 'Saving...' : 'Save'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: Spacing * 2
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  input: {
    fontSize: FontSize.small,
    padding: Spacing * 1.1,
    backgroundColor: Colors.lightPrimary,
    borderRadius: Spacing,
    marginVertical: Spacing,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  profileEmail: {
    marginTop: 6,
    fontSize: 16,
    fontWeight: '400',
    color: '#848484',
  },
  saveButton: {
    padding: Spacing * 1,
    backgroundColor: Colors.primary,
    marginVertical: Spacing / 10,
    borderRadius: Spacing,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: Spacing },
    shadowOpacity: 0.3,
    shadowRadius: Spacing,
  },
  saveButtonText: {
    color: Colors.onPrimary,
    textAlign: "center",
    fontSize: FontSize.large
  },
  errorText: {
    fontSize: FontSize.small,
    color: 'red',
    marginTop: Spacing / 2,
  },
  fieldName: {
    fontSize: FontSize.medium,
    fontWeight: 'bold',
    marginBottom: Spacing / 2,
  },
});

export default ProfileScreen;
