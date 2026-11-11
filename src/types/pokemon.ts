export type PokemonList = {
    name: string
    url: string
}[]

export type Pokemon = {
    id: string
    name: string
    stats: [
        {
            base_stat: string
            stat: {
                name: string
            }
        }
    ]
    sprites: {
        front_default: string
    }
}
