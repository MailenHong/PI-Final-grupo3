import React, { Component } from 'react';
import { Text, View, FlatList, ActivityIndicator, Alert, StyleSheet, } from 'react-native';
import { auth, db } from '../firebase/config';
import firebase from 'firebase';
import Post from '../Component/Post';

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
          console.log('Error al cargar posteos', error.message);
          this.setState({ loading: false });
        }
      );
  }

  render() {
    const posteos = this.state.posteos;
    const loading = this.state.loading;

    console.log(posteos)

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
          renderItem={({ item }) =>
            <Post
              data={item.data}
              id={item.id}
              navigation={this.props.navigation}
            />
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 40,
  },

  titulo: {
    fontSize: 30,
    fontWeight: '700',
    margin: 10,
    color: '#333',
    paddingBottom: 3
  },
  
});
