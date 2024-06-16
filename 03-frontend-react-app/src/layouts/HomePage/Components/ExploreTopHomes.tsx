import { Link } from "react-router-dom"

export const ExploreTopHomes = () =>{
    return(
        <div className="p-5 mb-4 bg-dark header">
            <div className = 'container-fluid py-5 text-white d-flex justify-content-center align-items-center' >  
            <div>
                <h1 className="display-5 fw-bold"> Find your Next Home</h1>
                <p className = 'col-md-8 fs-4'> Where To Next?</p>
                <Link type='button' className='btn main-color btn-lg text-white' to="/search">Explore Top Homes</Link>
            </div>
            </div> 
            </div>
    )
}