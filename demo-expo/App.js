import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from "./src/Navigation/StackNavigation";

export default function App() {
    return (
      <NavigationContainer>
        <StackNavigator/>
      </NavigationContainer>
    );
}