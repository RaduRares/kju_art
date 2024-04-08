import React, { useEffect, useState } from "react";
import './App.css';
import Header from "./Header";
import Home from "./Home";
import Checkout from "./Checkout"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Pusher from 'pusher-js';
import axios from "./axios";
import Footer  from "./Footer";
import SignUp from './SignUp';

function App() {
  const [messages , setMessages]=useState([]);

useEffect(()=>{
axios.get("/produse/sync").then((response)=>{
  setMessages(response.data);
  });
},[]);

  useEffect(() =>{
    const pusher = new Pusher('201af38afbea08fac47a', {
      cluster: 'eu'   ,
    });

    const channel = pusher.subscribe('produse');
    channel.bind('inserted', (data) => {
      alert(JSON.stringify(data));
    });
  },[]);


console.log(messages);
  useEffect(()=>{
   const pusher = new Pusher('201af38afbea08fac47a', {
      cluster: 'eu'
    });

    const channel = pusher.subscribe('produse');
    channel.bind('inserted', function(data) {
      alert(JSON.stringify(data));
    });

  },[]);
  return (
    <Router>
      <div className="app">
      
        <Routes>
        <Route path="/login" element=
         { <Login/>
       
  }/>
    <Route path="/register" element=
         { <SignUp/>
       
  }/>
          <Route path="/checkout" element=
          {<>
            <Header/>
          <Checkout/>
          </>
        } />    
          <Route path="/" element={
            
          <>
            <Header/>
          <Home/>
          <Footer/>
          </>
          
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
