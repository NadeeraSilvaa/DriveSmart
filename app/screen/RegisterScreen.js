import React, { useState } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Colors from "../constants/Colors";
import Font from "../constants/Font";
import { FontAwesome } from '@expo/vector-icons';
import AppTextInput from "../../components/AppTextInput";
import { FIREBASE_AUTH } from "../../FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from '@react-navigation/native';

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const auth = FIREBASE_AUTH;
  const navigation = useNavigation();

  const handleSignUp = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    } else {
      setEmailError("");
    }

    if (password.length < 6) {
      setPasswordError("Password should be at least 6 characters long.");
      return;
    } else {
      setPasswordError("");
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      return;
    } else {
      setConfirmPasswordError("");
    }

    setLoading(true);

    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      console.log(response);
      alert('Check your emails!');
      navigation.navigate('Login');
    } catch (error) {
      handleFirebaseError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFirebaseError = (error) => {
    if (error.code === 'auth/email-already-in-use') {
      alert('Email address is already in use.');
    } else if (error.code === 'auth/invalid-email') {
      alert('Invalid email address format.');
    } else if (error.code === 'auth/weak-password') {
      alert('Password should be at least 6 characters long.');
    } else {
      alert('Authentication Error: ' + error.message);
    }
    console.error(error);
  };

  return (
    <SafeAreaView style={{ backgroundColor: Colors.background, flex: 1 }}>
      <View style={{ padding: Spacing * 2 }}>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.title}>
            Create account
          </Text>
          <Text style={styles.subtitle}>
            Create an account, To Access your E-License System
          </Text>
        </View>
        <View style={{ marginVertical: Spacing * 3 }}>
          <AppTextInput
            placeholder="Email"
            keyboardType='email-address'
            onChangeText={(text) => setEmail(text)}
          />
          <ErrorText error={emailError} />
          <AppTextInput
            placeholder="Password"
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
          />
          <ErrorText error={passwordError} />
          <AppTextInput
            placeholder="Confirm Password"
            secureTextEntry
            onChangeText={(text) => setConfirmPassword(text)}
          />
          <ErrorText error={confirmPasswordError} />
        </View>

        <TouchableOpacity
          onPress={handleSignUp}
          style={styles.button}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Signing up...' : 'Sign up'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginLink}>
          <Text style={styles.loginText}>
            Already have an account
          </Text>
        </TouchableOpacity>

        <View style={styles.socialLogin}>
          <Text style={styles.socialLoginText}>
            Or continue with
          </Text>
          <View style={styles.socialIcons}>
            <SocialIcon name="google" />
            <SocialIcon name="apple" />
            <SocialIcon name="facebook" />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const ErrorText = ({ error }) => {
  return error ? <Text style={styles.errorText}>{error}</Text> : null;
};

const SocialIcon = ({ name }) => {
  return (
    <TouchableOpacity style={styles.socialButton}>
      <FontAwesome name={name} color={Colors.text} size={Spacing * 2} />
    </TouchableOpacity>
  );
};

const styles = {
  title: {
    fontSize: FontSize.xLarge,
    color: Colors.primary,
    fontFamily: Font["poppins-bold"],
    marginVertical: Spacing * 3,
  },
  subtitle: {
    fontFamily: Font["poppins-regular"],
    fontSize: FontSize.small,
    maxWidth: "80%",
    textAlign: "center",
  },
  button: {
    padding: Spacing * 2,
    backgroundColor: Colors.primary,
    marginVertical: Spacing * 3,
    borderRadius: Spacing,
    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: Spacing,
    },
    shadowOpacity: 0.3,
    shadowRadius: Spacing,
  },
  buttonText: {
    fontFamily: Font["poppins-bold"],
    color: Colors.onPrimary,
    textAlign: "center",
    fontSize: FontSize.large,
  },
  loginLink: {
    padding: Spacing,
  },
  loginText: {
    fontFamily: Font["poppins-semiBold"],
    color: Colors.text,
    textAlign: "center",
    fontSize: FontSize.small,
  },
  socialLogin: {
    marginVertical: Spacing * 3,
  },
  socialLoginText: {
    fontFamily: Font["poppins-semiBold"],
    color: Colors.primary,
    textAlign: "center",
    fontSize: FontSize.small,
  },
  socialIcons: {
    marginTop: Spacing,
    flexDirection: "row",
    justifyContent: "center",
  },
  socialButton: {
    padding: Spacing,
    backgroundColor: Colors.gray,
    borderRadius: Spacing / 2,
    marginHorizontal: Spacing,
  },
  errorText: {
    fontFamily: Font["poppins-regular"],
    fontSize: FontSize.small,
    color: 'red',
  },
};

export default RegisterScreen;
