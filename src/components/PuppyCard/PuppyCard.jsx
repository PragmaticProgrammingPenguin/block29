import React from "react";
import { useNavigate } from "react-router-dom";
import "./PuppyCard.css";
import axios from "axios";

export default function PuppyCard({ player, parent}){
    const navigate = useNavigate();
    const cardStyles = {
        width: parent==="details" ? "90%" : "27%",
        margin: parent === "details" ? "0 auto " : null,
    }

    const removePlayer = (id) => {
        axios
            .delete(`${import.meta.env.VITE_BASE_URL}/players/${id}`)
            .then((response) => {
                console.log(response)
                if (response.data.success) {
                    alert("Player successfully removed from roster!")
                    navigate("/")
                }
            })
            .catch((err) => console.log(err))
    }

    return (
        <div className="player-card" style={cardStyles}>
            <p>NAME: {player?.name}</p>
            <img src={player?.imageUrl} alt={player?.name} />
            <p>BREED: {player?.breed}</p>
            {parent === "details" && <p>STATUS: {player?.status}</p>}
            {parent === "details" && <p>ID: {player?.id}</p>}

            {parent === "details" ? (
                <button onClick={() => removePlayer(player?.id)}>Remove Player from Roster</button>
            ) : (
            <button onClick={() => navigate(`/details/${player?.id}`)}>
                See Details
            </button>
            )}
        </div>
    )
}