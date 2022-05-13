import {Container} from "react-bootstrap";
import {Link} from "react-router-dom";

const ErrorPage = () => {

    return(
        <>
            <Container>
                <h4 className="text-center">404 Error Page Design </h4>
                <Link to="/"> Go back Home</Link>
            </Container>
        </>
    )

}
export default ErrorPage