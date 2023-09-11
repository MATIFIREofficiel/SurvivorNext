import { Button, StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import BottomSheet from '@gorhom/bottom-sheet';
import { useCallback, useMemo, useRef, useState } from 'react';
import WeatherWidget from '../Components/WeatherWidget';


export default function DashboardPage() {

  const [isModalVisible, setModalVisible] = useState(false);
  // ref
  const bottomSheetRef = useRef(null);

  const handleIndicatorPress = useCallback(() => {
    console.log('handleIndicatorPress');
    // Fermez la modal lorsque vous cliquez en dehors d'elle
    bottomSheetRef.current.close();
  }, []);

  const [widgets, setWidgets] = useState([WeatherWidget, WeatherWidget, WeatherWidget, WeatherWidget, WeatherWidget, WeatherWidget, WeatherWidget, WeatherWidget]);
  // variables
  const snapPoints = useMemo(() => ['25%', '50%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);

  const renderItem = useCallback(({ item }) => {
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

  // renders
  return (
    <View style={styles.container}>
      {
        isModalVisible && <TouchableOpacity style={styles.overlay} onPress={handleCloseBottomSheet} />
      }
      <Button
        title='+'
        onPress={handlePresentModalPress}>
      </Button>
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
    padding: 14,
  },
  overlay: {
    flex: 1,
    backgroundColor: '#E5E7E6', // Overlay semi-transparent
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});