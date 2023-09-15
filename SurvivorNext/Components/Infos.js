import { StyleSheet, Text, View, TouchableOpacity, Linking } from 'react-native'
import React from 'react'

function Subordinates(props) {
  if (props.infos.subordinates) {

    if (props.infos.subordinates.length === 0) {
      return null;
    } else {
      const subordinatesList = props.infos.subordinates.map((subordinate, index) => (
        <Text key={index}>Subordinate {index + 1}: {subordinate.name} {subordinate.surname}</Text>
      ));

      return (
        <View>
          {subordinatesList}
        </View>
      );
    }
  }
}

export default function Infos(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.name} >Name : {props.infos.name}</Text>
      <Text style={styles.name} >Surname : {props.infos.surname}</Text>
      <Text style={styles.birth}>Birthdate : {props.infos.birth_date}</Text>
      <TouchableOpacity onPress={() => Linking.openURL('mailto:' + props.infos.email)}>
        <Text style={styles.email}>Email : {props.infos.email}</Text>
      </TouchableOpacity>
      <Text style={styles.work}>Work : {props.infos.work} </Text>
      <Text style={styles.gender}>Gender : {props.infos.gender}</Text>
      <Subordinates infos={props.infos} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingVertical: 8,
  },
  email: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingVertical: 8,
  },
  birth: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingVertical: 8,
  },
  work: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingVertical: 8,
  },
  gender: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingVertical: 8,
  },
})
