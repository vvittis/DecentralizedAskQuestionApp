import React, {Component, useEffect, useState} from 'react';
import {Route, Switch} from 'react-router-dom';
import Web3 from 'web3';
import './App.css';
import Layout from "./layout/Layout";
import Button from 'react-bootstrap/Button'

function App() {

    const [userAccount, setUserAccount] = useState(null);



    return (

        <Layout account = {userAccount} setAccount = {setUserAccount}>

        </Layout>

    )

}

export default App;
