import { Image } from "expo-image";
import { Crown } from 'lucide-react-native'
import { Fragment } from "react";
import { StyleSheet, Text, View } from "react-native";

import { StatCompareIcon } from "@/components/StatCompareIcon";
import { Pokemon } from "@/types/pokemon";
import { getTotalStats } from "@/utils/pokemon";

type Props = {
    pokemon: Pokemon | null
    opponent: Pokemon | null
}

export function PokemonPanel({ pokemon, opponent }: Props) {
    return (
        <View style={styles.panel}>
            {pokemon ?
                (
                    <>
                        {opponent !== null && (
                            getTotalStats(pokemon) > getTotalStats(opponent) &&
                            <Crown style={styles.crownIcon} size={24} />
                        )}

                        <Image source={pokemon.sprites.front_default} style={styles.panelImage} />
                        <Text style={styles.panelName}>{pokemon.name}</Text>

                        {pokemon.stats.map((i, index) => (
                            <Fragment key={i.stat.name}>
                                <Text style={styles.statName}>
                                    {i.stat.name}
                                    {opponent !== null && (
                                        <StatCompareIcon value={i.base_stat} opponentValue={opponent.stats[index].base_stat} />
                                    )}
                                </Text>
                                <Text style={styles.statValue}>{i.base_stat}</Text>
                            </Fragment>
                        ))}

                        <Text style={styles.statName}>Total</Text>
                        <Text style={styles.statValue}>{getTotalStats(pokemon)}</Text>
                    </>
                ) : (
                    <Text style={styles.placeholder}>Selecione um pokemon</Text>
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    panel: {
        minHeight: 298,
        flexDirection: "row",
        flexWrap: "wrap",
        alignContent: "flex-start",
        padding: 12,
        borderRadius: 16,
        backgroundColor: "#fff",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.08)",
    },
    crownIcon: {
        top: 10,
        left: 10,
        position: "absolute",
        color: "#ecd172"
    },
    panelImage: {
        width: 96,
        height: 96,
        marginHorizontal: "auto",
        borderRadius: 48,
        backgroundColor: "#f5f5f7",
    },
    panelName: {
        width: "100%",
        marginTop: 6,
        marginBottom: 8,
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        textTransform: "capitalize",
        color: "#e3350d",
    },
    statName: {
        width: "70%",
        paddingVertical: 2,
        fontSize: 12,
        color: "#666",
        textTransform: "capitalize",
    },
    statValue: {
        width: "30%",
        paddingVertical: 2,
        fontSize: 12,
        fontWeight: "bold",
        textAlign: "right",
        color: "#222",
    },
    placeholder: {
        width: "100%",
        marginTop: 120,
        textAlign: "center",
        color: "#999",
    },
})
