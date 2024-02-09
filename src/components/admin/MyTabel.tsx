import { MyComponentProps } from "../wrapper/UserWrapper"

export function Table({ children, className }: MyComponentProps) {
    return (
        <table className={"w-full border border-gray-300 text-[11px] " + className}>
            {children}
        </table>
    )
}

export function Tr({ children, className }: MyComponentProps) {
    return (
        <tr className={className}>
            {children}
        </tr>
    )
}

export function Thead({ children, className }: MyComponentProps) {
    return (
        <thead className={"text-center font-semibold uppercase text-gray-800 " + className}>
            {children}
        </thead>
    )
}

export function Th({ children, className }: MyComponentProps) {
    return (
        <th className={"p-1 border " + className}>
            {children}
        </th>
    )
}

export function Tbody({ children, className }: MyComponentProps) {
    return (
        <tbody className={className}>
            {children}
        </tbody>
    )
}

export function Td({ children, className }: MyComponentProps) {
    return (
        <td className={"p-2 border " + className}>
            {children}
        </td>
    )
}