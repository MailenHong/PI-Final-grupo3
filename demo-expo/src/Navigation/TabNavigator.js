import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Home from '../Screens/Home'
import Posteo from '../Screens/Posteo'
import Perfil from '../Screens/Perfil'
import Navegacion from './Navegacion';
const Tab = createBottomTabNavigator()

export default function TabNavigator() {
    return (
        <Tab.Navigator screenOptions={{ tabBarShowLabel: false }}>
            <Tab.Screen
                name="Home"
                component={Navegacion}
                 options={{
                    tabBarIcon: () => <AntDesign name="home" size={24} color="black" />,
                    headerShown: false
                }
                }
                
            />
            <Tab.Screen
                name="Perfil"
                component={Perfil}
                options={{
                    tabBarIcon: () => <FontAwesome5 name="user" size={23} color="black" />,
                    headerShown: false
                }
                }
            />

            <Tab.Screen
                name="Posteo"
                component={Posteo}
                options={{
                    tabBarIcon: () => <Ionicons name="add-circle-outline" size={29} color="black" />,
                    headerShown: false
                }
                }
            />

        </Tab.Navigator>
    )
}

//crear posteo y perfil