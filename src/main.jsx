import React from 'react';
import HomeScreen from './screens/HomeScreen'; // آپ کا نیا نیون ڈیزائن
import './global.css'; // اگر آپ کے پاس گلوبل اسٹائلز ہیں

function App() {
  return (
    <div className="App">
      {/* یہاں سے آپ کی پوری Tezro Super App شروع ہوتی ہے */}
      <HomeScreen /> 
    </div>
  );
}

export default App;
