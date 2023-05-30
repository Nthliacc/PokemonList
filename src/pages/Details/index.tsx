import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Image,
  HStack,
  Tag,
  Text
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import pokebola from "../../images/Pokebola.png";
import { useEffect, useState, useMemo } from "react";
import { getDetailsPokemon } from "../../services/getDetailsPokemon";
import About from "./about";
import Header from "./header";
import BaseStats from "./baseStats";
import { Pokemon } from "../../model/Pokemon";

interface DrawerProps {
  pokemon: Pokemon;
  isOpen: boolean;
  onClose: () => void;
}

const DrawerComponent = ({ isOpen, onClose, pokemon }: DrawerProps) => {
  const [detailsPokemon, setDetailsPokemon] = useState<any>([]);
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      getDetailsPokemon(pokemon.url).then((response) => {
        setDetailsPokemon(response);
      });
    }
  }, [pokemon, isOpen]);

  const nextImage = () => {
    if (imageIndex < detailsPokemon.sprites.length - 1) {
      setImageIndex(imageIndex + 1);
    } else {
      setImageIndex(0);
    }
  };

  const memoizedImage = useMemo(() => {
    if (
      !detailsPokemon ||
      !detailsPokemon.sprites ||
      detailsPokemon.sprites.length === 0
    ) {
      return null; 
    }

    const image = detailsPokemon.sprites[imageIndex] || pokemon.imageURLDefault;
    return <Image src={image} alt={pokemon.name} w="260px" />;
  }, [detailsPokemon, imageIndex, pokemon]);

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
      <DrawerOverlay>
        <DrawerContent
          backgroundColor={"primary.900"}
          textAlign={"center"}
          position={"relative"}
        >
          <Image
            src={pokebola}
            alt={pokemon.name}
            maxW="260"
            position={"absolute"}
            right={8}
            top={4}
            opacity={"0.2"}
          />
          <Header pokemon={pokemon} onClose={onClose} />
          <DrawerBody
            alignSelf={"center"}
            marginTop={"1%"}
            width={"100%"}
            display={"flex"}
            flexDir={"column"}
            alignItems={"center"}
          >
            <HStack
              zIndex={2}
              align={"center"}
              justify="end"
              w={"100%"}
              paddingX={4}
              spacing={4}
            >
              <>
              {memoizedImage}
              </>
              <Button
                backgroundColor={"transparent"}
                onClick={nextImage}
                zIndex={3}
                color={"white"}
                title="Próxima imagem"
                _hover={{
                  backgroundColor: "transparent",
                }}
              >
                <ChevronRightIcon boxSize={"8"} />
              </Button>
            </HStack>

            <Box
              display={"flex"}
              flexDir={"column"}
              alignItems={"center"}
              justifyContent={"space-between"}
              backgroundColor={"white"}
              width={"96%"}
              borderRadius={12}
              boxShadow={"dark-lg"}
              marginTop={"-20%"}
              paddingY={"20%"}
              paddingX={"8%"}
              height={"100%"}
            >
              <HStack spacing={4}>
                {detailsPokemon.types?.map(
                  (type: { name: string; color: string }) => (
                    <Tag
                      key={type.name}
                      size={"md"}
                      borderRadius={"full"}
                      paddingX={4}
                      paddingY={2}
                      fontSize={"md"}
                      fontWeight={"bold"}
                      color={"white"}
                      backgroundColor={type.color}
                      textShadow={"2px 2px 4px rgba(0, 0, 0, 0.25)"}
                    >
                      {type.name}
                    </Tag>
                  )
                )}
              </HStack>
              <About {...detailsPokemon} />
              <Text textAlign={"justify"} w={"100%"} paddingY={4}>
                {detailsPokemon.description}
              </Text>
              <BaseStats {...detailsPokemon} />
            </Box>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

export default DrawerComponent;
