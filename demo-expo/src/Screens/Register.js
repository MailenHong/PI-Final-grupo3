import React, { Component } from 'react'
import { Text, View, TextInput, Pressable, StyleSheet} from 'react-native'
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
      <View style={styles.contenedor}>
        <Text style = {styles.titulo} >Registro</Text>
        <TextInput 
        style = {styles.input}
        placeholder = 'email' onChangeText = {(texto)=> this.setState({email: texto})} value= {this.state.email}></TextInput>
        <TextInput 
        style= {styles.input}
        placeholder = 'contraseña' secureTextEntry={true} onChangeText = {(texto)=> this.setState({password: texto})} value= {this.state.password}></TextInput>
        <TextInput 
        style = {styles.input}
        placeholder = 'usuario' onChangeText = {(texto)=> this.setState({username: texto})} value= {this.state.username}></TextInput>
        <Pressable 
        style = {styles.boton}
        onPress = {() => this.onSubmit(this.state.email,this.state.password, this.state.username)}> <Text style={styles.irA}> Register </Text></Pressable>
        {this.state.error !== '' ? <Text>{this.state.error}</Text> : undefined }
        <Pressable
        style = {styles.boton} 
        onPress ={()=> this.props.navigation.navigate('Login')}><Text style={styles.irA}> Inciar sesión </Text></Pressable>
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
