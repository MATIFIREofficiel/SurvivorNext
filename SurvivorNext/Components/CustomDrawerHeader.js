import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    ImageBackground,
    Image,
    TouchableOpacity,
} from 'react-native';
import {
    DrawerContentScrollView,
    DrawerItemList,
} from '@react-navigation/drawer';
import * as ImagePicker from 'expo-image-picker';

import { useAppContext } from '../AppContext';

const CustomDrawerHeader = (props) =>
{
    const {
        appColor,
        companyName,
        companyImage,
        Admin,
    } = useAppContext();
    const [localUri, setLocalUri] = useState(require('../assets/logo.png'));


    const handleImageClick = async (takePhoto, destination) => {

        const permissionType = takePhoto
            ? await ImagePicker.requestCameraPermissionsAsync()
            : await ImagePicker.requestMediaLibraryPermissionsAsync();

        const permissionStatus = permissionType.status;

        if (permissionStatus !== 'granted') {
            console.log(`La permission d'accès ${takePhoto ? 'à la caméra' : 'à la galerie d\'images'} a été refusée.`);
            return;
        }

        const launchOptions = {
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [3, 4],
            quality: 1,
        };

        const result = takePhoto
            ? await ImagePicker.launchImageLibraryAsync(launchOptions)
            : await ImagePicker.launchImageLibraryAsync(launchOptions);

        if (!result.cancelled) {
            setLocalUri(result.uri);
        }
    };

    return (
        <View style={{flex: 1}}>
            <DrawerContentScrollView {...props}>
                <Text
                    style={{
                    color: appColor,
                    fontSize: 30,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    padding: 20,
                }}>
                    {companyName}
                </Text>
                { Admin === true ?
                    <TouchableOpacity onPress={handleImageClick}>
                        <Image
                            source={localUri}
                            style={{
                                alignSelf: 'center',
                                height: 100,
                                width: 100,
                                resizeMode: 'center',
                                marginBottom: 10,
                            }}
                        />
                    </TouchableOpacity>
                : <Image
                    source={localUri}
                    style={{
                    alignSelf: 'center',
                    height: 100,
                    width: 100,
                    resizeMode: 'center',
                    marginBottom: 10,
                }}
                />}
                <DrawerItemList {...props}/>
            </DrawerContentScrollView>
        </View>
    );
};

export default CustomDrawerHeader;