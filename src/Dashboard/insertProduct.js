import AdminNavbar from "../components/AdminNavbar";
import {Button ,Col ,Container ,Form ,Row} from "react-bootstrap";
import ViewProducts from "./viewProducts";
import {useEffect ,useRef ,useState} from "react";
import {getAuth} from "firebase/auth";
import {collection ,doc ,getDocs ,orderBy ,query ,serverTimestamp ,setDoc} from "firebase/firestore";
import {db} from "../firebase.config";
import {toast} from "react-toastify";
import Spinner from "../components/Spinner";
import {v4 as uuidv4} from "uuid";

const InsertProduct = () => {
    const [categories, setCategories] = useState([])
    const [products, setProducts] = useState(null)
    //const auth = getAuth()
    const [loading, setLoading] = useState(true)
    const isMounted = useRef()
    const [formData, setFormData] = useState({
        productName: '',
        productCategory: '',
        productPrice: 0,
        productDiscountPrice: 0,
        productDescription: '',
        offer: false,
        timestamp: '',
    })

    const {productName, productCategory, productPrice, productDiscountPrice, productDescription, offer} = formData

    const onSubmit = async (e) => {
        e.preventDefault()
        //console.log(formData.productCategory)
        //console.log("working")
        try{
            let prodUniqueId = `${formData.productName
                .replace(/,?\s+/g, '-')
                .toLowerCase()}-${uuidv4()}`

            const auth = getAuth()
            const formDataCopy = {...formData}
            !formDataCopy.offer && delete formDataCopy.productDiscountPrice
            formDataCopy.timestamp= serverTimestamp();

            await setDoc(doc(db, 'shops', auth.currentUser.uid, 'products', prodUniqueId ), formDataCopy)
                setLoading(false)
            toast.success("Product Inserted Successfully")

        }
        catch (error) {
            console.log({error})
            toast.error("unable to insert product")

        }
    }

    const onChange = (e) => {
        let boolean = null

        if (e.target.value === 'true') {
            boolean = true
        }
        if (e.target.value === 'false') {
            boolean = false
        }
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: boolean ?? e.target.value,
        }))
    }

    const fetchProducts = async () => {
        try
        {
            const auth = getAuth()
            const prodRef = collection(db, 'shops', auth.currentUser.uid, 'products')
            const q = query(prodRef)
            const querySnap = await getDocs(q)

            let products = []

            querySnap.forEach((doc) => {
                //console.log(doc.data());
                return products.push({
                    id: doc.id,
                    data: doc.data(),
                })
            })
            setProducts(products)
            setLoading(false)

        }
        catch (error) {
            console.log({error})
            toast.error("Unable to retrieve products")

        }
    }


    useEffect(() => {
        if(isMounted) {
            const fetchCategories = async () => {
                try {
                    const auth = getAuth()
                    const catRef = collection(db ,'shops' ,auth.currentUser.uid ,'category')
                    const q = query(catRef, orderBy('timestamp', "desc"))
                    const querySnap = await getDocs(q)

                    querySnap.forEach((doc) => {
                        //console.log(doc.data())
                        return categories.push({
                            id: doc.id ,
                            data: doc.data() ,
                        })

                    })
                    setCategories(categories)
                    setLoading(false)
                } catch (error) {
                    toast.error("Error getting categories")
                    console.log({error})
                }
            }
            fetchCategories()
            fetchProducts()
        }
        return () => {
            isMounted.current = false
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMounted], products)
    return (
        <>
            <AdminNavbar />
            <Container className="Product" >
                <Row>
                    <Col md={4}>
                        <h4>Insert Product</h4>
                        {loading ?
                            (
                                <Spinner />
                            )
                            :
                            (<Form className="Form-product" onSubmit={onSubmit}>
                                <div className="form-group">
                                    <input type="text"
                                           id="productName"
                                           value={productName}
                                           placeholder="Product Name"
                                           required={true}
                                           onChange={onChange}
                                           className="form-control"/>
                                </div>
                                    <div className="form-group">
                                        <select
                                                id='productCategory'
                                                className='form-control'
                                                required={true}
                                                value={productCategory}
                                                onChange={onChange}
                                                placeholder='Select product category'
                                            >
                                            <option value="DEFAULT" disabled>
                                                    Select product category...
                                            </option>
                                            {categories.map((category) => (
                                                <option
                                                        value={category.data.categoryUrl}>{category.data.title}
                                                </option>
                                            ))}
                                        </select>

                                    </div>

                                <div className="form-group">
                                    <select
                                        id='offer'
                                        className='form-control'
                                        required={true}
                                        value={offer}
                                        onChange={onChange}
                                        placeholder='Discount Offer ?'
                                    >
                                        <option value='disable' disabled={true} selected={true}>
                                            Select YES/NO if product has discount offer...
                                        </option>
                                        <option value={true}>YES</option>
                                        <option value={false}>NO</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <input type="number"
                                           id="productPrice"
                                           value={productPrice}
                                           onChange={onChange}
                                           placeholder="Product Price"
                                           required={true}
                                           className="form-control"/>
                                </div>

                                    {offer && (
                                        <div className="form-group">
                                            <input type="number"
                                                   id="productDiscountPrice"
                                                   value={productDiscountPrice}
                                                   onChange={onChange}
                                                   placeholder="Product Discount Price"
                                                   required={offer}
                                                   className="form-control"/>
                                        </div>
                                    )}

                                <div className="form-group">
                                    <textarea id="productDescription"
                                          cols="30"
                                          rows="5"
                                          value={productDescription}
                                          onChange={onChange}
                                          required={true}
                                          className="form-control"
                                          placeholder="Product Description">
                                    </textarea>
                                </div>
                                    <div className="form-group">
                                        <Button className="btn btn-md btn-primary" type="submit">
                                            Insert Product
                                        </Button>

                                    </div>
                            </Form>
                            )
                        }

                    </Col>
                    <Col md={8} className="Prod-head">
                            <h4>View Products</h4>
                        {loading ?
                            (<Spinner />)
                            : products && products.length > 0 ?
                                (<>
                                <h6>{products.length} Product(S)</h6>
                                <Row>
                                    {products.map((product) => (
                                        <Col md={4} key={product.id}>
                                            <ViewProducts product={product.data} id={product.id} />
                                        </Col>
                                    ))}

                                </Row>
                                </>) :
                                (<h6>No product available</h6>)
                        }


                    </Col>
                </Row>

            </Container>
        </>
    )

}
export default InsertProduct
