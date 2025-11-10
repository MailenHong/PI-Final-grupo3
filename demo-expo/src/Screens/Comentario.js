import React, { Component } from 'react'
import { Text, View, Pressable, StyleSheet, TextInput, FlatList } from 'react-native'
import { db, auth } from '../firebase/config'
import firebase from 'firebase'


export default class Comentario extends Component {
  constructor(props) {
    super(props)
    this.state = {
      postRecuperado: null,
      commentsRecuperados: [],
      comentario: ''
    };
  }

  submit() {
    const { postId } = this.props.route.params;


    db.collection('posts').doc(postId).update({
      comentarios: firebase.firestore.FieldValue.arrayUnion({
        createdAt: new Date(),
        owner: auth.currentUser.email,
        comentario: this.state.comentario
      })

    })
      .then(() => {
        this.setState({ comentario: '' });
        // this.props.navigation.navigate('Comentario', { postId });
      })
      .catch(err => console.log(err));



  }

  componentDidMount() {
    const { postId } = this.props.route.params;

    console.log('post id desde componentDidMount', postId)

    db.collection('posts')
      .doc(postId)
      .onSnapshot(doc => {
        this.setState({
          postRecuperado: {
            id: doc.id,
            data: doc.data()
          }
        }, () => console.log(this.state.postRecuperado))
      })

  }

  render() {
    const { postRecuperado } = this.state;
    return (
      <View style={styles.contenedor}>
        <Text style={styles.titulo}> Comentarios </Text>
        {postRecuperado ? (
          <View style={styles.datosRecuperados}>
            <Text style={{ fontSize: 17, color: 'gray' }}>
              {postRecuperado.data.owner} posteó hoy a las ...
            </Text>
            <Text style={{ fontSize: 18 }}>{postRecuperado.data.posteo}</Text>
          </View>
        ) : (
          <Text>Cargando post...</Text>
        )}

        {postRecuperado ? (
          <FlatList
            data={postRecuperado.data.comentarios}
            keyExtractor={(item) => item.createdAt + item.owner}
            renderItem={({ item }) => (
              <View style={styles.datosRecuperados}>
                <Text style={{ fontSize: 17, color: 'gray' }}>{item.owner}</Text>
                <Text style={{ fontSize: 18 }}>{item.comentario}</Text>
              </View>
            )} />
        ) : (
          <Text>Cargando post...</Text>
        )}




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