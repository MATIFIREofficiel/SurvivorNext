import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import BottomSheet from '@gorhom/bottom-sheet';
import { useCallback, useMemo, useRef, useState } from 'react';
import WeatherWidget from '../Components/WeatherWidget';
import { Ionicons } from '@expo/vector-icons';


export default function DashboardPage() {

  const [isModalVisible, setModalVisible] = useState(false);
  const bottomSheetRef = useRef(null);

  const handleIndicatorPress = useCallback(() => {
    console.log('handleIndicatorPress');
    bottomSheetRef.current.close();
  }, []);

  const [widgets, setWidgets] = useState([WeatherWidget, WeatherWidget, WeatherWidget, WeatherWidget, WeatherWidget, WeatherWidget, WeatherWidget, WeatherWidget]);

  const [userWidgets, setUserWidgets] = useState([]);

  const snapPoints = useMemo(() => ['25%', '50%'], []);

  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);

  const renderItem = useCallback(({ item }) => {
    const Widget = item;
    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity onPress={() => { setUserWidgets((prevUserWidgets) => [...prevUserWidgets, Widget]); }}>
          <Widget />
        </TouchableOpacity>
      </View>
    );
  }, []);

  const renderItemDashboard = useCallback(({ item }) => {
    const Widget = item;
    return (
      <View style={styles.itemContainer}>
          <Widget />
      </View>
    );
  }, []);

  const handleCloseBottomSheet = useCallback(() => {
    bottomSheetRef.current.close();
    setModalVisible(false);
  }, []);


  const handlePresentModalPress = useCallback(() => {
    bottomSheetRef.current.snapToIndex(0);
    setModalVisible(true);
  }, []);

    console.log(userWidgets);
  return (
    <View style={styles.container}>
      {
        isModalVisible && <TouchableOpacity style={styles.overlay} onPress={handleCloseBottomSheet} />
      }

      <FlatList
        data={userWidgets}
        refreshing={true}
        renderItem={renderItemDashboard}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
      />

      <TouchableOpacity onPress={handlePresentModalPress} style={styles.button}>
        <Ionicons name="add-circle-outline" size={60} color="#4C96EB" />
      </TouchableOpacity>
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        detached={true}
        enablePanDownToClose={true}
        handleIndicatorPress={handleIndicatorPress}
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