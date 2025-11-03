import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Comentario from "../Screens/Comentario";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import AntDesign from '@expo/vector-icons/AntDesign';
import TabNavigator from './TabNavigator';

const Tab = createBottomTabNavigator()

export default function Navegacion() {
    return (
        <Tab.Navigator screenOptions={{ tabBarShowLabel: false }}>
            <Tab.Screen
                name="TabNavigator"
                component={TabNavigator}
                options={{
                    headerShown: false
                }
                }
            />

            <Tab.Screen
                name="Comentario"
                component={Comentario}
                options={{
                    tabBarIcon: () =>  <AntDesign name="comment" size={24} color="black" />,
                    headerShown: false
                }}
            />

        </Tab.Navigator>
    )
}