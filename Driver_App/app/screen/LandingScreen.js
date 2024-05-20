
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    ImageBackground,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import React from 'react';
import Spacing from '../constants/Spacing';
import FontSize from '../constants/FontSize';
import Colors from '../constants/Colors';
import Font from '../constants/Font';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';


const { height } = Dimensions.get("window");



export const LandingScreen = () => {



    const navigation = useNavigation();

    const handleLoginPress = () => {
        // Navigate to the Login screen
         navigation.navigate('Login');
    };
    // const handleSettingPress = () => {
    //     // Navigate to the Login screen
    //     navigation.navigate('Settings');
    // };

    const handleRegisterPress = () => {
        // Navigate to the Login screen
         navigation.navigate('Register');
    };
    return (
        <SafeAreaView style={{
            backgroundColor:Colors.background,
            flex: 1,
        }}>
            <View >
                <ImageBackground style={{
                    height: height / 1.8,

                }}
                    resizeMode='contain'
                    source={require("../../assets/images/logo.jpg")}
                />
                <View style={{
                    paddingHorizontal: Spacing * 4,
                    paddingTop: Spacing * 5,
                }}>
                    <Text style={{
                        fontSize: FontSize.xxLarge,
                        color: Colors.primary,
                        fontFamily: Font["poppins-bold"],
                        textAlign: "center"
                    }}>Drive - Smart</Text>

                    <Text style={{
                        fontSize: FontSize.small,
                        color: Colors.text,
                        fontFamily: Font["poppins-regular"],
                        textAlign: "center",
                        marginTop: Spacing * 2,
                    }}>Simplify, Pay, and Get Back on the Road Hassle-Free</Text>

                </View>
            </View>
            <View style={{
                paddingHorizontal: Spacing * 2,
                paddingTop: Spacing * 6,
                flexDirection: "row",
                backgroundColor:Colors.background,
            }}>
                <TouchableOpacity
                    onPress={handleLoginPress}

                    style={{
                        backgroundColor: Colors.primary,
                        paddingVertical: Spacing * 1.5,
                        paddingHorizontal: Spacing * 2,
                        width: "48%",
                        borderRadius: Spacing,
                    }}>
                    <Text style={{
                        fontFamily: Font["poppins-bold"],
                        color: Colors.onPrimary,
                        fontSize: FontSize.large,
                        textAlign: "center",

                    }}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                onPress={handleRegisterPress}

                    style={{

                        backgroundColor:Colors.gray,
                        paddingVertical: Spacing * 1.5,
                        paddingHorizontal: Spacing * 2,
                        width: "48%",
                        borderRadius: Spacing,
                        shadowColor: Colors.gray2,
                        shadowOffset: {
                            width: 4,
                            height: Spacing,
                        },
                        shadowOpacity: 0.9,
                        shadowRadius: Spacing,
                    }}>
                    <Text style={{
                        fontFamily: Font["poppins-bold"],
                        color: Colors.text,
                        fontSize: FontSize.large,
                        textAlign: "center",

                    }}>Register</Text>
                </TouchableOpacity>

                
            </View>
            <View>
            {/* <TouchableOpacity
                    onPress={handleSettingPress}

                    style={{
                        backgroundColor: Colors.primary,
                        paddingVertical: Spacing * 1.5,
                        paddingHorizontal: Spacing * 2,
                        
                        width: "48%",
                        borderRadius: Spacing,
                    }}>
                    <Text style={{
                        fontFamily: Font["poppins-bold"],
                        color: Colors.onPrimary,
                        fontSize: FontSize.large,
                        textAlign: "center",

                    }}>Settings</Text>
                </TouchableOpacity> */}
            </View>
            <StatusBar style='auto' />
        </SafeAreaView>
    );
}




