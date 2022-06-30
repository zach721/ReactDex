/*
@Author: Zach721
@Version: 2.0 Improved
@Features:
*/

import React from "react"
import axios from 'axios'
import './Pokemon.css'
import pokelogo from './images/newpokeball.png'
import left from './images/left.png'
import right from './images/right.png'
import ash from './images/ash.png'
import rotom from './images/rotom.png'
import sinnoh from './images/sinnoh.png'
import github from './images/github.png'


function Pokedex(){

  const [api,setApi] = React.useState('https://pokeapi.co/api/v2/pokemon/1')
  const [apides, setApides] = React.useState('https://pokeapi.co/api/v2/pokemon-species/1')
  const [post, setPost] = React.useState(null); 
  const [descrpt, setDescrpt] = React.useState(null);         
  const [count,setCount] = React.useState(2)
  const [name, setName] = React.useState(null)
  const [img, setImg] = React.useState('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png')
  const [list, setList] = React.useState(null)
  const [pokelist, setPokelist] = React.useState(false)
  


  
  React.useEffect(()=>{

    axios.get(api).then((response) => {
      setPost(response.data)

      setImg(response.data.sprites.other.home.front_default)

    
    })

  },[api])

      function Description() {

        React.useEffect(()=>{


        axios.get(apides).then((response)=>{
        setDescrpt(response.data)})
      

        },[api])

      }

      Description()

      const Showallpokemon = ()=>{
   
        React.useEffect(()=>{
   
         const api2 = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1154'
         axios.get(api2).then((response)=>{
           setList(response.data.results)

          })
   
        },[])
        
       
       }
       Showallpokemon()
      


    if (!post) return null


    
  
    const Pluschangepokemon = ()=>{



  let api3 = 'https://pokeapi.co/api/v2/pokemon-species/'+ count.toString()   
  let api2 = 'https://pokeapi.co/api/v2/pokemon/'+ count.toString()
  setCount(count+1)
  setApi(api2)
  setApides(api3)
        
             
       }

       
    const Minuschangepokemon = ()=>{
     
     if (count!==0){

    let api3 = 'https://pokeapi.co/api/v2/pokemon-species/'+ count.toString()   
    let api2 = 'https://pokeapi.co/api/v2/pokemon/'+ count.toString()
      
    setCount(count-1)
    setApi(api2)
    setApides(api3)
  }
        
     
    
      
   }

   const Searchpokemon = ()=>{
  if(name!==""){

    

     
    let api3 = 'https://pokeapi.co/api/v2/pokemon-species/'+ name
    let api2 = 'https://pokeapi.co/api/v2/pokemon/'+ name
    axios.get(api2).then((response) => {
        setCount(response.data.game_indices[3].game_index)
       
      })
    setApi(api2)
    setApides(api3)
    
  }
   }  
  
   const showlist = ()=>{
    setPokelist(true)
    if (pokelist==true){
      setPokelist(false)
    }
   }

  
  
    return (
      <div id="pokedex">
     {pokelist ? <div id="listpoke" >
      
      <ul>
      <h1>Pokemon list</h1>

      {
        list.map((list3)=>{
          let nurl = list3.url.replace(/\D/g, '').substring(1).toString()
          
          let api3_ = 'https://pokeapi.co/api/v2/pokemon-species/' + nurl.toString()
          let api_ = 'https://pokeapi.co/api/v2/pokemon/'
          let api__ = api_ + nurl
    let url = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'+nurl +'.png'

          return(
            <div>
            <img onClick={()=>{{setApi(api__)}{setApides(api3_)}}} src={url} />
            <h1 id={list3.name.toString()} >{list3.url.replace(/\D/g, '').substring(1)} {list3.name}</h1>
            
            </div>
         
          )
        })}

      </ul>
   
     
      </div>: undefined}

      <ul id="list">
       <h1>Name: {post.forms[0].name}</h1>
       <h1>Type: {post.types[0].type.name} </h1>
       <h1>Height: {post.height/10} m</h1> 
       <h1>Weight: {post.weight/10} kg</h1> 
       <h1>Description: {descrpt.flavor_text_entries[0].flavor_text}</h1>

      </ul>
      <div id="divpoke">
      <img src={img} width="400" height="400"></img>
      </div>

      <div id="button">
        
      <button  type="button"> <img onClick={Minuschangepokemon} src={left} /></button>
      <button type="button"> <img onClick={Pluschangepokemon} src={right} /> </button>

      </div>
      
      <div id="card" ></div>
  

      <div id="search">

      <input id="searchbox" autocomplete="off" onChange={e=>setName(e.target.value )} onKeyPress={Searchpokemon} placeholder="Search with Rotom!" /> 
      <button id="searchbutton" onClick={Searchpokemon} type="button"><img src={rotom} height="55" weight="55" /></button>
      
      </div>
      <img id="ash" src={ash} width="160" height="160" />
      <h1 id="message" >This app was made with love using React</h1>
      <h1 id="message">Created by Zach721</h1>
      <div>
      <a href="https://www.github.com/zach721" target="_blank">
      <img id="github" src={github} height="40" width="40"/><h1 id="author" >My github account</h1></a>
      
      </div>
      <img id="pokeball" src={pokelogo} weight='50' height='50' onClick={showlist} />
      <img id="sinnoh" src={sinnoh} />
      </div>
      
    );

    
}




export default Pokedex
