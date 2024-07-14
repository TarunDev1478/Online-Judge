import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import '../asset/addproblem.css';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { pink } from '@mui/material/colors';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

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
    const [success, setSuccess] = useState(null);
    const [difficulty, setDifficulty] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

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
        setLoading(true); // Show the loader
        try {
            const response = await fetch(`https://backend.codeingjudge.online/admin/addProblem`, {
                method: "POST",
                headers: {
                    'Authorization': `${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: title,
                    description: description,
                    creator: creator,
                    time_constraint: timeConstraint,
                    solved: false,
                    testCases: testCases,
                    level: difficulty,
                    distestCases: displayTest,
                    difficulty: difficulty
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Unknown error');
            }
            setSuccess('Problem added successfully!');
            setError(null);
        } catch (error) {
            setError(error.message);
            setSuccess(null);
        } finally {
            setLoading(false); // Hide the loader
            setDialogOpen(true); // Show the dialog
        }
    };

    useEffect(() => {
        const fetchRes = async () => {
            try {
                const res1 = await fetch(`https://backend.codeingjudge.online/auth/admin/me`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `${localStorage.getItem('token')}`
                    }
                });
                const data = await res1.json();
                setCreator(data.username);
            } catch (error) {
                console.error({ "message": 'Failure' });
            }
        };
        fetchRes();
    }, []);

    const handleDifficultyChange = (level) => {
        setDifficulty(level);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
        if (success) {
            navigate('/'); // Navigate to home page on success
        } else {
            window.location.reload(); // Reload the page on failure
        }
    };

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
                <div className="row">
                    <TextField onChange={(e) => setTime(e.target.value)} style={{ width: '42%', marginLeft: '-350px' }} fullWidth label="Time Constraint" id="fullWidth" />
                    <div style={{ position: 'relative', top: '-90px', left: '400px' }} className="level">
                        <FormControlLabel
                            control={<Checkbox checked={difficulty === 'Hard'} onChange={() => handleDifficultyChange('Hard')} />}
                            label="Hard"
                            sx={{ color: pink[600], '&.Mui-checked': { color: pink[600] } }}
                        />
                        <FormControlLabel
                            control={<Checkbox checked={difficulty === 'Medium'} onChange={() => handleDifficultyChange('Medium')} />}
                            label="Medium"
                            sx={{ color: 'yellow' }}
                        />
                        <FormControlLabel
                            control={<Checkbox checked={difficulty === 'Easy'} onChange={() => handleDifficultyChange('Easy')} />}
                            label="Easy"
                            sx={{ color: 'green' }}
                        />
                    </div>
                </div>
            </div>

            <Dialog
                open={dialogOpen}
                onClose={handleDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {success ? "Success" : "Error"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {success || error}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary" autoFocus>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>

            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
}

export default AddProblem;
