import React, { useState, useEffect } from 'react';
import { TextInput, ScrollView, StyleSheet, View, Text, FlatList, Pressable } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import { db } from '../../../database/firebase.js';
import { collection, deleteDoc, getDoc, getDocs, addDoc, doc } from "firebase/firestore";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Link } from 'expo-router';
export default function List() {

  const collectionName = 'crud-native-firebase';
  const [registros, setRegistros] = useState([]);
  const [registrosf, setRegistrosf] = useState([]);

  const [search, setSearch] = useState('');

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

  const onDeleteLink = async (id) => {
    await deleteDoc(doc(db, collectionName, id))
  };

  const buscador = () => {
    const producto_search = registros.filter((val) => {
      return (val.producto.toLowerCase().includes(search.toLowerCase()))
    })
    setRegistrosf(producto_search)
  }

  useEffect(() => {
    getLinks();
  });

  return (
    <View>
      <View style={styles.flex}>
        <Link style={styles.link} href="/Create">
          <Text
            style={styles.text2}
          >Crear nuevo</Text>
        </Link>

        <TextInput
          style={styles.input}
          onChangeText={(text) => setSearch(text)}
          onKeyPress={() => buscador()}
          placeholder='Buscador'
        />
      </View>
      <View>
        <View style={styles.head}>
          <Text style={styles.textProducto}>Producto</Text>
          <Text style={styles.textPrecio}>Precio</Text>
          <Text style={styles.textBtn}>o/x</Text>

        </View>
        <ScrollView contentContainerStyle={styles.scroll}>
          {search == '' ?
            <View>
              {
                registros.map(val => {
                  return (
                    <ScrollView key={val.id} contentContainerStyle={styles.row}>
                      <Text style={styles.textProducto}>{val.producto}</Text>
                      <Text style={styles.textPrecio}>$ {val.precio}</Text>
                      <View style={styles.buttonContainer}>
                        <Link style={styles.button} href={`/Edit/${val.id}`}>
                          <Text style={styles.text4}>
                            <Icon name="edit" size={30} color="#fff" />
                          </Text>
                        </Link>


                        <Pressable
                          style={styles.button2}
                          color='#E37399'
                          onPress={() => onDeleteLink(val.id)}
                        >
                          <Text style={styles.text4}>
                            <Icon name="trash" size={30} color="red" />
                          </Text>
                        </Pressable>
                      </View>
                    </ScrollView>
                  )
                })
              }
            </View>
            :
            <View>
              {
                registrosf.map(val => {
                  return (
                    <ScrollView key={val.id} contentContainerStyle={styles.row}>
                      <Text style={styles.textProducto}>{val.producto}</Text>
                      <Text style={styles.textPrecio}>$ {val.precio}</Text>
                      <View style={styles.buttonContainer}>
                        <Pressable style={styles.button}
                        >
                          <Text style={styles.text4}>
                            <Icon name="edit" size={30} color="#fff" />

                          </Text>
                        </Pressable>
                        <Pressable
                          style={styles.button2}
                          color='#E37399'
                          onPress={() => onDeleteLink(val.id)}
                        >
                          <Text style={styles.text4}>
                            <Icon name="trash" size={30} color="red" />
                          </Text>
                        </Pressable>
                      </View>
                    </ScrollView>
                  )
                })
              }
            </View>
          }
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { display: 'flex', padding: 16, paddingTop: 30 },
  head: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    borderBottomWidth: 1,
    borderColor: '#fff',
    paddingBottom: 10,
    paddingTop: 10,
    paddingRightRight: 40,
    backgroundColor: '#eeee',

  },
  text: {
    padding: 10,
    color: '#666',
    fontSize: 20,
    textAlign: 'center',
  },
  row: {
    paddingTop: 5,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    borderBottomWidth: 1,
    borderColor: '#eeee',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  input: {
    padding: 10,
    width: 200,
    borderWidth: 1,
    borderColor: '#cccccc',
    backgroundColor: '#fff',
    color: '#333',
    fontSize: 20,
    placeholderTextColor: '#bbbb',

  },
  button: {
    backgroundColor: 'blue',
   display: 'flex',
  },
  button2: {
    backgroundColor: '#fff',

  },
  button3: {
    backgroundColor: 'blue',
  },
  text2: {
    padding: 5,
    color: '#fff',
    fontSize: 20,
   margin: 'auto'
  },
  scroll: {
    paddingBottom: 230,
  },
  flex: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    height: 56,
  },
  textProducto: {
    width: 180,
    fontSize: 15,
  },
  textPrecio: {
    width: 50,
    fontSize: 15,

  },
  textBtn: {
    flexDirection: 'row',
    width: 50,
    fontSize: 15,
  },
  text4: {
    padding: 5,
  },
  link:{
    padding: 5,
    backgroundColor: 'blue',
  }
});


