import { Box, Center, Heading, Image } from "@chakra-ui/react";
import Filter from "../../components/Filter";
import Pokebola from "../../images/Pokebola.png";

interface HeaderProps {
  handleFilterChange: (value: string) => void;
}

const HeaderComponent = ({ handleFilterChange }: HeaderProps) => {
  return (
    <Box textAlign="center" mb={8}>
      <Center
        alignItems={"center"}
        justifyContent={"flex-start"}
        paddingBottom={2}
      >
        <Image src={Pokebola} alt="Pokédex" maxH={10} />
        <Heading as="h1" size="xl" paddingLeft={4} textShadow={"dark-lg"}>
          Pokédex
        </Heading>
      </Center>
      <Filter onFilterChange={handleFilterChange} />
    </Box>
  );
};

export default HeaderComponent;
