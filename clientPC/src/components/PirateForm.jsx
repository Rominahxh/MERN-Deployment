import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const PirateForm = (props) => {
  const { pirate, setPirate, update, setUpdate } = props;
  const [errors, setErrors] = useState({});
  const [firstName, setFirstName] = useState('');
  const [imgURL, setImgURL] = useState('');
  const [phrase, setPhrase] = useState('');
  const [position, setPosition] = useState('Sailer');
  const [treasures, setTreasures] = useState('');
  const [pegleg, setPegleg] = useState(true);
  const [eyepatch, setEyepatch] = useState(true);
  const [hookhand, setHookhand] = useState(false);
  const navigate = useNavigate();
  const [isSubmitDisabled, setSubmitDisabled] = useState(true);

  useEffect(() => {
    validateForm();
  }, [firstName, imgURL, phrase, treasures, position, pegleg, eyepatch, hookhand]);

  const validateForm = () => {
    const errors = {};

    if (!firstName.trim()) {
      errors.firstName = { message: 'Pirate Name is required' };
    } else if (firstName.length < 5 || firstName.length > 30 ) {
      errors.firstName = { message: 'Pirate Name must be at least 5 characters long, and less than 30' };
    }

    if (!imgURL.trim()) {
      errors.imgURL = { message: 'Image URL is required' };
    }

    if (!phrase.trim()) {
      errors.phrase = { message: 'Pirate Catch Phrase is required' };
    } else if (phrase.length < 5 ) {
      errors.phrase = { message: 'Phrase must be at least 5 characters long' };
    }

    if (!treasures.trim()) {
      errors.treasures = { message: 'Number of Treasure Chests is required' };
    } else if (isNaN(treasures)) {
      errors.treasures = { message: 'Number of Treasure Chests must be a valid number' };
    }

    setErrors(errors);
    setSubmitDisabled(Object.keys(errors).length > 0);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    axios
      .post('http://localhost:8000/api/pirates/new', {
        firstName,
        imgURL,
        phrase,
        position,
        treasures,
        pegleg,
        eyepatch,
        hookhand,
      })
      .then((res) => {
        if (res.data.errors) {
          setErrors(res.data.errors);
        } else {
          setUpdate(!update);
          console.log('Request to server');
          navigate('/');
        }
      })
      .catch((err) => {
        console.log('errorTest:' + JSON.stringify(err));
      });

    setFirstName('');
    setImgURL('');
    setPhrase('');
    setPosition('Sailer');
    setTreasures('');
    setPegleg(true);
    setEyepatch(true);
    setHookhand(false);
  };

  return (
    <div className="container-fluid" style={{ backgroundColor: '#fc9900', minHeight: '100vh' }}>
      <nav
        className="d-flex justify-content-around align-items-center mb-5"
        style={{ height: '15vh', width: '', backgroundColor: '#744100' }}
      >
        <h1 className="text-white text-center">Add Pirate</h1>
        <button className="btn btn-primary shadow shadow-lg">
          <Link style={{ textDecoration: 'none', color: 'black' }} to="/">
            Crew Board
          </Link>
        </button>
      </nav>
      <form style={{ width: '40%', margin: '5% 30%' }} onSubmit={onSubmitHandler}>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label>Pirate Name:</label>
              <input
                type="text"
                className="form-control mt-1"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                  validateForm();
                }}
              />
              {errors.firstName ? <p className="text-danger">{errors.firstName.message}</p> : ''}
            </div>
            <div className="form-group">
              <label>Image Url:</label>
              <input
                type="text"
                className="form-control mt-1"
                value={imgURL}
                onChange={(e) => {
                  setImgURL(e.target.value);
                  validateForm();
                }}
              />
              {errors.imgURL ? <p className="text-danger">{errors.imgURL.message}</p> : ''}
            </div>
            <div className="form-group">
              <label># of Treasure Chests:</label>
              <input
                type="number"
                className="form-control mt-1"
                value={treasures}
                onChange={(e) => {
                  setTreasures(e.target.value);
                  validateForm();
                }}
              />
              {errors.treasures ? <p className="text-danger">{errors.treasures.message}</p> : ''}
            </div>
          </div>
          <div className="col-md-6">
          <div className="form-group">
              <label>Crew Position:</label>
              <br />
              <select className="form-select" onChange={(e) => setPosition(e.target.value)} value={position}>
                <option value="Sailer">Sailer</option>
                <option value={'First Mate'}>First Mate</option>
                <option value={'Captain'}>Captain</option>
              </select>
              {errors.position ? <p className="text-danger">{errors.position.message}</p> : ''}
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
                value={phrase}
                onChange={(e) => {
                  setPhrase(e.target.value);
                  validateForm();
                }}
              />
              {errors.phrase ? <p className="text-danger">{errors.phrase.message}</p> : ''}
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Peg Leg:</label>
              <br />
              <input type="checkbox" checked={pegleg} onChange={(e) => setPegleg(!pegleg)} />
            </div>
            <div className="form-group">
              <label>Eye Patch</label>
              <br />
              <input type="checkbox" checked={eyepatch} onChange={(e) => setEyepatch(!eyepatch)} />
            </div>
            <div className="form-group">
              <label>Hook Hand</label>
              <br />
              <input
                type="checkbox"
                onChange={(e) => {
                  setHookhand(!hookhand);
                  validateForm();
                }}
              />
              {errors.hookhand ? <p className="text-danger">{errors.hookhand.message}</p> : ''}
            </div>
            <button type="submit" className="btn btn-primary shadow shadow-lg" disabled={isSubmitDisabled}>
              Add Pirate
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PirateForm;
