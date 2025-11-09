import React, { Component } from 'react';
import { Text, View, FlatList, Pressable, ActivityIndicator, Alert, StyleSheet,} from 'react-native';
import { auth, db } from '../firebase/config';
import firebase from 'firebase';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posteos: [],
      loading: true,
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        this.props.navigation.navigate('Login');
      } else {
        this.escucharPosteos();
      }
    });
  }

  escucharPosteos() {
    db.collection('posts')
      .orderBy('createdAt', 'desc')
      .onSnapshot(
        (docs) => {
          let posts = [];
          docs.forEach((doc) =>
            posts.push({
              id: doc.id,
              data: doc.data(),
            })
          );
          this.setState({ posteos: posts, loading: false });
        },
        (error) => {
          Alert.alert('Error al cargar posteos', error.message);
          this.setState({ loading: false });
        }
      );
  }

  tocarLike = (item) => {
    const correo = auth.currentUser?.email;
    if (!correo) return;

    const datos = item.data;
    const likes = Array.isArray(datos.likes) ? datos.likes : [];
    const yaLeGusta = likes.includes(correo);

    console.log('Like clickeado. Ya le gusta?', yaLeGusta);

    if (yaLeGusta) {
      this.quitarLike(item, correo);
    } else {
      this.darLike(item, correo);
    }
  };

  darLike(post, correo) {
    db.collection('posts')
      .doc(post.id)
      .update({
        likes: firebase.firestore.FieldValue.arrayUnion(correo),
      })
      .then(() => console.log('Likeado'))
      .catch((error) => console.log('Error al dar like:', error));
  }

  quitarLike(post, correo) {
    db.collection('posts')
      .doc(post.id)
      .update({
        likes: firebase.firestore.FieldValue.arrayRemove(correo),
      })
      .then(() => console.log('Dislikeado'))
      .catch((error) => console.log('Error al quitar like:', error));
  }

  tocarComentar = (item) => {
    this.props.navigation.navigate('Comentario', { postId: item.id });
  };

  render() {
    const { posteos, loading } = this.state;

    if (loading) {
      return (
        <View style={styles.center}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={styles.contenedor}>
        <Text style={styles.titulo}>Home</Text>

        <FlatList
          data={posteos}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.lista}
          renderItem={({ item }) => {
            const datos = item.data;
            const likes = Array.isArray(datos.likes) ? datos.likes : [];
            const correo = auth.currentUser?.email || '';
            const yaLeGusta = likes.includes(correo);

            return (
              <View style={styles.datosRecuperados}>
                <Text style={styles.owner}>@{datos.owner}</Text>
                <Text style={styles.posteo}>{datos.posteo}</Text>

                <Pressable onPress={() => this.tocarLike(item)}>
                  <Text style={styles.irA}>
                    {yaLeGusta ? 'Quitar me gusta' : 'Me gusta'} ({likes.length || 0})
                  </Text>
                </Pressable>

                <Pressable onPress={() => this.tocarComentar(item)}>
                  <Text style={styles.irA}>Comentar</Text>
                </Pressable>
              </View>
            );
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    paddingTop: 24,
  },
  titulo: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 10,
    color: '#222',
  },
  lista: {
    paddingBottom: 24,
  },
  datosRecuperados: {
    width: '100%',
    marginVertical: 6,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: '#fff',
  },
  owner: {
    fontSize: 15,
    color: '#555',
    fontWeight: '500',
    marginBottom: 4,
  },
  posteo: {
    fontSize: 17,
    color: '#222',
    marginBottom: 10,
  },
  irA: {
    fontSize: 15,
    fontWeight: '600',
    color: '#007bff',
    marginTop: 4,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
