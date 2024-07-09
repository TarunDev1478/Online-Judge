import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend } from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';
import { FaEye, FaCheckCircle, FaComments, FaStar } from 'react-icons/fa';
import {jwtDecode} from "jwt-decode";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend);

const CalendarContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
  overflow-x: auto;
  justify-content:center;
  
`;

const MonthContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
  margin-left:7px;
`;

const MonthLabel = styled.div`
  font-size: 12px;
  color: #8a8a8a;
  text-align: left;
  margin-bottom: 5px;
`;

const WeekStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const WeekRow = styled.div`
  display: flex;
  gap: 2px;
`;

const DayCell = styled.div`
  width: 10px;
  height: 10px;
  background-color: ${props => props.activity > 0 ? `rgba(0, 255, 0, ${Math.min(props.activity * 0.3, 1)})` : '#3a3a3a'};
`;

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const DashboardContainer = styled.div`
  display: grid;
  grid-template-columns: 311px 1fr;
  gap: 20px;
  padding: 21px;
  background-color: #1e1e1e;
  color: white;
  height:'83vh';
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Card = styled.div`
  background-color: #2d2d2d;
  padding: 20px;
  border-radius: 10px;
`;

const StatsCard = styled(Card)`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
`;

const ChartContainer = styled.div`
  height: 200px;
  width: 100%;
`;

const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
`;

const EditButton = styled.button`
  background-color: #3a3a3a;
  color: #4caf50;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Badge = styled.div`
  background-color: #3a3a3a;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DonutContainer = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
`;

const CenterText = styled.div`
  display:flex;
  position: absolute;
  top: 43%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  padding:3px;
