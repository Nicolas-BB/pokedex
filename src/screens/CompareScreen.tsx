import { Pokemon, PokemonList } from "@/types/pokemon";
import { Image } from "expo-image";
import { Fragment, useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export function CompareScreen() {
    const [list, setList] = useState<PokemonList>()
    const [pokemon1, setPokemon1] = useState<Pokemon | null>(null)
    const [pokemon2, setPokemon2] = useState<Pokemon | null>(null)
    const [error, setError] = useState<string>("")

    async function getList() {
        try {
            const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151&offset=0')
            const data = await res.json()
            setList(data.results)
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
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
            const data = await res.json()

            return data as Pokemon
        } catch (e) {
            setError('Não foi possível buscar o Pokemon')

            return null
        }
    }

    function getTotalStats(pokemon: Pokemon): number {
        return pokemon.stats.reduce((total, i) => total + parseInt(i.base_stat), 0)
    }

    return (
        <View style={styles.container}>
            <View style={styles.column}>
                <View style={styles.panel}>
                    {pokemon1 ?
                        (
                            <>
                                <Image source={pokemon1.sprites.front_default} style={styles.panelImage} />
                                <Text style={styles.panelName}>{pokemon1?.name}</Text>
                                {pokemon1?.stats.map((i) => (
                                    <Fragment key={i.stat.name}>
                                        <Text style={styles.statName}>{i.stat.name}</Text>
                                        <Text style={styles.statValue}>{i.base_stat}</Text>
                                    </Fragment>
                                ))}
                                <Text style={styles.statName}>Total</Text>
                                <Text style={styles.statValue}>{getTotalStats(pokemon1)}</Text>
                            </>
                        ) :
                        (
                            <Text style={styles.placeholder}>Selecione um pokemon</Text>
                        )
                    }
                </View>
                <ScrollView style={styles.list} contentContainerStyle={styles.listContent}>
                    {error ?
                        <Text style={styles.error}>{error}</Text> :
                        list?.map((i) => {
                            const id = i.url.split("/").filter(Boolean).pop()
                            const sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
                            return (<Pressable key={i.name} style={({ pressed }) => [styles.card, pressed && styles.cardPressed]} onPress={() => choose('pokemon1', i.name)}>
                                <Image source={sprite} style={styles.image} />
                                <Text style={styles.id}>#{id}</Text>
                                <Text style={styles.name}>{i.name}</Text>
                            </Pressable>)
                        })}
                </ScrollView>
            </View>
            <View style={styles.column}>
                <View style={styles.panel}>
                    {pokemon2 ?
                        (
                            <>
                                <Image source={pokemon2.sprites.front_default} style={styles.panelImage} />
                                <Text style={styles.panelName}>{pokemon2?.name}</Text>
                                {pokemon2?.stats.map((i) => (
                                    <Fragment key={i.stat.name}>
                                        <Text style={styles.statName}>{i.stat.name}</Text>
                                        <Text style={styles.statValue}>{i.base_stat}</Text>
                                    </Fragment>
                                ))}
                                <Text style={styles.statName}>Total</Text>
                                <Text style={styles.statValue}>{getTotalStats(pokemon2)}</Text>
                            </>
                        ) : (
                            <Text style={styles.placeholder}>Selecione um pokemon</Text>
                        )
                    }
                </View>
                <ScrollView style={styles.list} contentContainerStyle={styles.listContent}>
                    {error ?
                        <Text style={styles.error}>{error}</Text> :
                        list?.map((i) => {
                            const id = i.url.split("/").filter(Boolean).pop()
                            const sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
                            return (<Pressable key={i.name} style={({ pressed }) => [styles.card, pressed && styles.cardPressed]} onPress={() => choose('pokemon2', i.name)}>
                                <Image source={sprite} style={styles.image} />
                                <Text style={styles.id}>#{id}</Text>
                                <Text style={styles.name}>{i.name}</Text>
                            </Pressable>)
                        })}
                </ScrollView>
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

    // Painel do pokemon selecionado
    panel: {
        minHeight: 298,
        flexDirection: "row",
        flexWrap: "wrap",
        alignContent: "flex-start",
        padding: 12,
        borderRadius: 16,
        backgroundColor: "#fff",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.08)",
    },
    panelImage: {
        width: 96,
        height: 96,
        marginHorizontal: "auto",
        borderRadius: 48,
        backgroundColor: "#f5f5f7",
    },
    panelName: {
        width: "100%",
        marginTop: 6,
        marginBottom: 8,
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        textTransform: "capitalize",
        color: "#e3350d",
    },
    statName: {
        width: "70%",
        paddingVertical: 2,
        fontSize: 12,
        color: "#666",
        textTransform: "capitalize",
    },
    statValue: {
        width: "30%",
        paddingVertical: 2,
        fontSize: 12,
        fontWeight: "bold",
        textAlign: "right",
        color: "#222",
    },
    placeholder: {
        width: "100%",
        marginTop: 120,
        textAlign: "center",
        color: "#999",
    },

    // Lista de escolha
    list: {
        flex: 1,
    },
    listContent: {
        gap: 6,
        paddingBottom: 16,
    },
    card: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        paddingVertical: 4,
        paddingHorizontal: 6,
        borderRadius: 12,
        backgroundColor: "#fff",
    },
    cardPressed: {
        backgroundColor: "#ffe3dc",
    },
    image: {
        width: 48,
        height: 48,
    },
    id: {
        fontSize: 12,
        color: "#999",
    },
    name: {
        flexShrink: 1,
        fontSize: 14,
        fontWeight: "600",
        textTransform: "capitalize",
        color: "#222",
    },
    error: {
        padding: 12,
        textAlign: "center",
        color: "#e3350d",
    },
})
