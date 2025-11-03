import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Navegacion from '../Navigation/Navegacion'
import Posteo from '../Screens/Posteo'
import Perfil from '../Screens/Perfil'

const Tab = createBottomTabNavigator()

export default function TabNavigator() {
    return (
        <Tab.Navigator screenOptions={{ tabBarShowLabel: false }}>
            <Tab.Screen
                name="Navegacion"
                component={Navegacion}
            />
            <Tab.Screen
                name="Perfil"
                component={Perfil}
                options={{
                    tabBarIcon: () => <FontAwesome5 name="home" size={24} color="black" />,
                    headerShown: false
                }
                }
            />

            <Tab.Screen
                name="Posteo"
                component={Posteo}
                options={{
                    tabBarIcon: () => <FontAwesome5 name="home" size={24} color="black" />,
                    headerShown: false
                }
                }
            />

        </Tab.Navigator>
    )
}

//crear posteo y perfil