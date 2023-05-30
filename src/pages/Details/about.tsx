import { Center, Divider, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import { TbWeight, TbRuler3 } from "react-icons/tb";

interface Ability {
  name: string;
}

interface DrawerProps {
  weight: number;
  height: number;
  abilities: Ability[];
}

const About = ({ height, weight, abilities }: DrawerProps) => {
  return (
    <>
      <Text fontWeight="bold" color="#74CB48" fontSize="2xl" paddingY={4}>
        About
      </Text>
      <Center width={"100%"} alignItems={"flex-end"}>
        <AboutItem
          label="Weight"
          value={weight}
          icon={<Icon as={TbWeight} boxSize={6} />}
        />
        <Divider orientation="vertical" maxH={"80px"} borderWidth={"1.5px"} marginX={"6%"}/>
        <AboutItem
          label="Height"
          value={height}
          icon={<Icon as={TbRuler3} boxSize={6} transform="rotate(90deg)" />}
        />
        <Divider orientation="vertical" maxH={"80px"} borderWidth={"1.5px"} marginX={"6%"}/>
        <AboutItem label="Moves">
          <VStack spacing={1} alignItems="center">
            {abilities &&
              abilities.map((ability, index) => (
                <Text key={index} fontSize="md">
                  {ability.name}
                </Text>
              ))}
          </VStack>
        </AboutItem>
      </Center>
    </>
  );
};

export default About;

const AboutItem = ({
  label,
  value,
  icon,
  children,
}: {
  label: string;
  value?: string | number;
  icon?: JSX.Element;
  children?: JSX.Element;
}) => {
  const formatValue = (value: string | number, label: string) => {
    value = Number(value);
    const formattedValue = (value / 10).toLocaleString(undefined, {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    });
  
    if (label === "Height") {
      return `${formattedValue.replace(".", ",")} m`;
    }
    return `${formattedValue.replace(".", ",")} kg`;
  };

  return (
    <VStack
      spacing={4}
      alignItems="center"
      justifyItems={"flex-end"}
    >
      {value && (
        <HStack w={"max-content"}>
          {icon && icon}
          <Text fontSize="md">{icon && icon && formatValue(value, label)}</Text>
        </HStack>
      )}
      {children && children}
      <Text fontSize="sm" color={"gray.500"}>
        {label}
      </Text>
    </VStack>
  );
};
