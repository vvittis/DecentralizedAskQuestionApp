import React from 'react'
import {Container, Navbar} from "react-bootstrap";
import classes from './Navbar.module.css'
function NavigationBar(props) {

    return (
        <Navbar className={classes.nav}>
            <Container fluid>
                <Navbar.Toggle/>
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        Signed in as: 0x0A1de6B8A7E740c49883Ccd3f929A5fD83bA455F
                         {/*{props.account}*/}
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavigationBar;
