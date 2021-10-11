import React, {useState} from 'react';

import './App.css';
import Layout from "./layout/Layout";


function App() {
    const [userAccount, setUserAccount] = useState(null);
    return (
        <Layout account = {userAccount} setAccount = {setUserAccount}>
        </Layout>
    )
}

export default App;
