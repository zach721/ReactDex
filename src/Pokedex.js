import React from "react"
import axios from 'axios'
import './Pokemon.css'
import pokelogo from './images/newpokeball.png'
import left from './images/left.png'
import right from './images/right.png'
import ash from './images/ash.png'




function Pokedex(){

  const [api,setApi] = React.useState('https://pokeapi.co/api/v2/pokemon/1')
  const [apides, setApides] = React.useState('https://pokeapi.co/api/v2/pokemon-species/1')
  const [post, setPost] = React.useState(null); 
  const [descrpt, setDescrpt] = React.useState(null);         
  const [count,setCount] = React.useState(2)
  const [name, setName] = React.useState(null)

    
      axios.get(api).then((response) => {
      //  console.log(response.data.sprites.front_default)
        setPost(response.data)
        //console.log(post)       
      
      })

      function description() {
        axios.get(apides).then((response)=>{
        setDescrpt(response.data)
        })
      }

      description()
      


    if (!post) return null

    
  
    const Pluschangepokemon = ()=>{

        
    let api3 = 'https://pokeapi.co/api/v2/pokemon-species/'+ count.toString()   
    let api2 = 'https://pokeapi.co/api/v2/pokemon/'+ count.toString()
    setCount(count+1)
    setApi(api2)
    setApides(api3)

        
          
       }

       
    const Minuschangepokemon = ()=>{
     
     
    let api3 = 'https://pokeapi.co/api/v2/pokemon-species/'+ count.toString()   
    let api2 = 'https://pokeapi.co/api/v2/pokemon/'+ count.toString()
      
    setCount(count-1)
    setApi(api2)
    setApides(api3)


    
      
   }

   function Searchpokemon(){
    let api3 = 'https://pokeapi.co/api/v2/pokemon-species/'+ name
    let api2 = 'https://pokeapi.co/api/v2/pokemon/'+ name
    axios.get(api2).then((response) => {
        setCount(response.data.game_indices[3].game_index)
       
      })

    setApi(api2)
    setApides(api3)

   }


  
  
    return (
      <div id="pokedex">
      <ul id="list">
      
       <h1>Number: {post.game_indices[3].game_index}º</h1>
       <h1>Name: {post.forms[0].name}</h1>
       <h1>Type: {post.types[0].type.name} </h1>
       <h1>Weight: {Math.round(post.weight/35.27)} kg</h1> 
       <h1>Description: {descrpt.flavor_text_entries[0].flavor_text}</h1>

      </ul>
      <div id="divpoke">
      <img src={post.sprites.front_default} width="400" height="400"></img>
      </div>

      <div id="button">
        
      <button onClick={Minuschangepokemon} type="button"> <img src={left} /></button>
      <button onClick={Pluschangepokemon} type="button"> <img onClick={Pluschangepokemon} src={right} /> </button>

      </div>
      <div id="search">

      <input id="searchbox" onChange={e=>setName(e.target.value)} placeholder="Search.."/>
      <button id="searchbutton" onClick={Searchpokemon} type="button"><img src={pokelogo} height="55" weight="55" /></button>
      
      </div>
      <img id="ash" src={ash} width="120" height="120" />
      <h1 id="message" >This app was made with love using React</h1>
      <h1 id="message">Created by Zach721</h1>
      </div>
    );

    
}




export default Pokedex