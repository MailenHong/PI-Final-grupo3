import React, { Component } from 'react'
import { Pressable, Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native'
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
    if(!email.includes('@')){
      this.setState({error: 'El email no es válido'})
      return
    }
    if(password.length<6){
      this.setState({error: 'La contraseña debe tener al menos 6 caracteres'})
      return
    }
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
        <TextInput 
        style = {styles.input}
        placeholder = 'email'
        onChangeText = {(texto)=> this.setState({email: texto})} 
        value= {this.state.email}>
        </TextInput>

        <TextInput 
        style = {styles.input}
        placeholder = 'contraseña' 
        onChangeText = {(texto)=> this.setState({password: texto})} 
        value= {this.state.password}>
        </TextInput>
        <Pressable
         style = {styles.boton} 
         onPress = {() => this.onSubmit(this.state.email,this.state.password)}>
         <Text> Login </Text></Pressable>
        {this.state.error !== '' ? <Text>{this.state.error}</Text> : undefined }
        
        <Pressable 
        style = {styles.boton} 
        onPress ={()=> this.props.navigation.navigate('Register')}>
        <Text>No tenes cuenta, registrate.</Text></Pressable>
      </View>
    )
  }
}



const styles = StyleSheet.create({
  container: {
    width: '92%',
    maxWidth: 740,
    alignSelf: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingVertical: 24,
    paddingHorizontal: 16,
    marginVertical: 20,
    alignItems: 'stretch',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
    color: '#1E1E1E',
  },
  boton: {
    backgroundColor: '#1E5AA7',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 10,
    alignItems: 'center',
    marginTop: 12,
  },
  field: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
    padding: 12,
    marginVertical: 10,
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
    padding: 12,
    marginVertical: 10,
    fontSize: 16,
  },
})
