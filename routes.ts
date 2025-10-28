import HomeScreen from './screens/HomeScreen';
import CompletedScreen from './screens/CompletedScreen';

export const routes = [
  { key: 'home', title: '할일 목록', component: HomeScreen, path: '/' },
  { key: 'completed', title: '완료 항목', component: CompletedScreen, path: '/completed' },
];