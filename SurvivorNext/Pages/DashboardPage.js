import { StyleSheet, View, FlatList, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import React from 'react'
import BottomSheet from '@gorhom/bottom-sheet';
import { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import WeatherWidget from '../Components/WeatherWidget';
import CurrencyConverter from '../Components/DeviseConvertWidget.js';
import JokePage from '../Components/JokeWidget.js';
import { Ionicons } from '@expo/vector-icons';
import CountdownTimer from '../Components/CountdownTimer';


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
};

export default function DashboardPage() {

  const [isModalVisible, setModalVisible] = useState(false);
  const bottomSheetRef = useRef(null);
  const [userWidgets, setUserWidgets] = useState([]);
  const snapPoints = useMemo(() => ['35%', '80%'], []);
  const [widgets, setWidgets] = useState([WeatherWidget, CurrencyConverter, JokePage, CountdownTimer]);


  const handleIndicatorPress = useCallback(() => {
    console.log('handleIndicatorPress');
    bottomSheetRef.current.close();
  }, []);


  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);

  const renderItem = useCallback(({ item }) => {
    const Widget = item;

    let widgetToRender;

    if (Widget.name === "WeatherWidget") {
      widgetToRender = <Widget city={Widget.city} />;
    } else if (Widget.name === "CurrencyConverter") {
      widgetToRender = <CurrencyConverter />;
    } else if (Widget.name === "CountdownTimer") {
      widgetToRender = <CountdownTimer minutes={5} running={false}/>;
    } else {
      widgetToRender = <Widget />;
    }

    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity onPress={() => { setUserWidgets((prevUserWidgets) => [...prevUserWidgets, Widget]); }}>
          {
            widgetToRender
          }
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

  const renderWidgetDashboard = (widget) => {
    if (widget.name === "WeatherWidget") {
      return <UserWeatherWidget item={widget} />;
    }
    if (widget.name === "CountdownTimer") {
      return <CountdownTimer minutes={5} running={false}/>;
    }
    return <RenderItemScroll item={widget} />;
  };

  return (
    <View style={styles.container}>
      <View style={styles.SizeScrollView} >
        <ScrollView contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false} >
          {userWidgets.map((item, index) => (
            <View style={styles.itemContainerScroll} key={index}>
              {renderWidgetDashboard(item)}
            </View>
          ))}
        </ScrollView>
      </View>

      <TouchableOpacity onPress={handlePresentModalPress} style={styles.button}>
        <Ionicons name="add-circle-outline" size={80} color="#4C96EB" />
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
    backgroundColor: '#E5E7E6',
  },

  SizeScrollView: {
    height: '80%',
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