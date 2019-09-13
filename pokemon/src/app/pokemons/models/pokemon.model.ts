export type PokemonType = string;

export interface Pokemon {
  id: number;
  name: string;
  description?: string;
  height?: number;
  weight?: number;
  types?: PokemonType[];
}

export interface PaginatedData<T> {
  data: T[];
  offset: number;
  limit: number;
}

export type PaginatedPokemon = PaginatedData<Pokemon>;
