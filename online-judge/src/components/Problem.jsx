import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import '../asset/oneproblem.css';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import Editor from '@monaco-editor/react';
import TextField from '@mui/material/TextField';
import { Alert, Button } from '@mui/material';

function Problem() {
    const { id } = useParams();
    const [pro, setProblem] = useState(null);
    const [error, setError] = useState(null);
    const [show, setShow] = useState("description");
    const [result, setResult] = useState(null);
    const [verdict, setVerdict] = useState([]);
    const [comerror,setcomError]=useState(null);
    const [code, setCode] = useState(
        `#include<bits/stdc++.h>\n\nusing namespace std;\n\nint main() {\n    // Your code here\n    return 0;\n}`
    );
    const [userInput, setUserInput] = useState('');
    const [actualUserInput, setActualUserInput] = useState('');
    const inputRef = useRef(null);

    const handleCode = (value) => {

        setCode(value);
    }


    const url = process.env.url;

    useEffect(() => {
        const fetchProblem = async () => {
            try {
                const response = await fetch(`https://backend.codeingjudge.online/user/getProblem?problem_id=${id}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `${localStorage.getItem('token')}`
                    }
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log('Fetched problem data:', data[0]);
                setProblem(data);
            } catch (error) {
                console.error('Error fetching problem:', error);
                setError('Failed to fetch problem');
            }
        };
        fetchProblem();
    }, [id]);

    const handleSet = () => {
        setActualUserInput(inputRef.current.value);
        console.log(inputRef.current.value);
    }

    const handleRun = async () => {
        try {
            console.log(pro._id);
            const response = await fetch(`https://backend.codeingjudge.online/user/solve`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('token')}`,
                    'problem_id': pro._id
                },
                body: JSON.stringify({
                    language: 'cpp',
                    code: code,
                    input: actualUserInput
                })
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error: ${response.status} - ${errorText}`);
            }

            const data = await response.json();
            console.log('Code execution result:', data);

            if (data.finaloutput.success) {
                setResult(data.finaloutput.output);
            } else {
                setResult('Failed to execute code');
            }
        } catch (error) {
            console.error('Error during code run:', error.message);
            setResult('An error occurred while running the code');
        }
    }

    const handleSubmit = async () => {
        setShow('verdict');
        try {
            const response = await fetch(`https://backend.codeingjudge.online/user/verdict`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('token')}`,
                    'problem_id': pro._id
                },
                body: JSON.stringify({
                    language: 'cpp',
                    code: code
                })
            });
            const data = await response.json();
            console.log(data);
            if(data.finaloutput.success==false){
                setcomError(data.finaloutput.error);
            }
            else{
            setVerdict(data.finaloutput.output);
    
            const allPassed = data.finaloutput.output.every(result => result === true);
    
            await updateActivityCalendar();
    
            if (allPassed) {
                
                await updateSolvedStatus();
            }}
    
        } catch (error) {
            console.error('Error during code submission:', error.message);
            setResult('An error occurred while submitting the code');
        }
    };
    
    const updateActivityCalendar = async () => {
        try {
            const activityResponse = await fetch(`https://backend.codeingjudge.online/update/updateActivity`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('token')}`,
                }
            });
    
            if (!activityResponse.ok) {
                throw new Error('Failed to update activity');
            }
    
            console.log('Activity updated in calendar');
        } catch (activityError) {
            console.error('Error updating activity:', activityError);
        }
    };
    
    const updateSolvedStatus = async () => {
        try {
            const updateResponse = await fetch(`https://backend.codeingjudge.online/update/updateSolved`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({
                    problem_id: pro._id,
                    level: pro.level  
                })
            });
    
            if (!updateResponse.ok) {
                throw new Error('Failed to update solved status');
            }
    
            console.log('Problem marked as solved and stats updated');
        } catch (updateError) {
            console.error('Error updating solved status:', updateError);
        }
    };

    const DescriptionComponent = ({ pro }) => (
        <div 
            style={{ 
                display: show === 'description' ? 'flex' : 'none',
                flexDirection: 'column',
                height: 'calc(100vh - 63px)', 
                overflow: 'hidden' 
            }} 
            className="description"
        >
            <div style={{ 
                flex: '1',
                overflowY: 'auto', 
                padding: '20px',
                paddingBottom: '100px' 
            }}>
                <div className='title'>{pro.problem_no}: {pro.title}</div>
                <div className='desc' style={{ fontSize: '1.2rem', paddingLeft: '30px', textAlign: 'left', marginTop: '30px', marginBottom: '10px', lineHeight: '1.6', fontWeight: '600' }}>{pro.description}</div>
                <div className='example'>
                    {pro.testCases.map((example, index) => (
                        <div style={{ textAlign: 'left', paddingLeft: '30px' }} className="examples" key={index}>
                            <h2>{`Example ${index + 1}`}</h2>
                            <div className="input">
                                <FiberManualRecordIcon sx={{ marginRight: "10px", marginLeft: '45px' }} />
                                <h3>Input: {example.input}</h3>
                            </div>
                            <div className="output">
                                <FiberManualRecordIcon sx={{ marginRight: "10px", marginLeft: '45px' }} />
                                <h3>Output: {example.expectedOutput}</h3>
                            </div>
                        </div>
                    ))}
                </div>
                <div style={{ textAlign: 'left', paddingLeft: '30px' }} className='time'>
                    <h2>Time Constraint:</h2>
                    <div className="constraint">
                        <FiberManualRecordIcon sx={{ marginRight: "10px", marginLeft: '45px' }} />
                        <h3>{pro.time_constraint}</h3>
                    </div>
                </div>
            </div>
        </div>
    );

    const ResultComponent = () => (
        <div style={{ display: show === 'result' ? 'flex' : 'none' }} className="result">
            <TextField
                style={{ marginTop: '20px', width: '90%' }}
                inputRef={inputRef}
                id="outlined-multiline-flexible"
                label="Enter A Testcase"
                multiline
                maxRows={4}
            />
            <Button style={{ width: "150px", backgroundColor: 'black', color: 'white', marginTop: '10px', padding: '7px' }} onClick={handleSet}>Set</Button>
            <div className="Display_output">
                <div className="here">
                    {result ? result : 'No output available'}
                </div>
            </div>
        </div>
    );

    const VerdictComponent = () => {
        if(comerror==null){
        return (
        <div style={{ width: '40vw', minHeight: '100vh', display: show === 'verdict' ? 'flex' : 'none', backgroundColor: 'bisque' }} className="testcases">
           
            {Array.isArray(verdict) && verdict.map((result, index) => {
                let color, text;
                if (result === 'AC') {
                    color = "Green";
                    text = "Accepted";
                } else if (result === 'TLE') {
                    color = "orange";
                    text = "Time Limit Exceeded";
                } else if (result === 'CE') {
                    color = "blue";
                    text = "Compile Error";
                } else {
                    color = "red";
                    text = "Wrong Answer";
                }
                return (
                    
                    <Button key={index} style={{ padding: "10px", margin: '10px', height: '30px', backgroundColor: color, color: "white" }}>
                        {text}
                    </Button>
                );
            })}
            
        </div>
        )} else{
            return(
            <div style={{display:'flex',flexDirection:'column',alignItems:'center', width: '40vw', minHeight: '100vh', display: show === 'verdict' ? 'flex' : 'none', backgroundColor: 'bisque' }} className="testcases">
                <h1 style={{color:'red'}}>COMPILE ERROR</h1>
                <div style={{width:'70%',height:'400px',color:'red'}} className="error">
                    <p> {comerror}</p>
                </div>
         </div>
        )}
        
    };
    

    const handleDes = () => {
        setShow('description');
    }
    const handleResult = () => {
        setShow('result');
    }
    const handleVerdict = () => {
        setShow('verdict');
    }
    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!pro) {
        return <div>Loading...</div>;
    }

    return (
        <div className="solve">
            <div className="left">
                <div style={{ display: 'flex', alignItems: 'center', width: '100%', height: '63px', color: 'black', backgroundColor: 'white' }} className="bar">
                    <Button onClick={handleDes} style={{ opacity: show === 'description' ? 1 : 0.4, marginLeft: '10px', height: "40px", backgroundColor: 'rgb(42,42,42)', color: 'white' }}>Description</Button>
                    <Button onClick={handleResult} style={{ opacity: show === 'result' ? 1 : 0.4, marginLeft: '10px', height: "40px", backgroundColor: 'rgb(42,42,42)', color: 'white' }}>Result</Button>
                    <Button onClick={handleVerdict} style={{ opacity: show === 'verdict' ? 1 : 0.4, marginLeft: '10px', height: "40px", backgroundColor: 'rgb(42,42,42)', color: 'white' }}>Verdict</Button>
                </div>
                <DescriptionComponent pro={pro} />
                <ResultComponent />
                <VerdictComponent />
            </div>
            <div className="codeeditor">
                <div style={{
                    border: '2px solid black',
                    display: 'flex',
                    borderRadius: '50px',
                    backgroundColor: 'white',
                    height: '40px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '10px'
                }} className="code">
                    CODE IN CPP
                    <Button onClick={handleRun} sx={{
                        position: 'relative',
                        right: '-350px',
                        backgroundColor: 'green',
                        color: 'black'
                    }}>Run</Button>
                    <Button onClick={handleSubmit} sx={{
                        position: 'relative',
                        right: '-200px',
                        backgroundColor: 'green',
                        color: 'black'
                    }}>Submit</Button>
                </div>
                <Editor
                    onChange={handleCode}
                    height="calc(100% - 60px)"
                    defaultLanguage="cpp"
                    defaultValue={code}
                    theme="vs-dark"
                    options={{
                        minimap: { enabled: false },
                        fontSize: 14,
                    }}
                />
            </div>
        </div>
    );
}

export default Problem;
