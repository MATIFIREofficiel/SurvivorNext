import React, { useState, useEffect, useRef } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Alert,
  Modal,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useAppContext } from '../AppContext';

import EUR from '../Pages/Devises/devisesEUR.json';
import USD from '../Pages/Devises/devisesUSD.json';
import GBP from '../Pages/Devises/devisesGBP.json';
import CAD from '../Pages/Devises/devisesCAD.json';
import MAD from '../Pages/Devises/devisesMAD.json';
import ILS from '../Pages/Devises/devisesILS.json';
import THB from '../Pages/Devises/devisesTHB.json';
import CNY from '../Pages/Devises/devisesCNY.json';
import RUB from '../Pages/Devises/devisesRUB.json';
import CHF from '../Pages/Devises/devisesCHF.json';
import JPY from '../Pages/Devises/devisesJPY.json';

export default function CurrencyConverter() {
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState('');
  const [fromCurrency, setFromCurrency] = useState('EUR');
  const [toCurrency, setToCurrency] = useState('USD');
  const [result, setResult] = useState(null);
  const [currencies, setCurrencies] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState(null);

  const [selectedCurrencyType, setSelectedCurrencyType] = useState('from');

  const buttonRef = useRef(null);
  const [buttonPosition, setButtonPosition] = useState({});
  const {
    appColor,
  } = useAppContext();

  const dynamicStyles = {
    convertButton: {
      backgroundColor: appColor,
      borderRadius: 5,
      paddingVertical: 10,
      paddingHorizontal: 20,
    },
  };

  const getButtonPosition = () => {
    buttonRef.current.measureInWindow((x, y, width, height) => {
      console.log(`Position X: ${x}`);
      console.log(`Position Y: ${y}`);
      console.log(`Width: ${width}`);
      console.log(`Height: ${height}`);
      setButtonPosition({ x, y, width, height });
    });
  };

  useEffect(() => {
    const data = getDataForCurrency(fromCurrency);
    if (data) {
      const availableCurrencies = data.result.conversion.map(
        (conversion) => conversion.to
      );
      setCurrencies(availableCurrencies);
      setToCurrency(availableCurrencies[0]);
    } else {
      setCurrencies([]);
      setToCurrency('');
    }
  }, [fromCurrency]);

  useEffect(() => {
    if (!loading) {
      setQuantity('');
    }
  }, [loading]);

  const getDataForCurrency = (currencyCode) => {
    switch (currencyCode) {
      case 'EUR':
        return EUR;
      case 'USD':
        return USD;
      case 'GBP':
        return GBP;
      case 'CAD':
        return CAD;
      case 'MAD':
        return MAD;
      case 'ILS':
        return ILS;
      case 'THB':
        return THB;
      case 'CNY':
        return CNY;
      case 'RUB':
        return RUB;
      case 'CHF':
        return CHF;
      case 'JPY':
        return JPY;
      default:
        return null;
    }
  };

  const convertCurrency = () => {
    if (!quantity) {
      Alert.alert('Entry a numeric value');
      return;
    }

    setLoading(true);

    const data = getDataForCurrency(fromCurrency);
    if (data) {
      const conversionRateFrom = data.result.conversion.find(
        (conversion) => conversion.to === toCurrency
      );

      if (conversionRateFrom) {
        const convertedAmount =
          (parseFloat(quantity) * conversionRateFrom.rate);
        setResult(
          `${quantity} ${fromCurrency} equal ${convertedAmount.toFixed(
            2
          )} ${toCurrency}`
        );
      } else {
        setResult(
          "Error result."
        );
      }
    } else {
      setResult("Undefined conversion.");
    }

    setLoading(false);
  };

  const renderCurrencyItem = ({ item }) => (
    <TouchableOpacity
      style={styles.currencyItem}
      onPress={() => {
        setSelectedCurrency(item);
        setModalVisible(false);
        if (selectedCurrencyType === 'from') {
          setFromCurrency(item);
        } else {
          setToCurrency(item);
        }
      }}
    >
      <Text>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Currency converter</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Price"
          keyboardType="numeric"
          value={quantity}
          onChangeText={(text) => setQuantity(text)}
        />
        <View >
          <TouchableOpacity
            ref={buttonRef}
            style={styles.currencyButton}
            onPress={() => {
              setModalVisible(true);
              setSelectedCurrencyType('from');
              getButtonPosition();
            }}
            testID="fromCurrencyButton"
          >
            <Text style={styles.currencyButtonText}>{fromCurrency}</Text>
          </TouchableOpacity>
          <Modal
            visible={modalVisible}
            transparent={true}
            animationType="fade"
            onRequestClose={() => setModalVisible(false)}
          // style={styles.centeredModal}
          >
            <View style={{ flex: 1, flexDirection: 'row', position: 'absolute', top: buttonPosition.y, left: buttonPosition.x }}>
              <View style={styles.modalContainerList}>
                <FlatList
                  data={currencies}
                  renderItem={renderCurrencyItem}
                  keyExtractor={(item) => item}
                />
              </View>
            </View>
          </Modal>
        </View>
        <TouchableOpacity
          ref={buttonRef}
          style={styles.currencyButton}
          onPress={() => {
            setModalVisible(true);
            setSelectedCurrencyType('to');
            getButtonPosition();
          }}
          testID="toCurrencyButton"
        >
          <Text style={styles.currencyButtonText}>{toCurrency}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={dynamicStyles.convertButton}
        onPress={convertCurrency}
        disabled={loading}
      >
        <Text style={styles.convertButtonText}>
          {loading ? 'Loading' : 'Convert'}
        </Text>
      </TouchableOpacity>
      {result && <Text style={styles.resultText}>{result}</Text>}
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    height: 250,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 10,
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 30,
    width: 40,
  },
  currencyButton: {
    backgroundColor: 'lightgray',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginLeft: 10,
  },
  currencyButtonText: {
    fontSize: 16,
  },
  modalContainer: {

  },
  centeredModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContainerList: {
    width: '40%',
    height: '30%',
    backgroundColor: 'white',
    borderRadius: 10,
  },
  currencyItem: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    width: '100%',
    alignItems: 'center',
  },
  convertButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultText: {
    fontSize: 18,
    marginTop: 20,
  },
});
