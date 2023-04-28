export default function Icon(tempProps: {used?: boolean}) {
    const props = {
        used: false,
        ...tempProps
    }
    return (
        <h2>{props.used ? "O" : "X"}</h2>
    )
}