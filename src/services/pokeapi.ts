import { Pokemon, PokemonList } from "@/types/pokemon";

export async function fetchPokemonList(): Promise<PokemonList> {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151&offset=0')
    const data = await res.json()

    return data.results
}

export async function fetchPokemon(name: string): Promise<Pokemon> {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    const data = await res.json()

    return data
}
