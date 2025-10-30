import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./CreateArt.css"; 

function UpdateArt() {
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [year, setYear] = useState('');
    const [cost, setCost] = useState('');
    const [medium, setMedium] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8081/art/${id}`)
            .then(res => {
                const art = res.data;
                setTitle(art.title);
                setArtist(art.artist);
                setYear(art.year);
                setCost(art.cost);
                setMedium(art.medium);
            })
            .catch(err => console.log(err));
    }, [id]);

    function handleSubmit(event) {
        event.preventDefault();
        axios.put(`http://localhost:8081/update/${id}`, 
            { title, artist, year, cost, medium },
            { withCredentials: true, credentials: 'include' }
        )
        .then(res => {
            console.log(res);
            navigate('/');
        })
        .catch(err => console.log(err));
    }

    return (
        <div className='d-flex vh-100 bg-black justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-4'>
                <form onSubmit={handleSubmit}>
                    <h2 className='fw-bold text-center'><u>Update Art</u></h2>
                    <div className='mb-3 row'>
                        <label htmlFor='title' className='col-form-label col-4 form-title'>Title</label>
                        <div className='col-8'>
                            <input type='text' id='title' className='form-control' 
                            value={title} onChange={e => setTitle(e.target.value)} required />
                        </div>
                    </div>
                    <div className='mb-3 row'>
                        <label htmlFor='artist' className='col-form-label col-4 form-title'>Artist</label>
                        <div className='col-8'>
                            <input type='text' id='artist' className='form-control' 
                            value={artist} onChange={e => setArtist(e.target.value)} required />
                        </div>
                    </div>
                    <div className='mb-3 row'>
                        <label htmlFor='year' className='col-form-label col-4 form-title'>Year Created</label>
                        <div className='col-8'>
                            <input type='number' id='year' className='form-control' 
                            value={year} onChange={e => setYear(e.target.value)} required />
                        </div>
                    </div>
                    <div className='mb-3 row'>
                        <label htmlFor='cost' className='col-form-label col-4 form-title'>Cost</label>
                        <div className='col-8'>
                            <input type='text' id='cost' className='form-control' 
                            value={cost} onChange={e => setCost(e.target.value)} required />
                        </div>
                    </div>
                    <div className='mb-3 row'>
                        <label htmlFor='medium' className='col-form-label col-4 form-title'>Medium</label>
                        <div className='col-8'>
                            <input type='text' id='medium' className='form-control' 
                            value={medium} onChange={e => setMedium(e.target.value)} required />
                        </div>
                    </div>
                    <div className='d-flex justify-content-center gap-3 mb-3'>
                        <button className='btn btn-success w-25 submit'>Submit</button>
                        <button className='btn btn-secondary w-25 cancel' onClick={() => navigate('/')}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UpdateArt;
