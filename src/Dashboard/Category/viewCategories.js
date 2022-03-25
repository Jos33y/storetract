import {Col ,Container ,Row} from "react-bootstrap";
import '../styles.css'
import AdminNavbar from "../../components/AdminNavbar";
import {useEffect ,useRef ,useState} from "react";
import {getAuth} from "firebase/auth";
import {collection ,doc ,getDoc ,getDocs ,limit ,orderBy ,query} from "firebase/firestore";
import {db} from "../../firebase.config";
import {toast} from "react-toastify";
import {Link ,useNavigate} from "react-router-dom";
import Spinner from "../../components/Spinner";
import NotFoundImage from "../../assets/images/dashimages/undraw_not_found_-60-pq.svg"
import CategoryBox from "./CategoryBox";


const ViewCategories = () => {
    const [loading, setLoading] = useState(true)
    const [categories, setCategories] = useState(null)
    const isMounted = useRef()
    const auth = getAuth()
    const navigate = useNavigate()

    const fetchCategories = async (shopName) => {
        try
        {
            // const auth = getAuth()
            const catRef = collection(db, 'shops', shopName, 'category' )

            const q = query(catRef, orderBy('timestamp', 'desc'), limit(10))

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



    useEffect(() => {
        if(isMounted) {

            const getUser = async () =>{
                setLoading(true)
                const profileRef = doc(db, 'users', auth.currentUser.uid)
                const profileSnap =  await getDoc(profileRef)

                if(profileSnap.exists()){
                    //  console.log(profileSnap.data())
                    if (profileSnap.data().shopActivated){

                        fetchCategories(profileSnap.data().shopUrl)

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
                    (<Spinner />)
                    : categories && categories.length > 0 ?
                    (
                        <>
                        <div className="head-text">
                            <h4>View Categories</h4>
                            <div className="right-button">
                                <Link to="/insert-category" className="btn btn-md btn-success">insert category</Link>
                            </div>
                        </div>

                        <div className="Category-list">
                            <Row>

                                {categories.map((category) =>(
                                    <Col md={3} key={category.id}>
                                <CategoryBox category={category.data} id={category.id} />
                                    </Col>
                                ))}
                            </Row>

                        </div>

                        </>
                    ) :
                        (
                            <div className="No-category">
                                <h5>No Categories</h5>
                                <img src={NotFoundImage} alt="" className="img-fluid"/>
                            </div>

                        )}
            </Container>
        </>
    )

}
export default ViewCategories
