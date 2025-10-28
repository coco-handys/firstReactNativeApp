import React from 'react';
import { useFonts } from 'expo-font';
import { ActivityIndicator } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {TodoProvider} from '@contexts/TodoContext';

import TabViewScreen from '@components/TabVIewScreen';

export type RootStackParamList = {
  Home: undefined;
  Completed: undefined;
}

const Stack = createNativeStackNavigator();

export default function App() {

  const [fontsLoaded] = useFonts({
    PretendardRegular: require('@assets/fonts/Pretendard-Regular.otf'),
    PretendardBold: require('@assets/fonts/Pretendard-Bold.otf'),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator style={{ flex: 1 }} />;
  }

  return (
     <TodoProvider>
       <NavigationContainer>
         <Stack.Navigator
           id={undefined}
           screenOptions={{
             headerStyle: {backgroundColor:'#788cabff'},
             headerTintColor: 'white',
            headerTitleStyle: {fontWeight: 'bold'},
           }}
         >
          <Stack.Screen
          name="MainTabs"
          component={TabViewScreen}
          options={{ title: 'Tidy' }}
        />
         </Stack.Navigator>
       </NavigationContainer>
     </TodoProvider>
  );
}
