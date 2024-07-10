import { useEffect, useState } from 'react';
import { Checkbox } from '@mui/material';
import '../asset/problem.css';
import { useNavigate } from 'react-router-dom';

function ProblemList() {
    const navigate = useNavigate();
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const [problemList, setList] = useState([]);

    const handleProblem = (id) => {
        navigate(`/problem/${id}`);
    }
    
    const url = process.env.url;
    useEffect(() => {
        const fetchProblems = async () => {
            try {
                const response = await fetch(`https://backend.codeingjudge.online/user/problems`, {
                    method: 'GET',
                    headers: { 'Authorization': `${localStorage.getItem('token')}` }
                });
                const data = await response.json();
                setList(data);
            } catch (error) {
                console.error('Error fetching problems:', error);
            }
        };
        fetchProblems();
    }, []);

    return (
        <div>
            <div style={{backgroundColor:' #1e1e1e'}} className="problems">
                <h1 style={{color:'white'}}>Problems</h1>
                <div  className="table">
                    {problemList.map((problem) => (
                        <div style={{cursor:'pointer',backgroundColor:'#2d2d2d',borderRadius:'10px',color:'white',border:'none'}} onClick={() => handleProblem(problem._id)} className="row" key={problem._id}>
                            <Checkbox className='check' {...label} color="success" />
                            <h3 style={{marginLeft:'70px'}}>{problem.title}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ProblemList;
