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
      <View style={styles.contenedor}>
        <Text style = {styles.titulo}>Logueate</Text>
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
         <Text style={styles.irA}> Login </Text></Pressable>
        {this.state.error !== '' ? <Text>{this.state.error}</Text> : undefined }
        
        <Pressable 
        style = {styles.boton} 
        onPress ={()=> this.props.navigation.navigate('Register')}>
        <Text style={styles.irA}>No tenes cuenta, registrate.</Text>
        </Pressable>
      </View>
    )
  }
}



const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 40,
  },
  irA: {
    fontSize: 17,
    fontWeight: '600',
    color: '#333',
  },
  titulo: {
    fontSize: 30,
    fontWeight: '700',
    margin: 10,
    color: '#333',
    paddingBottom: 3
  },
  boton: {
    backgroundColor: '#ef9f7a6e',
    width: '20%',
    borderWidth: 1,
    alignItems: 'center',
    marginTop: 16, 
    backgroundColor: '#f0dfd7ff', 
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 24,
    borderRadius: 20,  
    marginTop: 24
  },
  
  input: {
    width: '20%',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#fff',
    padding: 12,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 16,
  },
})
