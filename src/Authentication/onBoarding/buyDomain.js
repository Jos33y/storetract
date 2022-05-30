import {Button, Card, Col, Container, Form, Row, Table} from "react-bootstrap";
import React, {useState} from "react";
import Com from "../../assets/images/com.png"
import Online from "../../assets/images/online.png"
import Tech from "../../assets/images/tech.png"
import Spinner from "../../components/Spinner";

const BuyDomain = () => {

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
        let domain     =  formData;      // domain name you want to check
        let apikey     = "85cd507c4e1dd0538d603c8653c5173c";         // your API key
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
                        if(slit[2] === 'net')
                        setPrice('1,200')
                        else setPrice('6,000')
                    }
                    else {
                        if(slit[1] === 'com')
                        setPrice('6,700')
                        else if(slit[1] === 'net')
                            setPrice('9,200')
                        else if(slit[1] === 'org')
                            setPrice('7,000')
                        else if(slit[1] === 'shop')
                            setPrice('22,000')
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
                                       <div className="col-lg-9 col-md-12">
                                           <h5>
                                               <span className="success">Congratulations! <span className="bold"> {domainName}</span>  is available!</span> <br/>
                                               <span className="price"> ₦{price}.00</span>
                                           </h5>
                                       </div>
                                       <div className="col-lg-2 col-md-12">
                                           <Button className="btn btn-md btn-success-light"> Add to cart</Button>
                                       </div>
                                   </div>
                               ) : (
                                   <div className="row">
                                       <div className="col-1">
                                           <p><i className="far fa-times-circle"></i></p>
                                       </div>
                                       <div className="col-9">
                                           <h5>
                                               <br/>
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
                                               <p>₦5,700.00/year</p>
                                       </Card>
                                   </Col>
                                   <Col md={4} className="col-6">
                                       <Card className="card">
                                           <div className="card-body">
                                               <img src={Online} alt="" className="img-fluid"/>
                                           </div>
                                           <hr/>
                                           <p>₦1,800.00/year</p>
                                       </Card>
                                   </Col>

                                   <Col md={4} className="col-6">
                                       <Card className="card">
                                           <div className="card-body">
                                               <img src={Tech} alt="" className="img-fluid"/>
                                           </div>
                                           <hr/>
                                           <p>₦2,800.00/year</p>
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
                                           <p className="domain-name">₦5,700.00 </p>
                                           <p className="year">1 Year</p>
                                       </td>
                                   </tr>

                                   <tr>
                                       <td>.org</td>
                                       <td>
                                           <p className="domain-name">₦6,000.00 </p>
                                           <p className="year">1 Year</p>
                                       </td>
                                   </tr>

                                   <tr>
                                       <td>.net</td>
                                       <td>
                                           <p className="domain-name">₦8,200.00 </p>
                                           <p className="year">1 Year</p>
                                       </td>
                                   </tr>

                                   <tr>
                                       <td>.com.ng</td>
                                       <td>
                                           <p className="domain-name">₦1,200.00 </p>
                                           <p className="year">1 Year</p>
                                       </td>
                                   </tr>

                                   <tr>
                                       <td>.ng</td>
                                       <td>
                                           <p className="domain-name">₦7,300.00 </p>
                                           <p className="year">1 Year</p>
                                       </td>
                                   </tr>

                                   <tr>
                                       <td>.shop</td>
                                       <td>
                                           <p className="domain-name">₦20,300.00 </p>
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