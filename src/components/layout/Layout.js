import classes from './Layout.module.css'
import React from 'react'
import {Container, Row, Col} from 'react-bootstrap'
import Button from "react-bootstrap/Button";
import NavigationBar from "./Navbar";
import Banner from "./Banner";

function Layout(props) {
    return (

        <Container fluid >
            <NavigationBar/>
            <Row className={classes.main}>
                <Col md={4} lg={4} > <Banner/> </Col>
                <Col md={8} lg={8}> <Button> Test Button </Button></Col>
            </Row>
        </Container>

    )
}

export default Layout