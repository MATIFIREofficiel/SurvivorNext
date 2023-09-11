import { Button, View, StyleSheet, Text } from 'react-native';

export default function DeveloppementScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.box}>
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
    box: {
        backgroundColor: '#6F9EEB',
        padding: 20,
        borderRadius: 10,
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});
