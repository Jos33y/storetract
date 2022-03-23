import React ,{useEffect ,useRef ,useState} from "react";
import {Link} from "react-router-dom";
import {collection ,getDocs ,orderBy ,query} from "firebase/firestore";
import {db} from "../../firebase.config";
import {toast} from "react-toastify";
import Spinner from "../../components/Spinner";

const CategorySection = ({shopName}) => {
    const [categories, setCategories] = useState(null)
    const [loading, setLoading] = useState(true)
    const isMounted = useRef()


    //Fetch Categories
    const fetchCategories = async () => {
        try
        {
            setLoading(true)
            const catRef = collection(db, 'shops', shopName, 'category' )
            const q = query(catRef, orderBy('timestamp', 'asc'))
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

            fetchCategories()
        }
        return () => {
            isMounted.current = false
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMounted, shopName])



    return(
        <>
            { loading ?
                (<Spinner/>)
                :
                (
                    <div className="Category-section">
                        <ul>
                            { categories.map((category) => (
                                <li key={ category.id }>
                                    <Link to={ `${ category.data.categoryUrl }` }
                                          className="Category-link">{ category.data.title } <i
                                        className="fas fa-angle-right"></i></Link>
                                </li>
                                // <li>
                                //     <Link to="/" className="Category-link">Hand Bag <i className="fas fa-angle-right"></i></Link>
                                // </li>
                            )) }
                        </ul>

                    </div>)
            }
        </>
    )

}

export default CategorySection


