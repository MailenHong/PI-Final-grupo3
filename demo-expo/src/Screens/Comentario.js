import React, { Component } from 'react'
import { Text, View, Pressable, StyleSheet, TextInput, FlatList } from 'react-native'
import { db, auth } from '../firebase/config'


export default class Comentario extends Component {
  constructor(props) {
    super(props)
    this.state = {
      postsRecuperados: [],
      commentsRecuperados: [],
      comentario: ''
    }
  }

  submit() {
    return db.collection('comments').add({
      owner: auth.currentUser.email,
      createdAt: Date.now(),
      comentario: this.state.comentario,
    })

      .then(() => this.props.navigation.navigate('Navegacion', { screen: 'Comentario' }))

      .catch(err => console.log(err));
  }

  componentDidMount() {
    db.collection('posts').onSnapshot(docs => {
      let postsDocs = []
      docs.forEach(doc => {
        postsDocs.push({
          id: doc.id,
          data: doc.data()
        })
      })
      this.setState({ postsRecuperados: postsDocs })
      console.log(postsDocs) // para ver si llegan los datos
    })
    db.collection('comments').onSnapshot(docs => {
      let commentsDocs = []
      docs.forEach(doc => {
        commentsDocs.push({
          id: doc.id,
          data: doc.data()
        })
      })
      this.setState({ commentsRecuperados: commentsDocs })
      console.log(commentsDocs) // para ver si llegan los datos
    })
  }
  render() {
    return (
      <View style={styles.contenedor}>
        <Text style={styles.titulo}> Comentarios </Text>
        <FlatList
          data={this.state.postsRecuperados}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.datosRecuperados}>
              <Text style={{ fontSize: 17, color: 'gray' }}>{item.data.username} posteo hoy a las {item.data.createdAt}hs</Text>
              <Text style={{ fontSize: 18 }}>{item.data.posteo}</Text>
            </View>
          )} />
        <FlatList
          data={this.state.commentsRecuperados}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.datosRecuperados}>
              <Text style={{ fontSize: 17, color: 'gray' }}>{item.data.username}</Text>
              <Text style={{ fontSize: 18 }}>{item.data.comentario}</Text>
            </View>
          )} />

        <TextInput
          style={styles.input}
          keyboardType='default'
          placeholder='Comenta aqui tu post...'
          onChangeText={(text) => this.setState({ comentario: text })}
          value={this.state.comentario} />
        <Pressable onPress={() => this.submit(this.state.comentario)}>
          <Text style={styles.irA}> Publicar comentario </Text>
        </Pressable>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  titulo: {
    fontSize: 30,
    fontWeight: '600',
    margin: 10,
  },
  input: {
    borderWidth: 1,
    marginVertical: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    fontSize: 16,
    borderRadius: 10,
    width: '50%',
    backgroundColor: '#ece2e2ff',

  },
  contenedor: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 24,
  },
  irA: {
    fontSize: 20,
    fontWeight: '600',
    margin: 10,
  },
  datosRecuperados: {
    margin: 10,
    fontSize: 16,
  }
})