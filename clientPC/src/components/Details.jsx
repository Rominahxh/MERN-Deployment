import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';

const Details = () => {
  const { id } = useParams();
  const [pirate, setPirate] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/pirates/${id}`)
      .then((res) => {
        console.log(res.data);
        setPirate(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleEditPirate = () => {
    navigate(`/editpirate/${id}`);
  };

  const displayTreasureMessage = () => {
    const treasuresValue = pirate.treasures;

    if (treasuresValue > 10) {
      return "Want to share?";
    } else if (treasuresValue === 0) {
      return "Here's a dollar!";
    } else {
      return null; 
    }
  };

  return (
    <div className="container-fluid" style={{ backgroundColor: '#fc9900', minHeight: '100vh' }}>
      <nav className="d-flex justify-content-around align-items-center mb-5" style={{ height: '15vh', width: '', backgroundColor: '#744100' }}>
        <h1 className="text-white text-center">{pirate.firstName}</h1>
        <button className="btn btn-primary shadow shadow-lg">
          <Link style={{ textDecoration: 'none', color: 'black' }} to="/">
            Crew Board
          </Link>
        </button>
      </nav>
      <div className="d-flex justify-content-center">
        <div className="d-flex flex-column align-items-center mr-5">
          <img
            width="300px"
            height="300px"
            src={pirate.imgURL}
            alt="Profile"
            className="border border-dark rounded"
          />
          <h2>"{pirate.phrase}"</h2>
        </div>
        <div className="d-flex flex-column ml-5 p-3 mb-2 bg-light text-dark rounded border border-dark">
          <h2>About</h2>
          <p>Position: {pirate.position}</p>
          <p>Treasures: {pirate.treasures}</p>
          <p>{displayTreasureMessage()}</p>
          <div>
            <p>Peg-Leg: {pirate.pegLeg === true ? 'Yes' : 'Yes'}</p>
          </div>
          <div>
            <p>Eye-Patch: {pirate.eyePatch === true ? 'Yes' : 'Yes'}</p>
          </div>
          <div>
            <p>Hand-Hook: {pirate.hookHand === true ? 'Yes' : 'No'}</p>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-end mt-3">
        <button className="btn btn-primary" onClick={handleEditPirate}>
          Edit Pirate
        </button>
      </div>
    </div>
  );
};

export default Details;

