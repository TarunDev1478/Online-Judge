import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import '../asset/addproblem.css';

function AddProblem() {
    const [title, setTitle] = useState('');
    const [description, setDes] = useState('');
    const [testCases, setTestCases] = useState([]);
    const [displayTest, setDisplayTest] = useState([]);
    const [input, setInput] = useState('');
    const [disinput, setDisInput] = useState('');
    const [expectedOutput, setOutput] = useState('');
    const [timeConstraint, setTime] = useState('');
    const [creator, setCreator] = useState('');
    const [error, setError] = useState(null);
  
    const url = process.env.url;
    const handleAddTest = () => {
        const obj1 = {
            input: input,
            expectedOutput: expectedOutput
        };
        const obj2 = {
            input: disinput,
            expectedOutput: expectedOutput
        };
        setTestCases([...testCases, obj1]);
        setDisplayTest([...displayTest, obj2]);
    };

    const handleAddProblem = async () => {
        try {
            const response = await fetch(`http://15.206.73.121:3001/admin/addProblem`, {
                method: "POST",
                headers: {
                    'Authorization': `${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    problem_no: 1,
                    title: title,
                    description: description,
                    creator: creator,
                    time_constraint: timeConstraint,
                    solved: false,
                    testCases: testCases,
                    distestCases: displayTest
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Unknown error');
            }

            console.log(data);
        } catch (error) {
            console.error('Error occurred:', error);
            setError(error.message);
        }
    };

    useEffect(() => {
        const fetchRes = async () => {
            try {
                const res1 = await fetch(`http://15.206.73.121:3001/auth/admin/me`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `${localStorage.getItem('token')}`
                    }
                });
                const data = await res1.json();
                console.log(data);
                setCreator(data.username);
            } catch (error) {
                console.error({ "message": 'Failure' });
            }
        };
        fetchRes();
    }, []); 

    return (
        <div className='big'>
            <div className="add-problem">
                <h1>CREATE PROBLEM <Button onClick={handleAddProblem} variant="contained" style={{ position: 'absolute', right: '70px', top: '50px' }}>Add Problem</Button></h1>
                <h2 style={{ textAlign: "left", paddingLeft: '50px' }}>Enter Title for the problem:</h2>
                <TextField style={{ width: '85%', marginLeft: '50px' }} onChange={(e) => setTitle(e.target.value)} fullWidth label="Title" id="fullWidth" />
                <h2 style={{ textAlign: "left", paddingLeft: '50px' }}>Enter Description for problem:</h2>
                <TextField
                    onChange={(e) => setDes(e.target.value)}
                    sx={{ width: '85%', marginLeft: '50px' }}
                    id="filled-multiline-flexible"
                    label="Description"
                    multiline
                    rows={2}
                />
                <h2 style={{ textAlign: "left", paddingLeft: '50px' }}>Enter TestCases: <Button onClick={handleAddTest} variant="contained" style={{ marginLeft: '20px' }}>Add Testcase</Button> </h2>
                <div className="addTest">
                    <h2 style={{ marginLeft: '50px' }}>Input:</h2>
                    <TextField onChange={(e) => setDisInput(e.target.value)} sx={{ width: '300px', marginLeft: '20px' }} id="outlined-basic" label="Input" variant="outlined" />
                    <TextField onChange={(e) => setInput(e.target.value)} sx={{ width: '300px', marginLeft: '20px' }} id="outlined-basic" label="Display-Input" variant="outlined" />
                    <h2 style={{ marginLeft: '50px' }}>Output:</h2>
                    <TextField onChange={(e) => setOutput(e.target.value)} sx={{ width: '300px', marginLeft: '20px' }} id="outlined-basic" label="Output" variant="outlined" />
                </div>
                <h2 style={{ textAlign: "left", paddingLeft: '50px' }}>Enter Time Constraint:</h2>
                <TextField onChange={(e) => setTime(e.target.value)} style={{ width: '85%', marginLeft: '50px' }} fullWidth label="Time Constraint" id="fullWidth" />
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
        </div>
    );
}

export default AddProblem;
