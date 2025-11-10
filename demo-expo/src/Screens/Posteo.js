import React, { Component } from 'react'
import { Text, View, Pressable, StyleSheet, TextInput } from 'react-native'
import { db, auth } from '../firebase/config'


export default class NuevoPost extends Component {
    constructor(props) {
        super(props)
        this.state = {
            posteo: '',
            likes: '',
        }
    }

    submit() {
        return db.collection('posts').add({
            owner: auth.currentUser.email,
            createdAt: new Date(),
            posteo: this.state.posteo,
            likes: this.state.likes, 
            comentarios: []
        })

            .then((item) => { this.setState({ posteo: '' }), this.props.navigation.navigate('Comentario', { postId: item.id });
        })

            .catch(err => console.log(err));
    }

    render() {
        return (
            <View style={styles.contenedor}>
                <Text style={styles.titulo}>Sube tu posteo</Text>
                <TextInput
                    style={styles.input}
                    keyboardType='default'
                    placeholder='Escriba su post'
                    onChangeText={(text) => this.setState({ posteo: text })}
                    value={this.state.posteo} />
                <Pressable onPress={() => this.submit(this.state.posteo)}>
                    <Text style={styles.irA}> Enviar Posteo </Text>
                </Pressable>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        marginVertical: 10,
        paddingVertical: 12,
        paddingHorizontal: 14,
        fontSize: 16,
        borderRadius: 10,
        width: '40%',
        backgroundColor: '#a9b8b24d',

    },
    titulo: {
        fontSize: 30,
        fontWeight: '600',
        margin: 10,
    },
    irA: {
        fontSize: 20,
        fontWeight: '600',
        margin: 10,
        alignItems: 'flex-start',
    },
    contenedor: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 24,
    }

})