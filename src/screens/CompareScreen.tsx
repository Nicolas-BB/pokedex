import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import { PokemonPanel } from "@/components/PokemonPanel";
import { PokemonPicker } from "@/components/PokemonPicker";
import { fetchPokemon, fetchPokemonList } from "@/services/pokeapi";
import { Pokemon, PokemonList } from "@/types/pokemon";

export function CompareScreen() {
    const [list, setList] = useState<PokemonList>()
    const [pokemon1, setPokemon1] = useState<Pokemon | null>(null)
    const [pokemon2, setPokemon2] = useState<Pokemon | null>(null)
    const [error, setError] = useState<string>("")

    async function getList() {
        try {
            setList(await fetchPokemonList())
        } catch (e) {
            setError('Não foi possível buscar a lista de pokemons')
        }
    }

    useEffect(() => {
        getList()
    }, [])

    async function choose(target: 'pokemon1' | 'pokemon2', name: string) {
        const pokemon = await getPokemonInfo(name)

        if (target === 'pokemon1') {
            setPokemon1(pokemon)
        }
        if (target === 'pokemon2') {
            setPokemon2(pokemon)
        }
    }

    async function getPokemonInfo(name: string): Promise<Pokemon | null> {
        try {
            return await fetchPokemon(name)
        } catch (e) {
            setError('Não foi possível buscar o Pokemon')

            return null
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.column}>
                <PokemonPanel pokemon={pokemon1} opponent={pokemon2} />
                <PokemonPicker list={list} error={error} onSelect={(name) => choose('pokemon1', name)} />
            </View>
            <View style={styles.column}>
                <PokemonPanel pokemon={pokemon2} opponent={pokemon1} />
                <PokemonPicker list={list} error={error} onSelect={(name) => choose('pokemon2', name)} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        gap: 8,
        padding: 8,
        backgroundColor: "#f5f5f7",
    },
    column: {
        flex: 1,
        gap: 8,
    },
})
