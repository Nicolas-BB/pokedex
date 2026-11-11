import { useEffect, useState } from "react"
import { ScrollView, StyleSheet, Text, View, Pressable } from "react-native"

import { Card } from "@/components/Card"
import { fetchPokemonList } from "@/services/pokeapi"
import { PokemonList } from "@/types/pokemon"
import { router } from "expo-router"

export function ListScreen() {
    const [list, setList] = useState<PokemonList>([])
    const [error, setError] = useState<string>('')

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

    return (
        <>
            <Pressable
                style={styles.floatingButton}
                onPress={() => router.navigate('/compare')}
            >
                <Text style={styles.floatingButtonText}>Comparar</Text>
            </Pressable>
            <ScrollView style={styles.container} contentContainerStyle={styles.content}>

                {error ?
                    <View style={styles.errorBox}>
                        <Text style={styles.errorText}>{error}</Text>
                    </View> :
                    list.map((i) => (
                        <Card
                            key={i.name}
                            name={i.name}
                            url={i.url}
                            onPress={() => router.push({ pathname: '/pokemon/[name]', params: { name: i.name } })}
                        />
                    ))}
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f7",
    },
    content: {
        gap: 10,
        paddingHorizontal: 16,
        paddingTop: 24,
        paddingBottom: 86,
    },
    errorBox: {
        padding: 16,
        borderRadius: 12,
        backgroundColor: "#ffe3dc",
    },
    errorText: {
        textAlign: "center",
        color: "#e3350d",
    },
    floatingButton: {
        position: "absolute",
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: "#e3350d",
        padding: 16,
        borderRadius: 12,
        alignItems: "center",
        zIndex: 99,
    },
    floatingButtonText: {
        color: "#ffffff",
        fontWeight: "600"
    }
})
