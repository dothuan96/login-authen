import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase';

import { FormLabel, FormInput } from 'react-native-elements'

const config = {
   apiKey: "AIzaSyBoS0ZYQ3QCFSFV74fJz0w_h8uoFH_BuZM",
   authDomain: "snackers-9ff5b.firebaseapp.com",
   databaseURL: "https://snackers-9ff5b.firebaseio.com",
   projectId: "snackers-9ff5b",
   storageBucket: "snackers-9ff5b.appspot.com",
   messagingSenderId: "881940158467"
 };
 firebase.initializeApp(config);

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };
  }

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user !== null) {
        console.log(user)
      }
    })
  }

  signupUser = (email, password) => {
    try {
      if (this.state.password.length <= 6) {
        alert('Please enter at least 6 characters.')
        return;
      }
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(user => {
        alert('Create account successful!')
        console.log(user)
      }, error => {
        alert(error.toString())
        return;
      })
    } catch (e) {
      alert(e.toString())
      return;
    }
  }

  loginUser = (email, password) => {
    try {
      firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => {
        alert(user)
        console.log(user)
      }, error => {
        alert(error.toString())
        return;
      })
    } catch (e) {
      alert(e.toString())
      return;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <FormLabel>Email</FormLabel>
        <FormInput onChangeText={email => this.setState({email})}/>
        <FormLabel>Password</FormLabel>
        <FormInput onChangeText={password => this.setState({password})}/>
        <TouchableOpacity style={styles.button}
          onPress={() => this.loginUser(this.state.email, this.state.password)}>
          <Text style={styles.loginButton}>SIGN IN</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}
          onPress={() => this.signupUser(this.state.email, this.state.password)}>
          <Text style={styles.loginButton}>SIGN UP</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  button: {
    marginTop: 26,
    width: '70%',
    paddingVertical: 14,
    borderRadius: 25,
    backgroundColor: '#ff6262'
  },
  loginButton: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    color: '#fff'
  },
});
