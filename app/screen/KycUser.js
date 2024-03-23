import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker'; // Import Expo Image Picker
import Colors from '../constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { db } from '../../FirebaseConfig';
import { addDoc, collection } from 'firebase/firestore';

const KycScreen = () => {
  const [frontId, setFrontId] = useState(null);
  const [backId, setBackId] = useState(null);
  const [facePic, setFacePic] = useState(null);

  const selectImage = async (type) => {
    // Request media library permissions
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert('Permission to access camera roll is required!');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.cancelled && result.assets && result.assets.length > 0) {
      const source = { uri: result.assets[0].uri }; // Extract URI from assets
      console.log(source); // Check if the URI is correctly logged
      if (type === 'front') setFrontId(source);
      if (type === 'back') setBackId(source);
      if (type === 'face') setFacePic(source);
    }
  };
  
  const handleSubmit = async () => {
    try {
      // Upload images to Firestore
      const frontIdRef = await addDoc(collection(db, 'images'), { image: frontId.uri, type: 'front' });
      console.log('Front ID uploaded with ID: ', frontIdRef.id);
  
      const backIdRef = await addDoc(collection(db, 'images'), { image: backId.uri, type: 'back' });
      console.log('Back ID uploaded with ID: ', backIdRef.id);
  
      const facePicRef = await addDoc(collection(db, 'images'), { image: facePic.uri, type: 'face' });
      console.log('Face Picture uploaded with ID: ', facePicRef.id);
  
      // Handle success
      console.log('Images uploaded successfully!');
    } catch (error) {
      // Handle errors
      console.error('Error uploading images: ', error);
      Alert.alert('Error', 'Failed to upload images. Please try again later.');
    }
  };
  const renderImagePlaceholder = (source, onPress, placeholderText) => (
    <TouchableOpacity onPress={onPress} style={styles.uploadButton}>
      {source ? (
        <Image source={source} style={styles.uploadedImage} />
      ) : (
        <Text>{placeholderText}</Text>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ backgroundColor: Colors.background, flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.uploadSection}>
          {renderImagePlaceholder(frontId, () => selectImage('front'), 'Upload Front ID')}
          {renderImagePlaceholder(backId, () => selectImage('back'), 'Upload Back ID')}
          {renderImagePlaceholder(facePic, () => selectImage('face'), 'Upload Face Picture')}
        </View>
        <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'flex-start',
  },
  backButton: {
    marginRight: 20, // Adjusted for a more balanced alignment
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  uploadSection: {
    width: '100%',
    alignItems: 'center',
    marginTop: 1, // Reduced to avoid too much space
  },
  uploadButton: {
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    width: '100%',
    height: 170, // Fixed height for image placeholders
    alignItems: 'center',
    justifyContent: 'center', // Center content vertically and horizontally
    overflow: 'hidden', // Keeps the image within the button bounds
  },
  uploadedImage: {
    width: '50%',
    height: '100%',
    resizeMode: 'cover', // Cover the button area without losing aspect ratio
  },
  submitButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 20,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default KycScreen;
