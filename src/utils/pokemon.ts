import { Pokemon } from "@/types/pokemon";

export function getTotalStats(pokemon: Pokemon): number {
    return pokemon.stats.reduce((total, i) => total + i.base_stat, 0)
}
