export type PokemonList = {
    name: string
    url: string
}[]

export type Pokemon = {
    id: string
    name: string
    stats: {
        base_stat: number
        stat: {
            name: string
        }
    }[]
    sprites: {
        front_default: string
    }
    height: number
    weight: number
    types: {
        slot: number
        type: {
            name: string
        }
    }[]
}
