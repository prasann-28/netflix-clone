import React, { useState, useEffect }from 'react';
import HomeScreen from './screens/HomeScreen'
import ProfileScreen from './screens/ProfileScreen'
import LoginScreen from './screens/LoginScreen'
import { BrowserRouter as Router,
        Routes,
        Route } from "react-router-dom";
import './App.css';
import { auth } from './fbase';
import {useDispatch, useSelector } from 'react-redux'
import {login,logout, selectUser} from './features/userSlice'


function App() {
  
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() =>{
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if(userAuth){
        //Logged in
        // console.log(userAuth)
        dispatch(login({
          uid: userAuth.uid,
          email: userAuth.email,

        }))
      }else{
        //Logged out
        dispatch(logout())
      }
    })
    return unsubscribe; 
    
  },[dispatch])

  return (
    <div className="app">
     
    <Router>
      {!user? (
        <LoginScreen />
      ):(
        <Routes>
        <Route exact path="/profile" element={<ProfileScreen/>} />
        <Route exact path="/" element={<HomeScreen/>} />
      </Routes>
      )}
    </Router>
    </div>
  );
}

export default App;
