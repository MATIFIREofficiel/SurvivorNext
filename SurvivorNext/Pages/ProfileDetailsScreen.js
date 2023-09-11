import { Text, View, StyleSheet, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Infos from '../Components/Infos';

export default function ProfileDetailScreen({ navigation, route }) {

  const { access_token } = route.params[0];
  console.log(`id = ${route.params[1]}`);
  const [infos, setinfos] = useState([]);

  const getUserInfo = async () => {
    const url = `https://masurao.fr/api/employees/${route.params[1]}`;
    const headers = {
      'accept': 'application/json',
      'X-Group-Authorization': 'AhSyHQjIpPhIvfI5OU8HHe9nyhPKwY-q',
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
            uri: `https://masurao.fr/api/employees/${infos.id}/image`,
            method: 'GET',
            headers: {
              accept: 'application/json',
              'X-Group-Authorization': 'AhSyHQjIpPhIvfI5OU8HHe9nyhPKwY-q',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzQsImVtYWlsIjoib2xpdmVyLmxld2lzQG1hc3VyYW8uanAiLCJuYW1lIjoiT2xpdmVyIiwic3VybmFtZSI6Ikxld2lzIiwiZXhwIjoxNjk1NzI2MzMwfQ.kfZoJqTF7H6Wg1egKTyA8W3r-pucZvkmvBAP0v_Fb6k',
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