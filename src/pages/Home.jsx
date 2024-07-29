import React, { useEffect, useState} from "react"
import { Link } from "react-router-dom"
import PuppyCardList from "../components/PuppyCardList/PuppyCardList";
import axios from "axios"

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function Home(){
  const [players, setPlayers] = useState([])
  const [playersToShow, setPlayersToShow] = useState([])
  useEffect(() => {
    axios(`${BASE_URL}/players`)
      .then((data) => {
        console.log(data.data.data.players)
        setPlayers(data.data.data.players)
        setPlayersToShow(data.data.data.players)
      })
      .catch((err) => console.log(err))
  }, [])
  
  const playerSearch = (e) => {
    console.log(e.target.value)
    const searchResults = players.filter((player) => 
      player.name.toLowerCase().includes(e.target.value.toLowerCase())
    )
    setPlayersToShow(searchResults)
    console.log(searchResults)
    console.log(players)
  }

  return (
    <div>
        <Link to="/addPlayer">Add a Player</Link>
        <h1>Puppy Bowl</h1>
        <label>
          Search for a player by name:
          <input type="text" onChange={playerSearch} />
        </label>
        <PuppyCardList players={playersToShow} />
    </div>
    )
}