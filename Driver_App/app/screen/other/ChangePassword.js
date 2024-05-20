import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import Spacing from '../../constants/Spacing';
import FontSize from '../../constants/FontSize';
import Colors from '../../constants/Colors';
import { useNavigation } from '@react-navigation/native';
// import { FIREBASE_AUTH } from '../../../FirebaseConfig';
// import UserIdContext from '../../../context/AuthContext';
// import { signInWithEmailAndPassword } from 'firebase/auth';

const ChangePassword = () => {
    const [currentPass, setCurrentPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [newConfirmPass, setNewConfirmPass] = useState('');
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
   // const auth = FIREBASE_AUTH;
    //const { userId } = useContext(UserIdContext);

    // const handlePasswordChange = async () => {
    //     if (!currentPass || !newPass || !newConfirmPass) {
    //         Alert.alert('Error', 'Please fill in all fields');
    //         return;
    //     }

    //     if (newPass !== newConfirmPass) {
    //         Alert.alert('Error', 'New password and confirm password do not match');
    //         return;
    //     }

    //     try {
    //         setLoading(true);
    //         await signInWithEmailAndPassword(auth,userId, currentPass); // Sign in the user first
    //         await FIREBASE_AUTH.currentUser.updatePassword(newPass); // Update the password
    //         Alert.alert('Success', 'Password changed successfully');
    //         setCurrentPass('');
    //         setNewPass('');
    //         setNewConfirmPass('');
    //     } catch (error) {
    //         Alert.alert('Error', error.message);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const handleForgotPasswordPress = () => {
        navigation.navigate('PasswordForgot');
    };

    return (
        <SafeAreaView style={{ backgroundColor: Colors.background, flex: 1 }}>
            <View style={{ padding: Spacing * 1 }}>
                <View style={{ alignItems: "center", marginTop: 60 }}>
                    <View>
                        <Text style={{ fontSize: 30, color: Colors.primary, fontWeight: '900', marginVertical: Spacing * 3 }}>Change Your Password</Text>
                    </View>
                </View>
                <View style={{ marginVertical: Spacing * 5 }}>
                    <TextInput
                        placeholder='Current Password'
                        textAlign='left'
                        secureTextEntry={true}
                        onChangeText={(text) => setCurrentPass(text)}
                        placeholderTextColor={Colors.darkText}
                        style={{ fontSize: FontSize.small, padding: Spacing * 2, backgroundColor: Colors.lightPrimary, borderRadius: Spacing, marginVertical: Spacing }}
                    />
                    <TextInput
                        placeholder='New Password'
                        textAlign='left'
                        secureTextEntry={true}
                        onChangeText={(text) => setNewPass(text)}
                        placeholderTextColor={Colors.darkText}
                        style={{ fontSize: FontSize.small, padding: Spacing * 2, backgroundColor: Colors.lightPrimary, borderRadius: Spacing, marginVertical: Spacing }}
                    />
                    <TextInput
                        placeholder='Confirm Password'
                        textAlign='left'
                        secureTextEntry={true}
                        onChangeText={(text) => setNewConfirmPass(text)}
                        placeholderTextColor={Colors.darkText}
                        style={{ fontSize: FontSize.small, padding: Spacing * 2, backgroundColor: Colors.lightPrimary, borderRadius: Spacing, marginVertical: Spacing }}
                    />
                </View>
                <TouchableOpacity
                    onPress={handleForgotPasswordPress}>
                    <View>
                        <Text style={{ fontSize: FontSize.small, color: Colors.primary, alignSelf: "flex-end" }}>Forgot your password?</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                   // onPress={handlePasswordChange}
                    disabled={loading}
                    style={{
                        padding: Spacing * 2,
                        backgroundColor: Colors.primary,
                        marginVertical: Spacing * 3,
                        borderRadius: Spacing * 3,
                        shadowColor: Colors.primary,
                        shadowOffset: { width: 0, height: Spacing },
                        shadowOpacity: 0.3,
                        shadowRadius: Spacing,
                    }}>
                    <Text style={{ color: Colors.onPrimary, textAlign: "center", fontSize: FontSize.large }}>
                        {loading ? 'Please Wait...' : 'Change Password'}
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default ChangePassword;
