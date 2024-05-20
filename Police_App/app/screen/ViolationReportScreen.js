import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { collection, addDoc, getDocs, serverTimestamp, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../../FirebaseConfig';
import { useNavigation } from '@react-navigation/native';

import Spacing from '../constants/Spacing';
import FontSize from '../constants/FontSize';
import Colors from '../constants/Colors';

const ViolationReportScreen = ({ route }) => {
  const { scanResult } = route.params;
  const [violationTypes, setViolationTypes] = useState([]);
  const [selectedViolationType, setSelectedViolationType] = useState('');
  const [selectedViolationName, setSelectedViolationName] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [isAmountEditable, setIsAmountEditable] = useState(true);
  const [loading, setLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false); 
  const [latestInvoiceNumber, setLatestInvoiceNumber] = useState(0); // State to hold the latest invoice number
  const navigation = useNavigation();

  useEffect(() => {
    fetchViolationTypes();
    fetchLatestInvoiceNumber(); // Fetch the latest invoice number when component mounts
  }, []);

  const fetchViolationTypes = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'violationTypes'));
      const types = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setViolationTypes(types);
    } catch (error) {
      console.error('Error fetching violation types:', error);
    }
  };

  const fetchLatestInvoiceNumber = async () => {
    try {
      const querySnapshot = await getDocs(query(collection(db, `users/${scanResult}/Violations`), orderBy('timestamp', 'desc'), limit(1)));
      if (!querySnapshot.empty) {
        // If there are existing invoices
        const latestInvoice = querySnapshot.docs[0].data();
        if (latestInvoice.invoiceNumber) {
          const latestInvoiceNumberString = latestInvoice.invoiceNumber;
          const latestNumber = parseInt(latestInvoiceNumberString.substring(2)); // Extract the numeric part and parse it
          setLatestInvoiceNumber(latestNumber);
        } else {
          // If the latest invoice doesn't have the invoiceNumber property
          setLatestInvoiceNumber(0); // Start with IN0001
        }
      } else {
        // If there are no existing invoices, start with IN0001
        setLatestInvoiceNumber(0);
      }
    } catch (error) {
      console.error('Error fetching latest invoice number:', error);
    }
  };
  

  const generateInvoiceNumber = () => {
    const nextInvoiceNumber = latestInvoiceNumber + 1;
    return 'IN' + String(nextInvoiceNumber).padStart(4, '0'); // Pad the number with leading zeros
  };

  const handleViolationTypeChange = (itemValue, itemIndex) => {
    setSelectedViolationType(itemValue);
    const selectedType = violationTypes.find(type => type.id === itemValue);
    if (selectedType) {
      setSelectedViolationName(selectedType.types);
      setAmount(selectedType.amount.toString());
      setIsAmountEditable(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const invoiceNumber = generateInvoiceNumber(); // Generate the invoice number
      const userCollectionRef = collection(db, `users/${scanResult}/Violations`);
      await addDoc(userCollectionRef, {
        invoiceNumber: invoiceNumber,
        violationType: selectedViolationName,
        amount: amount,
        description: description,
        location: location,
        timestamp: serverTimestamp(),
        status:'unpaid'
      });
      console.log('Document written for user ID: ', scanResult);
      setSubmitSuccess(true); // Set submission success to true
      // Show success popup
      Alert.alert(
        'Success',
        'Your violation report has been submitted successfully.',
        [
          { text: 'Okay', onPress: () => navigation.goBack() } // Navigate back to previous screen
        ]
      );
    } catch (error) {
      console.error('Error adding document: ', error);
      Alert.alert(
        'Error',
        'An error occurred while submitting your violation report. Please try again later.',
        [
          { text: 'Okay', onPress: () => {} } // You can handle retry logic here if needed
        ]
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: Colors.background, flex: 1 }}>
      <View style={{ padding: Spacing * 3 }}>
        <View style={{ marginVertical: Spacing * 5 }}>
          <Picker
            selectedValue={selectedViolationType}
            style={styles.dropdown}
            onValueChange={handleViolationTypeChange}
          >
            <Picker.Item label="Select Violation Type" value="" />
            {violationTypes.map(types => (
              <Picker.Item key={types.id} label={types.types} value={types.id} />
            ))}
          </Picker>
          <TextInput
            style={styles.textinputbox}
            placeholder="UserID"
            value={scanResult}
            editable={false}
          />
          <TextInput
            style={styles.textinputbox}
            placeholder="Amount"
            value={amount}
            onChangeText={text => setAmount(text)}
            editable={isAmountEditable}
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

        <TouchableOpacity
          onPress={handleSubmit}
          disabled={loading || submitSuccess} // Disable button if loading or submission success
          style={{
            padding: Spacing * 2,
            backgroundColor: Colors.primary,
            marginVertical: Spacing * 3,
            borderRadius: Spacing,
            shadowColor: Colors.primary,
            shadowOffset: { width: 0, height: Spacing },
            shadowOpacity: 0.3,
            shadowRadius: Spacing,
          }}>
          <Text style={{ color: Colors.onPrimary, textAlign: "center", fontSize: FontSize.large }}>
            {loading ? 'Please Wait' : 'Submit'}
          </Text>
        </TouchableOpacity>
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
});
