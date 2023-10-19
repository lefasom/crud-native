import React, { useState, useEffect } from 'react';
import { TextInput, ScrollView, StyleSheet, View, Text, FlatList, Pressable } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import { db } from '../../../database/firebase.js';
import { collection, deleteDoc, getDoc, getDocs, addDoc, doc } from "firebase/firestore";
import { Link, router } from 'expo-router';
export default function Crear(props) {

    const collectionName = 'crud-native-firebase';
    const [registros, setRegistros] = useState([]);
    const initialState = {
        producto: '',
        precio: '',
    }
    const [state, setState] = useState(initialState)
    const handleChange = (name, value) => {
        setState({ ...state, [name]: value })
    }
    const getLinks = async () => {
        const querySnapshot = await getDocs(collection(db, collectionName));
        const docs = [];

        querySnapshot.forEach((doc) => {
            const data = { ...doc.data(), id: doc.id };
            docs.push(data);
        });
        setRegistros(docs);
    };
    const saveNewUser = async () => {
        await addDoc(collection(db, collectionName), state);
        setState(initialState)
        router.replace('/');
    }
    const onDeleteLink = async (id) => {
        await deleteDoc(doc(db, collectionName, id))
    };


    useEffect(() => {
        getLinks();
    });

    return (
        <View>
            <Link style={styles.link} href="/">
                <Text style={styles.text2}>Atras</Text>
            </Link>
            <View style={styles.container}>
                <View>
                    <TextInput
                        style={styles.input}
                        placeholder='Producto'
                        onChangeText={(value) => handleChange('producto', value)}
                    />
                </View>
                <View>
                    <TextInput
                        style={styles.input}
                        placeholder='Precio'
                        onChangeText={(value) => handleChange('precio', value)}
                    />
                </View>
                <View>

                    <Pressable
                        style={styles.button}
                        onPress={() => saveNewUser()}
                    >
                        <Text style={styles.text2}>Crear</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        padding: 16,
        paddingTop: 30
    },

    input: {
        padding: 5,
        marginBottom: 5,
        borderWidth: 1,
        borderColor: '#cccccc',
        fontSize: 20,
        marginTop: 5,
        placeholderTextColor: '#bbbb',
    },
    button: {
        backgroundColor: 'blue',
        padding: 5,
    },
    text2: {
        padding: 3,
        color: '#fff',
        fontSize: 20,
        textAlign: 'center',
    },
    scroll: {
        paddingBottom: 190,
    },
    link: {
        padding: 5,
        backgroundColor: 'blue',
        width: 62,
        margin: 10,
    }

});

