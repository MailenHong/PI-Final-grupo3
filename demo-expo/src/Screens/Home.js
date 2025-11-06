import React, { Component } from 'react';
import { Text, View, FlatList, Pressable, ActivityIndicator, Alert } from 'react-native';
import { auth, db, firebase } from '../firebase/config';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { posteos: [], loading: true };
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user == null) {
        this.props.navigation.navigate('Login');
      } else {
        this.escucharPosteos();
      }
    });
  }

  escucharPosteos() {
    const consulta = db.collection('posts').orderBy('createdAt', 'desc');
    consulta.onSnapshot(
      (docs) => {
        let posts = [];
        docs.forEach((doc) => posts.push({ id: doc.id, data: doc.data() }));
        this.setState({ posteos: posts, loading: false });
      },
      (error) => {
        Alert.alert('Error al cargar posteos', error.message);
        this.setState({ loading: false });
      }
    );
  }

  tocarLike = (item) => {
    const datos = item.data;
    const correo = auth.currentUser?.email || '';
    const likes = Array.isArray(datos.likes) ? datos.likes : [];
    const yaLeGusta = likes.includes(correo);

    if (!correo) return;
    yaLeGusta ? this.quitarLike(item) : this.darLike(item);
  };

  tocarComentar = (item) => {
    this.props.navigation.navigate('Comentario', { postId: item.id });
  };

  darLike(post) {
    const correo = auth.currentUser?.email;
    if (correo == null) return;

    db.collection('posts')
      .doc(post.id)
      .update({ likes: firebase.firestore.FieldValue.arrayUnion(correo) })
      .then(() => console.log('Likeado'))
      .catch((error) => console.log('Error al dar like:', error));
  }

  quitarLike(post) {
    const correo = auth.currentUser.email;

    db.collection('posts')
      .doc(post.id)
      .update({ likes: firebase.firestore.FieldValue.arrayRemove(correo) })
      .then(() => console.log('Dislikeado'))
      .catch((error) => console.log('Error al quitar like:', error));
  }

  render() {
    if (this.state.loading) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View>
        <Text>Home</Text>

        <FlatList
          data={this.state.posteos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const datos = item.data;
            const likes = Array.isArray(datos.likes) ? datos.likes : [];
            const correo = auth.currentUser?.email || '';
            const yaLeGusta = likes.includes(correo);

            return (
              <View>
                <Text>
                  @{datos.authorUsername ? datos.authorUsername : datos.authorEmail}
                </Text>
                <Text>{datos.text}</Text>

                <Pressable onPress={() => this.tocarLike(item)}>
                  <Text>{yaLeGusta ? 'Quitar me gusta' : 'Me gusta'} ({likes.length || 0})</Text>
                </Pressable>

                <Pressable onPress={() => this.tocarComentar(item)}>
                  <Text>Comentar</Text>
                </Pressable>
              </View>
            );
          }}
        />
      </View>
    );
  }
}
