import React, { Component } from 'react'
import { Text, View, Pressable, FlatList, StyleSheet } from 'react-native'
import Post from '../Component/Post'
import { auth, db } from '../firebase/config'


export default class Perfil extends Component {
  constructor(props) {
    super(props)
    this.state = {
      usuario: {},
      misPosteos: [],
      loadingUsuario: true,
      loadingPosteo: true
    }
  }
  componentDidMount() {
    console.log(auth.currentUser)
    db.collection('users').where('email', '==', auth.currentUser.email)
      .onSnapshot(data => {
        data.forEach(doc => {
          this.setState({
            usuario: doc.data(),
            loadingUsuario: false
          })
        })
        
      })



    db.collection('posts')
      .where('owner', '==', auth.currentUser.email).onSnapshot(
        docs => {
          let posteos = [];
          docs.forEach(doc => {
            posteos.push({
              id: doc.id,
              data: doc.data()
            })
          })
          posteos.sort((a, b) => b.data.createdAt - a.data.createdAt)
          console.log(posteos)
          this.setState({
            misPosteos: posteos,
            loadingPosteo: false
          })

        })



  }
  logout() {
    auth.signOut()
      .then(() => this.props.navigation.navigate('Login'))
  }
  render() {
    return (
      (this.state.loadingUsuario || this.state.loadingPosteo) ?
        <View style={styles.loading}>
          <Text> Cargando... </Text>
        </View> :

        <View style = {styles.container}>
          <Text style = {styles.title}> Mi perfil </Text>
          <View style = {styles.info} >

          <Text style = {styles.infoEmail}> Email: {this.state.usuario.email}</Text>
          </View>
          <View style = {styles.info}>
         <Text style = {styles.infoEmail}> Usuario: {this.state.usuario.username}</Text>
         </View>

          <Pressable style = {styles.button} onPress={() => this.logout()}>
            <Text style = {styles.buttonText}> Cerrar Sesión </Text>
          </Pressable>
          
          <Text style = {styles.sectionTitle}> Mis posteos: </Text>
          
          <FlatList
            data={this.state.misPosteos}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
             // <View><Text> {item.data?.texto || JSON.stringify(item.data)}</Text> </View>
             <Post data = {item.data} id= {item.id} navigation = {this.props.navigation}/>
            )}
          >


          </FlatList>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff', padding: 16 },
  loading: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 8 },
  info: { marginTop: 6 },
  infoEmail: { fontSize: 12, color: '#666' },
  infoValue: { fontSize: 16, fontWeight: '500' },

  button: { marginTop: 12, backgroundColor: '#1f2937', paddingVertical: 12, borderRadius: 12, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: '600' },

  sectionTitle: { marginTop: 16, fontSize: 18, fontWeight: '700' },


  listContent: { paddingVertical: 8 },
  postCard: { padding: 12, borderRadius: 12, borderWidth: 1, borderColor: '#eee', marginBottom: 10 },
  postText: { fontSize: 15, lineHeight: 20 },
  emptyList: { textAlign: 'center', color: '#999', marginTop: 20 },
});