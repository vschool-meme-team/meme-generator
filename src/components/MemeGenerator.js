import React from "react"
import MemesList from './MemesList'

class MemeGenerator extends React.Component{
    constructor(){
        super()
        this.state ={
            topText: "",
            bottomText: "",
            randomImage: "http://i.imgflip.com/1bij.jpg",
            allMemeImages: [],
            createdMemes: []
        }
        
    }

    addToList = () => {
        this.setState(prevState => {
            let newMemes = {
                topText: this.state.topText,
                bottomText: this.state.bottomText,
                randomImage: this.state.randomImage
            }

            console.log(newMemes)
            const newMemesList = prevState.createdMemes.map(meme => meme);
            newMemesList.push(newMemes)
                
            return {
                
                 createdMemes:  newMemesList
                
            }  
        }
        )
    }

    componentDidMount = () => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(res => {
                const {memes} = res.data
                this.setState({allMemeImages: memes})
            })
    }

    handleChange = (event) => {
        const {name, value} = event.target
        this.setState({ [name]: value })
    }
    
    memeButton = (event) => {
        event.preventDefault()
        const randomNumber = Math.floor(Math.random() * this.state.allMemeImages.length)
        const randomMemeImage = this.state.allMemeImages[randomNumber].url
        this.setState({randomImage: randomMemeImage})
    }

    deleteMeme = (event) => {
        let container = event.target.parentNode;
        container.innerHTML = ""
    }

    render() {
        const savedMemes = this.state.createdMemes;
        const deleteButton = this.deleteMeme;
        console.log(savedMemes)
        return(
            <div>
                <form className="meme-form">
                    <input 
                        type="text"
                        name="topText" 
                        placeholder="Top Text"
                        value={this.state.topText}
                        onChange={this.handleChange}
                    />
                    <input 
                        type="text"
                        name="bottomText" 
                        placeholder="Bottom Text"
                        value={this.state.bottomText}
                        onChange={this.handleChange}
                    />  
                    <button onClick={this.memeButton}>Generate</button>
                    
                </form>
                <div className="meme">
                    <img src={this.state.randomImage} alt={this.state.randomImage} />
                    <h2 className="top">{this.state.topText}</h2>
                    <h2 className="bottom">{this.state.bottomText}</h2>
                    <button onClick={this.addToList} className="btn">Save Meme</button>
                    <div className="memeTwo">
                    
                        <MemesList memes={savedMemes} deleteButton={deleteButton}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default MemeGenerator