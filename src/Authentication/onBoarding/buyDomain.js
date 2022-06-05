import {Button, Card, Col, Container, Form, Row, Table} from "react-bootstrap";
import React, {useState} from "react";
import Com from "../../assets/images/com.png"
import Online from "../../assets/images/online.png"
import Tech from "../../assets/images/tech.png"
import Spinner from "../../components/Spinner";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

const BuyDomain = () => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState('')
    const [domainChecking, setDomainChecking] = useState(false)
    const [registered, setRegistered] = useState(null);
    const [domainName, setDomainName] = useState('')
    const [price, setPrice] = useState('');
    const [loading, setLoading] = useState(false)

    const onSubmit = async (e)=> {
        setDomainChecking(true)
        setLoading(true)
        e.preventDefault()
        console.log("picked domain name:", formData)

        const slit = formData.split('.');

        console.log(slit, slit.length)
        let domain =  formData;      // domain name you want to check
        let apikey = process.env.REACT_APP_WHO_IS_API_KEY; // your API key
        try {
            await fetch('https://api.whoapi.com/?domain='+domain+'&r=taken&apikey='+apikey).then(response => {
                return response.json();
            }).then( json => {
                // console.log({json})
                setDomainName(domain)

                if(json.taken === 1)
                    setRegistered(true)
                else{
                    setRegistered(false)
                    if(slit.length > 2) {
                        if(slit[2] === 'ng')
                        setPrice('2,000')
                        else setPrice('6,000')
                    }
                    else {
                        if(slit[1] === 'com')
                        setPrice('6,500')
                        else if(slit[1] === 'net')
                            setPrice('9,000')
                        else if(slit[1] === 'org')
                            setPrice('6,800')
                        else if(slit[1] === 'ng')
                            setPrice('6,800')
                        else if(slit[1] === 'tech')
                            setPrice('3,600')
                        else if(slit[1] === 'online')
                            setPrice('2,600')
                        else if(slit[1] === 'africa')
                            setPrice('17,400')
                        else if(slit[1] === 'shop')
                            setPrice('22,300')
                    }
                }
                // console.log(json.taken === 1 ? "Taken" : "Not Taken")
            })
        }
        catch (error) {
            console.log({error})
        }
        setLoading(false)
    }

    const onChange = (e) => {
       setFormData(e.target.value);
    }

    const loadPayment = async () => {

        let paymentDetails = {}
        try {
           paymentDetails = {nameDomain: domainName, domainPrice: price.replace(/[^0-9]/g, "")}
            let paymentSess = JSON.stringify(paymentDetails);
                localStorage.setItem("PaymentDetails", paymentSess)
        }
        catch (error) {
            console.log({error})
        }

        toast.success("Domain selected");
        navigate(`/onboarding/make-payment`);
    }

    return(
        <>
           <div className="buy-domain">
               <Container>
                   <Row className="justify-content-center">
                       <Col lg={10}>
                           <div className="title-section">
                               <h5 className="title">Domain Name Registration for your Business</h5>
                           </div>

                           <Form onSubmit={onSubmit}>
                               <div className="form-group">
                                   <Row>
                                       <Col lg={9}>
                                           <input type="text"
                                                  id="domainName"
                                                  onChange={onChange}
                                                  value={formData}
                                                  required={true}
                                                  maxLength={100}
                                                  className="form-control"
                                                  placeholder="Search for a domain name (e.g yourdomain.com)" />
                                       </Col>

                                       <Col lg={3}>
                                           <Button className="btn btn-md btn-primary" type="submit"> Register Domain </Button>
                                       </Col>
                                   </Row>
                               </div>
                           </Form>

                           <hr/>

                           {domainChecking && (
                           <div className="domain-checked">
                               {loading ? (<Spinner />) :
                               (!registered ? (
                                   <div className="row">
                                       <div className="col-lg-1 col-md-12">
                                           <p> <i className="far fa-check-circle"></i> </p>
                                       </div>
                                       <div className="col-lg-8 col-md-12">
                                           <h5>
                                               <span className="success">Congratulations! <span className="bold"> {domainName}</span>  is available!</span> <br/>
                                               <span className="price"> ₦{price}.00</span>
                                           </h5>
                                       </div>
                                       <div className="col-lg-3 col-md-12">
                                           <Button onClick={loadPayment} className="btn btn-md btn-success-light"> continue to payment</Button>
                                       </div>
                                   </div>
                               ) : (
                                   <div className="row">
                                       <div className="col-lg-1 col-md-12">
                                           <p><i className="far fa-times-circle"></i></p>
                                       </div>
                                       <div className="col-lg-9 col-md-12">
                                           <h5>
                                               <span className="error"><span className="bold"> {domainName}</span>   is unavailable</span>
                                               {/*<br/><span className="price"> ₦1,200.00</span>*/}
                                           </h5>
                                       </div>
                                   </div>

                               ))}
                           </div>

                                   )}


                           <div className="display-card">
                               <Row>
                                   <Col md={4} className="col-6">
                                       <Card className="card">
                                          <div className="card-body">
                                              <img src={Com} alt="" className="img-fluid"/>
                                          </div>
                                           <hr/>
                                               <p>₦6,500.00/year</p>
                                       </Card>
                                   </Col>
                                   <Col md={4} className="col-6">
                                       <Card className="card">
                                           <div className="card-body">
                                               <img src={Online} alt="" className="img-fluid"/>
                                           </div>
                                           <hr/>
                                           <p>₦2,600.00/year</p>
                                       </Card>
                                   </Col>

                                   <Col md={4} className="col-6">
                                       <Card className="card">
                                           <div className="card-body">
                                               <img src={Tech} alt="" className="img-fluid"/>
                                           </div>
                                           <hr/>
                                           <p>₦3,600.00/year</p>
                                       </Card>
                                   </Col>

                               </Row>
                           </div>
                           
                           <div className="browse-extension">
                               <Table className="table">
                                   <thead>
                                   <th>Domain</th>
                                   <th>Price</th>
                                   </thead>
                                   <tbody>
                                   <tr>
                                       <td>.com</td>
                                       <td>
                                           <p className="domain-name">₦6,500.00 </p>
                                           <p className="year">1 Year</p>
                                       </td>
                                   </tr>

                                   <tr>
                                       <td>.org</td>
                                       <td>
                                           <p className="domain-name">₦6,800.00 </p>
                                           <p className="year">1 Year</p>
                                       </td>
                                   </tr>

                                   <tr>
                                       <td>.net</td>
                                       <td>
                                           <p className="domain-name">₦9,000.00 </p>
                                           <p className="year">1 Year</p>
                                       </td>
                                   </tr>

                                   <tr>
                                       <td>.com.ng</td>
                                       <td>
                                           <p className="domain-name">₦2,000.00 </p>
                                           <p className="year">1 Year</p>
                                       </td>
                                   </tr>

                                   <tr>
                                       <td>.ng</td>
                                       <td>
                                           <p className="domain-name">₦6,800.00 </p>
                                           <p className="year">1 Year</p>
                                       </td>
                                   </tr>

                                   <tr>
                                       <td>.tech</td>
                                       <td>
                                           <p className="domain-name">₦3,600.00 </p>
                                           <p className="year">1 Year</p>
                                       </td>
                                   </tr>

                                   <tr>
                                       <td>.online</td>
                                       <td>
                                           <p className="domain-name">₦2,600.00 </p>
                                           <p className="year">1 Year</p>
                                       </td>
                                   </tr>

                                   <tr>
                                       <td>.africa</td>
                                       <td>
                                           <p className="domain-name">₦17,400.00 </p>
                                           <p className="year">1 Year</p>
                                       </td>
                                   </tr>

                                   <tr>
                                       <td>.shop</td>
                                       <td>
                                           <p className="domain-name">₦22,300.00 </p>
                                           <p className="year">1 Year</p>
                                       </td>
                                   </tr>

                                   </tbody>
                                   
                               </Table>
                           </div>
                       </Col>
                   </Row>

               </Container>
           </div>
        </>
    )
}

export default BuyDomain