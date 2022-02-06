import AdminNavbar from "../components/AdminNavbar";
import {Button ,Col ,Container ,Form ,Row} from "react-bootstrap";
import {useEffect ,useRef ,useState} from "react";
import {getAuth} from "firebase/auth";
import {doc, getDocs, orderBy, limit, query ,serverTimestamp ,setDoc, collection} from "firebase/firestore";
import {db} from "../firebase.config";
import {toast} from "react-toastify";
import {v4 as uuidv4} from "uuid";
import ViewCategories from "./viewCategories";
import Spinner from "../components/Spinner";

const InsertCategory = () => {

    const [loading, setLoading] = useState(true)
    const [categories, setCategories] = useState(null)
    const isMounted = useRef()

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

            const auth = getAuth()
            // console.log({...formData})
            const formDataCopy = {...formData}
            formDataCopy.categoryUrl = formData.title.replace(/,?\s+/g, '-')
            formDataCopy.timestamp= serverTimestamp();
            const categoryRef = doc(db, 'shops', auth.currentUser.uid, 'category', catUniqueId)
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
            const fetchCategories = async () => {
                try
                {
                    const auth = getAuth()
                    const catRef = collection(db, 'shops', auth.currentUser.uid, 'category' )

                    const q = query(catRef, orderBy('timestamp', 'desc'), limit(5))

                    const querySnap = await getDocs(q)

                    let categories = [];

                    querySnap.forEach((doc) => {
                        //console.log(doc.data())
                        return categories.push({
                            id: doc.id,
                            data: doc.data(),
                        })
                    })
                    setCategories(categories)
                    setLoading(false)
                }
                catch (error) {
                    toast.error("could not fetch categories")
                    console.log({error})
                }
            }
            fetchCategories()
        }
        return () => {
            isMounted.current = false
        }
    }, [isMounted, categories])

    return (
        <>
            <AdminNavbar />
            <Container className="Category">

                <Row className="justify-content-center">
                    <Col md={6}>
                        <h4>Insert Category</h4>
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
                                          cols="30"
                                          rows="5">
                                </textarea>
                            </div>
                            <div className="form-group">
                                <Button className="btn btn-md btn-primary"
                                        type="submit">
                                    Insert Category
                                </Button>
                            </div>
                        </Form>
                    </Col>

                    <Col md={6}>
                        <h4>View Categories</h4>
                        {loading ?
                            (<Spinner />)
                            : categories && categories.length > 0 ?
                            (<>
                                <h6>({categories.length}) category(ies)</h6>
                                {categories.map((category) =>(
                                    <div className="Saved" key={category.id}>
                                        <ViewCategories category={category.data} id={category.id}/>
                                    </div>
                                ))}

                            </>) :
                                (<h5>No Categories</h5>)
                        }

                    </Col>
                </Row>
            </Container>
        </>
    )

}
export default InsertCategory
