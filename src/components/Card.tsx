import { Image } from "expo-image"
import { Pressable, StyleSheet, Text } from "react-native"

type Props = {
    name: string
    url: string
    onPress: () => void
}

export function Card({ name, url, onPress }: Props) {
    const id = url.split("/").filter(Boolean).pop()
    const sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`

    return (
        <Pressable style={({ pressed }) => [styles.card, pressed && styles.cardPressed]} onPress={onPress}>
            <Image source={sprite} style={styles.image} />
            <Text style={styles.id}>#{id}</Text>
            <Text style={styles.name}>{name}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        padding: 12,
        borderRadius: 16,
        backgroundColor: "#fff",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.08)",
    },
    cardPressed: {
        backgroundColor: "#ffe3dc",
    },
    image: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: "#f5f5f7",
    },
    id: {
        fontSize: 14,
        fontWeight: "600",
        color: "#999",
    },
    name: {
        fontSize: 18,
        fontWeight: "bold",
        textTransform: "capitalize",
        color: "#222",
    },
})
