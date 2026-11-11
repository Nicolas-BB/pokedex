import { Image } from "expo-image";
import { Pressable, ScrollView, StyleSheet, Text } from "react-native";

import { PokemonList } from "@/types/pokemon";

type Props = {
    list?: PokemonList
    error: string
    onSelect: (name: string) => void
}

export function PokemonPicker({ list, error, onSelect }: Props) {
    return (
        <ScrollView style={styles.list} contentContainerStyle={styles.listContent}>
            {error ?
                <Text style={styles.error}>{error}</Text> :
                list?.map((i) => {
                    const id = i.url.split("/").filter(Boolean).pop()
                    const sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
                    return (
                        <Pressable key={i.name} style={({ pressed }) => [styles.card, pressed && styles.cardPressed]} onPress={() => onSelect(i.name)}>
                            <Image source={sprite} style={styles.image} />
                            <Text style={styles.id}>#{id}</Text>
                            <Text style={styles.name}>{i.name}</Text>
                        </Pressable>
                    )
                })}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
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
