import {Button ,Form} from "react-bootstrap";
import React from "react";

const Register = () => {
    return (
        <>
            <Form>
                <h5>Create Account</h5>
                <div className="form-group">
                    <div className="Input-box">
                        <label htmlFor="email">First Name</label>
                        <input type="text"
                               id="firstname"
                               required={true}
                               className="form-control"
                               placeholder="Your First Name"/>
                    </div>
                </div>

                <div className="form-group">
                    <div className="Input-box">
                        <label htmlFor="email">Last Name</label>
                        <input type="text"
                               id="lastname"
                               required={true}
                               className="form-control"
                               placeholder="Your Last Name"/>
                    </div>
                </div>


                <div className="form-group">
                    <div className="Input-box">
                        <label htmlFor="email">Email</label>
                        <input type="email"
                               id="email"
                               required={true}
                               className="form-control"
                               placeholder="Your Email"/>
                    </div>
                </div>

                <div className="form-group">
                    <div className="Input-box">
                        <label htmlFor="email">Password</label>
                        <input type="password"
                               id="password"
                               required={true}
                               className="form-control"
                               placeholder="Your Password"/>
                    </div>
                </div>

                <div className="form-group button">
                    <Button className="btn btn-md btn-primary" type="submit">Create</Button>
                </div>

            </Form>

        </>
    )
}
export default Register
