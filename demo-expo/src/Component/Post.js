import React, { Component } from 'react';
import { Text, View, FlatList, Pressable, ActivityIndicator, Alert, StyleSheet, } from 'react-native';
import { auth, db } from '../firebase/config';
import firebase from 'firebase';

export default class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posteos: [],
            loading: true,
            yaLeGusta: false
        };
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

    tocarComentar(id) {
        console.log('id del comenatario desde post.js', id)
        this.props.navigation.navigate('Comentario', { postId: id });
    };

    render() {
        return (
            <View style={styles.datosRecuperados}>
                <Text>Hola</Text>
                <Text style={styles.owner}>@{this.props.data.owner}</Text>
                <Text style={styles.posteo}>{this.props.data.posteo}</Text>

                <Pressable onPress={() => this.tocarLike({id: this.props.id, data: this.props.data})}>
                    <Text style={styles.irA}>
                        {this.state.yaLeGusta ? 'Quitar me gusta' : 'Me gusta'} ({this.props.data.likes.length || 0})
                    </Text>
                </Pressable>

                <Pressable onPress={() => this.tocarComentar(this.props.id)}>
                    <Text style={styles.irA}>Comentar</Text>
                </Pressable>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    lista: {
        paddingBottom: 24,
    },
    datosRecuperados: {
        flex: 1,
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
