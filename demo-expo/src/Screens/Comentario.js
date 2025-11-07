import React, { Component } from 'react'
import { Text, View, Pressable, StyleSheet, TextInput, FlatList } from 'react-native'
import { db, auth } from '../firebase/config'


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
    db.collection('comments').add({
      owner: auth.currentUser.email,
      createdAt: new Date(),
      comentario: this.state.comentario,
      postId: postId,
    })

      .then(() => {
        this.setState({ comentario: '' });
        this.props.navigation.navigate('Comentario', { postId });
      })
      .catch(err => console.log(err));
  }

  componentDidMount() {
    const { postId } = this.props.route.params;

    db.collection('posts')
      .doc(postId)
      .onSnapshot(doc => {
        this.setState({
          postRecuperado: {
            id: doc.id,
            data: doc.data()
          }
        })
      })

    db.collection('comments')
      .where('postId', '==', postId)
      .orderBy('createdAt', 'asc')
      .onSnapshot(docs => {
        let commentsDocs = []
        docs.forEach(doc => {
          commentsDocs.push({
            id: doc.id,
            data: doc.data()
          })
        })
        this.setState({ commentsRecuperados: commentsDocs })
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
        <FlatList
          data={this.state.commentsRecuperados}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.datosRecuperados}>
              <Text style={{ fontSize: 17, color: 'gray' }}>{item.data.owner}</Text>
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