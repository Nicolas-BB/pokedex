import { useLocalSearchParams } from "expo-router";

import { DetailsScreen } from "@/screens/DetailsScreen";

export default function PokemonRoute() {
    const { name } = useLocalSearchParams<{ name: string }>()

    return <DetailsScreen name={name} />
}
