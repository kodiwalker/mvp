import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, TextInput, StyleSheet } from 'react-native';
import axios from "axios";
import { AppContext } from "../../Context";
import iso6391 from 'iso-639-1';
import { AntDesign } from '@expo/vector-icons';


export default function Translate() {
  const { homeLang, awayLang } = useContext(AppContext);
  const [inputs, setInputs] = useState({
    home: '',
    away: ''
  });

  const handleHomeChange = text => {
    setInputs({
      ...inputs,
      home: text
    })
  }

  const handleAwayChange = text => {
    setInputs({
      ...inputs,
      away: text
    })
  }

  const handleHomeTranslate = async () => {
    setInputs({
      ...inputs,
      away: 'Translating...'
    })
    try {
      const translated = await axios.post('http://192.168.1.73:3000/translate', { text: inputs.home, target: awayLang }, { timeout: 3000 })

      setInputs({
        ...inputs,
        away: translated.data
      })
    } catch (e) {
      setInputs({
        home: inputs.home,
        away: inputs.away
      })
    }
  }

  const handleAwayTranslate = async () => {
    setInputs({
      ...inputs,
      home: 'Translating...'
    })
    try {
      const translated = await axios.post('http://192.168.1.73:3000/translate', { text: inputs.away, target: homeLang }, { timeout: 3000 })

      setInputs({
        ...inputs,
        home: translated.data
      })
    } catch (e) {
      setInputs({
        ...inputs,
        home: 'Failed to translate. Please check your submission and try again.'
      })
    }
  }


  return (
    <>
      <Text style={styles.heading}>Language</Text>

      <View style={styles.homeField}>
        <AntDesign name="back" size={28} style={{ color: be, transform: [{ rotate: '-90deg' }] }} />

        <View style={styles.inputContainer}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: be, marginBottom: 5 }}>{iso6391.getName(homeLang)}</Text>

          <TextInput style={styles.input} maxLength={300} multiline={true} onSubmitEditing={handleHomeTranslate} returnKeyType='done' blurOnSubmit={true} value={inputs.home} onChangeText={handleHomeChange}></TextInput>
        </View>
      </View>


      <View style={styles.awayField}>
        <View style={styles.inputContainer}>
          <TextInput style={styles.input} maxLength={300} multiline={true} onSubmitEditing={handleAwayTranslate} returnKeyType='done' blurOnSubmit={true} value={inputs.away} onChangeText={handleAwayChange} autoCorrect={false}></TextInput>

          <Text style={{ fontSize: 16, fontWeight: 'bold', color: be, marginTop: 5 }}>{iso6391.getName(awayLang)}</Text>
        </View>

        <AntDesign name="back" size={28} style={{ color: be, transform: [{ rotate: '90deg' }] }} />
      </View>

    </>
  )
}

const bl = '#2A9D8F';
const db = '#264653';
const be = '#F4F1DE';
const or = '#E76F51';

const styles = StyleSheet.create({
  heading: {
    color: be,
    fontSize: 28,
    fontWeight: 200,
    letterSpacing: 10,
    paddingLeft: 10,
    paddingTop: 5
  },
  inputContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    backgroundColor: be,
    color: bl,
    width: 300,
    height: 54,
    borderRadius: 8,
    fontSize: 18
  },
  homeField: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  awayField: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingBottom: 5
  }
});