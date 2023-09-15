import React, { useState, useRef } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  TextInput,
  Image,
  TouchableWithoutFeedback,
  Button,
} from 'react-native';

import { useAppContext } from '../AppContext';

export default function AdminPanel() {
  const buttonColors = ['red', 'blue', 'green', 'pink', 'purple', 'gray', 'brown', 'magenta', 'lime'];

  const {
    appColor,
    setAppColor,
    companyName,
    setCompanyName,
  } = useAppContext();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  const handleButtonPress = (color) => {
    setAppColor((prevColor) => (prevColor === color ? '#6F9EEB' : color));
    console.log(`Button color : ${appColor}`);
  };

  const handleCompanyNameChange = (text) => {
    setCompanyName(text);
  };

  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const imagePickerRef = useRef();

  const handleImagePress = () => {
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.TextInput}
        onPress={toggleModal}
      >
        <Text>Company name</Text>
      </TouchableOpacity>
      {isModalVisible && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => {
            toggleModal();
          }}
        >
          <View style={styles.modalView}>
            <TextInput
              style={styles.modalTextInput}
              value={companyName}
              onChangeText={setCompanyName}
              placeholder="Undefined"
            />
            <Button
              title="Save"
              onPress={() => {
                toggleModal();
              }}
            />
          </View>
        </Modal>
      )}
      <View style={styles.buttonRow}>
        {buttonColors.map((color, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.button,
              { backgroundColor: color },
              appColor === color ? { borderWidth: 7, borderColor: 'black' } : { borderWidth: 2, borderColor: 'black' },
            ]}
            onPress={() => handleButtonPress(color)}
          >
            <Text style={styles.buttonText}>{color}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-end',
  },
  buttonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  button: {
    width: '30%',
    height: '15%',
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  TextInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 80,
    paddingLeft: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  modalTextInput: {
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },
});
