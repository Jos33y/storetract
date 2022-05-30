import Spinner from "../components/Spinner";
import ShopHeader from "../components/ShopHeader";
// import CategorySection from "./components/CategorySection";
import React ,{useEffect ,useRef ,useState} from "react";
import {Button ,Col ,Row ,Table} from "react-bootstrap";
import ProductCard from "../components/ProductCard";
import ShopFooter from "../components/ShopFooter";
import {collection ,doc ,getDoc ,getDocs ,limit ,query} from "firebase/firestore";
import {db} from "../config/firebase.config";
import {Link ,useNavigate ,useParams} from "react-router-dom";
import {toast} from "react-toastify";
import CartTable from "./CartTable";

const Cart = () => {

    const navigate = useNavigate()
    const params = useParams()

    // const [display, setDisplay] = useState(false);
    const [disabled, setDisabled] = useState(false)
    const [shopData, setShopData] = useState('')
    const [products, setProducts] = useState(null)
    const [carts, setCarts] = useState([])
    const itemsPrice = carts.reduce((a, c) => a + c.productPrice * c.qty, 0);
    const [loading, setLoading] = useState(true)
    const [instructions, setInstructions] = useState(null)

    const isMounted = useRef()

    const onCheckout = () =>{
        setDisabled(true)

        try {
            //make cart a string and store in local space
            let stringInstructions = JSON.stringify(instructions);
            localStorage.setItem("instruction" ,stringInstructions)
            toast.success("checked out")

            navigate(`/${params.shopName}/checkout/information`)
        }
        catch (e) {
            console.log({e})
        }
    }

    const onChange = (e) => {
        setInstructions(e.target.value)

    }

    const onDelete = (cart) => {
        console.log("on delete")
         console.log(cart)

        try {
            let cartData = [...carts]

            const existingItem = cartData.find(cartItem => cartItem.uniqueId === cart.uniqueId);
            if (existingItem){
                cartData = cartData.filter(cartItem => cartItem.uniqueId !== cart.uniqueId);

                setCarts(cartData);

                let cartString = JSON.stringify(cartData)
                localStorage.setItem('cart', cartString)
                toast.success('item deleted')
            }
            else{
                toast.error('error deleting item')

            }

        }
        catch (e) {
            console.log({e})
        }
    }

    //Fetch Product
    const fetchProducts = async () => {
        try
        {

            const prodRef = collection(db, 'shops', params.shopName, 'products')
            const q = query(prodRef, limit(5))
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
            let localCart = localStorage.getItem("cart");
            let localInstruction = localStorage.getItem("instruction");
            const fetchDetails = async () => {
                try
                {
                    const docRef = doc(db, "shops", params.shopName)
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        //console.log("Document data:", docSnap.data());
                        setShopData(docSnap.data())

                    } else {
                        console.log("No such document!");
                    }
                }
                catch (error) {
                    console.log({error})
                }
            }
            fetchDetails()
            fetchProducts()

            //turn it into js
            localCart = JSON.parse(localCart);
            //load persisted cart into state if it exists
            if (localCart) setCarts(localCart)
            //turn it into js
            localInstruction = JSON.parse(localInstruction);
            //load persisted cart into state if it exists
            if (localInstruction) setInstructions(localInstruction)
            // console.log("Instructions here: ", instructions)

        }
        return () => {
            isMounted.current = false
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMounted, params.productUrl])



    return (
        <>
            {loading ?
                (<Spinner />)
                :
                (
                    <>
                        <ShopHeader cartCount={carts.length} businessName={shopData.businessName} businessUrl={params.shopName} />
                        <Row>
                            {/*<Col md={3}>*/}
                            {/*    <CategorySection shopName={params.shopName}/>*/}
                            {/*</Col>*/}
                            <Col md={12}>
                                <div className="Cart-page">
                                    <div className='bread-crumb'>
                                        <ul>
                                            <li>
                                                <Link to={ `/${params.shopName}`} className="bread-crumb-link"> Home</Link>
                                            </li> |
                                            <li>
                                                Your Shopping Cart
                                            </li>
                                        </ul>
                                    </div>
                                    <h6 className="cart-title">My Cart</h6>
                                    {carts && carts.length > 0 ?
                                        ( <>
                                    <div className="table-section">


                                                    <Table className="table">
                                                        <thead>
                                                        <tr>
                                                            <th className="th-product">Product </th>
                                                            <th className="th-price">Price</th>
                                                            <th>Qty</th>
                                                            <th className="th-delete">Remove</th>
                                                            <th className="th-price">Price</th>
                                                        </tr>
                                                        </thead>

                                                        <tbody>
                                            {carts.map((cart) => (
                                                <tr key={cart.id}>
                                                    <CartTable businessUrl={params.shopName} id={cart.id} cart={cart} onDelete={() => {onDelete(cart)}} />
                                                </tr>
                                            ))}
                                            <tr className="total">
                                                <td colSpan={3}></td>
                                                <td><p>Subtotal</p></td>
                                                <td> <p> &#8358;{(itemsPrice).toFixed(2).toString()
                                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p></td>
                                            </tr>
                                            </tbody>

                                        </Table>
                                    </div>

                                    <div className="Checkout-buttons">
                                        <Row>
                                            <Col md={9}>
                                                <div className="Instruction">
                                                    <p>Please leave special instructions below:</p>
                                                    <textarea name="instructions"
                                                              cols="30"
                                                              rows="5"
                                                              id="instructions"
                                                              onChange={onChange}
                                                              value={instructions}
                                                              className="form-control"></textarea>
                                                </div>
                                            </Col>
                                            <Col md={3}>
                                                <Link to={(`/${params.shopName}`)} className="continue-link">Continue Shopping</Link>
                                                {/*<p><Button className="btn btn-md btn-secondary">Update Cart</Button></p>*/}
                                                <p><Button disabled={disabled} onClick={onCheckout} className="btn btn-md btn-secondary">Checkout </Button></p>
                                            </Col>
                                        </Row>
                                    </div>
                                        </> )
                                        :
                                        (<h4> Empty Cart</h4>)}
                                </div>

                                {/*more in this collection*/}
                                <div className="More-collection">
                                    <hr/>
                                    <h5>More in collection</h5>
                                    <hr/>

                                    <div className="More-products">
                                        <div className="Shop-products">
                                            {loading ?
                                                (<Spinner />)
                                                : products && products.length > 0 ?
                                                    (
                                                        <>
                                                            <h6 className="small">{products.length} Product(s)</h6>
                                                            <Row>

                                                                {products.map((product) => (
                                                                    <Col md={2} key={product.id}>
                                                                        <ProductCard id={product.id} product={product.data} businessUrl={params.shopName} />
                                                                    </Col>
                                                                ))}
                                                            </Row>
                                                        </>
                                                    ) :
                                                    (<h6>No product available</h6>)
                                            }
                                        </div>
                                    </div>
                                </div>

                            </Col>
                        </Row>


                        <ShopFooter businessName={shopData.businessName}/>
                    </>
                )}
        </>

    )

}
export default Cart
