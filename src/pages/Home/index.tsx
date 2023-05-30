import React, { useEffect, useState } from "react";
import { Box, ButtonGroup, Button, Select } from "@chakra-ui/react";
import getPokemons from "../../services/getPokemons";
import PokemonList from "./PokemonList";
import HeaderComponent from "./HeaderComponent";
import CookieBanner from "../../components/CookieBanner";

const Home = () => {
  const [pokemons, setPokemons] = useState([]);
  const [limit, setLimit] = useState(15);
  const [offset, setOffset] = useState(0);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    getPokemons({ filter, limit, offset }).then((response) => {
      setPokemons(response);
    });
  }, [offset, limit, filter]);

  const handlePreviousClick = () => {
    setOffset((prevOffset) => prevOffset - limit);
  };

  const handleNextClick = () => {
    setOffset((prevOffset) => prevOffset + limit);
  };

  const handleLimitChange = (e: any) => {
    setLimit(Number(e.target.value));
  };

  const handleFilterChange = (value: string) => {
    setFilter(value);
  };

  return (
    <Box
      p={8}
      bgGradient="linear-gradient(to bottom,
      #74CB48 0%,
      #74CB48 10vh,
      white 10vh,
      white 100%)"
    >
      <HeaderComponent handleFilterChange={handleFilterChange} />
      <PokemonList pokemons={pokemons} />
      {pokemons.length > 0 && (
        <React.Fragment>
          <ButtonGroup my={4}>
          <Select onChange={handleLimitChange} value={limit} variant='filled'>
            <option value={15}>15</option>
            <option value={30}>30</option>
            <option value={60}>60</option>
            <option value={90}>90</option>
          </Select>
            <Button onClick={handlePreviousClick} disabled={offset === 0}>
              Previous
            </Button>
            <Button onClick={handleNextClick}>Next</Button>
          </ButtonGroup>
        </React.Fragment>
      )}
      <CookieBanner />
    </Box>
  );
};

export default Home;
