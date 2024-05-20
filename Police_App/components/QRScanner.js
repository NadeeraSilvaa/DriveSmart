import { Camera } from "expo-camera";
import React, { useState, useEffect } from "react";
import { Button, View, Text, StyleSheet } from "react-native";

export default function QrScanner() {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [text, setText] = useState('Not yet scanned');

    const askForCameraPermission = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
    }

    useEffect(() => {
        askForCameraPermission();
    }, []);

    const handleBarcodeScanned = ({ data }) => {
        setScanned(true);
        setText(data);
        console.log('Data:', data);
    }

    if (hasPermission === null) {
        return (
            <View style={styles.container}>
                <Text>Requesting permission for camera...</Text>
            </View>
        );
    }

    if (hasPermission === false) {
        return (
            <View style={styles.container}>
                <Text>No access to camera</Text>
                <Button title="Allow Camera" onPress={askForCameraPermission} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.headerText}>Scan, Pay n Go</Text>
            </View>
            <View style={styles.cameraContainer}>
                <Camera
                    onBarCodeScanned={scanned ? undefined : handleBarcodeScanned}
                    style={styles.camera}
                    type={Camera.Constants.Type.back}
                />
            </View>
            <Text style={styles.mainText}>{text}</Text>
            {scanned && <Button title="Scan Again?" onPress={() => setScanned(false)} color="tomato" />}
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
        marginBottom: 20,
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
        marginBottom: 50,
        fontSize: 35,
    },
});
