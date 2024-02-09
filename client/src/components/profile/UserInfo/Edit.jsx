
import { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import './user-info.scss'
const ProfileEdit = () => {

  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [company, setCompany] = useState('');
  const [drivingLicense, setDrivingLicense] = useState(false);
  const [militaryService, setMilitaryService] = useState(false);
  const [schools, setSchools] = useState([]);
  const [workplaces, setWorkplaces] = useState([]);

  const handleAddSchool = () => {
    setSchools([...schools, '']);
  };

  const handleSchoolChange = (index, value) => {
    const updatedSchools = [...schools];
    updatedSchools[index] = value;
    setSchools(updatedSchools);
  };

  const handleAddWorkplace = () => {
    setWorkplaces([...workplaces, '']);
  };

  const handleWorkplaceChange = (index, value) => {
    const updatedWorkplaces = [...workplaces];
    updatedWorkplaces[index] = value;
    setWorkplaces(updatedWorkplaces);
  };
  return (
    <div id="user-cv-container">
             

              <TextField
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <TextField
                label="Birth Date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
              />

              <TextField
                label="Company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />

              <div>
                <label htmlFor="driving-license">Driving License:</label>
                <input
                  type="checkbox"
                  id="driving-license"
                  checked={drivingLicense}
                  onChange={(e) => setDrivingLicense(e.target.checked)}
                />
              </div>

              <div>
                <label htmlFor="military-service">Military Service:</label>
                <input
                  type="checkbox"
                  id="military-service"
                  checked={militaryService}
                  onChange={(e) => setMilitaryService(e.target.checked)}
                />
              </div>

              <Typography variant="h6">Schools</Typography>
              {schools.map((school, index) => (
                <TextField
                  key={index}
                  label={`School ${index + 1}`}
                  value={school}
                  onChange={(e) => handleSchoolChange(index, e.target.value)}
                />
              ))}
              <Button variant="outlined" onClick={handleAddSchool}>
                Add School
              </Button>

              <Typography variant="h6">Workplaces</Typography>
              {workplaces.map((workplace, index) => (
                <TextField
                  key={index}
                  label={`Workplace ${index + 1}`}
                  value={workplace}
                  onChange={(e) => handleWorkplaceChange(index, e.target.value)}
                />
              ))}
              <Button variant="outlined" onClick={handleAddWorkplace}>
                Add Workplace
              </Button>
            </div>
          );
}

export default ProfileEdit;