import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { collection, onSnapshot, query, getDocs } from 'firebase/firestore'; // Import firestore functions
import { db } from '../../../FirebaseConfig'; // Adjust the library based on your preference
import Colors from '../../constants/Colors';
import UserIdContext from '../../../context/AuthContext';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function Home() {
  const navigation = useNavigation();
  const { userId } = useContext(UserIdContext);

  const [violations, setViolations] = useState(0); // Initialize violations count to 0
  const [currentFine, setCurrentFine] = useState('');
  const [rewardPoints1, setRewardPoints1] = useState(50);
  const [rewardPoints2, setRewardPoints2] = useState(''); // Initialize credit balance as empty string

  useEffect(() => {
    const fetchViolationsCount = async () => {
      const violationsQuery = query(collection(db, `users/${userId}/Violations`));
      const violationsSnapshot = await getDocs(violationsQuery);
      const violationsCount = violationsSnapshot.size;
      setViolations(violationsCount); // Set violations count to the number of documents in the collection

      // Calculate reward points based on violations count
      if (violationsCount < 5) {
        setRewardPoints1(100);
      } else if (violationsCount < 50) {
        setRewardPoints1(50);
      } else if (violationsCount < 10) {
        setRewardPoints1(0);
      }
    };

    fetchViolationsCount(); // Call the function to fetch violations count

    const unsubscribe = onSnapshot(collection(db, `users/${userId}/Violations`), (snapshot) => {
      let totalAmount = 0;
      let hasUnpaid = false; // Flag to track if there are unpaid statuses
      snapshot.forEach((doc) => {
        const amount = parseFloat(doc.data().amount); // Assuming amount is the field name containing the fine amount
        totalAmount += amount;
        if (doc.data().status === 'unpaid') {
          hasUnpaid = true;
        }
      });
      setCurrentFine(totalAmount);
      // Set credit balance based on the status
      setRewardPoints2(hasUnpaid ? 'Payable' : 'No Payables');
    });

    return () => unsubscribe();
  }, [userId]); // Make sure to include userId in the dependency array

  // Your JSX code remains unchanged
  return (
    <View style={{ flex: 1, margin: 10 }}>
      {/* Main Content */}
      <View style={styles.container2}>
        <View style={styles.row}>
          <View style={styles.card}>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Violations</Text>
              <Text style={styles.cardValue}>{violations}</Text>
            </View>
          </View>
          <View style={styles.card}>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Current Fine</Text>
              <Text style={styles.cardValue}>Rs {currentFine}</Text>
            </View>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.card}>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Score</Text>
              <Text style={styles.cardValue}>{rewardPoints1}%</Text>
            </View>
          </View>
          <View style={styles.card}>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Pay Status</Text>
              <Text style={styles.cardValue}>{rewardPoints2}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container2: {
    justifyContent: 'space-around',
    marginTop: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
    paddingTop: 10,
  },
  card: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    width: screenWidth - 250,
    height: screenHeight / 6,
    alignItems: 'center',
    alignContent: 'center',
    flexDirection: 'row',
    marginBottom: 10,
    paddingBottom: 20,
    elevation: 10,
  },
  cardContent: {
    flexDirection: 'column',
    paddingLeft: 15,
    alignItems: 'center',
  },
  cardTitle: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  cardValue: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
    marginLeft: 15,
    paddingTop: 23,
  },
  bottomContainer: {
    flex: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 10,
    marginTop: 20,
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});
