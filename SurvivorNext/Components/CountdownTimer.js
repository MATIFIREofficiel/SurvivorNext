import CountDown from 'react-native-countdown-component';
import { View, StyleSheet, TouchableOpacity, Text, Button, Modal, TextInput } from 'react-native';
import { useState, useMemo } from 'react';

export default function CountdownTimer(props) {
  props.seconds ? props.seconds : 0;
  props.minutes ? props.minutes : 0;
  props.hours ? props.hours : 0;
  props.days ? props.days : 0;
  props.message ? props.message : "Time's up!";

  const [isRunning, setIsRunning] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);


  const handleTimerPress = () => {
    setIsModalVisible(!isModalVisible);
    setIsRunning(false);
  };

  let timeRemaining = useMemo(() => {
    const seconds = props.seconds || 0;
    const minutes = props.minutes || 0;
    const hours = props.hours || 0;
    const days = props.days || 0;
    return seconds + minutes * 60 + hours * 3600 + days * 86400;
  }, [seconds, minutes, hours]);
  const [myId, setId] = useState(0);


  const submitTimer = () => {
    setIsModalVisible(!isModalVisible);
    timeRemaining = parseInt(seconds) + parseInt(minutes) * 60 + parseInt(hours) * 3600;
    setId(myId + 1);
  };

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={handleTimerPress}
        >

          <CountDown
            id={myId}
            until={timeRemaining}
            onFinish={() => alert(props.message)}
            // onPress={() => alert('hello')}
            size={18}
            timeToShow={['H', 'M', 'S']}
            digitStyle={{ backgroundColor: '#6F9EEB' }}
            digitTxtStyle={{ color: 'white' }}
            timeLabelStyle={{ color: '#6F9EEB', fontWeight: 'bold' }}
            running={isRunning}
          />
        </TouchableOpacity>
        <Button
          title="Start/Stop"
          onPress={() => setIsRunning(!isRunning)} />
        <TouchableOpacity onPress={() => {
          setIsRunning(false);
          setId(myId + 1);
        }
        }>
          <Text>Reset</Text>
        </TouchableOpacity>
      </View>
      <View >
        <Modal
          animationType="slide"
          visible={isModalVisible}
          transparent={true}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setIsRunning(!isRunning);
          }}
        >
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View style={styles.modalContainer}>
              <Text>Hello World!</Text>
              <Button title="Hide modal" onPress={handleTimerPress} />
              <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                <TextInput
                  keyboardType={'numeric'}
                  onChangeText={text => setHours(text)}
                  value={hours}
                  style={[styles.textInput]}
                />
                <TextInput keyboardType={'numeric'}
                  onChangeText={text => setMinutes(text)}
                  value={minutes}
                  style={[styles.textInput]}
                > </TextInput>
                <TextInput keyboardType={'numeric'}
                  onChangeText={text => setSeconds(text)}
                  value={seconds}
                  style={styles.textInput}

                > </TextInput>
              </View>
              <View style={{ alignItems: 'center ', justifyContent: 'space-between', flexDirection: 'row' }}>
                <Text style={styles.text}>hours</Text>
                <Text style={styles.text}>minutes</Text>
                <Text style={styles.text}>seconds</Text>
              </View>
              <Button title="Set Timer" onPress={submitTimer} />
            </View>
          </View>
        </Modal>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 10,
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6F9EEB',
    margin: 20,
  },
  textInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 10,
    height: 50,
    width: 50,
    margin: 30,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6F9EEB',
    textAlign: 'center',
  },
});
