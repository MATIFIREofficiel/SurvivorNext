import { Button, View, StyleSheet, Text } from 'react-native';
import { useAppContext } from '../AppContext';

export default function DeveloppementScreen({ navigation }) {

    const {
        appColor,
    } = useAppContext();

    const dynamicStyles = {
        box: {
            backgroundColor: appColor,
            padding: 20,
            borderRadius: 10,
            borderColor: 'black',
            borderWidth: 2,
        },
    };
    return (
        <View style={styles.container}>
            <View style={dynamicStyles.box}>
            <Text style={styles.text}>Currently under development</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
});
