import { useEffect, useState } from "react"
import { StyleSheet, ScrollView } from "react-native"

import { Card } from "@/components/Card"

export type Pokemon = {
    id: number
    name: string
    url: string
}

export function ListScreen() {
    const [list, setList] = useState<Pokemon[]>([])

    async function getList() {
        const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151&offset=0')
        const data = await res.json()
        setList(data.results)
    }

    useEffect(() => {
        getList()
    }, [])

    return (
        <ScrollView>
            {list.map((i) => (
                <Card key={i.id} name={i.name} url={i.url} />
            ))}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        gap: 12,
    },
})
