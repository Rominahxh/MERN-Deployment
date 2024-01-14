import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditPirate = () => {
const { id } = useParams();
const [formData, setFormData] = useState({
    firstName: '',
    phrase: '',
    imgURL: '',
    position: '',
    treasures: '',
    pegLeg: '',
    eyePatch: '',
    hookHand: '',
});
const navigate = useNavigate();

useEffect(() => {
    axios
    .get(`http://localhost:8000/api/pirates/${id}`)
    .then((res) => {
        setFormData({
        firstName: res.data.firstName,
        phrase: res.data.phrase,
        imgURL: res.data.imgURL,
        position: res.data.position,
        treasures: res.data.treasures,
        pegLeg: res.data.pegLeg,
        eyePatch: res.data.eyePatch,
        hookHand: res.data.hookHand,
        });
    })
    .catch((err) => console.log(err));
}, [id]);

const handleChange = (e) => {
    setFormData({
    ...formData,
    [e.target.name]: e.target.value,
    });
};

const handleUpdatePirate = () => {
    axios
    .patch(`http://localhost:8000/api/pirates/edit/${id}`, formData)
    .then((res) => {
        console.log(res.data);
        navigate('/');
    })
    .catch((err) => console.log(err));
};

const handleGoToDetails = () => {
    navigate(`/pirates/${id}`);
};

return (
    <div className="container-fluid" style={{ backgroundColor: '#fc9900', minHeight: '100vh' }}>
    <nav
        className="d-flex justify-content-around align-items-center mb-5"
        style={{ height: '15vh', width: '', backgroundColor: '#744100' }}
    >
        <h1 className="text-white text-center">Edit Pirate</h1>
    </nav>
    <form style={{ width: '40%', margin: '5% 30%' }}>
        <div className="row">
        <div className="col-md-6">
            <div className="form-group">
            <label>First Name:</label>
            <input
                type="text"
                className="form-control mt-1"
                value={formData.firstName}
                onChange={(e) => handleChange(e)}
                name="firstName"
            />
            </div>
            <div className="form-group">
            <label>Image Url:</label>
            <input
                type="text"
                className="form-control mt-1"
                value={formData.imgURL}
                onChange={(e) => handleChange(e)}
                name="imgURL"
            />
            </div>
            <div className="form-group">
            <label># of Treasure Chests:</label>
            <input
                type="number"
                className="form-control mt-1"
                value={formData.treasures}
                onChange={(e) => handleChange(e)}
                name="treasures"
            />
            </div>
        </div>
        <div className="col-md-6">
            <div className="form-group">
            <label>Crew Position:</label>
            <br />
            <select
                className="form-select"
                onChange={(e) => handleChange(e)}
                value={formData.position}
                name="position"
            >
                <option value="0">Select an option</option>
                <option value="First Mate">First Mate</option>
                <option value="Sailer">Sailer</option>
                <option value="Captain">Captain</option>
            </select>
            </div>
        </div>
        </div>
        <div className="row">
        <div className="col-md-6">
            <div className="form-group">
            <label>Pirate Catch Phrase:</label>
            <input
                type="text"
                className="form-control mt-1"
                value={formData.phrase}
                onChange={(e) => handleChange(e)}
                name="phrase"
            />
            </div>
        </div>
        <div className="col-md-6">
            <div className="form-group">
            <label>Peg Leg:</label>
            <br />
            <input
                type="checkbox"
                checked={formData.pegLeg}
                onChange={(e) => handleChange(e)}
                name="pegLeg"
            />
            </div>
            <div className="form-group">
            <label>Eye Patch:</label>
            <br />
            <input
                type="checkbox"
                checked={formData.eyePatch}
                onChange={(e) => handleChange(e)}
                name="eyePatch"
            />
            </div>
            <div className="form-group">
            <label>Hook Hand:</label>
            <br />
            <input
                type="checkbox"
                checked={formData.hookHand}
                onChange={(e) => handleChange(e)}
                name="hookHand"
            />
            </div>
        </div>
        </div>
        <div className="row">
        <div className="col-md-6">
            <div className="form-group">
            </div>
        </div>
        <div className="col-md-6">
            <div className="form-group">
            <button
                type="button"
                className="btn btn-primary shadow shadow-lg"
                onClick={handleUpdatePirate}
            >
                Update Pirate
            </button>
            </div>
        </div>
        </div>
    </form>
    <div className="mt-3 text-center">
        <button
        type="button"
        className="btn btn-success shadow shadow-lg"
        onClick={handleGoToDetails}
        >
        View Details
        </button>
    </div>
    </div>
);
};

export default EditPirate;
