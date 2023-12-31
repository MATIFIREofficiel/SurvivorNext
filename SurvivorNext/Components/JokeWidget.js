import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import axios from 'axios';
import { useAppContext } from '../AppContext';

const JokeApp = () => {
  const [joke, setJoke] = useState('');
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

  const fetchJoke = async () => {
    try {
      const response = await axios.get('https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist&type=single');
      setJoke(response.data.joke);
      setModalVisible(true);
    } catch (error) {
      console.log('Error', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Jokes</Text>
      <TouchableOpacity
        style={dynamicStyles.button}
        onPress={fetchJoke}
      >
        <Text style={styles.buttonText}>New joke</Text>
      </TouchableOpacity>
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text testID='joke-text' style={styles.jokeText}>{joke}</Text>
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
    borderRadius: 10,
    flex: 1,
    height: 255,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
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
  jokeText: {
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

export default JokeApp;
