
// Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();
// Components
import List from "./screens/List";
import Create from "./screens/Create";
import Edit from "./screens/Edit";

const MyStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='List'
        component={List}
        options={{ title: 'Lista' }}
      />
      <Stack.Screen
        name='Create'
        component={Create}
        options={{ title: 'Crear nuevo' }}
      />
      <Stack.Screen 
      name='Edit' 
      component={Edit}
      options={{title:'Editar'}}
      /> 
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  )
}
