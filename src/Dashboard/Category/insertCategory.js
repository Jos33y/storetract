import AdminNavbar from "../../components/AdminNavbar";
import {Button ,Col ,Container ,Form ,Row} from "react-bootstrap";
import {useEffect ,useRef ,useState} from "react";
import {getAuth} from "firebase/auth";
import {doc ,serverTimestamp ,setDoc ,getDoc} from "firebase/firestore";
import {db} from "../../firebase.config";
import {toast} from "react-toastify";
import {v4 as uuidv4} from "uuid";
import Spinner from "../../components/Spinner";
import {Link, useNavigate} from "react-router-dom";

const InsertCategory = () => {

    const [loading, setLoading] = useState(true)
    const [shopUrl, setShopUrl] = useState(null)
    const isMounted = useRef()
    const auth = getAuth()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        categoryUrl: '',
        timestamp: '',
    })
    const {title, description} = formData


    const onSubmit = async (e) => {
        e.preventDefault()
        try
        {
            let catUniqueId = `${formData.title
                .replace(/,?\s+/g, '-')
                .toLowerCase()}-${uuidv4()}`

            // console.log({...formData})
            const formDataCopy = {...formData}
            formDataCopy.categoryUrl = formData.title.replace(/,?\s+/g, '-')
            formDataCopy.timestamp= serverTimestamp();
            const categoryRef = doc(db, 'shops', shopUrl, 'category', catUniqueId)
            await setDoc(categoryRef, formDataCopy)

            toast.success("category inserted")
        }
        catch (error) {
            console.log({error})
            toast.error("Error in inserting category")
        }

    }

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }))
    }

    useEffect(() => {
        if(isMounted) {

            const getUser = async () =>{
                setLoading(true)
                const profileRef = doc(db, 'users', auth.currentUser.uid)
                const profileSnap =  await getDoc(profileRef)

                if(profileSnap.exists()){
                    //  console.log(profileSnap.data())
                    if (profileSnap.data().shopActivated){
                        setShopUrl(profileSnap.data().shopUrl)
                        setLoading(false)
                    }
                    else
                    {
                        navigate('/activate-shop')
                    }

                }

            }

            getUser()

        }
        return () => {
            isMounted.current = false
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMounted, auth.currentUser.uid])

    return (
        <>
            <AdminNavbar />



            <Container className="Category">
                {loading ?
                    (<Spinner />) :

                    (

                <Row className="justify-content-center">
                    <Col md={6}>
                        <div className="head-text">
                            <h4>Insert Category</h4>
                            <div className="right-button">
                                <Link to="/view-categories" className="btn btn-md btn-success">View Categories</Link>
                            </div>
                        </div>

                        <Form className="Form-category" onSubmit={onSubmit}>
                            <div className="form-group">
                                <input type="text"
                                       id="title"
                                       value={title}
                                       onChange={onChange}
                                       required={true}
                                       maxLength={20}
                                       className="form-control"
                                       placeholder="Category Title"/>
                            </div>
                            <div className="form-group">
                                <textarea name="description"
                                          id="description"
                                          value={description}
                                          onChange={onChange}
                                          maxLength={100}
                                          required={true}
                                          className="form-control"
                                          placeholder="Category Description"
                                          cols="30"
                                          rows="5">
                                </textarea>
                            </div>
                            <div className="form-group button">
                                <Button className="btn btn-md btn-primary"
                                        type="submit">
                                    Insert Category
                                </Button>
                            </div>
                        </Form>
                    </Col>
                </Row>
                    ) }
            </Container>

                    {/*<Col md={6}>*/}
                    {/*    <h4>View Categories</h4>*/}
                    {/*    {loading ?*/}
                    {/*        (<Spinner />)*/}
                    {/*        : categories && categories.length > 0 ?*/}
                    {/*        (<>*/}
                    {/*            <h6>({categories.length}) category(ies)</h6>*/}
                    {/*            {categories.map((category) =>(*/}
                    {/*                <div className="Saved" key={category.id}>*/}
                    {/*                    <ViewCategories category={category.data} id={category.id}/>*/}
                    {/*                </div>*/}
                    {/*            ))}*/}

                    {/*        </>) :*/}
                    {/*            (<h5>No Categories</h5>)*/}
                    {/*    }*/}

                    {/*</Col>*/}



        </>
    )

}
export default InsertCategory
