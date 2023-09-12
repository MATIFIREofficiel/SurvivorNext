import { View, Text, TouchableOpacity, Image, FlatList, StyleSheet, useWindowDimensions, TextInput } from "react-native";
import axios from "axios";
import React, { useState, useEffect, route } from 'react';
import {API_URL, API_KEY, AUTH} from '@env';

function Item({ item, onPress}) {

  return (
    <TouchableOpacity onPress={onPress} style={styles.item}>
      <Image
        source={{
          uri: API_URL + `/${item.id}/image`,
          method: 'GET',
          headers: {
            accept: 'application/json',
            'X-Group-Authorization': API_KEY,
            Authorization: 'Bearer ' + AUTH,
          },
        }}
        style={styles.image} />
    <Text style={styles.text}> {item.name} {item.surname} </Text>
    </TouchableOpacity>
  );
}

export default function TrombinoscopeScreen({ navigation, route }) {

  const [infos, setinfos] = useState([]);
  const {access_token} = route.params;

  const getListEmployeesID = async () => {

    const url = API_URL;
    const headers = {
      'accept': 'application/json',
      'X-Group-Authorization': API_KEY,
      'Authorization': 'Bearer ' + AUTH,
    };

    try {
      const response = await axios.get(url, { headers });
      setinfos(response.data);
    } catch (error) {
      console.log(error.accept);
      return [];
    }
  };

  useEffect(() => {
    getListEmployeesID();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <Item
        item={item}
        onPress={() =>
          navigation.navigate('ProfileDetail', [access_token, item.id])}
      />
    );
  };

  return (
    <View style={styles.homePage}>
      <FlatList
        refreshing={true}
        data={infos}
        renderItem={renderItem}
        numColumns={3}
        extraData={infos}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  homePage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  item: {
    alignItems: 'center',
  },
  text: {
    width: 100,
    textAlign: 'center'
  },
  image: {
    borderRadius: 40,
    width: 100,
    height: 100,
    margin: 10
  },
});
