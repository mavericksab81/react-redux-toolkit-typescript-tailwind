import React from 'react';
// import { Counter } from './features/counter/Counter';
import './App.css';
import { LoginPage } from './features/login/Login';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from './features/home/Home';
import Navigation from './routes/navigation.component';
import { Provider } from 'react-redux';
import { store } from './app/store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigation />}>
            <Route path='login' element={<LoginPage />}></Route>
            <Route path="home" element={<HomePage />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
    
  );
}

export default App;
