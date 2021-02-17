import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Main from "./components/Main"
import Alarms from "./components/Alarms"
import AddAlarm from "./components/AddAlarm"
import SetTime from "./components/SetTime"


const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name="Main" component={Main} options={{
          headerShown: false
        }} />
        <Stack.Screen name="Alarms" component={Alarms} options={{
          headerStyle: {
            backgroundColor: "#513BFA",
          },
          headerTitleStyle: {
            color: 'white'
          },
        }} />
        <Stack.Screen name="AddAlarm" component={AddAlarm} options={{
          headerStyle: {
            backgroundColor: "#513BFA",
          },
          headerTitleStyle: {
            color: 'white'
          },
        }} />
        <Stack.Screen name="SetTime" component={SetTime} options={{
          headerStyle: {
            backgroundColor: "#513BFA",
          },
          headerTitleStyle: {
            color: 'white'
          },
        }} />
      </Stack.Navigator>

    </NavigationContainer>
  );
}


export default App;