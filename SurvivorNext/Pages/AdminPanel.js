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

export default function AdminPanel() {
  const buttonColors = ['red', 'orange', 'yellow', 'blue', 'indigo', 'violet', 'purple', 'magenta', 'lime']; // Couleurs des boutons
  const [selectedColor, setSelectedColor] = useState('undefined');

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [companyName, setCompanyName] = useState('');

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  const handleButtonPress = (color) => {
    setSelectedColor((prevColor) => (prevColor === color ? 'undefined' : color));
    console.log(`Button color : ${selectedColor}`);
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
      <TouchableWithoutFeedback onPress={handleImagePress}>
        <View style={styles.Image}>
          {selectedPhoto ? (
            <Image source={{ uri: selectedPhoto }} style={styles.selectedImage} />
          ) : (
            <Text>Select a photo</Text>
          )}
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.buttonRow}>
        {buttonColors.map((color, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.button,
              { backgroundColor: color },
              selectedColor === color ? { borderWidth: 7, borderColor: 'black' } : { borderWidth: 2, borderColor: 'black' },
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
  Image: {
    width: 200,
    height: 200,
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 100,
    justifyContent: 'center',
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
