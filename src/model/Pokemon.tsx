export interface Pokemon {
    name: string;
    imageURLDefault: string;
    types: string[];
    id: number;
    description: string;
    height: number;
    weight: number;
    stats: {
        hp: number;
        attack: number;
        defense: number;
        specialAttack: number;
        specialDefense: number;
        speed: number;
    };
    sprites: [];
    url: string;
}