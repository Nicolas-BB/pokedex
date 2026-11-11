import { useEffect, useState } from "react"
import { ScrollView, StyleSheet, Text, View, Pressable } from "react-native"

import { Card } from "@/components/Card"
import { PokemonList } from "@/types/pokemon"
import { router } from "expo-router"

export function ListScreen() {
    const [list, setList] = useState<PokemonList>([])
    const [error, setError] = useState<string>('')

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
                        <Card key={i.name} name={i.name} url={i.url} />
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
        paddingTop: 56,
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
