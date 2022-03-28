import {useParams} from "react-router-dom";

const TrackOrder = () => {
    const params = useParams()

    const currentURL = window.location.href
    console.log(currentURL)
    console.log(params.domain)
    return (
        <>
            <h3>Track Order</h3>
        </>
    )

}
export default TrackOrder
