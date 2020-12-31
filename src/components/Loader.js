import React from 'react'
import loaderSrc from '../static/images/loader.gif'

function Spinner() {
    return (
        <div className="loaderPage">
            <img src={loaderSrc} alt="loading"/>
        </div>
    )
}

export default Spinner
