import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import data from './../Data/organigram.json';

const Card = ({navigation, item, access_token}) => {

    return (
        <ScrollView>
            <ScrollView horizontal={true}>
                    <View style={styles.cardContainer}>
                        <TouchableOpacity style={styles.cardContent} onPress={() => {navigation.navigate('ProfileDetail', [access_token, item.id])}}>
                            <Image
                                source={{
                                    uri: process.env.REACT_APP_API_URL + `/${item.id}/image`,
                                    method: 'GET',
                                    headers: {
                                        accept: 'application/json',
                                        'X-Group-Authorization': process.env.REACT_APP_API_KEY,
                                        'Authorization': 'Bearer ' + access_token,
                                    },
                                }}
                                style={styles.image}
                            />
                            <Text style={styles.text}>{item.name}</Text>
                        </TouchableOpacity>
                            {item.subordinates && item.subordinates.length > 0 && (
                                <View style={styles.childrenContainer}>
                                    <View style={styles.children}>
                                        {item.subordinates.map((child) => (
                                            <View key={data[child - 1].name}>
                                                <View style={styles.verticalLine} />
                                                <Card item={data[child - 1]} access_token={access_token} navigation={navigation} />
                                            </View>
                                        ))}
                                    </View>
                                </View>
                            )}
                    </View>
            </ScrollView>
        </ScrollView>
    );
};

const Organigram = ({navigation, access_token }) => {
    return (
        <View style={styles.chartContainer}>
            <Card item={data[0]} access_token={access_token} navigation={navigation} />
        </View>
    );
};

const styles = StyleSheet.create({
    chartContainer: {
        flex: 1,
        marginTop: 25,
    },
    cardContainer: {
        marginBottom: 16,
    },
    cardContent: {
        flexDirection: 'column',
        alignItems: 'center',
        marginHorizontal: 5,
        paddingHorizontal: 15,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: 'black',
    },
    childrenContainer: {
        alignItems: 'center'
    },
    children: {
        flexDirection: 'row',
    },
    image: {
        marginTop: 10,
        borderRadius: 20,
        width: 100,
        height: 100,
    },
    text: {
        fontSize: 16,
        width: 100,
        textAlign: 'center',
    },
    verticalLine: {
        height: 25,
        width: 2,
        backgroundColor: 'black',
        alignSelf: 'center',
    },
});

export default Organigram;