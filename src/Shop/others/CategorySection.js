import React ,{useEffect ,useRef ,useState} from "react";
import {Link} from "react-router-dom";
import {collection ,getDocs ,orderBy ,query} from "firebase/firestore";
import {db} from "../config/firebase.config";
import {toast} from "react-toastify";
import {Button} from "react-bootstrap";

const CategorySection = ({shopName}) => {
    const [display, setDisplay] = useState(false);
    const [categories, setCategories] = useState(null)
    const isMounted = useRef()


    //Fetch Categories
    const fetchCategories = async () => {
        try
        {
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
                    <div className="Category-section">
                        <Button onClick={() => {
                            setDisplay((prevState) => !prevState)}}
                            className="btn btn-md btn-primary">View Categories</Button>

                        {display ?
                            (
                        <ul>
                            { categories.map((category) => (
                                <li key={ category.id }>
                                    <Link to={ `/${shopName}/category/${ category.data.categoryUrl }` }
                                          className="Category-link">{ category.data.title }
                                    </Link>
                                </li>
                                // <li>
                                //     <Link to="/" className="Category-link">Hand Bag <i className="fas fa-angle-right"></i></Link>
                                // </li>
                            )) }
                        </ul>) :
                            ("")
                        }
                    </div>
        </>
    )

}

export default CategorySection


