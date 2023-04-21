

function FreeLotsCard(props : {
    freeSpaces: number,
    totalSpaces: number,
    permanentParkSpaces: number,
    freePermanentParkSpaces: number
}) {
    let letterColor = 'color:';
    let usedPercentage: number = props.freeSpaces / props.totalSpaces;
    if (usedPercentage > 0.7) {
        letterColor += 'green';
    } else if (usedPercentage > 0.3) {
        letterColor += 'yellow';
    } else {
        letterColor += 'red';
    }

    let style = {'color': letterColor};
    return (
        <>
        <h2 style={style}>
            Hello
        </h2>
        </>
    )
}

FreeLotsCard.defaultProps = {
    freeSpaces: 20,
    totalSpaces: 180,
    permanentParkSpaces: 40,
    freePermanentParkSpaces: 40
}

export default FreeLotsCard;