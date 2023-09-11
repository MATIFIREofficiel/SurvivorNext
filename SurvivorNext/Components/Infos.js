import { StyleSheet, Text, View } from 'react-native'
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
      <Text style={styles.name} >{props.infos.name} {props.infos.surname}</Text>
      <Text style={styles.email}>Email: {props.infos.email}</Text>
      <Text style={styles.birth}>Birthdate : {props.infos.birth_date}</Text>
      <Text style={styles.work}>Work : {props.infos.work} </Text>
      <Text style={styles.gender}>Gender : {props.infos.gender}</Text>
      <Subordinates infos={props.infos} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    marginTop: 30,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  email: {
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  birth: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  work: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  gender: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
  },
})

//{"birth_date": "2000-08-13", "email": "oliver.lewis@masurao.jp", "gender": "Male", "id": 74, "name": "Oliver", "subordinates": [], "surname": "Lewis", "work": "Administrative Intern"}