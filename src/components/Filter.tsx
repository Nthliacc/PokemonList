import React, { useState } from 'react';
import { Flex, Input, Button } from "@chakra-ui/react";

interface FilterProps {
  onFilterChange: (value: string) => void;
}

const Filter = ({ onFilterChange }: FilterProps) => {
  const [filterValue, setFilterValue] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterValue(event.target.value);
  };

  const handleFilterClick = () => {
    if (filterValue === '') return;
    onFilterChange(filterValue);
  };

  return (
    <Flex justify="center" my={4}>
      <Input
        value={filterValue}
        onChange={handleInputChange}
        type="text"
        placeholder="Pesquisar Pokémon"
        mr={4}
        _focus={{ borderColor: "primary.900" }}
      />
      <Button
      onClick={handleFilterClick}
      _hover={{
        backgroundColor: "primary.900",
        color: "white",
      }}
      >Buscar</Button>
    </Flex>
  );
};

export default Filter;
