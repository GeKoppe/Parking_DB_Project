import '../../Administration.css'

export default function PagingButton(tempProps: {up?: boolean, clickHandler: (up: boolean) => void}) {
    const props = {
        up: true,
        ...tempProps
    }

    return (
        <button className="pageButton" onClick={() => props.clickHandler(props.up)}><h1>{props.up? "^": "v"}</h1></button>
    )

}