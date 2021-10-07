import React from 'react'
import {Container, Navbar} from "react-bootstrap";
import classes from './Navbar.module.css'
function NavigationBar(props) {

    return (
        <Navbar className={classes.nav}>
            <Container>
                <Navbar.Toggle/>
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        Signed in as: {props.account}
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavigationBar;
