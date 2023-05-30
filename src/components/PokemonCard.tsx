import { Pokemon } from "../model/Pokemon";
import { Box, Text, Flex, Image } from "@chakra-ui/react";
import { formatNumber } from "../utils/FormatNumber";
import { useState } from "react";
import DrawerComponent from "../pages/Details";

interface PokemonCardProps {
  pokemon: Pokemon;
}

const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  };

  const onOpen = () => {
    setIsOpen(true);
  };

  return (
    <Box
      key={pokemon.name}
      borderWidth="1px"
      borderRadius="md"
      overflow="hidden"
      boxShadow="md"
      cursor="pointer"
      _hover={{
        boxShadow: "lg",
        transform: "scale(1.05)",
        zIndex: 1,
        backgroundColor: "gray.100",
        img: {
          boxShadow: "lg",
          transform: "scale(1.05)",
          backgroundColor: "white",
          borderRadius: "full",
        },
      }}
      transition="box-shadow 0.3s"
      p={4}
      onClick={onOpen}
    >
      <Text textAlign="end">#{formatNumber(pokemon.id)}</Text>
      <Flex p={2} flexDirection="column" justify="center" align="center">
        <Image
          src={pokemon.imageURLDefault}
          alt={pokemon.name}
          transition="box-shadow 0.3s"
        />
        <Text fontSize="xl" fontWeight="semibold" paddingTop={2}>
          {pokemon.name}
        </Text>
      </Flex>
      <DrawerComponent pokemon={pokemon} isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default PokemonCard;
