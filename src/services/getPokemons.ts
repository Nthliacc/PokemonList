import axios from "axios";
import { firstLetterUpper } from "../utils/firstLetterUpper";
import { extractID } from "../utils/extractID";

const getPokemons = async ({
  filter,
  limit,
  offset,
}: {
  filter: any;
  limit: number;
  offset: number;
}) => {
  try {
    let url = `https://pokeapi.co/api/v2/pokemon`;

    if (filter) {
      url = `https://pokeapi.co/api/v2/pokemon/${filter}`;
    }
    const params = {
      limit,
      offset,
    };

    let { data } = await axios.get(url, { params });

    if (filter) {
      data = { results: [data] };
    }

    const prettierData = data.results.map(
      (pokemon: { name: string; url: string, id: string | undefined }) => {
        const id = pokemon.id ? pokemon.id : extractID(pokemon.url);
        const url = pokemon.url ? pokemon.url : `https://pokeapi.co/api/v2/pokemon/${id}`;
        const name = firstLetterUpper(pokemon.name);
        const imageURLDefault = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
        
        return { ...pokemon, id, name, imageURLDefault, url };
      }
    );

    return prettierData;
  } catch (error) {
    console.error("Erro ao obter a lista de pokémons:", error);
    return [];
  }
};

export default getPokemons;
