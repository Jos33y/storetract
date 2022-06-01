import {Button, Col, Form, Row} from "react-bootstrap";
import AvatarDefault from "../../../assets/images/avatardefault_92824.png";
import React, {useEffect, useRef, useState} from "react";
import {doc, getDoc, serverTimestamp, updateDoc} from "firebase/firestore";
import {db} from "../../../firebase.config";
import {toast} from "react-toastify";
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage";
import {v4 as uuidv4} from "uuid";

const ProfileSettings = ({userId}) => {

    let fileArray;
    let fileObj;
    const isMounted = useRef()
    const [image, setImage] = useState(null)
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        businessName: '',
        storeUrl: '',
        email: '',
        phoneNumber: '',
        storeLogo: {},
        storeAddress: '',
        updateTime: '',
    })

    const {name, businessName, storeUrl, email, phoneNumber, storeAddress, storeLogo} = formData;

    const handleSubmit = async(e) =>{
        setLoading(true)
        e.preventDefault()
        try {

            const storeLogoUrls = await Promise.all(
                [...storeLogo].map((image) => storeImage(image))
            ).catch(() => {
                // setLoading(false)
                toast.error('Image file too large')
                return
            })
            console.log("url", storeLogoUrls);
            const formDataCopy = {
                ...formData,
                storeLogo: storeLogoUrls,
                updateTime: serverTimestamp(),
            }
            delete formDataCopy.email;
            delete formDataCopy.storeUrl;
            const formDataRef = doc(db, 'users', userId)
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

            const storageRef = ref(storage, `profiles/${userId}/` + fileName)

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

    const onChange = (e) => {

        if (e.target.files) {
            setFormData((prevState) => ({
                ...prevState,
                storeLogo: e.target.files,
            }))
            console.log(storeLogo);
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
    const getProfile = async() => {
        setLoading(true)
        try {
            const getProfileRef = doc(db, 'users', userId)
            const getProfileSnap =  await getDoc(getProfileRef)
            if(getProfileSnap.exists()) {
                setFormData(getProfileSnap.data())
            }
        }
        catch (error) {
            console.log({error})
        }
        setLoading(false)
    }



    useEffect(() => {
        if(isMounted) {
            getProfile().then()
        }
        return () => {
            isMounted.current = false;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMounted])

    return (
        <>
            <Form className="store-form" onSubmit={handleSubmit}>
                <Row>
                    <Col lg={8}>
                        <Row className="gx-3">
                            <div className="form-group">
                                <label htmlFor="fullName" className="form-label">Full Name </label>
                                <input type="text"
                                       id="name"
                                       value={name}
                                       onChange={onChange}
                                       required={true}
                                       placeholder="Type here..."
                                       className="form-control"/>
                            </div>


                            <div className="form-group">
                                <label htmlFor="businessName" className="form-label">Business Name </label>
                                <input type="text"
                                       id="businessName"
                                       value={businessName}
                                       onChange={onChange}
                                       required={true}
                                       placeholder="Type here..."
                                       className="form-control"/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="storeUrl" className="form-label">Store Url </label>
                                <input type="text"
                                       id="storeUrl"
                                       value={storeUrl}
                                       required={true}
                                       onChange={onChange}
                                       readOnly={true}
                                       placeholder="Type here..."
                                       className="form-control"/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="email" className="form-label">Email </label>
                                <input type="email"
                                       id="email"
                                       value={email}
                                       onChange={onChange}
                                       required={true}
                                       readOnly={true}
                                       placeholder="Type here..."
                                       className="form-control"/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="phone" className="form-label">Phone </label>
                                <input type="tel"
                                       id="phoneNumber"
                                       placeholder="Type here..."
                                       onChange={onChange}
                                       required={true}
                                       value={phoneNumber}
                                       className="form-control"/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="address" className="form-label">Address </label>
                                <input type="text"
                                       id="storeAddress"
                                       value={storeAddress}
                                       onChange={onChange}
                                       required={true}
                                       placeholder="Type here..."
                                       className="form-control"/>
                            </div>

                        </Row>
                    </Col>
                    <aside className="col-lg-4">
                        <figure className="text-lg-center">
                            <img src={`${image ? (image) : (storeLogo ? storeLogo : AvatarDefault)}`} alt="user avatar" className="img-lg mb-3 img-avatar"/>
                            <figcaption>
                                <label htmlFor="upload-logo"  type="button" className="btn btn-outline-primary">
                                        <i className="fas fa-upload"></i> upload

                                </label>
                                <input type="file"
                                       id="upload-logo"
                                       accept='image/*'
                                       hidden={true}
                                       onChange={onChange}
                                       required={true}/>
                            </figcaption>
                        </figure>
                    </aside>
                </Row>
                <br/>
                <div className="button-save">
                    <Button  className="btn btn-primary"
                             type="submit">
                        {loading ? (<> <span className="spinner-border spinner-border-sm" role="status"
                                             aria-hidden="true"></span>&nbsp; </> ) : ('')
                        } Save Profile</Button>
                </div>

            </Form>

        </>
    )
}
export default ProfileSettings