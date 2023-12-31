import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native';

import ConnectionChecker from './Index.js';
import { LogBox } from 'react-native';
import { AppProvider } from './AppContext';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

export default function App() {
  return (
    <AppProvider>
      <ConnectionChecker />
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
