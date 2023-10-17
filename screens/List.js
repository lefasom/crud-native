import React, { useState, useEffect } from 'react';
import { TextInput, ScrollView, StyleSheet, View, Text, FlatList, Pressable } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import { db } from '../database/firebase.js';
import { collection, deleteDoc, getDoc, getDocs, addDoc, doc } from "firebase/firestore";
import Icon from 'react-native-vector-icons/FontAwesome';

export default function List(props) {

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
    console.log(search)

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
        <Pressable
          onPress={() => props.navigation.navigate("Create")}
          style={styles.button}
        >
          <Text
            style={styles.text2}

          >Crear nuevo</Text>
        </Pressable>
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
                        <Pressable style={styles.button}
                          onPress={() => props.navigation.navigate('Edit', {
                            ID: val.id
                          })}
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
            :
            <View>
              {
                registrosf.map(val => {
                  return (
                    <ScrollView key={val.id} contentContainerStyle={styles.row}>
                      <Text style={styles.textProducto}>{val.producto}</Text>
                      <Text style={styles.textPrecio}>$ {val.precio}</Text>
                      <View style={styles.buttonContainer}>
                        <Pressable style={styles.button}>
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
    backgroundColor: '#fff',

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
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    backgroundColor: '#fff',
    color: '#999',
    fontSize: 20,

  },
  button: {
    backgroundColor: 'blue',

  },
  button2: {
    backgroundColor: '#fff',

  },
  button3: {
    backgroundColor: 'blue',
  },
  text2: {
    padding: 10,
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
  },
  scroll: {
    paddingBottom: 230,
  },
  flex: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
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
    padding: 10,
  }
});


