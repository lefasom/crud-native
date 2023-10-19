import React, { useEffect, useState } from 'react'
import { Text, StyleSheet, View, TextInput, Pressable, ScrollView, ActivityIndicator } from 'react-native'

import { db, uploadFile } from '../../../../database/firebase.js';
import { collection, deleteDoc, getDoc, getDocs, addDoc, doc, setDoc } from "firebase/firestore";
import { useSearchParams } from 'expo-router';
import { Link } from 'expo-router';
function Edit(props) {

  const { id } = useSearchParams()
  const collectionName = 'crud-native-firebase'

  const getUsuariosById = async (id) => {
    const usuario = await getDoc(doc(db, collectionName, id));
    const user = usuario.data()
    setState({ ...user, id })
    setLoading(false)

  }

  useEffect(() => {
    getUsuariosById(id)
  }, [])

  const initialState = {
    producto: '',
    precio: '',
  }
  const [state, setState] = useState(initialState)
  const [loading, setLoading] = useState(true)
  const handleChange = (name, value) => {
    setState({ ...state, [name]: value })
  }

  const Update = async (id) => {
    await setDoc(doc(db, collectionName, id), {
      producto: state.producto,
      precio: state.precio,
    })
  };
  return (
    <ScrollView style={styles.container}>

      <Link style={styles.link} href="/">
        <Text
          style={styles.text2}
        >Atras</Text>
      </Link>
      <View style={styles.inputGroup}>
        <TextInput
          style={styles.input}
          placeholder='Producto'
          value={state.producto}
          onChangeText={(value) => handleChange('producto', value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          style={styles.input}
          placeholder='Precio'
          value={state.precio}
          onChangeText={(value) => handleChange('precio', value)}
        />
      </View>
      <View>
        <Pressable
          onPress={() => Update(state.id)}
          style={styles.button}
        >
          <Text
            style={styles.text2}
          >Guardar</Text>
        </Pressable>
      </View>
    </ScrollView>

  )


}
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    padding: 10,
    paddingTop: 10
  },

  input: {
    padding: 5,
    marginBottom:5,
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
   margin: 'auto',
  },
  scroll: {
    paddingBottom: 190,
  },
  link:{
    padding: 5,
    backgroundColor: 'blue',
    width: 62,
  }
});

export default Edit