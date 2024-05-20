import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import Spacing from '../app/constants/Spacing';
import Colors from '../app/constants/Colors';

import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import UserIdContext from '../context/AuthContext';

const QrCode = () => {
    const [isLoading, setIsLoading] = useState(true); // Set isLoading initially to true
    const navigation = useNavigation();
    const { userId } = useContext(UserIdContext);

    useEffect(() => {
        // Simulate async QR code generation
        setTimeout(() => {
            setIsLoading(false); // Set isLoading to false when QR code generation is done
        }, 2000); // You can replace this with your actual QR code generation logic
    }, []);

    // Render the QR code and form
    return (
        <SafeAreaView style={{ backgroundColor: Colors.background, flex: 1 }}>
            <View style={{ padding: Spacing * 3 }}>

                <View style={{ alignContent: 'center', alignItems: 'center', marginTop: 20, }}>
                    {isLoading ? (
                        <ActivityIndicator size="large" color={Colors.primary} />
                    ) : (
                        <>
                            <QRCode
                                value={userId} // Pass the unique ID as value to generate QR code
                                size={300}
                                logoSize={30}
                                logoBackgroundColor='transparent'
                                logoMargin={2}
                                logoBorderRadius={15}
                            />
                            {/* Display Unique ID */}
                            <Text style={{ marginTop: 15, fontWeight: 'bold' }}>{userId}</Text>
                        </>
                    )}
                </View>
            </View>
        </SafeAreaView>
    );
};

export default QrCode;

const styles = StyleSheet.create({
    
});
