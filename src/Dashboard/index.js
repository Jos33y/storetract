import React from "react";
import AdminNavbar from "../components/AdminNavbar";
import {Container} from "react-bootstrap";

const AdminDashboard = () => {
    return(
        <>
            <AdminNavbar />
            <Container >
                <h3>Admin Dashboard here </h3>
                <h5>Name: Lagbalu Joseph</h5>
                <h5>Email: joseph@email.com</h5>
            </Container>

        </>
    )

}

export default AdminDashboard
