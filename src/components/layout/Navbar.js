import React from 'react'
import {Container, Navbar, Button} from "react-bootstrap";
import classes from './Navbar.module.css'
import Web3 from "web3";
import Identicon from 'identicon.js'
import ImageProfile from "../ui/ImageProfile";

// import Button from '../ui/Button'

function NavigationBar(props) {


    const connectWallet = async (e) => {
        e.preventDefault()
        if (window.ethereum) {
            console.log('ETHEREUM')
            window.web3 = new Web3(window.ethereum);
            await window.ethereum.enable()
            props.setAccount(await window.web3.eth.getAccounts())
            // setAccount(accounts[0])
        }
        if (window.web3) {
            console.log('web3')
            window.web3 = new Web3(window.web3.currentProvider)
            props.setAccount(await window.web3.eth.getAccounts())
        } else {
            window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
            // <button type="button" class="btn btn-primary">Connect with MetaMask</button>
        }
    }


    return (
        <Navbar className={classes.nav}>
            <Container fluid>
                <Navbar.Toggle/>
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        {!props.account ?
                            (<div>
                                    <Button variant="outline-primary" onClick={connectWallet}>Connect with
                                        Metamask
                                    </Button>
                                </div>
                            ) : (
                                <div>
                                    <div variant="outline-primary" className={classes.buttonConnected}>
                                        Signed in
                                        as: {(props.account).toString().substr(0, 6)}...{(props.account).toString().substr(-4, 4)}
                                        <ImageProfile account={props.account.toString()}/>
                                    </div>
                                </div>

                            )}
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavigationBar;
