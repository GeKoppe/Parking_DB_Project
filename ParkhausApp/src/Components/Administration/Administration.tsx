import LotCard from "./LotCard";

export default function Administration(tempProps?: {totalUsage?: number}) {
    const props = {
        totalUsage: 0,
        ...tempProps
    }
    let lotsInUse : number[] = [];

    for (let i = 0; i < props.totalUsage; i++) {
        let selected = Math.ceil(Math.random() * 180);

        while (true) {
            let isInUse = false;
            for (let j = 0; j < lotsInUse.length; j++) {
                if (selected === lotsInUse[j]) {
                    isInUse = true;
                    break;
                }
            }

            if (!isInUse) {
                lotsInUse.push(selected);
                break;
            }
        }
    }

    return (
        <div>
            <LotCard/>
        </div>
    );
}