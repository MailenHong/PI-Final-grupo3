import React, { Component } from 'react'
import { Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { auth } from '../firebase/config'

export default class Login extends Component {
  constructor(props){
    super(props)
    this.state ={
      email: '',
      password: '',
      error: ''
    }
  }

  componentDidMount(){
    auth.onAuthStateChanged(user => {
      if(user != null) {
       this.props.navigation.navigate('Navegacion')
      }
    })
  }

  onSubmit(email,password){
    console.log('Login')
    auth.signInWithEmailAndPassword(email,password)
    .then((user)=> {
      if(user){
       this.props.navigation.navigate('Navegacion')
       console.log('todo ok')
      }
    })
    .catch(e => {
      console.log(e)
      this.setState({error: e.message})
    })
  }

  render() {

    return (
      <View>
        <TextInput placeholder = 'email' onChangeText = {(texto)=> this.setState({email: texto})} value= {this.state.email}></TextInput>
        <TextInput placeholder = 'contraseña' onChangeText = {(texto)=> this.setState({password: texto})} value= {this.state.password}></TextInput>
        <Pressable onPress = {() => this.onSubmit(this.state.email,this.state.password)}> <Text> Login </Text></Pressable>
        {this.state.error !== '' ? <Text>{this.state.error}</Text> : undefined }
        <Pressable onPress ={()=> this.props.navigation.navigate('Register')}><Text>No tenes cuenta, registrate.</Text></Pressable>
      </View>
    )
  }
}
