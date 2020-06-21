import React from 'react'

//引入自訂元件


function commentImg(props) {
    return (
        <>
            <div className="commentImg"style={{width:"80px",height:"80px",objectFit:"cover",overflow:"hidden",margin:"5px"}}>
                <img
                    src="https://i.pinimg.com/564x/6e/61/7c/6e617c62730ff732340ea3bf1fbef940.jpg"
                    alt=""
                />
            
            </div>
        </>
    )
}

export default commentImg