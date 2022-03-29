import {Button ,Form} from "react-bootstrap";
import React from "react";

const Login = () => {
  return (
      <>
          <Form>
              <h5>Login</h5>
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
                  <p>Forgot Password ?</p>
                  <Button className="btn btn-md btn-primary" type="submit">Login</Button>
              </div>

          </Form>
      </>
  )
}
export default Login
