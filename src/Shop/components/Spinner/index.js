import React from 'react';
import './Spinner.css'
import { Circles} from  'react-loader-spinner'
const Spinner = () => {

    return(
        <>
            <div className="Spinner">
                <Circles
                    color="#3E4095"
                    height={80}
                    width={80}
                    ariaLabel="loading-indicator"/>
            </div>

        </>
    )

}
export default Spinner
