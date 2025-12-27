import React, { use, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import ErrorScreen from "./ErrorScreen";
import Button from "../components/Button";
import "../css/SearchPokemon.css";
import Stats from "../components/Stats";
import { Link } from "react-router-dom";

const Searchepokemon = () => {
  const { pokemon } = useParams();
  const [selectedPokemon, setSelectedPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [stats, setStats] = useState({
    height: 0,
    weight: 0,
    exp: 0,
    attack: 0,
    defence: 0,
    splAttack: 0,
    splDefence: 0,
    speed: 0,
  });

  const colours = {
    normal: "#A8A77A",
    fire: "#EE8130",
    water: "#6390F0",
    electric: "#F7D02C",
    grass: "#7AC74C",
    ice: "#96D9D6",
    fighting: "#C22E28",
    poison: "#A33EA1",
    ground: "#E2BF65",
    flying: "#A98FF3",
    psychic: "#F95587",
    bug: "#A6B91A",
    rock: "#B6A136",
    ghost: "#735797",
    dragon: "#6F35FC",
    dark: "#705746",
    steel: "#B7B7CE",
    fairy: "#D685AD",
  };

  useEffect(() => {
    if (!pokemon) return;

    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;

    async function fetchPokemon() {
      try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error("Pokemon not found!!!");
        }

        const data = await response.json();
        setSelectedPokemon(data);
        setTimeout(() => {
          setLoading(false);
        });
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    }

    fetchPokemon();
  }, [pokemon]);

  if (loading) return <LoadingScreen />;
  if (error) return <ErrorScreen />;

  return (
    <div className="search-pokemon maxWidth">
      <div className="search-pokemon_header">
        <Link to={"/"}>
          <Button label="Back" />
        </Link>
      </div>

      <div className="pokemon-details">
        <div className="search-pokemon_info">
          <h4>{selectedPokemon.name}</h4>
          <div className="type">
            {selectedPokemon.types.map((type, index) => (
              <span
                key={index}
                style={{
                  backgroundColor: "",
                }}
              >
                {type.type.name}
              </span>
            ))}
          </div>
        </div>

        <div className="previewImage">
          <img
            src={selectedPokemon.sprites.other.home.front_default}
            alt={selectedPokemon.name}
          />
        </div>
      </div>
    </div>
  );
};

export default Searchepokemon;
