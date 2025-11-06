import React, { Component } from 'react'
import { Text, View, TextInput, Pressable} from 'react-native'
import { auth, db } from '../firebase/config'


export default class Register extends Component {
  constructor(props){
    super(props)
    this.state ={
      email: '',
      password: '',
      error: '',
      username: ''
    }
  }

    componentDidMount(){
    auth.onAuthStateChanged(user => {
      if(user != null) {
       this.props.navigation.navigate('Navegacion')
      }
    })
  }
  
  onSubmit(email,password, username){
    auth.createUserWithEmailAndPassword(email,password)
    .then((user)=> {
      if(user){
        db.collection('users').add({
          email: email,
          username: username,    
        })
        .then(this.props.navigation.navigate('Login'))
 
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
        <TextInput placeholder = 'usuario' onChangeText = {(texto)=> this.setState({username: texto})} value= {this.state.username}></TextInput>
        <Pressable onPress = {() => this.onSubmit(this.state.email,this.state.password, this.state.username)}> <Text> Register </Text></Pressable>
        {this.state.error !== '' ? <Text>{this.state.error}</Text> : undefined }
        <Pressable onPress ={()=> this.props.navigation.navigate('Login')}><Text> Inciar sesión </Text></Pressable>
      </View>
    )
  }
}
