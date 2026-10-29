import { Image } from "expo-image"
import { StyleSheet, Text, View } from "react-native"

type Props = {
    name: string
    url: string
}

export function Card({ name, url }: Props) {
    const id = url.split("/").filter(Boolean).pop()
    const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`

    return (
        <View style={styles.card}>
            <Image source={image} style={styles.image} />
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
        borderRadius: 12,
        backgroundColor: "#f2f2f2",
    },
    image: {
        width: 64,
        height: 64,
    },
    id: {
        color: "#888",
    },
    name: {
        fontSize: 18,
        fontWeight: "bold",
        textTransform: "capitalize",
    },
})
