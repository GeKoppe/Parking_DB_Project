import '../Administration.css';
import PagingButton from './Comps/PagingButton';
import PageCounter from './Comps/PageCounter';

export default function Paging(tempProps: {clickHandler: (up: boolean) => void, currentPage: number}) {
    const props = {
        ...tempProps   
    }

    return (
        <div className='paging'>
            <PagingButton up={true} clickHandler={props.clickHandler}/>
            <br/>
            <PageCounter page={props.currentPage}/>
            <br/>
            <PagingButton up={false} clickHandler={props.clickHandler}/>
        </div>
    )
}