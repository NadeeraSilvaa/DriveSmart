import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator,TouchableOpacity } from 'react-native';
import QRCode from 'react-native-qrcode-svg'; // Import QRCode component
import { Picker } from '@react-native-picker/picker';
import Spacing from '../../constants/Spacing';
import FontSize from '../../constants/FontSize';
import Colors from '../../constants/Colors';
import { TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../FirebaseConfig';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const ViolationReportScreen = () => {
  const [uniqueId, setUniqueId] = useState('');
  const [violationTypes, setViolationTypes] = useState([]);
  const [selectedViolationType, setSelectedViolationType] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isAmountEditable, setIsAmountEditable] = useState(true); // Flag to control amount field editing
  const navigation = useNavigation();

  useEffect(() => {
    generateUniqueId(); // Generate unique ID when the component mounts
    fetchViolationTypes(); // Fetch violation types from Firestore
  }, []);

  // Generate a unique ID
  const generateUniqueId = () => {
    setTimeout(() => {
      const uuid = Math.random().toString(36).substr(5, 5); // Example of generating a unique ID
      setUniqueId(uuid);
      setIsLoading(false);
      console.log(uuid);
    }, 2000); // Change delay time as per your requirement
  };

  // Fetch violation types from Firestore
  const fetchViolationTypes = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'violationTypes'));
      const types = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setViolationTypes(types);
      console.log(types);
    } catch (error) {
      console.error('Error fetching violation types:', error);
    }
  };

  // Function to handle form submission
  const handleSubmit = () => {
    // Process form submission here, you can use the data entered in the text inputs
    console.log('Violation Type:', selectedViolationType);
    console.log('Amount:', amount);
    console.log('Description:', description);
    console.log('Location:', location);
    // generateUniqueId();
  };
  const handleProfile = () => {
    navigation.navigate('PoliceProfile');
  };

  

  // Function to handle violation type selection
  const handleViolationTypeChange = (itemValue, itemIndex) => {
    setSelectedViolationType(itemValue); // Update selected violation type
    const selectedType = violationTypes.find(type => type.id === itemValue);
    if (selectedType) {
      setAmount(selectedType.amount.toString()); // Set amount based on selected violation type
      setIsAmountEditable(false); // Disable editing of amount field
    }
  };

  // Render the QR code and form
  return (
    <SafeAreaView style={{ backgroundColor: Colors.background, flex: 1 }}>
      <View style={{ padding: Spacing * 3 }}>
        <TouchableOpacity 
        onPress={handleProfile}
        style={styles.settingsButton}>
        <FontAwesome
                name="user-o"
                color={Colors.text}
                size={Spacing * 2}
              />
        </TouchableOpacity>
        <View style={{ alignContent: 'center', alignItems: 'center',marginTop:20, }}>
          {isLoading ? (
            <ActivityIndicator size="large" color={Colors.primary} />
          ) : (
            <>
              <QRCode
                value={uniqueId} // Pass the unique ID as value to generate QR code
                size={200}
                logoSize={30}
                logoBackgroundColor='transparent'
                logoMargin={2}
                logoBorderRadius={15}
              />
              {/* Display Unique ID */}
              <Text>{uniqueId}</Text>
            </>
          )}
        </View>
        {/* Form Fields */}
        <View style={{
          marginVertical: Spacing * 5
        }}>
          {/* Dropdown for Violation Type */}
          <Picker
            selectedValue={selectedViolationType}
            style={styles.dropdown}
            onValueChange={handleViolationTypeChange} // Handle violation type change
          >
            <Picker.Item label="Select Violation Type" value="" />
            {violationTypes.map(types => (
              <Picker.Item key={types.id} label={types.types} value={types.id} />
            ))}
          </Picker>
          <TextInput
            style={styles.textinputbox}
            placeholder="Amount"
            value={amount}
            onChangeText={text => setAmount(text)}
            editable={isAmountEditable} // Disable editing of amount field when corresponding violation type is selected
          />
          <TextInput
            style={styles.textinputbox}
            placeholder="Description"
            value={description}
            onChangeText={text => setDescription(text)}
          />
          <TextInput
            style={styles.textinputbox}
            placeholder="Location"
            value={location}
            onChangeText={text => setLocation(text)}
          />
        </View>
        {/* Submit Button */}
        <Button title="Submit" onPress={handleSubmit} />
      </View>
    </SafeAreaView>
  );
};

export default ViolationReportScreen;

const styles = StyleSheet.create({
  textinputbox: {
    fontSize: FontSize.small,
    padding: Spacing * 2,
    backgroundColor: Colors.lightPrimary,
    borderRadius: Spacing,
    marginVertical: Spacing,
  },
  dropdown: {
    height: 50,
    width: '100%',
    backgroundColor: Colors.lightPrimary,
    borderRadius: Spacing,
    marginVertical: Spacing,
    paddingHorizontal: Spacing,
  },
  settingsButton: {
    position: 'absolute',
    top: Spacing * 2,
    right: Spacing * 2,
    backgroundColor: 'transparent',
  },
  settingsText: {
    fontSize: FontSize.medium,
    color: Colors.primary,
  },
});