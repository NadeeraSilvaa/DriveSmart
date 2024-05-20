import { Camera } from "expo-camera";
import React, { useState, useEffect } from "react";
import { Button, View, Text, StyleSheet, TouchableOpacity, Linking } from "react-native";
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { WebView } from 'react-native-webview';


import { FontAwesome } from '@expo/vector-icons';
import Spacing from '../constants/Spacing';
import Colors from '../constants/Colors';

export default function PoliceHome() {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [cameraKey, setCameraKey] = useState(Date.now());
    const [showWebView, setShowWebView] = useState(false);
    const navigation = useNavigation();

    const askForCameraPermission = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
    }

    useEffect(() => {
        askForCameraPermission();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            setScanned(false);
            setCameraKey(Date.now());
        }, [])
    );

    const handleBarcodeScanned = ({ data }) => {
        setScanned(true);
        console.log('Data:', data);
        navigation.navigate('ViolationReport', { scanResult: data });
    };

    const handleProfile = () => {
        navigation.navigate('PoliceProfile');
    };

    const handleSignOut = () => {
        navigation.navigate('Login');
    };

    const handleCheckVehicle = () => {
        setShowWebView(true);
    };

    const handleCloseWebView = () => {
        setShowWebView(false);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleSignOut} style={styles.settingsButton}>
                <FontAwesome name="sign-out" color={Colors.text} size={Spacing * 4} />
                <Text style={styles.settingsText}>Log Out</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleProfile} style={styles.checkButton}>
                <FontAwesome name="address-card-o" color={Colors.text} size={Spacing * 4} />
                <Text style={styles.checkText}>Check vehicle</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleProfile} style={styles.signOutButton}>
                <FontAwesome name="user-o" color={Colors.text} size={Spacing * 4} />
                <Text style={styles.signOutText}>Profile</Text>
            </TouchableOpacity>

            <View>
                <Text style={styles.headerText}>Scan</Text>
            </View>
            <View style={styles.cameraContainer}>
                <Camera
                    key={cameraKey}
                    onBarCodeScanned={scanned ? undefined : handleBarcodeScanned}
                    style={styles.camera}
                    type={Camera.Constants.Type.back}
                />
            </View>

            {/* <Button
                title="Check Vehicle"
                onPress={handleCheckVehicle}
                style={{
                    backgroundColor: Colors.primary,
                }} /> */}
            
            {showWebView && (
                <View style={styles.webViewContainer}>
                    <WebView
                        source={{ uri: 'https://google.com' }} // Replace 'https://example.com' with the website URL you want to open
                        style={{ flex: 1 }}
                        onError={console.error}
                    />
                    <Button
                        title="Close"
                        onPress={handleCloseWebView}
                        style={{
                            backgroundColor: Colors.primary,
                        }}
                    />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cameraContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 300,
        width: 300,
        overflow: 'hidden',
        borderRadius: 39,
        backgroundColor: 'tomato',
        marginBottom: 150,
    },
    camera: {
        height: 300,
        width: 300,
    },
    mainText: {
        fontSize: 16,
        margin: 20,
    },
    headerText: {
        marginBottom: 70,
        fontSize: 35,
    },
    settingsButton: {
        position: 'absolute',
        bottom: Spacing * 2,
        right: Spacing * 1,
        backgroundColor: 'transparent',
        
    },
    checkButton:{
        position: 'absolute',
        bottom: Spacing * 2,
        left: Spacing * 19,
        backgroundColor: 'transparent',
    },
    signOutButton: {
        position: 'absolute',
        bottom: Spacing * 2,
        left: Spacing * 2,
        backgroundColor: 'transparent',
    },
    signOutText:{
        bottom: Spacing /7,
        right:4 ,
    },
    settingsText:{
        bottom: Spacing /7,
        right:10,
    },
    checkText:{
        bottom: Spacing /7,
        right:20 ,
    },
    webViewContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
