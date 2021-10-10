import classes from './Layout.module.css'
import React from 'react'
import {Container, Row, Col} from 'react-bootstrap'
import Button from "react-bootstrap/Button";
import NavigationBar from "./Navbar";
import Banner from "./Banner";
import PostSection from "../posts/PostSection";


function Layout(props) {
    return (

        <Container fluid className={classes.container} className={"more-pens"}>
            <NavigationBar account = {props.account} setAccount = {props.setAccount}/>
            <Row className={classes.main}>
                <Col lg={4} className={classes.col4}> <Banner/> </Col>
                <Col lg={8} className={classes.col8}> <PostSection  input = {props.account}/> </Col>
            </Row>

            <footer id="sticky-footer" className="flex-shrink-0 py-4 bg-dark text-white-50">
                <div className="container text-center">
                    <small>Copyright &copy; Your Website</small>
                </div>
            </footer>

        </Container>

    )
}

export default Layout