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
      })
      .catch(err => console.log(err));



  }

  componentDidMount() {
    const postId = this.props.route.params.postId;

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
        {postRecuperado ? 
          <View style={styles.datosRecuperados}>
            <Text style={styles.dataUsuario}>
            {postRecuperado.data.owner} posteó hoy a las {postRecuperado.data.createdAt}
            </Text>
            <Text style={styles.dataPosteo}>{postRecuperado.data.posteo}</Text>
          </View> 
         : 
          <Text>Cargando post...</Text>
        }

        {postRecuperado ? 
          <FlatList
            data={postRecuperado.data.comentarios}
            keyExtractor={(item) => item.createdAt + item.owner}
            renderItem={({ item }) => (
              <View style={styles.datosRecuperados}>
                <Text style={styles.dataUsuario}>{item.owner}</Text>
                <Text style={styles.dataPosteo}>{item.comentario}</Text>
              </View>
            )} />
         : 
          <Text>Cargando post...</Text>
        }
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
  dataUsuario: {
    fontSize: 17, 
    color: 'gray' 
  },
  dataPosteo: {
    fontSize: 18,
  },
  titulo: {
    fontSize: 30,
    fontWeight: '700',
    margin: 10,
    color: '#333',
    paddingBottom: 3
  },
  input: {
    borderWidth: 1,
    paddingTop: 12,
    paddingBottom: 12,
    paddingHorizontal: 14,
    fontSize: 16,
    borderRadius: 10,
    width: '35%',
    backgroundColor: '#a9b8b24d'   
  },
  contenedor: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 40,
  },
  irA: {
    fontSize: 20,
    fontWeight: '600',
    margin: 10,
    color: '#333',
    paddingBottom: 300
  },
  datosRecuperados: {
    margin: 10,
  }
})