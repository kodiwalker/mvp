import React, { useContext, useState } from 'react';
import { View, Text, Keyboard, StyleSheet, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import { AppContext } from "../Context";
import RNPickerSelect from 'react-native-picker-select';

export default function SettingsScreen() {
  const { setHomeTZ, setAwayTZ, setHomeCurrency, setAwayCurrency, setHomeLang, setAwayLang, countryData, setAwayCountry, setHomeCountry } = useContext(AppContext);

  const [homeCountryCode, setHomeCountryCode] = useState('US');
  const [homeTimezone, setHomeTimezone] = useState('America/Denver');

  const [awayCountryCode, setAwayCountryCode] = useState('MX');
  const [awayTimezone, setAwayTimezone] = useState('America/Cancun');

  if (!countryData) {
    return <Text>Loading...</Text>
  }

  const countryItems = Object.keys(countryData).map(key => ({
    label: countryData[key].name,
    value: key,
  })).sort((a, b) => a.label.localeCompare(b.label));

  let homeTimezoneItems = [];
  if (homeCountryCode) {
    homeTimezoneItems = countryData[homeCountryCode].timezones.map(tz => ({
      label: tz.name,
      value: tz.name,
    })).sort((a, b) => a.label.localeCompare(b.label));
  }

  let awayTimezoneItems = [];
  if (awayCountryCode) {
    awayTimezoneItems = countryData[awayCountryCode].timezones.map(tz => ({
      label: tz.name,
      value: tz.name,
    })).sort((a, b) => a.label.localeCompare(b.label));
  }


  const handleHomeCountryCodeChange = (value) => {
    setHomeCountryCode(value);
    setHomeCountry(countryData[value].name);
    setHomeLang(countryData[value].language);
    setHomeCurrency(countryData[value].currency);
  }

  const handleHomeTimezoneChange = (value) => {
    setHomeTimezone(value);
    setHomeTZ(value);
  }

  const handleAwayCountryCodeChange = (value) => {
    setAwayCountryCode(value);
    setAwayCountry(countryData[value].name);
    setAwayLang(countryData[value].language);
    setAwayCurrency(countryData[value].currency);
  }

  const handleAwayTimezoneChange = (value) => {
    setAwayTimezone(value);
    setAwayTZ(value);
  }

  return (
    <KeyboardAvoidingView style={styles.outer} behavior="position">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>

          <View style={styles.settingsCard}>
            <Text style={styles.settingsText}>Settings</Text>
          </View>

          <View style={styles.homeCard}>
            <Text style={styles.heading}>Home</Text>

            <Text style={{ color: be, fontWeight: 'bold', alignSelf: 'flex-start', paddingLeft: 25 }}>Country</Text>
            <RNPickerSelect
              style={{ inputIOS: styles.picker }}
              items={countryItems}
              onValueChange={handleHomeCountryCodeChange}
              value={homeCountryCode}
              placeholder={{}}
            />

            <Text style={{ color: be, fontWeight: 'bold', alignSelf: 'flex-start', paddingLeft: 25 }}>Timezone</Text>
            <RNPickerSelect
              style={{ inputIOS: styles.picker }}
              items={homeTimezoneItems}
              onValueChange={handleHomeTimezoneChange}
              value={homeTimezone}
              disabled={!homeCountryCode}
              placeholder={{}}
            />
          </View>

          <View style={styles.awayCard}>
            <Text style={styles.heading}>Away</Text>

            <Text style={{ color: be, fontWeight: 'bold', alignSelf: 'flex-start', paddingLeft: 25 }}>Country</Text>
            <RNPickerSelect
              style={{ inputIOS: styles.picker }}
              items={countryItems}
              onValueChange={handleAwayCountryCodeChange}
              value={awayCountryCode}
              placeholder={{}}
            />

            <Text style={{ color: be, fontWeight: 'bold', alignSelf: 'flex-start', paddingLeft: 25 }}>Timezone</Text>
            <RNPickerSelect
              style={{ inputIOS: styles.picker }}
              items={awayTimezoneItems}
              onValueChange={handleAwayTimezoneChange}
              value={awayTimezone}
              disabled={!awayCountryCode}
              placeholder={{}}
            />
          </View>

          <View style={styles.accountCard}>
            <Text style={styles.heading}>Account</Text>
          </View>

        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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
  outer: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: be,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 45
  },
  container: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: be,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 40
  },
  settingsCard: {
    backgroundColor: be,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsText: {
    color: db,
    fontSize: 36
  },
  homeCard: {
    backgroundColor: db,
    width: 360,
    height: 170,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.31,
    shadowRadius: 12,
  },
  awayCard: {
    backgroundColor: db,
    width: 360,
    height: 170,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.31,
    shadowRadius: 12,
  },
  accountCard: {
    backgroundColor: db,
    width: 360,
    height: 160,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.31,
    shadowRadius: 12,
  },
  text: {
    color: be,
  },
  picker: {
    textAlign: 'center',
    fontSize: 28,
    backgroundColor: be,
    width: '85%',
    borderRadius: 8,
    alignSelf: 'center'
  }
});