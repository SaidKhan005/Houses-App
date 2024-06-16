import { useEffect, useState } from "react";
import { SpinnerLoading } from '../../Utils/SpinnerLoading';
import { Pagination } from '../../Utils/Pagination';
import HouseModel from "../../../models/HouseModel";
import { ChangeQuantityOfHouse } from "./ChangeQuantityOfHouse";


export const ChangeQuantityOfHouses = () => {

    const [houses, setHouses] = useState<HouseModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [housesPerPage] = useState(5);
    const [totalAmountOfHouses, setTotalAmountOfHouses] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const [houseDelete, setHouseDelete] = useState(false);

    useEffect(() => {
        const fetchBooks = async () => {
            const baseUrl: string = `http://localhost:8080/api/houses?page=${currentPage - 1}&size=${housesPerPage}`;

            const response = await fetch(baseUrl);

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const responseJson = await response.json();

            const responseData = responseJson._embedded.houses;

            setTotalAmountOfHouses(responseJson.page.totalElements);
            setTotalPages(responseJson.page.totalPages);

            const loadedBooks: HouseModel[] = [];

            for (const key in responseData) {
                loadedBooks.push({
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

            setHouses(loadedBooks);
            setIsLoading(false);
        };
        fetchBooks().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        })
    }, [currentPage, houseDelete]);

    const indexOfLastHouse: number = currentPage * housesPerPage;
    const indexOfFirstHouse: number = indexOfLastHouse - housesPerPage;
    let lastItem = housesPerPage * currentPage <= totalAmountOfHouses ?
        housesPerPage * currentPage : totalAmountOfHouses;

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const deleteHouse = () => setHouseDelete(!houseDelete);

    if (isLoading) {
        return (
            <SpinnerLoading/>
        );
    }

    if (httpError) {
        return (
            <div className='container m-5'>
                <p>{httpError}</p>
            </div>
        );
    }

    return (
        <div className='container mt-5'>
            {totalAmountOfHouses > 0 ?
                <>
                    <div className='mt-3'>
                        <h3>Number of results: ({totalAmountOfHouses})</h3>
                    </div>
                    <p>
                        {indexOfFirstHouse + 1} to {lastItem} of {totalAmountOfHouses} items: 
                    </p>
                    {houses.map(house => (
                      <ChangeQuantityOfHouse house={house} key={house.id} deleteHouse={deleteHouse}/>
                    ))}
                </>
                :
                <h5>Add a book before changing quantity</h5>
            }
            {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate}/>}
        </div>
    );
}