import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView,Modal ,StyleSheet} from 'react-native';
import Spacing from '../constants/Spacing';
import FontSize from '../constants/FontSize';
import Colors from '../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { FontAwesome } from '@expo/vector-icons';
import UserIdContext from '../../context/AuthContext';


const LoginScreen = () => {
  const { setUserId } = useContext(UserIdContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const auth = FIREBASE_AUTH;
  const navigation = useNavigation();

  const handleSignIn = async () => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userId = user.uid; // Get the user ID
      setUserId(userId);
      console.log('UUID: ' + userId);
     
      navigation.navigate('PoliceHome');
    } catch (error) {
      handleAuthError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAuthError = (error) => {
    switch (error.code) {
      case 'auth/invalid-email':
        setEmailError('Invalid email address.');
        break;
      case 'auth/user-not-found':
        setEmailError('User not found. Please sign up.');
        break;
      case 'auth/wrong-password':
      case 'auth/invalid-credential':
        setPasswordError('Incorrect password. Please try again.');
        break;
      default:
        console.error('Authentication Error:', error);
    }
  };

  const validateFields = () => {
    let isValid = true;
    if (!email) {
      setEmailError('Email is required.');
      isValid = false;
    } else {
      setEmailError('');
    }
    if (!password) {
      setPasswordError('Password is required.');
      isValid = false;
    } else {
      setPasswordError('');
    }
    return isValid;
  };

 

  
  const handleCloseBottomSheet = () => {
    setShowBottomSheet(false);
  };
  
  const handleSignInPress = () => {
    if (validateFields()) {
      handleSignIn();
    }
  };
  const handleForgotPassword = () => {
   
    setShowBottomSheet(true);
  };
  

  return (
    <SafeAreaView style={{ backgroundColor: Colors.background, flex: 1 }}>
      <View style={{ padding: Spacing * 3 , marginTop:Spacing*7}}>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: FontSize.xxLarge, color: Colors.primary, fontWeight: '900', marginVertical: Spacing * 3 }}>Login Here</Text>
          <Text style={{ fontSize: FontSize.large, maxWidth: "100%", textAlign: "center", fontWeight: "400" }}>Save People, Save country</Text>
        </View>
        <View style={{ marginVertical: Spacing * 5 }}>
          <TextInput
            placeholder='Email'
            textAlign='left'
            keyboardType='email-address'
            onChangeText={(text) => setEmail(text)}
            placeholderTextColor={Colors.darkText}
            style={{ fontSize: FontSize.small, padding: Spacing * 2, backgroundColor: Colors.lightPrimary, borderRadius: Spacing, marginVertical: Spacing }}
          />
          {emailError !== '' && <Text style={{ fontSize: FontSize.small, color: 'red' }}>{emailError}</Text>}
          <TextInput
            placeholder='Password'
            textAlign='left'
            placeholderTextColor={Colors.darkText}
            secureTextEntry
            style={{ fontSize: FontSize.small, padding: Spacing * 2, backgroundColor: Colors.lightPrimary, borderRadius: Spacing, marginVertical: Spacing }}
            onChangeText={(text) => setPassword(text)}
          />
          {passwordError !== '' && <Text style={{ fontSize: FontSize.small, color: 'red' }}>{passwordError}</Text>}
        </View>
        <TouchableOpacity
          onPress={handleForgotPassword}
        >
          <View>
            <Text style={{ fontSize: FontSize.small, color: Colors.primary, alignSelf: "flex-end" }}>Forgot your password ?</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSignInPress}
          disabled={loading}
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
            {loading ? 'Signing in...' : 'Sign in'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ padding: Spacing }} onPress={handleForgotPassword}>
          <Text style={{ color: Colors.text, textAlign: "center", fontSize: FontSize.small }}>Create new account</Text>
        </TouchableOpacity>
       
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showBottomSheet}
        onRequestClose={handleCloseBottomSheet}
      >
        <View style={styles.bottomSheetContainer}>
          <View style={styles.bottomSheet}>
            <Text style={styles.bottomSheetTitle}>Contact Admin</Text>
            <Text style={styles.bottomSheetText}>Contact Your Department Admin</Text>
            <TouchableOpacity onPress={handleCloseBottomSheet} style={styles.bottomSheetButton}>
              <Text style={styles.bottomSheetButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  bottomSheetContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  },
  bottomSheet: {
    backgroundColor: Colors.lightPrimary,
    padding: Spacing * 2,
    borderTopLeftRadius: Spacing,
    borderTopRightRadius: Spacing,
  },
  bottomSheetTitle: {
    fontSize: FontSize.large,
    fontWeight: "bold",
    marginBottom: Spacing
  },
  bottomSheetText: {
    fontSize: FontSize.medium,
    marginBottom: Spacing
  },
  bottomSheetButton: {
    backgroundColor: Colors.primary,
    padding: Spacing,
    borderRadius: Spacing,
    alignSelf: "flex-end"
  },
  bottomSheetButtonText: {
    color: Colors.onPrimary,
    fontWeight: "bold"
  }
});

export default LoginScreen;