`;

function UserProfile({ user }) {
  return (
    <Card>
      <Avatar src={user.img || "https://assets.leetcode.com/users/default_avatar.jpg"} alt="User Avatar" />
      <h2>{user.username}</h2>
      <p>{user.email}</p>
      <EditButton>Edit Profile</EditButton>
    </Card>
  );
}



function Stats({ contestRatings, questionsSolved }) {
  const ratings = contestRatings && contestRatings.length > 0 ? contestRatings : [];
  const solved = questionsSolved ;

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        beginAtZero: false,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)'
        }
      }
    },
    plugins: {
      legend: {
        display: false
      }
    },
    elements: {
      point: {
        radius: 0
      },
      line: {
        tension:0,
        borderWidth: 2
      }
    }
  };

  const data = {
    labels: ratings.map((_, index) => (index + 1).toString()),
    datasets: [{
      data: ratings.map(rating => rating),
      borderColor: '#ffa116',
      // tension: 0.4
    }]
  };

  return (
    <StatsCard>
      <div>
        <h2>Contest Rating</h2>
        <ChartContainer>
          <Line options={options} data={data} />
        </ChartContainer>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
          <div>
            <div>{ratings.length > 0 ? ratings[ratings.length - 1].rating : 0}</div>
            <div style={{ color: '#8a8a8a', fontSize: '0.8em' }}>Contest Rating</div>
          </div>
          <div>
            <div>{ratings.length > 0 ? ratings[ratings.length - 1].ranking : 0}</div>
            <div style={{ color: '#8a8a8a', fontSize: '0.8em' }}>Global Ranking</div>
          </div>
          <div>
            <div>{ratings.length}</div>
            <div style={{ color: '#8a8a8a', fontSize: '0.8em' }}>Attended</div>
          </div>
          <div>
            <div>{ratings.length > 0 ? Math.min(...ratings.map(r => r.ranking)) : 0}</div>
            <div style={{ color: '#8a8a8a', fontSize: '0.8em' }}>Top</div>
          </div>
        </div>
      </div>
      <div style={{display:'flex',position:'relative',top:'28%'}} className="problems">
        <ProblemsSolved questionsSolved={solved} />
      </div>
    </StatsCard>
  );
}

function ProblemsSolved({ questionsSolved }) {

  const solved = questionsSolved || { easy: 0, medium: 0, hard: 0, total: 0 };;

  const data = {
    labels: ['Easy', 'Medium', 'Hard'],
    datasets: [{
      data: [solved.easy, solved.medium, solved.hard],
      backgroundColor: ['#00b8a3', '#ffc01e', '#ef4743'],
      borderWidth: 0,
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '85%',
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          boxWidth: 10,
          padding: 10,
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        enabled: true
      }
    }
  };

  return (
    <DonutContainer>
      <Doughnut data={data} options={options} />
      <CenterText>
        <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{solved.total}</div>
        <div style={{ fontSize: '14px', color: '#8a8a8a' }}>/</div>
        <div style={{ fontSize: '14px', color: '#8a8a8a', marginTop: '5px' }}>3204</div>
      </CenterText>
    </DonutContainer>
  );
}

function CommunityStats() {
  return (
    <Card>
      <h3>Community Stats</h3>
      <StatItem><FaEye /> Views: </StatItem>
      <StatItem><FaCheckCircle /> Solution: </StatItem>
      <StatItem><FaComments /> Discuss: </StatItem>
      <StatItem><FaStar /> Reputation:</StatItem>
    </Card>
  );
}

function Badges() {
  return (
    <Card>
      <h3>Badges</h3>
      <p>Most Recent Badge: </p>
    </Card>
  );
}

function ActivityCalendar({ activityCalendar }) {
  const renderMonth = (monthIndex, monthData) => {
    const daysInMonth = monthData.length; 
    const weeks = [];
    let currentWeek = [];

    for (let day = 0; day < daysInMonth; day++) {
      currentWeek.push(
        <DayCell 
          key={`day-${monthIndex}-${day}`} 
          activity={monthData[day] || 0} 
        />
      );

      if ((day + 1) % 7 === 0 || day === daysInMonth - 1) {
        weeks.push(
          <WeekRow key={`week-${weeks.length}-${monthIndex}`}>
            {currentWeek}
          </WeekRow>
        );
        currentWeek = [];
      }
    }

    return (
      <MonthContainer key={`month-${monthIndex}`}>
        <MonthLabel>{months[monthIndex]}</MonthLabel>
        <WeekStack>{weeks}</WeekStack>
      </MonthContainer>
    );
  };

  const totalSubmissions = activityCalendar.flat().reduce((sum, count) => sum + count, 0);

  return (
    <Card>
      <h3>Activity</h3>
      <CalendarContainer>
        {activityCalendar.map((monthData, index) => renderMonth(index, monthData))}
      </CalendarContainer>
      <p>{totalSubmissions} submissions in the past year</p>
    </Card>
  );
}
function Dashboard() {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

    const url = process.env.url;
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUsername(decoded.username);
      } catch (e) {
        console.error("Error decoding token:", e);
        setError("Invalid token");
        setLoading(false);
      }
    } else {
      setError("No token found");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (username) {
      const fetchData = async () => {
        try {
          setLoading(true);
          const res = await fetch(`http://15.206.73.121:3001/profile/${username}`, {
            method: "GET",
          });
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          const data = await res.json();
          console.log("Raw fetched data:", JSON.stringify(data, null, 2));
          
          const userData = data;
          
          if (!userData.question_solved) {
            console.warn("question_solved is missing from the fetched data");
          }
          
          setUser(userData);
        } catch (error) {
          console.error("Error fetching user data:", error);
          setError("Failed to fetch user data");
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [username]);
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>No user data available.</div>;
  }

  return (
    <div style={{overflow:'hidden',height:'91.2vh',width:'100vw',backgroundColor:'#1e1e1e',display:'flex',alignItems:'center',justifyContent:'center'}} className="profile">
       <DashboardContainer>
        <LeftColumn>
          <UserProfile user={user} />
          <CommunityStats />
          <Badges />
        </LeftColumn>
        <RightColumn>
          <Stats 
            contestRatings={user.contest_ratings}
            questionsSolved={user.question_solved}
          />
          <ActivityCalendar 
            activityCalendar={user.activity_calendar}
          />
        </RightColumn>
      </DashboardContainer>
    </div>
  );
}
export default Dashboard;