import React from "react";
import { Center, Grid, Text } from "@chakra-ui/react";
import PokemonCard from "../../components/PokemonCard";
import { Pokemon } from "../../model/Pokemon";
import { QuestionOutlineIcon } from "@chakra-ui/icons";

const PokemonList = ({ pokemons }: { pokemons: Pokemon[] }) => {
  return (
    <React.Fragment>
      {pokemons.length > 0 ? (
        <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={4}>
          {pokemons.map((pokemon: Pokemon) => (
            <PokemonCard key={pokemon.name} pokemon={pokemon} />
          ))}
        </Grid>
      ) : (
        <Center h="50vh" w="100%" flexDirection="column">
          <QuestionOutlineIcon w={8} h={8} color="primary.900" />
          <Text p={8}>Nenhum Pokémon encontrado</Text>
        </Center>
      )}
    </React.Fragment>
  );
};

export default PokemonList;
