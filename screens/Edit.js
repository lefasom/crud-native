import React, { useEffect, useState } from 'react'
import { Text, StyleSheet, View, TextInput, Pressable, ScrollView, ActivityIndicator } from 'react-native'

import { db, uploadFile } from '../database/firebase.js'
import { collection, deleteDoc, getDoc, getDocs, addDoc, doc, setDoc } from "firebase/firestore";

function Edit(props) {

  const ID = props.route.params.ID
  const collectionName = 'crud-native-firebase'

  const getUsuariosById = async (id) => {
    const usuario = await getDoc(doc(db, collectionName, id));
    const user = usuario.data()
    setState({ ...user, id })
    setLoading(false)

  }

  useEffect(() => {
    getUsuariosById(ID)
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
    props.navigation.navigate('List')
  };
  if (loading) {
    return (
      <View>
        <ActivityIndicator size='large' color='#9e9e9e' />
      </View>
    )
  }
  return (
    <ScrollView style={styles.container}>
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
    padding: 16,
    paddingTop: 30
  },

  input: {
    padding: 5,
    marginBottom: 2,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    fontSize: 20,
    marginTop: 5,
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
  }

});

export default Edit