import React from 'react'

function MemesList(props) {
//  console.log(props)
//  console.log(props.deleteButton)
 const allSavedMemes = props.memes.map((info, i) => {
    return (
            <div className="meme" key={i}>
               <h2 className="top"> {info.topText} </h2>
               <h2 className="bottom"> {info.bottomText}</h2> 
               <img src={info.randomImage} alt={info.topText} />
               <button className="buttonStyle" onClick={props.deleteButton}>Delete</button>
            </div>
           )
 })
 return(
        <div>
            {allSavedMemes}
        </div>
       )
 
}

export default MemesList