

export default function InfoPage(tempProps?:{lotNr?: number}) {
    // For now, I just generate stuff randomly, later this will be replaced by an API call with the lotNr
    const props = {
        lotNr: -1,
        ...tempProps
    }

    return (
        <div className="InfoContainer">
            
        </div>
    )
}