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

        <View style={styles.contenedor}>
          <Text style={styles.titulo}> Mi perfil </Text>
          <View style={styles.info} >

            <Text style={styles.infoEmail}> Email: {this.state.usuario.email}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.infoEmail}> Usuario: {this.state.usuario.username}</Text>
          </View>

          <Pressable style={styles.buttonText} onPress={() => this.logout()}>
            <Text style={styles.irA}> Cerrar Sesión </Text>
          </Pressable>

          <Text style={styles.sectionTitle}> Mis posteos: </Text>

          <FlatList
            data={this.state.misPosteos}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              // <View><Text> {item.data?.texto || JSON.stringify(item.data)}</Text> </View>
              <Post data={item.data} id={item.id} navigation={this.props.navigation} />
            )}
          >


          </FlatList>
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
  },
  loading: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  info: { marginTop: 6, alignItems: 'center' },
  infoEmail: {
    fontSize: 16,
    color: '#6A6767',
    marginBottom: 2, 
  },
  infoValue: { fontSize: 16, fontWeight: '500' },

  buttonText: {
    width: '30%',
    alignItems: 'center',
    marginTop: 16, 
    backgroundColor: '#f0dfd7ff', 
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 20,  
    marginTop: 24
  },
  sectionTitle: {
  fontSize: 20,
  fontWeight: '700',
  color: '#333',
  marginTop: 40, // 🔹 espacio extra debajo del botón
  marginBottom: 20,
  textAlign: 'center', // centrado como "Mi perfil"
},

  listContent: { paddingVertical: 8 },
  postCard: {
    width: '90%',
    alignSelf: 'center', padding: 16, borderRadius: 20, borderWidth: 1, borderColor: '#eee', marginBottom: 10
  },
  postText: { fontSize: 15, lineHeight: 20 },
  emptyList: { textAlign: 'center', color: '#999', marginTop: 20 },
  titulo: {
    fontSize: 30,
    fontWeight: '700',
    margin: 10,
  },
});