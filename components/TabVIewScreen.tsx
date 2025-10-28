import React, { useState } from 'react';
import {  useWindowDimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { routes } from '../routes';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const TAB_BAR_HEIGHT = 56;

export default function TabViewScreen() {

  const insets = useSafeAreaInsets();
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);

const renderScene = SceneMap(routes.map(route => ({ [route.key]: route.component })).reduce((acc, curr) => ({ ...acc, ...curr }), {}));

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      lazy
      renderTabBar={props => (
        <TabBar
          {...props}
          indicatorStyle={{ 
             backgroundColor: '#788cabff',
            height: 2,
            top: 0,
           }}
          style={{ 
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: TAB_BAR_HEIGHT + insets.bottom,
            backgroundColor: '#fff',
            borderTopWidth: 1,
            borderTopColor: '#e9edf1ff',
            paddingBottom: insets.bottom, // 안전영역
            elevation: 8, // 안드로이드 그림자
           }}
           activeColor="#507ec8ff"
           inactiveColor="#b8b8b8ff"
         
        />
      )}
    />
  );
}
