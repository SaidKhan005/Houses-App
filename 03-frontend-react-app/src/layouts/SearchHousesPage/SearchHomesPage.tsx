import { useState, useEffect } from "react";
import HouseModel from "../../models/HouseModel";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { SearchHome } from "./components/SearchHome";
import { Pagination } from "../Utils/Pagination";


export const SearchHomesPage = () => {

    const [houses, setHouses] = useState<HouseModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    {/*consts for pagination*/ }
    const [currentPage, setCurrentPage] = useState(1);
    const [housesPerPage] = useState(5);
    const [totalAmountOfHouses, setTotalAmmountOfHouses] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    {/*consts for search bar searching*/ }
    const [search, setSearch] = useState('');
    const [searchUrl, setSearchUrl] = useState('');

    {/*consts for Category searching*/ }
    const [categorySelection, setCategorySelction] = useState('House category');

    useEffect(() => { //use effect calls api's from the spring backend server
        const fetchHouses = async () => {
            const baseUrl: string = "http://localhost:8080/api/houses";

            let url: string = '';

            if (searchUrl === '') {
                url = `${baseUrl}?page=${currentPage - 1}&size=${housesPerPage}`; /*this dictates us getting 9 items from the api
                -1 coz pagination starts ar 0*/
            } else {
                let searchWithPage = searchUrl.replace('<pageNumber>' , `${currentPage - 1}`)
                url = baseUrl + searchWithPage;
            }

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const responseJson = await response.json();

            const responseData = responseJson._embedded.houses;

            setTotalAmmountOfHouses(responseJson.page.totalElements);
            setTotalPages(responseJson.page.totalPages); {/*takes total pages and elements from spring api response*/ }

            const loadedHouses: HouseModel[] = [];

            for (const key in responseData) {
                loadedHouses.push({
                    id: responseData[key].id,
                    title: responseData[key].title,
                    landLord: responseData[key].landLord,
                    description: responseData[key].description,
                    viewingSlots: responseData[key].viewingSlots,
                    viewingSlotsAvailable: responseData[key].viewingSlotsAvailable,
                    category: responseData[key].category,
                    img: responseData[key].img,
                });
            }

            setHouses(loadedHouses);
            setIsLoading(false);

        };
        fetchHouses().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        })
        window.scrollTo(0, 0); {/*scroll to top on pagination*/ }
    }, [currentPage, searchUrl]); {/*call use effect again eachtime current page changes*/ }

    if (isLoading) {
        return (
            <SpinnerLoading />
        )
    };

    if (httpError) {
        return (
            <div className="container m-5">
                <p>{httpError}</p>
            </div>
        )
    };

    const searchHandleChange = () => {
        setCurrentPage(1);
        if (search === '') {
            setSearchUrl('')
        } else {
            setSearchUrl(`/search/findByTitleContaining?title=${search}&page=<pageNumber>&size=${housesPerPage}`)
        }
        setCategorySelction('House category')
    }

    const categoryField = (value: string) => {
        setCurrentPage(1);
        if (value.toLowerCase() === 'fe'||
        value.toLowerCase() === 'be'||
        value.toLowerCase() === 'data'||
        value.toLowerCase() === 'devops'
    ) {
            setCategorySelction(value);
            setSearchUrl(`/search/findByCategory?category=${value}&page=<pageNumber>&size=${housesPerPage}`)
        } else {
            setCategorySelction('All');
            setSearchUrl(`?page=<pageNmuber>&size=${housesPerPage}`)
        }
    }

    const indexOfLastHouse: number = currentPage * housesPerPage;
    const indexOfFirstHouse: number = indexOfLastHouse - housesPerPage;
    let lastItem = housesPerPage * currentPage <= totalAmountOfHouses ?
        housesPerPage * currentPage : totalAmountOfHouses;

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div>
            <div className='container'>
                <div>
                    <div className='row mt-5'>
                        <div className='col-6'>
                            <div className='d-flex'>
                                <input className='form-control me-2' type='search'
                                    placeholder='Search' aria-labelledby='Search'
                                    onChange={e => setSearch(e.target.value)} />
                                <button className='btn btn-outline-success'
                                    onClick={() => searchHandleChange()}>
                                    Search
                                </button>
                            </div>
                        </div>
                        <div className='col-4'>
                            <div className='dropdown'>
                                <button className='btn btn-secondary dropdown-toggle' type='button'
                                    id='dropdownMenuButton1' data-bs-toggle='dropdown'
                                    aria-expanded='false'>
                                    {categorySelection}
                                </button>
                                <ul className='dropdown-menu' aria-labelledby='dropdownMenuButton1'>
                                    <li onClick={()=>categoryField('All')}>
                                        <a className='dropdown-item' href='#'>
                                            All
                                        </a>
                                    </li>
                                    <li onClick={()=>categoryField('fe')}>
                                        <a className='dropdown-item' href='#'>
                                            Front End
                                        </a>
                                    </li>
                                    <li onClick={()=>categoryField('be')}>
                                        <a className='dropdown-item' href='#'>
                                            Back End
                                        </a>
                                    </li>
                                    <li onClick={()=>categoryField('data')}>
                                        <a className='dropdown-item' href='#'>
                                            Data
                                        </a>
                                    </li>
                                    <li onClick={()=>categoryField('devops')}>
                                        <a className='dropdown-item' href='#'>
                                            DevOps
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {totalAmountOfHouses > 0 ? //ternary operator. if else for a dom rendering
                        <>
                            <div className='mt-3'>
                                <h5>Number of results: (22)</h5>
                            </div>
                            <p>
                                {indexOfFirstHouse + 1} to {lastItem} of {totalAmountOfHouses} items:
                            </p>
                            {houses.map(house => (
                                <SearchHome house={house} key={house.id} />
                            ))}
                        </>
                        : //else to ternary operator
                        <div className="m-5">
                            <h3>Can't find what you're looking for?</h3>

                            <a type='button' className='btn main-color btn-md px-4 me-md-2 fw-bold text-white' href="#">
                                House Rental Services
                            </a>
                        </div>
                    }
                    {/*only render pagination id total pages greater than 1*/}
                    {totalPages > 1 &&
                        <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
                    }


                </div>
            </div>
        </div>
    );
}