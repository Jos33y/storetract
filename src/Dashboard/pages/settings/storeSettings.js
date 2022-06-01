import React, {useEffect, useRef, useState} from "react";
import "../pagesStyles.css"
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import SettingsHeader from "./settingsHeader";
import {doc, getDoc, serverTimestamp, updateDoc} from "firebase/firestore";
import {db} from "../../../firebase.config";
import {toast} from "react-toastify";
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage";
import {v4 as uuidv4} from "uuid";


const StoreSettings = ({storeUrl, userId}) => {

    let fileArray;
    let fileObj;
    const isMounted = useRef()
    const [image, setImage] = useState(null)
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        storeMotto: '',
        storeDescription: '',
        storeBanner: {},
        storeLocation: '',
        facebookUrl: '',
        twitterUrl: '',
        instagramUrl: '',
        updateTime: '',
    })

    const {storeMotto, storeDescription, storeBanner, storeLocation, facebookUrl, twitterUrl, instagramUrl } = formData;

    const handleSubmit = async(e) => {
        setLoading(true)
        e.preventDefault()
        try {

            const storeBannerUrls = await Promise.all(
                [...storeBanner].map((image) => storeImage(image))
            ).catch(() => {
                // setLoading(false)
                toast.error('Image file too large')
                return
            })
            console.log("url", storeBannerUrls);
            const formDataCopy = {
                ...formData,
                storeBanner: storeBannerUrls,
                storeSetup: true,
                updateTime: serverTimestamp(),
            }
            const formDataRef = doc(db, 'shops', storeUrl)
            await updateDoc(formDataRef, formDataCopy)
            toast.success("Changes saved")
        }
        catch (error) {
            console.log({error})
        }
        setLoading(false)
    }

    //store image in firebase storage
    const storeImage = async (image) => {
        return new Promise((resolve, reject) => {
            const storage = getStorage()
            console.log(image.name)
            const fileName = `${userId}-${image.name}-${uuidv4()}`

            const storageRef = ref(storage, `shopBanner/${userId}/` + fileName)

            const uploadTask = uploadBytesResumable(storageRef, image)

            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    console.log('Upload is ' + progress + '% done')
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused')
                            break
                        case 'running':
                            console.log('Upload is running')
                            break
                        default:
                            console.log('Default Case')
                            break
                    }
                },
                (error) => {
                    // Handle unsuccessful uploads
                    reject(error)
                },
                () => {
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve(downloadURL)
                    })
                }
            )
        })
    }


    const getStore = async() => {
        setLoading(true)
        try {
            const getStoreRef = doc(db, 'shops', storeUrl)
            const getStoreSnap =  await getDoc(getStoreRef)
            if(getStoreSnap.exists()) {
                setFormData(getStoreSnap.data())
            }
        }
        catch (error) {
            console.log({error})
        }
        setLoading(false)
    }

    const onChange = (e) => {

        if (e.target.files) {
            setFormData((prevState) => ({
                ...prevState,
                storeBanner: e.target.files,
            }))
            console.log(storeBanner);
            fileObj = e.target.files;
            console.log(fileObj)
            // console.log(fileObj[0].length)
            fileArray = URL.createObjectURL(fileObj[0]);
            setImage(fileArray)
            console.log(fileArray)
        }

        if (!e.target.files) {
            setFormData((prevState) => ({
                ...prevState,
                [e.target.id]: e.target.value,
            }))
        }

    }

    useEffect(() => {
        if(isMounted) {
            getStore().then()
        }
        return () => {
            isMounted.current = false;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMounted])
    return (
        <>

            <section className="content-main">
                <div className="content-header">
                    <h2 className="content-title"> Store settings </h2>
                </div>

                <Card className="card">
                    <div className="card-body">
                        <Row className="gx-5">
                            <aside className="col-lg-3 border-end">
                                <SettingsHeader current={'store'} />
                            </aside>

                            <Col lg={9}>
                                <section className="content-body p-xl-4">
                                    <Form className="store-form" onSubmit={handleSubmit}>
                                        <div className="form-group">
                                            <label htmlFor="motto">Store Motto: </label>
                                            <input type="text"
                                                   id="storeMotto"
                                                   placeholder="Giving the very best..."
                                                   value={storeMotto}
                                                   onChange={onChange}
                                                   required={true}
                                                   className="form-control" />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="description"> About Store: </label>
                                            <textarea name=""
                                                      id="storeDescription"
                                                      value={storeDescription}
                                                      onChange={onChange}
                                                      placeholder="Brief description about store..."
                                                      className="form-control"
                                                      cols="20"
                                                      required={true}
                                                      rows="3"></textarea>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="motto">Location: </label>
                                            <select name="storeLocation"
                                                    id="storeLocation"
                                                    value={storeLocation}
                                                    onChange={onChange}
                                                    required={true}
                                                    className="form-control">
                                                <option value="" selected={true}>--Select State--</option>
                                                <option value="Abia">Abia</option>
                                                <option value="Adamawa">Adamawa</option>
                                                <option value="Akwa Ibom">Akwa Ibom</option>
                                                <option value="Anambra">Anambra</option>
                                                <option value="Bauchi">Bauchi</option>
                                                <option value="Bayelsa">Bayelsa</option>
                                                <option value="Benue">Benue</option>
                                                <option value="Borno">Borno</option>
                                                <option value="Cross Rive">Cross River</option>
                                                <option value="Delta">Delta</option>
                                                <option value="Ebonyi">Ebonyi</option>
                                                <option value="Edo">Edo</option>
                                                <option value="Ekiti">Ekiti</option>
                                                <option value="Enugu">Enugu</option>
                                                <option value="FCT">Federal Capital Territory</option>
                                                <option value="Gombe">Gombe</option>
                                                <option value="Imo">Imo</option>
                                                <option value="Jigawa">Jigawa</option>
                                                <option value="Kaduna">Kaduna</option>
                                                <option value="Kano">Kano</option>
                                                <option value="Katsina">Katsina</option>
                                                <option value="Kebbi">Kebbi</option>
                                                <option value="Kogi">Kogi</option>
                                                <option value="Kwara">Kwara</option>
                                                <option value="Lagos">Lagos</option>
                                                <option value="Nasarawa">Nasarawa</option>
                                                <option value="Niger">Niger</option>
                                                <option value="Ogun">Ogun</option>
                                                <option value="Ondo">Ondo</option>
                                                <option value="Osun">Osun</option>
                                                <option value="Oyo">Oyo</option>
                                                <option value="Plateau">Plateau</option>
                                                <option value="Rivers">Rivers</option>
                                                <option value="Sokoto">Sokoto</option>
                                                <option value="Taraba">Taraba</option>
                                                <option value="Yobe">Yobe</option>
                                                <option value="Zamfara">Zamfara</option>
                                            </select>
                                        </div>

                                        <div className="form-group logo-image">
                                            <label>Store Banner: </label>
                                            <label  htmlFor="upload-logo">
                                                <div className="logo-container">
                                                    <img src={`${image ? (image) : (storeBanner ? storeBanner : 'http://placehold.jp/250x150.png')}`} alt="" className="img-fluid"/>
                                                </div>
                                            </label>
                                            <input type="file"
                                                   placeholder="Giving the very best..."
                                                   id="upload-logo"
                                                   accept='image/*'
                                                   hidden={true}
                                                   required={true}
                                                   onChange={onChange}
                                                   className="form-control" />

                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="facebook" className="facebook">Facebook link: </label>
                                            <input type="url"
                                                   id="facebookUrl"
                                                   value={facebookUrl}
                                                   onChange={onChange}
                                                   placeholder="https://facebook.com/username"
                                                   className="form-control" />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="instagram" className="instagram">Instagram link: </label>
                                            <input type="url"
                                                   id="instagramUrl"
                                                   value={instagramUrl}
                                                   onChange={onChange}
                                                   placeholder="https://instagram.com/username"
                                                   className="form-control" />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="motto" className="twitter">Twitter link: </label>
                                            <input type="url"
                                                   id="twitterUrl"
                                                   value={twitterUrl}
                                                   onChange={onChange}
                                                   placeholder="https://twitter.com/username"
                                                   className="form-control" />
                                        </div>

                                        <div className="button-save">
                                            <Button  className="btn btn-primary"
                                                     type="submit">
                                                {loading ? (<> <span className="spinner-border spinner-border-sm" role="status"
                                                                     aria-hidden="true"></span>&nbsp; </> ) : ('')
                                                } Save changes</Button>
                                        </div>
                                    </Form>
                                </section>
                            </Col>
                        </Row>
                    </div>
                </Card>
            </section>

        </>
    )

}
export default StoreSettings
