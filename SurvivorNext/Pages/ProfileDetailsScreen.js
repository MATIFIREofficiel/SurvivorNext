import { View, StyleSheet, Image } from 'react-native'
import React, { useState } from 'react'
import axios from 'axios';
import Infos from '../Components/Infos';

export default function ProfileDetailScreen({ navigation, route }) {

  const { access_token } = route.params[0];
  const [infos, setinfos] = useState([]);

  const getUserInfo = async () => {
    const url = process.env.REACT_APP_API_URL + `/${route.params[1]}`;
    const headers = {
      'accept': 'application/json',
      'X-Group-Authorization': process.env.REACT_APP_API_KEY,
      'Authorization': 'Bearer ' + access_token,
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
            uri: process.env.REACT_APP_API_URL + `/${infos.id}/image`,
            method: 'GET',
            headers: {
              accept: 'application/json',
              'X-Group-Authorization': process.env.REACT_APP_API_KEY,
              Authorization: 'Bearer ' + access_token,
            },
          }}
          style={styles.image} />
        <Infos style={styles.infos} infos={infos} access_token={access_token} />
        
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  infos: {
    padding : 10,
  },

  image: {
    width: 200,
    height: 200,
    marginTop: 50,
    marginBottom: 50,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#000',
    alignSelf: 'center'
  },
})