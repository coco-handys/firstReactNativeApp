import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {TodoProvider} from './contexts/TodoContext';
import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';

export type RootStackParamList = {
  Home: undefined;
  Settings: undefined;
}

const Stack = createNativeStackNavigator()

export default function App() {
  return (
     <TodoProvider>
       <NavigationContainer>
         <Stack.Navigator
           id={undefined}
           initialRouteName={'Home'}
           screenOptions={{
             headerStyle: {backgroundColor:'dodgerblue'},
             headerTintColor: 'white',
              headerTitleStyle: {fontWeight: 'bold'},
           }}
         >
           <Stack.Screen name={'Home'} component={HomeScreen} options={{ title: '나만의 할 일 리스트 📝' }}/>
            <Stack.Screen name={'Settings'} component={SettingsScreen} options={{ title: '설정'}} />
         </Stack.Navigator>
       </NavigationContainer>
     </TodoProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
