import React from 'react';
import Alert from './Alert';

const App = () => {
    return (
      <div className = "container mt-5">
        <Alert text="Rodolfo"/>
        <Alert text="Bortoluzzi"/>
        <Alert />
      </div>  
    );
}

export default App;