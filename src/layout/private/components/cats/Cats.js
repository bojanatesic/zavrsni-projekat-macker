import React, { useState, useEffect } from 'react';
import './CatList.css'
import { getCatBreeds} from '../../../../services/Cat_service';
import InputCat from './InputCat';
import SelectCat from './SelectCat';
import CatList from './CatList';
import PaginationCat from './PaginationCat';

const Cats = () => {

    const [cats, setCats] = useState([]);
    const [subArray, setSubArray] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const catPerPage = 12
    const [subChangeArray, setSubChangeArray] = useState([])

    useEffect(() => {
        getCatBreeds().then(data => {
            setCats(data)
            setSubChangeArray(data)
        })
    }, [])

    const handleChange = (e) => {
        let selected = e.target.value;
        if (selected === "all") {
            setSubChangeArray(cats);
        } else {
            let filtered = cats.filter(el => el.origin === selected);
            setSubChangeArray(filtered)
        }
    }

    const setPage = (page) => {
        setCurrentPage(page)
        return
    }

    const handleInput = (e) => {
        if (e.target.value === '') {
            return setSubArray([])
        }
        let filteredInput = cats.filter(el => el.name.includes(e.target.value));
        setSubArray(filteredInput)
    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    return (
        <div>
            <div className="div-all">
            <div className="div-input">
                <p><b>Find more info about your favorite cat</b></p>
            <InputCat handleInput={handleInput} />
            </div>
            <div className="div-select">
            <SelectCat handleChange={handleChange} cats={cats} />
            </div>
            </div>
            {subArray.length > 0 ? <CatList cats={subArray} currentPage={1} catPerPage={catPerPage} />
                : <CatList cats={subChangeArray} currentPage={currentPage} catPerPage={catPerPage} />}
            <PaginationCat catPerPage={catPerPage} cats={cats} setPage={setPage} />
            <button onClick={() => { scrollToTop() }}>Top</button>
        </div>
    )
}
export default Cats