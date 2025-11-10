import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Comentario from "../Screens/Comentario";
import AntDesign from '@expo/vector-icons/AntDesign';
import TabNavigator from './TabNavigator';
import Home from '../Screens/Home';
const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

export default function Navegacion() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="HomeAnidada"
                component={Home}
                options={{
                    headerShown: false
                }
                }
            />

            <Stack.Screen
                name="Comentario"
                component={Comentario}
                options={{
                    headerShown: false
                }}
            />

        </Stack.Navigator>
    )
}