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
      <View>
        <TextInput 
        style = {styles.input}
        placeholder = 'email' onChangeText = {(texto)=> this.setState({email: texto})} value= {this.state.email}></TextInput>
        <TextInput 
        style= {styles.input}
        placeholder = 'contraseña' onChangeText = {(texto)=> this.setState({password: texto})} value= {this.state.password}></TextInput>
        <TextInput 
        style = {styles.input}
        placeholder = 'usuario' onChangeText = {(texto)=> this.setState({username: texto})} value= {this.state.username}></TextInput>
        <Pressable 
        style = {styles.boton}
        onPress = {() => this.onSubmit(this.state.email,this.state.password, this.state.username)}> <Text> Register </Text></Pressable>
        {this.state.error !== '' ? <Text>{this.state.error}</Text> : undefined }
        <Pressable
        style = {styles.boton} 
        onPress ={()=> this.props.navigation.navigate('Login')}><Text> Inciar sesión </Text></Pressable>
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
