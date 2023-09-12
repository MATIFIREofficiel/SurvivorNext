import { StyleSheet, View, FlatList, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import BottomSheet from '@gorhom/bottom-sheet';
import { useCallback, useMemo, useRef, useState } from 'react';
import WeatherWidget from '../Components/WeatherWidget';
import { Ionicons } from '@expo/vector-icons';


export default function DashboardPage() {

  const [isModalVisible, setModalVisible] = useState(false);
  const bottomSheetRef = useRef(null);
  const inputRef = useRef('');
  const [isWeatherClicked, setIsWeatherClicked] = useState(false);
  const [userWidgets, setUserWidgets] = useState([]);
  const snapPoints = useMemo(() => ['25%', '50%'], []);
  const [widgets, setWidgets] = useState([WeatherWidget]);
  const [city, setCity] = useState('paris'); // État initial vide

  const openKeyboard = (item) => {
    if (item.name === "WeatherWidget") {
      setIsWeatherClicked(true);
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

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
        {Widget.name === "WeatherWidget" ? <Widget city={"paris"} /> : <Widget />}
        </TouchableOpacity>
      </View>
    );
  }, []);

  const removeWidget = (widgetToRemove) => {
    setUserWidgets((prevUserWidgets) =>
      prevUserWidgets.filter((widget) => widget !== widgetToRemove)
    );
  };


  const renderItemDashboard = ({ item }) => {
    const Widget = item;
    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity onPress={() => openKeyboard(item)}>
          {Widget.name === "WeatherWidget" ? <WeatherWidget city={city}/> : <Widget />}
        </TouchableOpacity>
      </View>
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
    bottomSheetRef.current.snapToIndex(0);
    setModalVisible(true);
  }, []);

  return (
    <View style={styles.container}>
      {
        isModalVisible && <TouchableOpacity style={styles.overlay} onPress={handleCloseBottomSheet} />
      }
      <TextInput ref={inputRef} onBlur={() => setIsWeatherClicked(false)}
        onChangeText={(text) => setCity(text)}
        onSubmitEditing={submitFunction}
        value={city}
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, display: isWeatherClicked ? 'flex' : 'none' }} />

      <FlatList
        style={{ zIndex: -1 }}
        data={userWidgets}
        refreshing={true}
        renderItem={renderItemDashboard}
        numColumns={2}
        keyExtractor={(item, index) => index}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
      />

      <TouchableOpacity onPress={handlePresentModalPress} style={styles.button}>
        <Ionicons name="add-circle-outline" size={60} color="#4C96EB" />
      </TouchableOpacity>
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        // onChange={handleSheetChanges}
        detached={true}
        enablePanDownToClose={true}
        // handleIndicatorPress={handleIndicatorPress}
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
    backgroundColor: '#E5E7E6',
  },

  itemContainer: {
    width: '50%',
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
});