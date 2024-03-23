import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { db } from "../../../FirebaseConfig";
import { collection, addDoc ,serverTimestamp} from "firebase/firestore";

const Invoicedata = () => {
  // Function to add dummy data to Firestore
  const addDummyDataToFirestore = async () => {
    try {
      // Define your dummy data
      const dummyInvoices = [
        { amount: 100, date: serverTimestamp(), invoiceNo: "INV002", status: "Unpaid", violationType: "Speeding" },
        // Add more dummy invoices as needed
      ];

      // Add each dummy invoice to the Firestore collection
      const invoiceCollectionRef = collection(db, 'invoices');
      dummyInvoices.forEach(async (invoice) => {
        await addDoc(invoiceCollectionRef, invoice);
      });

      console.log('Dummy data added to Firestore successfully');
    } catch (error) {
      console.error('Error adding dummy data to Firestore: ', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Add Dummy Data button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={addDummyDataToFirestore}>
        <Text style={styles.buttonText}>Add Dummy Data</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: 'blue', // Adjust the color according to your design
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Invoicedata;
