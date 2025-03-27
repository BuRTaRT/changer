import {useEffect, useState} from 'react';
import Application from "./Application/Application";
import s from './myApplications.module.css'
import * as SVGLoaders from "svg-loaders-react";
import ReactPaginate from "react-paginate";
import {useDispatch, useSelector} from "react-redux";
import {getDatas} from "../../store/dataBaseSlice.js";


const MyApplications = () => {
    const [isFetching, setIsFetching] = useState(true)
    const transactions = useSelector(state => state.dataBase.transactions);
    const dispatch = useDispatch();


    useEffect(() => {
    dispatch(getDatas()).then(()=>setIsFetching(false))
    }, [])
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 10;
    const pageCount = Math.ceil(transactions.length / itemsPerPage)

    const handlePageClick = ({selected}) => {
        setCurrentPage(selected);
    };

    let elems = transactions.map((item) => {
        return <Application key={item.id}
                            id={item.id}
                            giveImage={item.giveCrypto.image}
                            getImage={item.getCrypto.image}
                            givesum={item.giveCrypto.giveSum}
                            getsum={item.getCrypto.getSum}
                            stage={item.stage}
                            give={item.giveCrypto}
                            get={item.getCrypto}
                            operationNumber={item.n}
        />
    })
    const currentItems = elems.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
    const elementsExists = elems.length < 1 ? <div>
            <p>У вас пока нету заявок</p>
        </div> :
        <div>
            <ol className={s.ol}>
                {currentItems}
            </ol>
        </div>
    return (
        <div id={"top"} className='container'>
            <div className={s.my_applications_container}>
                <h2 className={s.header}>Мои заявки</h2>
                {isFetching ? <SVGLoaders.Oval width={'60px'} stroke="#278DF9"/> : elementsExists}
            </div>
            {pageCount > 1 && <ReactPaginate
                previousLabel={"предыдущие"}
                nextLabel={"следующие"}
                breakLabel={"..."}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                activeClassName={"active"}
            />}
        </div>
    );
};

export default MyApplications;