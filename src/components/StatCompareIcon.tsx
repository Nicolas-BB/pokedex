import { ArrowDown, ArrowUp, Equal } from 'lucide-react-native'

type Props = {
    value: number
    opponentValue: number
}

export function StatCompareIcon({ value, opponentValue }: Props) {
    return opponentValue < value ?
        <ArrowUp color="#008000" size={12} /> :
        opponentValue > value ?
            <ArrowDown color="#ff0000" size={12} /> :
            <Equal color="#808080" size={12} />
}
