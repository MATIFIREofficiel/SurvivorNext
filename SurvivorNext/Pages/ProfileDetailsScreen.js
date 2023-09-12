import { Text, View, StyleSheet, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Infos from '../Components/Infos';
import {API_URL, API_KEY, AUTH} from '@env';

export default function ProfileDetailScreen({ navigation, route }) {

  const { access_token } = route.params[0];
  console.log(`id = ${route.params[1]}`);
  const [infos, setinfos] = useState([]);

  const getUserInfo = async () => {
    const url = REACT_APP_API_URL + `/${route.params[1]}`;
    const headers = {
      'accept': 'application/json',
      'X-Group-Authorization': REACT_APP_API_KEY,
      'Authorization': 'Bearer ' + access_token
    };

    try {
      const response = await axios.get(url, { headers });
      setinfos(response.data);
    } catch (error) {
      console.log(error.status);
      return [];
    }
  };

  getUserInfo();

  return (
      <View style={styles.container}>
        <Image
          source={{
            uri: REACT_APP_API_URL + `/${infos.id}/image`,
            method: 'GET',
            headers: {
              accept: 'application/json',
              'X-Group-Authorization': REACT_APP_API_KEY,
              Authorization: 'Bearer ' + REACT_APP_AUTH,
            },
          }}
          style={styles.image} />
        <Infos style={styles.infos} infos={infos} />
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    marginTop: 10,
  },
  infos: {
    padding : 10,
  },

  image: {
    width: 200,
    height: 200,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#000',
  },
})