import React from 'react';
import './Spinner.css'
import { Bars} from  'react-loader-spinner'
const Spinner = () => {

    return(
        <>
            <div className="Spinner">
                <Bars
                    color="#3E4095"
                    height={100}
                    width={100} />
            </div>

        </>
    )

}
export default Spinner
