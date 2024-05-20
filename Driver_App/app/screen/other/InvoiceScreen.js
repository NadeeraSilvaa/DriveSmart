import React, { useState, useEffect ,useContext} from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../../FirebaseConfig'; // Import your Firebase Firestore instance
import UserIdContext from '../../../context/AuthContext';


const InvoiceScreen = () => {
  const { userId } = useContext(UserIdContext);
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, `users/${userId}/Violations`), (snapshot) => {
      const updatedInvoices = [];
      snapshot.forEach((doc) => {
        updatedInvoices.push({ id: doc.id, ...doc.data() });
      });
      setInvoices(updatedInvoices);
    });

    return () => unsubscribe();
  }, [userId]); // Make sure to include userId in the dependency array


  const renderInvoiceItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.invoiceNumber}</Text>
      <Text style={styles.cell}>{item.amount}</Text>
      <Text style={styles.cell}> {item.violationType}</Text>
      <Text style={styles.cell}> {item.timestamp ? item.timestamp.toDate().toLocaleString() : ''}</Text>
      <Text style={styles.cell}>   {item.status}</Text>
    </View>
  );
  
  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Invoice No</Text>
        <Text style={styles.headerText}>Amount</Text>
        <Text style={styles.headerText}>  Type</Text>
        <Text style={styles.headerText}>   Date</Text>
        <Text style={styles.headerText}>     Status</Text>
      </View>
      <FlatList
        data={invoices}
        renderItem={renderInvoiceItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    paddingBottom: 5,
    marginBottom: 10,
  },
  headerText: {
    flex: 1,
    fontWeight: 'bold',
    fontSize:11,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 5,
    marginBottom: 5,
  },
  cell: {
    flex: 1,
    fontSize:12,
  },
});

export default InvoiceScreen;
