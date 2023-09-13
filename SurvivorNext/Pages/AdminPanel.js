import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function AdminPanel()
{
  const [companyName, setCompanyName] = useState("Nom de l'entreprise par défaut");
  const [editing, setEditing] = useState(false);
  const [imageUri, setImageUri] = useState(null);
  const [theme, setTheme] = useState('light');

  const handleSave = () => {
    setEditing(false);
  };

  const handleImageUpload = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        setImageUri(result.uri);
      }
    } catch (error) {
      console.error('Erreur lors de la sélection de l\'image :', error);
    }
  };
  const changeTheme = (newTheme) => {
    setTheme(newTheme);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme === 'dark' ? 'black' : 'white' }]}>
    <TouchableOpacity onPress={handleImageUpload} style={styles.imageUploadButton}>
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.image} />
      ) : (
        <Text>Ajouter une photo</Text>
      )}
    </TouchableOpacity>
    <Text style={[styles.companyName, { color: theme === 'dark' ? 'white' : 'black' }]}>{companyName}</Text>
    {editing ? (
      <View>
        <TextInput
          style={styles.input}
          value={companyName}
          onChangeText={(text) => setCompanyName(text)}
        />
        <Button title="Enregistrer" onPress={handleSave} />
      </View>
    ) : (
      <Button title="Modifier le nom de l'entreprise" onPress={() => setEditing(true)} />
    )}

    <View style={styles.themeButtons}>
      <Button title="Thème clair" onPress={() => changeTheme('light')} />
      <Button title="Thème sombre" onPress={() => changeTheme('dark')} />
    </View>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  companyName: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 8,
    marginBottom: 16,
  },
  imageUploadButton: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
});
