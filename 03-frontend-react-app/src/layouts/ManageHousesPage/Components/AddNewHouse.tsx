import { useOktaAuth } from '@okta/okta-react';
import { useState } from 'react';
import AddHouseRequest from '../../../models/AddHouseRequest';


export const AddNewHouse = () => {

    const { authState } = useOktaAuth();

    // New Book
    const [title, setTitle] = useState('');
    const [landLord, setLandLord] = useState('');
    const [description, setDescription] = useState('');
    const [viewingSlots, setViewingSlots] = useState(0);
    const [category, setCategory] = useState('Category');
    const [selectedImage, setSelectedImage] = useState<any>(null);

    // Displays
    const [displayWarning, setDisplayWarning] = useState(false);
    const [displaySuccess, setDisplaySuccess] = useState(false);

    function categoryField(value: string) {
        setCategory(value);
    }

    async function base64ConversionForImages(e: any) {
        if (e.target.files[0]) {
            getBase64(e.target.files[0]);
        }
    }

    function getBase64(file: any) {
        let reader = new FileReader();
        // converts to base 64
        reader.readAsDataURL(file);
        reader.onload = function () {
            setSelectedImage(reader.result);
        };
        reader.onerror = function (error) {
            console.log('Error', error);
        }
    }

    async function submitNewHouse() {
        const url = `http://localhost:8080/api/admin/secure/add/house`;
        if (authState?.isAuthenticated && title !== '' && landLord !== '' && category !== 'Category' 
            && description !== '' && viewingSlots >= 0) {
                
                // these attributes are got from the react on change functions implemented in the html below 
                const book: AddHouseRequest = new AddHouseRequest(title, landLord, description, viewingSlots, category);
                book.img = selectedImage;
                const requestOptions = {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(book)
                };

                const submitNewHouseResponse = await fetch(url, requestOptions);
                if (!submitNewHouseResponse.ok) {
                    throw new Error('Something went wrong!');
                }
                setTitle('');
                setLandLord('');
                setDescription('');
                setViewingSlots(0);
                setCategory('Category');
                setSelectedImage(null);
                setDisplayWarning(false);
                setDisplaySuccess(true);
            } else {
                setDisplayWarning(true);
                setDisplaySuccess(false);
            }
    }

    return (
        <div className='container mt-5 mb-5'>
            {displaySuccess && 
                <div className='alert alert-success' role='alert'>
                   House added successfully
                </div>
            }
            {displayWarning && 
                <div className='alert alert-danger' role='alert'>
                    All fields must be filled out
                </div>
            }
            <div className='card'>
                <div className='card-header'>
                    Add a new House
                </div>
                <div className='card-body'>
                    <form method='POST'>
                        <div className='row'>
                            <div className='col-md-6 mb-3'>
                                <label className='form-label'>Title</label>
                                <input type="text" className='form-control' name='title' required 
                                    onChange={e => setTitle(e.target.value)} value={title} />
                            </div>
                            <div className='col-md-3 mb-3'>
                                <label className='form-label'> Author </label>
                                <input type="text" className='form-control' name='author' required 
                                    onChange={e => setLandLord(e.target.value)} value={landLord}/>
                            </div>
                            <div className='col-md-3 mb-3'>
                                <label className='form-label'> Category</label>
                                <button className='form-control btn btn-secondary dropdown-toggle' type='button' 
                                    id='dropdownMenuButton1' data-bs-toggle='dropdown' aria-expanded='false'>
                                        {category}
                                </button>
                                <ul id='addNewBookId' className='dropdown-menu' aria-labelledby='dropdownMenuButton1'>
                                    <li><a onClick={() => categoryField('1 Bedroom')} className='dropdown-item'>1 Bedroom</a></li>
                                    <li><a onClick={() => categoryField('2 Bedrooms')} className='dropdown-item'>2 Bedrooms</a></li>
                                    <li><a onClick={() => categoryField('3 Bedrooms')} className='dropdown-item'>3 Bedrooms</a></li>
                                    <li><a onClick={() => categoryField('4 Bedrooms')} className='dropdown-item'>4 Bedrooms</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className='col-md-12 mb-3'>
                            <label className='form-label'>Description</label>
                            <textarea className='form-control' id='exampleFormControlTextarea1' rows={3} 
                                onChange={e => setDescription(e.target.value)} value={description}></textarea>
                        </div>
                        <div className='col-md-3 mb-3'>
                            <label className='form-label'>Viewing Slots</label>
                            <input type='number' className='form-control' name='Copies' required 
                                onChange={e => setViewingSlots(Number(e.target.value))} value={viewingSlots}/>
                        </div>
                        <input type='file' onChange={e => base64ConversionForImages(e)}/>
                        <div>
                            <button type='button' className='btn btn-primary mt-3' onClick={submitNewHouse}>
                                Add House
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}