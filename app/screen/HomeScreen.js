import React, { useRef, useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, FlatList, Dimensions, Image } from 'react-native';
import Header from '../../components/Header';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo } from '@expo/vector-icons';
import FeatherIcon from "react-native-vector-icons/Feather";
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import { useRoute } from '@react-navigation/native';

import Home from './other/Home';
import Payment from './other/Payment';
import InvoiceScreen from './other/InvoiceScreen';
import SettingsScreen from './SettingScreen';
import QrCode from '../../components/QrCode';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const HomeScreen = ({ navigation }) => {

    const Tab = createBottomTabNavigator();
    const screenOptions = {
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
            position: "absolute",
            bottom: 0,
            right: 0,
            left: 0,
            elevation: 0,
            height: 60,
            background: "#fff"
        }
    }

    // Dummy news data with images
    const newsData = [
        { id: 1, image: require('../../assets/images/newscard/1.png') },
        { id: 2, image: require('../../assets/images/newscard/2.jpg') },
        { id: 3, image: require('../../assets/images/newscard/3.jpeg') },
        // Add more news items as needed
    ];

    const flatListRef = useRef(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [hideNewsCard, setHideNewsCard] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            if (flatListRef.current && !hideNewsCard) {
                const nextPage = (currentPage + 1) % newsData.length;
                flatListRef.current.scrollToIndex({
                    index: nextPage,
                    animated: true,
                });
                setCurrentPage(nextPage);
            }
        }, 4000);

        return () => clearInterval(interval);
    }, [currentPage, hideNewsCard]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Header navigation={navigation} />
            </View>
            {!hideNewsCard && (
                <FlatList
                ref={flatListRef}
                horizontal
                data={newsData}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.newsCard}>
                        <Image source={item.image} style={styles.newsImage} />
                    </View>
                )}
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
            />
            )}
            <View style={styles.body}>
                <Tab.Navigator screenOptions={screenOptions}>
                <Tab.Screen
                        name="Home"
                        component={Home}
                        listeners={{
                            tabPress: () => {
                                setHideNewsCard(false);
                            }
                        }}
                        options={{
                            tabBarIcon: ({ focused }) => (
                                <View style={styles.tabIconContainer}>
                                    <Entypo name="home" size={24} color={focused ? Colors.primary : "#111"} />
                                    <Text style={[styles.tabText, { color: focused ? Colors.primary : "#111" }]}>HOME</Text>
                                </View>
                            )
                        }}
                    />
                    <Tab.Screen
                        name="Portfolio"
                        component={Payment}
                        listeners={{
                            tabPress: () => {
                                setHideNewsCard(true);
                            }
                        }}
                        options={{
                            tabBarIcon: ({ focused }) => (
                                <View style={styles.tabIconContainer}>
                                    <Entypo name="wallet" size={24} color={focused ? Colors.primary : "#111"} />
                                    <Text style={[styles.tabText, { color: focused ? Colors.primary : "#111" }]}>PAY</Text>
                                </View>
                            )
                        }}
                    />
                    <Tab.Screen
                        name="Transaction"
                        component={QrCode}
                        listeners={{
                            tabPress: () => {
                                setHideNewsCard(true);
                            }
                        }}
                        options={{
                            tabBarIcon: ({ focused }) => {
                                return (
                                    <View
                                        style={{
                                            alignItems: "center",
                                            justifyContent: "center",
                                            backgroundColor: "#626262",
                                        }}
                                    >
                                        <FontAwesome name="qrcode" size={24} color="#fff" />
                                    </View>
                                )
                            }
                        }}
                    />
                    <Tab.Screen
                        name="Invoice Screen"
                        component={InvoiceScreen}
                        listeners={{
                            tabPress: () => {
                                setHideNewsCard(true);
                            }
                        }}
                        options={{
                            tabBarIcon: ({ focused }) => (
                                <View style={styles.tabIconContainer}>
                                    <MaterialIcons name="history" size={24} color={focused ? Colors.primary : "#111"} />
                                    <Text style={[styles.tabText, { color: focused ? Colors.primary : "#111" }]}>VIOLATIONS</Text>
                                </View>
                            )
                        }}
                    />
                    <Tab.Screen
                        name="Settings"
                        component={SettingsScreen}
                        listeners={{
                            tabPress: () => {
                                setHideNewsCard(true);
                            }
                        }}
                        options={{
                            tabBarIcon: ({ focused }) => (
                                <View style={styles.tabIconContainer}>
                                    <FeatherIcon name="settings" size={24} color={focused ? Colors.primary : "#111"} />

                                    <Text style={[styles.tabText, { color: focused ? Colors.primary : "#111" }]}>SETTINGS</Text>
                                </View>
                            )
                        }}
                    />
                </Tab.Navigator>
            </View>
        </SafeAreaView>
    );
};

export default HomeScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    body: {
        flex: 15,
    },
    header: {
        paddingTop: 40,
        paddingHorizontal: 20,
        paddingVertical: 30,
        backgroundColor: Colors.primary,
    },
    newsCard: {
        backgroundColor: 'transparent',
        borderRadius: 10,
       // padding: 20,
        marginHorizontal: 1,
        marginVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 15,
        width: screenWidth - 5, // Adjust as needed
        height: screenHeight / 4, // Adjust as needed
    },
    newsImage: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        resizeMode:'stretch'
    },
    tabIconContainer: {
        alignItems: "center",
        justifyContent: "center",
    },
    tabText: {
        fontSize: 12,
        color: "#59e4a8",
    },
});
