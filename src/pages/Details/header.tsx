import { DrawerHeader, Button, Text, Spacer } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { formatNumber } from "../../utils/FormatNumber";

interface HeaderProps {
    pokemon: any;
    onClose: () => void;
}

const Header = ({ pokemon, onClose }: HeaderProps) => {
  return (
    <DrawerHeader
      display={"flex"}
      alignItems={"center"}
      color={"white"}
      background={"transparent"}
      paddingY={4}
    >
      <Button
        onClick={onClose}
        size={"100%"}
        textAlign={"center"}
        backgroundColor={"transparent"}
        marginRight={4}
        borderRadius={"50%"}
        _hover={{ svg: { color: "primary.900" }, backgroundColor: "white" }}
      >
        <ArrowBackIcon boxSize={8} />
      </Button>
      <Text fontSize="3xl" fontWeight="bold">
        {pokemon.name}
      </Text>
      <Spacer />
      <Text fontSize="md" fontWeight="medium" textAlign={"end"}>
        # {formatNumber(pokemon.id)}
      </Text>
    </DrawerHeader>
  );
};

export default Header;