import React from 'react';
import 'react-native-gesture-handler';

import TabRoutes from './src/routes/tab.routes';
import { CitiesProvider } from './src/contexts/CitiesContext';

export default function App() {
  return (
    <CitiesProvider>
      <TabRoutes />
    </CitiesProvider>
  )
}