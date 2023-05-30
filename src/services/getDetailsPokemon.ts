import axios from "axios";
import { firstLetterUpper } from "../utils/firstLetterUpper";
import { formatAbreviation } from "../utils/formatAbbreviation";

export const getDetailsPokemon = async (url: string) => {
  try {
    const { data } = await axios.get(`${url}`);

    const pokemon = data;
    const name = pokemon.name;
    const types = pokemon.types.map((type: { type: { name: string } }) => ({
      name: firstLetterUpper(type.type.name),
      color: colors[type.type.name],
    }));
    const abilities = pokemon.abilities.map(
      (ability: { ability: { name: any } }) => ({
        name: firstLetterUpper(ability.ability.name),
      })
    );
    const height = pokemon.height;
    const weight = pokemon.weight;
    const stats = await getBaseStats(pokemon.stats);

    const description = await getPokemonDescription(name);

    // const sprites = [
    //   pokemon.sprites.other["official-artwork"].front_default,
    //   pokemon.sprites.other["official-artwork"].back_default,
    //   pokemon.sprites.other["official-artwork"].front_shiny,
    //   pokemon.sprites.other["official-artwork"].back_shiny,
    //   pokemon.sprites.front_default,
    //   pokemon.sprites.back_default,
    //   pokemon.sprites.front_shiny,
    //   pokemon.sprites.back_shiny,
    // ]
    
    const spritesDefault = Object.entries(pokemon.sprites)
      .filter((item) => item[1] && typeof item[1] === "string")
      .map((item) => item[1]);

    const spritesArtwork = Object.entries(pokemon.sprites.other["official-artwork"]).map(
      (item) => item[1]
    )

    const sprites = [ `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`  ,...spritesDefault, ...spritesArtwork];

    return {
      name,
      types,
      abilities,
      height,
      weight,
      stats,
      sprites,
      description,
    };
  } catch (error) {
    console.error("Erro ao obter informações do Pokémon:", error);
  }
};

export const getPokemonDescription = async (pokemonName: string) => {
  try {
    const { data } = await axios.get(
      `https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`
    );
    const speciesData = data;

    const description = speciesData.flavor_text_entries.find(
      (entry: { language: { name: string } }) => entry.language.name === "en"
    ).flavor_text;

    // Remove os caracteres especiais (\f e \n) da descrição
    const cleanedDescription = description.replace(/[\f\n]/g, " ");

    // Remove os espaços excessivos
    const trimmedDescription = cleanedDescription.trim();

    // Substitui as tabulações por quebras de linha
    const formattedDescription = trimmedDescription.replace(/\s{2,}/g, "\n");

    return formattedDescription;
  } catch (error) {
    console.error("Erro ao obter descrição do Pokémon:", error);
    return "";
  }
};

const getBaseStats = async (stats: any) => {
  try {
    const baseStats = await Promise.all(
      stats.map(
        async (stat: {
          base_stat: number;
          effort: number;
          stat: { name: string; url: string };
        }) => {
          const maxStatValue = await getMaxStatValue(stat.stat.url);
          return {
            name: stat.stat.name,
            abbreviation: formatAbreviation(stat.stat.name),
            base_stat: stat.base_stat,
            maxStatValue: maxStatValue,
          };
        }
      )
    );
    return baseStats;
  } catch (error) {
    console.error("Erro ao obter estatísticas do Pokémon:", error);
    return [];
  }
};

const getMaxStatValue = async (statUrl: string) => {
  try {
    const response = await axios.get(statUrl);
    const maxStatValue = response.data.max_value;
    return maxStatValue;
  } catch (error) {
    console.log("Erro ao obter valor máximo do stat:", error);
    return null;
  }
};

const colors: { [key: string]: string } = {
  fire: "#FF6F6F",
  grass: "#74CB62",
  electric: "#FFED55",
  water: "#5BA9E6",
  ground: "#CDAF86",
  rock: "#A09F9D",
  fairy: "#F9AEFF",
  poison: "#8E598E",
  bug: "#A8D25B",
  dragon: "#4A3DA2",
  psychic: "#FFB8FF",
  flying: "#C8EFFF",
  fighting: "#A8574A",
  normal: "#D8D8D8",
};
