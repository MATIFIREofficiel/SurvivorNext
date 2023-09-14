import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import axios from 'axios';
import { useAppContext } from '../AppContext';

const FactApp = () => {
    const [fact, setFact] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const {
        appColor,
    } = useAppContext();

    const dynamicStyles = {
        button: {
            backgroundColor: appColor,
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 5,
        },
    };
    const fetchFact = async () => {
        try {
            const response = await axios.get('https://uselessfacts.jsph.pl/random.json');
            setFact(response.data.text);
            setModalVisible(true);
        } catch (error) {
            console.error('Error', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Facts</Text>
            <TouchableOpacity
                style={dynamicStyles.button}
                onPress={fetchFact}
            >
                <Text style={styles.buttonText}>New fact</Text>
            </TouchableOpacity>
            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <Text style={styles.factText}>{fact}</Text>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => setModalVisible(false)}
                    >
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 255,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderRadius: 10,
    },
    header: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    factText: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 30,
        paddingHorizontal: 20,
        color: 'white',
    },
    closeButton: {
        backgroundColor: 'red',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 20,
    },
    closeButtonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default FactApp;
