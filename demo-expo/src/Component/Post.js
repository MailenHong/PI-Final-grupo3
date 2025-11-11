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

    componentDidMount() {
        if (this.props.data.likes.includes(auth.currentUser.email)) {
            this.setState({ yaLeGusta: true })
        }
    }

    tocarLike(item) {
        const correo = auth.currentUser.email;

        const datos = item.data;
        const likes = datos.likes;
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
            .then(() => {
                console.log('Likeado')
                this.setState({ yaLeGusta: true })
            })

            .catch((error) => console.log('Error al dar like:', error));
    }

    quitarLike(post, correo) {
        db.collection('posts')
            .doc(post.id)
            .update({
                likes: firebase.firestore.FieldValue.arrayRemove(correo),
            })
            .then(() => {
                console.log('Dislikeado')
                this.setState({ yaLeGusta: false })
            })
            .catch((error) => console.log('Error al quitar like:', error));
    }

    tocarComentar(id) {
        console.log('id del comenatario desde post.js', id)
        this.props.navigation.navigate('Comentario', { postId: id });
    };

    render() {
        return (
            <View style={styles.datosRecuperados}>

                <Text style={styles.owner}>{this.props.data.owner}</Text>
                <Text style={styles.posteo}>{this.props.data.posteo}</Text>

                <Pressable onPress={() => this.tocarLike({ id: this.props.id, data: this.props.data })}>
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
    datosRecuperados: {
        flex: 1,
        width: '100%',
        marginVertical: 6,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderColor: '#e0e0e0',
        backgroundColor: '#ffffff',
        borderRadius: 18,
        alignSelf: 'center',
    },
    owner: {
        fontSize: 15,
        color: '#E97140',
        fontWeight: '700',
        marginBottom: 6,
    },
    posteo: {
        fontSize: 17,
        color: '#222',
        marginBottom: 10,
    },
    irA: {
        fontSize: 15,
        fontWeight: '600',
        color: '#ED8E63',
        marginTop: 6,
    },
});
