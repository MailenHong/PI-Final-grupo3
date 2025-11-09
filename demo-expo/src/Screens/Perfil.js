import React, { Component } from 'react'
import { Text, View, Pressable, FlatList, StyleSheet} from 'react-native'
import {auth,db} from '../firebase/config'

export default class Perfil extends Component {
  constructor(props){
    super(props)
    this.state = {
      usuario: {},
      misPosteos: [],
      loadingUsuario: true,
      loadingPosteo: true
    }
  }
  componentDidMount(){ 
    console.log(auth.currentUser)
    db.collection('users').where('owner', '==' , auth.currentUser.email).onSnapshot(data => {
      data.forEach(doc => {
        this.setState({usuario: doc.data(), loadingUsuario: false})
      })
    })
    db.collection('posts')
    .where('owner', '==' , auth.currentUser.email).onSnapshot(docs => {
      let posteos = [];
      docs.forEach( doc => {
        posteos.push({
          id: doc.id,
          data: doc.data()
        })
      })
      data.forEach(doc => {
        this.setState({usuario: doc.data(), loadingUsuario: false})
      })
    })
    posteos.sort((a,b)=> b.data.createdAt - a.data.createdAt) 
    console.log(posteos)
    this.setState({
      misPosteos: posteos,
      loadingPosteo: false
    })
    
   
  }
  logout(){
    auth.signOut()
    .then(() => this.props.navigation.navigate('Login'))
  }
  render() {
    if (this.state.loadingUsuario || this.state.loadingPosteo){
      return(
        <View>
          <Text> Cargando... </Text>
        </View>
      )
    }
    return (
      <View>
        <Text> Mi perfil </Text>
        <Text> Email: {this.state.usuario.owner}</Text>
        <Text> Email: {this.state.usuario.username}</Text>
        <Pressable onPress= {() => this.logout()}>
          <Text> Cerrar Sesión </Text>
        </Pressable>
        <Text> Mis posteos: </Text>
        <FlatList
        data= {this.state.misPosteos}
        keyExtractor = {(item) => item.id.toString()}
        renderItem = {({item})=> (
          <View> </View>
        )}
        > 
        

        </FlatList>
      </View>
    )
  }
}

