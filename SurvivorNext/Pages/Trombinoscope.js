import { View, Text, TouchableOpacity, Image, FlatList, StyleSheet, useWindowDimensions, TextInput } from "react-native";
import axios from "axios";
import React, { useState, useEffect, route } from 'react';

function Item({ item, onPress, access_token}) {

  return (
    <TouchableOpacity onPress={onPress} style={styles.item}>
      <Image
        source={{
          uri: process.env.REACT_APP_API_URL + `/${item.id}/image`,
          method: 'GET',
          headers: {
            accept: 'application/json',
            'X-Group-Authorization': process.env.REACT_APP_API_KEY,
            'Authorization': 'Bearer ' + access_token,
          },
        }}
        style={styles.image} />
      <Text style={styles.text}> {item.name} {item.surname} </Text>
    </TouchableOpacity>
  );
}

export default function TrombinoscopeScreen({ navigation, route }) {

  const [dataSearch, setDataSearch] = useState([])
  const [infos, setInfos] = useState([]);
  const [search, setSearch] = useState('');
  const {access_token} = route.params;

  const getListEmployeesID = async () => {
    const url = process.env.REACT_APP_API_URL;
    const headers = {
      'accept': 'application/json',
      'X-Group-Authorization': process.env.REACT_APP_API_KEY,
      'Authorization': 'Bearer ' + access_token.access_token.toString(),
    };
    try {
      const response = await axios.get(url, { headers });
      setInfos(response.data);
      setDataSearch(response.data);
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
        access_token={access_token.access_token.toString()}
        item={item}
        onPress={() =>
          navigation.navigate('ProfileDetail', [access_token, item.id])}
      />
    );
  };

  const filterEmployee = (text) => {
    setSearch(text);
    setDataSearch(infos.filter(employee =>
      employee.name.toString().toLowerCase().includes(text.toLowerCase()) ||
      employee.surname.toString().toLowerCase().includes(text.toLowerCase()) ||
      text.length === 0))
  };

  return (
    <View style={styles.homePage}>
      <TextInput style={styles.searchText}
        placeholder="Search by name or username"
        value={search}
        onChangeText={filterEmployee}
        defaultValue=''/>
      <FlatList
        refreshing={true}
        data={dataSearch}
        renderItem={renderItem}
        numColumns={3}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  homePage: {
    flex: 1,
    alignItems: 'center',
  },
  searchText: {
    backgroundColor: 'lightgray',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginHorizontal: 10,
    marginVertical: 10
  },
  item: {
    alignItems: 'center',
  },
  text: {
    width: 100,
    textAlign: 'center',
    marginBottom: 8
  },
  image: {
    borderRadius: 40,
    width: 100,
    height: 100,
    marginRight: 10,
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 2,
  },
});
