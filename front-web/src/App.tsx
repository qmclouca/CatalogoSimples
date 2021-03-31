import React from 'react';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'core/assets/styles/custom.scss';
import './App.scss';
import Routes from './Routes';

const App = () => {
    return (
      <>
      <ToastContainer />
      <Routes />
      </>
    );
}

export default App;