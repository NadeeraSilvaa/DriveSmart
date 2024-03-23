import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import Spacing from '../../constants/Spacing';
import FontSize from '../../constants/FontSize';
import Colors from '../../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import { FIREBASE_AUTH } from '../../../FirebaseConfig';  // Assuming you have FirebaseConfig.js where you initialize Firebase
import { sendPasswordResetEmail } from 'firebase/auth';
import { FontAwesome } from '@expo/vector-icons';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [emailError, setEmailError] = useState('');
    const navigation = useNavigation();
    const auth = FIREBASE_AUTH;

    const handleResetPassword = async () => {
        setLoading(true);
        try {
            await sendPasswordResetEmail(auth, email);
            Alert.alert(
                'Password Reset Email Sent',
                'Check your email to reset your password.',
                [{ text: 'OK', onPress: () => navigation.navigate('Login') }]
            );
        } catch (error) {
            handleAuthError(error);


        } finally {
            setLoading(false);
        }
    };

    const handleAuthError = (error) => {
        switch (error.code) {
            case 'auth/invalid-email':
            case 'auth/user-not-found':
                setEmailError('User not found. Please check your email address.');
                break;
            default:
                setEmailError('Error resetting password. Please try again later.');
                console.error('Password Reset Error:', error);
        }
    };

    const validateFields = () => {
        let isValid = true;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regular expression for email validation

        if (!email) {
            setEmailError('Email is required.');
            isValid = false;
        } else if (!emailRegex.test(email)) {
            setEmailError('Please enter a valid email address.');
            isValid = false;
        } else {
            setEmailError('');
        }
        return isValid;
    };

    const handleResetPress = () => {
        if (validateFields()) {
            handleResetPassword();
        }
    };


    return (
        <SafeAreaView style={{ backgroundColor: Colors.background, flex: 1 }}>
            <View style={{ padding: Spacing * 1, }}>
                <View style={{ alignItems: "center", marginTop: 60, }}>
                    <View style={{
                        
                    }}>
                        <Text style={{ fontSize: 30, color: Colors.primary, fontWeight: '900', marginVertical: Spacing * 3 }}>Recover Your Password</Text>
                    </View>
                    <View style={{
                        marginTop:20,
                    }}> 
                        <Text style={{ fontSize: FontSize.large, maxWidth: "100%", textAlign: "center", fontWeight: "400" }}>Enter Email Address</Text>
                    </View>

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
                </View>
                <TouchableOpacity
                    onPress={handleResetPress}
                    disabled={loading}
                    style={{
                        padding: Spacing * 2,
                        backgroundColor: Colors.primary,
                        marginVertical: Spacing * 3,
                        borderRadius: Spacing *3,
                        shadowColor: Colors.primary,
                        shadowOffset: { width: 0, height: Spacing },
                        shadowOpacity: 0.3,
                        shadowRadius: Spacing,
                    }}>
                    <Text style={{ color: Colors.onPrimary, textAlign: "center", fontSize: FontSize.large }}>
                        {loading ? 'Please Wait...' : 'Reset Password'}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ padding: Spacing }}>
                    <Text style={{ color: Colors.text, textAlign: "center", fontSize: FontSize.small }}>Create new account</Text>
                </TouchableOpacity>
                <View style={{ marginVertical: Spacing * 3 }}>
                    <Text style={{ color: Colors.primary, textAlign: "center", fontSize: FontSize.small }}>Or continue with</Text>
                    <View style={{ marginTop: Spacing, flexDirection: "row", justifyContent: "center" }}>
                        <TouchableOpacity style={{ padding: Spacing, backgroundColor: Colors.gray, borderRadius: Spacing / 2, marginHorizontal: Spacing }}>
                            <FontAwesome name='google' color={Colors.text} size={Spacing * 2} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ padding: Spacing, backgroundColor: Colors.gray, borderRadius: Spacing / 2, marginHorizontal: Spacing }}>
                            <FontAwesome name='apple' color={Colors.text} size={Spacing * 2} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ padding: Spacing, backgroundColor: Colors.gray, borderRadius: Spacing / 2, marginHorizontal: Spacing }}>
                            <FontAwesome name='facebook' color={Colors.text} size={Spacing * 2} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default ForgotPassword;
