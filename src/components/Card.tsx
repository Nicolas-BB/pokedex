import { Image } from "expo-image"
import { StyleSheet, Text, View } from "react-native"

type Props = {
    name: string
    url: string
}

export function Card({ name, url }: Props) {
    const id = url.split("/").filter(Boolean).pop()
    const sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`

    return (
        <View style={styles.card}>
            <Image source={sprite} style={styles.image} />
            <Text style={styles.id}>#{id}</Text>
            <Text style={styles.name}>{name}</Text>
        </View>
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
