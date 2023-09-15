import { StyleSheet, View, FlatList, TouchableOpacity, TextInput, ScrollView, Text } from 'react-native'
import React from 'react'
import BottomSheet from '@gorhom/bottom-sheet';
import { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import WeatherWidget from '../Components/WeatherWidget';
import CurrencyConverter from '../Components/DeviseConvertWidget.js';
import JokePage from '../Components/JokeWidget.js';
import FactPage from '../Components/FactWidget';
import { Ionicons } from '@expo/vector-icons';
import { useAppContext } from '../AppContext';


function RenderItemScroll(props) {
  const Widget = props.item;

  return (
    <Widget />
  );
};


function UserWeatherWidget(props) {
  const inputRef = useRef(null);
  const [isWeatherClicked, setIsWeatherClicked] = useState(false);

  const Widget = props.item;
  const [city, setCity] = useState('paris');

  const openKeyboard = (item) => {
    if (item.name === "WeatherWidget") {
      setIsWeatherClicked(true);
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const handleCityChange = useCallback((text) => {
    setCity(text);
  }, []);


  return (
    <View>
      {isWeatherClicked &&
        <TextInput ref={inputRef} onBlur={() => setIsWeatherClicked(false)}
          onChangeText={handleCityChange}
          value={city}
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }} />
      }

      <TouchableOpacity onPress={() => openKeyboard(Widget)}>
        <Widget city={city} />
      </TouchableOpacity>
    </View>
  );
}


export default function DashboardPage() {

  const [isModalVisible, setModalVisible] = useState(false);
  const bottomSheetRef = useRef(null);
  const [userWidgets, setUserWidgets] = useState([]);
  const snapPoints = useMemo(() => ['35%', '80%'], []);
  const [widgets, setWidgets] = useState([WeatherWidget, CurrencyConverter, JokePage, FactPage]);


  const handleIndicatorPress = useCallback(() => {
    console.log('handleIndicatorPress');
    bottomSheetRef.current.close();
  }, []);


  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);

  const renderItem = useCallback(({ item }) => {
    const Widget = item;
    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity onPress={() => { setUserWidgets((prevUserWidgets) => [...prevUserWidgets, Widget]); }}>
          {Widget.name === "WeatherWidget" ? <Widget city={Widget.city} /> : <Widget />}
        </TouchableOpacity>
      </View>
    );
  }, [userWidgets]);

  const removeWidget = (widgetToRemove) => {
    setUserWidgets((prevUserWidgets) =>
      prevUserWidgets.filter((widget) => widget !== widgetToRemove)
    );
  };



  const handleCloseBottomSheet = useCallback(() => {
    bottomSheetRef.current.close();
    setModalVisible(false);
  }, []);


  const submitFunction = () => {
    console.log("submitFunction");
    console.log(city);
  }


  const handlePresentModalPress = useCallback(() => {
    bottomSheetRef.current.snapToIndex(1);
    setModalVisible(true);
  }, []);

  const {
    appColor,
  } = useAppContext();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {userWidgets.map((item, index) => (
          <View style={styles.itemContainerScroll} key={index}>
            <View style={styles.buttonDel}>
              <TouchableOpacity
                style={{ width: 40, height: 40 }}
                title="-"
                onPress={() => removeWidget(item)}
              >
                <Ionicons name="remove-circle-outline" size={40} color={appColor} />
              </TouchableOpacity>
            </View>
            {item.name === "WeatherWidget" ? (
              <UserWeatherWidget item={item} />
            ) : (
              <RenderItemScroll item={item} />
            )}
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity onPress={handlePresentModalPress} style={styles.button}>
        <Ionicons name="add-circle-outline" size={60} color={appColor} />
      </TouchableOpacity>
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        detached={true}
        enablePanDownToClose={true}
        style={{ zIndex: 1 }}
      >
        <FlatList
          data={widgets}
          refreshing={true}
          renderItem={renderItem}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
        >
        </FlatList>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#E5E76',
  },

  itemContainer: {
    width: '50%',
    height: '30%',
    padding: 12,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  button: {
    position: 'absolute',
    bottom: 40,
    right: 20,
  },

  buttonDel: {
    zIndex: 1,
    position: 'absolute',
    top: 10,
    right: 0,
  },

  scrollContainer: {
    marginTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  itemContainerScroll: {
    width: '48%',
    marginBottom: 16,
  },

});