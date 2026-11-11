import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { fetchPokemon } from "@/services/pokeapi";
import { Pokemon } from "@/types/pokemon";
import { getTotalStats } from "@/utils/pokemon";

type Props = {
    name: string
}

export function DetailsScreen({ name }: Props) {
    const [pokemon, setPokemon] = useState<Pokemon | null>(null)
    const [error, setError] = useState<string>("")

    async function getPokemonInfo() {
        try {
            setPokemon(await fetchPokemon(name))
        } catch (e) {
            setError('Não foi possível buscar o Pokemon')
        }
    }

    useEffect(() => {
        getPokemonInfo()
    }, [name])

    if (error) {
        return (
            <View style={styles.errorBox}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        )
    }

    if (!pokemon) {
        return <Text style={styles.loading}>Carregando...</Text>
    }

    return (
        <ScrollView contentContainerStyle={styles.content}>
            <View style={styles.header}>
                <Image source={pokemon.sprites.front_default} style={styles.image} />
                <Text style={styles.id}>#{pokemon.id}</Text>
                <Text style={styles.name}>{pokemon.name}</Text>

                <View style={styles.types}>
                    {pokemon.types.map((i) => (
                        <Text key={i.type.name} style={styles.type}>{i.type.name}</Text>
                    ))}
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Informações</Text>
                <View style={styles.row}>
                    <Text style={styles.label}>Altura</Text>
                    <Text style={styles.value}>{pokemon.height / 10} m</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Peso</Text>
                    <Text style={styles.value}>{pokemon.weight / 10} kg</Text>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Stats</Text>
                {pokemon.stats.map((i) => (
                    <View key={i.stat.name} style={styles.row}>
                        <Text style={styles.label}>{i.stat.name}</Text>
                        <Text style={styles.value}>{i.base_stat}</Text>
                    </View>
                ))}
                <View style={styles.row}>
                    <Text style={styles.label}>Total</Text>
                    <Text style={styles.value}>{getTotalStats(pokemon)}</Text>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    content: {
        gap: 12,
        padding: 16,
    },
    loading: {
        marginTop: 40,
        textAlign: "center",
        color: "#999",
    },
    errorBox: {
        margin: 16,
        padding: 16,
        borderRadius: 12,
        backgroundColor: "#ffe3dc",
    },
    errorText: {
        textAlign: "center",
        color: "#e3350d",
    },

    // Cabeçalho
    header: {
        alignItems: "center",
        padding: 16,
        borderRadius: 16,
        backgroundColor: "#fff",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.08)",
    },
    image: {
        width: 160,
        height: 160,
        borderRadius: 80,
        backgroundColor: "#f5f5f7",
    },
    id: {
        marginTop: 8,
        fontSize: 14,
        fontWeight: "600",
        color: "#999",
    },
    name: {
        fontSize: 26,
        fontWeight: "bold",
        textTransform: "capitalize",
        color: "#e3350d",
    },
    types: {
        flexDirection: "row",
        gap: 6,
        marginTop: 8,
    },
    type: {
        paddingVertical: 4,
        paddingHorizontal: 12,
        borderRadius: 999,
        overflow: "hidden",
        backgroundColor: "#ffe3dc",
        color: "#e3350d",
        fontWeight: "600",
        textTransform: "capitalize",
    },

    // Seções
    section: {
        padding: 16,
        borderRadius: 16,
        backgroundColor: "#fff",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.08)",
    },
    sectionTitle: {
        marginBottom: 8,
        fontSize: 16,
        fontWeight: "bold",
        color: "#222",
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 4,
    },
    label: {
        color: "#666",
        textTransform: "capitalize",
    },
    value: {
        fontWeight: "bold",
        color: "#222",
    },
})
