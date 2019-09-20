import { PokemonType } from './pokemon-type.model';

export interface Pokemon {
  id: number;
  name: string;
  description?: string;
  height?: number;
  weight?: number;
  types?: PokemonType[];
}
