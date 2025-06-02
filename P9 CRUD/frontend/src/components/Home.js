import React, { useEffect, useState } from 'react';
import './Home.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
    const [Home, setHome] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8081/')
            .then(res => setHome(res.data))
            .catch(err => console.log(err));
    }, []);

    const handleDelete = async(id) => {
        try {
            await axios.delete('http://localhost:8081/Artgallery/' + id);
            window.location.reload();
        }
        catch(err){
            console.log(err);
        }
    }

    return (
        <div className='d-flex vh-100 bg-black justify-content-center align-items-center'> 
            <div className='w-75 bg-white rounded p-3'>
                <h1 className='fw-bold text-center'><u>Art Gallery</u></h1>
                <div className='mb-3 text-start'>
                    <Link to="/create" className='btn btn-success add-art'>Add Art +</Link>
                </div>
                <table className='table table-bordered table-striped'>
                    <thead className='table-dark'>
                        <tr>			
                            <th>Title</th>
                            <th>Artist</th>
                            <th>Year Created</th>
                            <th>Cost</th>
                            <th>Medium</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Home.map((data, index) => (
                                <tr key={index}>
                                    <td>{data.Title}</td>
                                    <td>{data.Artist}</td>
                                    <td>{data.Year_Created}</td>
                                    <td>{data.Cost}</td>
                                    <td>{data.Medium}</td>
                                    <td>
                                        <Link to={`/update/${data.Id}`} className='btn btn-primary'>Update</Link>
                                        <button className='btn btn-danger ms-2' onClick={e => handleDelete(data.Id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Home;
