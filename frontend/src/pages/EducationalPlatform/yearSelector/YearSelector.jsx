import React, { useState } from 'react';
import axios from 'axios';
import './crop.css'; 
import year1Image from './year1.jpg';  
import year2Image from './year2.jpg';  
import year3Image from './year3.jpg';  
import year4Image from './year4.jpg';  

const YearSelector = () => {
  // State variables for selected year, crop activity, and error handling
  const [selectedYear, setSelectedYear] = useState('');
  const [cropActivity, setCropActivity] = useState('');
  const [error, setError] = useState('');

  // Handler function for changing the selected year
  const handleYearChange = async (event) => {
    const year = event.target.value;
    setSelectedYear(year);

    try {
      //Send a POST request to fetch crop activity prediction based on the selected year
      const response = await axios.post('http://localhost:5000/ED-predict', { planting_time: year });
      if (response.data.error) {
        throw new Error(response.data.error);
      }
      setCropActivity(response.data.predicted_activity);
      setError('');
    } catch (error) {
      console.error('Error fetching prediction:', error.message);
      setError('Error fetching prediction. Please try again.');
    }
  };
  
   // Function to get the image for the selected year
  const getImageForYear = (year) => {
    switch (year) {
      case '1':
        return year1Image;
      case '2':
        return year2Image;
      case '3':
        return year3Image;
      case '4':
        return year4Image;
      default:
        return null;
    }
  };

  return (
    <div className="ED-cropInfo"> 
      <div className="ED-inner-cropInfo">
        <select value={selectedYear} onChange={handleYearChange} className="ED-select"> 
          <option value="">Select a year</option>
          <option value="1">Year 1</option>
          <option value="2">Year 2</option>
          <option value="3">Year 3</option>
          <option value="4">Year 4</option>
        </select>
        {selectedYear && 
          <div className="ED-info-container">
            <div className="ED-image-container">
              <img src={getImageForYear(selectedYear)} alt={`Year ${selectedYear}`} className="ED-yearImage" />
            </div>
            <div className="ED-crop-container">
              {selectedYear && <p className="ED-text">Selected year: {selectedYear}</p>} 
              {cropActivity && <p className="ED-text">Activities: {cropActivity}</p>}
              {error && <p className="error">{error}</p>}
            </div>
          </div>
        }
      </div>
    </div>
  );
};

export default YearSelector;