import {Table} from "react-bootstrap";
import React, {useEffect ,useRef ,useState} from "react";
import {getAuth} from "firebase/auth";
import {collection ,doc ,getDoc ,getDocs ,limit ,orderBy ,query} from "firebase/firestore";
import {db} from "../../../firebase.config";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import Spinner from "../../../components/Spinner";
import NotFoundImage from "../../../assets/images/dashimages/undraw_not_found_-60-pq.svg"
import CategoryRow from "./categoryRow";

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
                        fetchCategories(profileSnap.data().storeUrl)
                }

                else
                {
                    navigate('/login')
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
            {loading ?
                (<Spinner />)
                : categories && categories.length > 0 ?
                    (
                        <>

            <Table className="table table-hover">
                <thead>
                <tr>
                    <th>
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" value=""/>
                        </div>
                    </th>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Description</th>
                    {/*<th>Slug</th>*/}
                    <th className="text-end"> Action </th>
                </tr>
                </thead>
                <tbody>
                {/*row one*/}
                {categories.map((category) =>(
                    <tr key={category.id}>
                        <CategoryRow category={category.data} id={category.id} />
                    </tr>
                ))}
                </tbody>
            </Table>


                        </>
                    ) :
                    (
                        <div className="No-category">
                            <h5>No Categories</h5>
                            <img src={NotFoundImage} alt="" className="img-fluid"/>
                        </div>

                    )}
        </>
    )

}

export default ViewCategories