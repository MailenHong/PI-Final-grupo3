import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Login from '../Screens/Login'
import Register from '../Screens/Register'
import Navegacion from '../Navigation/Navegacion'

const Stack = createNativeStackNavigator()

export default function StackNavigator(){
    return(
        <Stack.Navigator>
             <Stack.Screen
            name='Login'
            component={Login}
            options={{headerShown: false}}
            />
            <Stack.Screen
            name='Register'
            component={Register}
            options={{headerShown: false}}
            />
            <Stack.Screen
            name='Navegacion'
            component={Navegacion}
            options={{headerShown: false}}
            />
        </Stack.Navigator>
    )
}