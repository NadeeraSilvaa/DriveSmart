import React, { useState, useEffect ,useContext} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ActivityIndicator } from 'react-native';
import Colors from '../../constants/Colors';
import { Picker } from '@react-native-picker/picker';
import { db } from '../../../FirebaseConfig'; // Import db from your firebase file
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import UserIdContext from '../../../context/AuthContext';

export default function Payment() {
  const { userId } = useContext(UserIdContext);
  const [invoices, setInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [amount, setAmount] = useState('');
  const [violationType, setViolationType] = useState('');
  const [isPaying, setIsPaying] = useState(false); // State to track whether payment is being processed

  // Function to fetch invoices from Firestore
  const fetchInvoices = async () => {
    try {
      const userInvoiceCollection = collection(db, `users/${userId}/Violations`);
      const snapshot = await getDocs(userInvoiceCollection);
      const fetchedInvoices = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log(fetchedInvoices);
      setInvoices(fetchedInvoices);
    } catch (error) {
      console.error('Error fetching invoices: ', error);
    }
  };

  useEffect(() => {
    // Fetch invoices initially
    fetchInvoices();

    // Set interval to refresh every 1 minute (60000 milliseconds)
    const intervalId = setInterval(() => {
      fetchInvoices();
    }, 20000);

    // Clean up function to clear interval when component unmounts
    return () => clearInterval(intervalId);
  }, []);


  const handleInvoiceChange = (invoiceId) => {
    // Find the selected invoice
    const selected = invoices.find(invoice => invoice.id === invoiceId);
    setSelectedInvoice(selected);
    // Update amount and violation type based on selected invoice
    if (selected) {
      setAmount(selected.amount);
      setViolationType(selected.violationType);
    }
  };

   // Function to handle paying an invoice
   const handlePayNow = async () => {
    if (selectedInvoice) {
      try {
        setIsPaying(true); // Start payment process
        const invoiceRef = doc(db, `users/${userId}/Violations`, selectedInvoice.id);
        await updateDoc(invoiceRef, {
          status: 'Paid'
        });
        console.log('Invoice status updated to Paid');
        // Optionally, you can add code here to navigate to another screen or perform other actions after payment
      } catch (error) {
        console.error('Error updating invoice status: ', error);
      } finally {
        setIsPaying(false); // End payment process
      }
    } else {
      console.error('No invoice selected');
    }
  };

  return (
    <View style={{ flex: 1, paddingHorizontal: 20 }}>
      <View style={{ alignContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 35, marginBottom: 20, fontWeight: 'bold' }}>Pay Invoice</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 25 }}>
        <Text style={{ fontSize: 15 }}>Select Payment Method</Text>
      </View>

      <View style={styles.textInputBox}>
      <TouchableOpacity>
          <Image source={require('../../../assets/images/credit-card.png')} style={styles.image} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require('../../../assets/images/paypal.png')} style={styles.image} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require('../../../assets/images/ez-cash.png')} style={styles.image} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require('../../../assets/images/genie-logo.png')} style={styles.image} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require('../../../assets/images/m-cash.png')} style={styles.image} />
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 25 }}>
        <Text style={{ fontSize: 15 }}>Invoice Number</Text>
      </View>
      <View style={styles.textInputBoxDrop}>
        <Picker
          selectedValue={selectedInvoice ? selectedInvoice.id : null}
          onValueChange={(itemValue) => handleInvoiceChange(itemValue)}>
          <Picker.Item label="Select Invoice" value={null} />
          {invoices.map(invoice => (
            <Picker.Item
              key={invoice.id}
              label={`${invoice.invoiceNumber} - ${invoice.status === 'Paid' ? 'Paid' : 'Unpaid'}`}
              value={invoice.id}
            />
          ))}
        </Picker>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 25 }}>
        <Text style={{ fontSize: 15 }}>Amount</Text>
      </View>
      <View style={styles.textInputBox}>
        <TextInput
          value={amount}
          placeholder="Enter Amount"
          keyboardType="numeric"
          editable={false} // Make it non-editable
        />
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 25 }}>
        <Text style={{ fontSize: 15 }}>Type of Violation</Text>
      </View>
      <View style={styles.textInputBox}>
        <TextInput
          value={violationType}
          placeholder="Enter Type of Violation"
          editable={false} // Make it non-editable
        />
      </View>
      <TouchableOpacity
        onPress={handlePayNow}
        style={[
          styles.payNowButton,
          { backgroundColor: selectedInvoice && selectedInvoice.status === 'Paid' ? Colors.gray2 : Colors.primary }
        ]}
        disabled={selectedInvoice && selectedInvoice.status === 'Paid'}
      >
        {isPaying ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={{ color: 'white', fontSize: 18 }}>
            {selectedInvoice && selectedInvoice.status === 'Paid' ? 'Already Paid' : 'Pay Now'}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  textInputBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    backgroundColor: Colors.onPrimary,
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 10,
  },
  payNowButton: {
    backgroundColor: Colors.primary,
    padding: 15,
    alignItems: 'center',
    borderRadius: 20,
    marginVertical: 20,
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  image: {
    width: 30,
    height: 30,
  },
  textInputBoxDrop: {
    backgroundColor: Colors.onPrimary,
    borderRadius: 10,
    padding: 1,
    paddingHorizontal: 5,
    marginBottom: 10,
  }
});
