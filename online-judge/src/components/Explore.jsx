import React from 'react';
import '../asset/home.css';
import { useAuth } from '../authProvider.jsx';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaInstagram, FaLinkedin, FaTwitch, FaTwitter } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
const Explore = () => {
    const { isAdminLogin, isUserLogin } = useAuth();
    const navigate = useNavigate();
    const languages = [
        { name: 'Python', icon: 'devicon-python-plain', colorClass: 'python-color' },
        { name: 'Java', icon: 'devicon-java-plain', colorClass: 'java-color' },
        { name: 'C++', icon: 'devicon-cplusplus-plain', colorClass: 'cpp-color' },
        { name: 'JavaScript', icon: 'devicon-javascript-plain', colorClass: 'js-color' },
        { name: 'C', icon: 'devicon-c-plain', colorClass: 'c-color' },
        { name: 'Ruby', icon: 'devicon-ruby-plain', colorClass: 'ruby-color' },
        // Add more languages as needed
    ];
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,  // Enable autoplay
        autoplaySpeed: 2000,  // Set autoplay speed in milliseconds
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <div className="home-container">
            <div className="hero-section">
                <div className="content">
                    <h1>Your gateway to Competitive Programming</h1>
                    <p>
                        We provide everything you need to learn, plan, & excel in the
                        Competitive Programming World.
                    </p>
                    <div className="cta-buttons">
                        <button onClick={()=>{navigate('/signup')}} style={{ display: isAdminLogin || isUserLogin ? 'none' : '' }} className="start-trial">SignUp</button>
                        <button onClick={()=>{navigate('/Login')}} style={{ display: isAdminLogin || isUserLogin ? 'none' : '' }} className="log-in">LOG IN</button>
                        <button onClick={()=>{navigate('/Problem')}}  style={{ display: isUserLogin ? '' : 'none' }} className="start-trial">Solve Problem</button>
                        <button onClick={()=>{navigate('/addProblem')}} style={{ display: isAdminLogin ? '' : 'none' }} className="start-trial">Create Problem</button>
                    </div>
                </div>
                <div className="background-image">
                    
                </div>
            </div>

            <div className="features-section">
                <h2>Why Choose Our Platform?</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <i className="feature-icon code-icon"></i>
                        <h3>Diverse Problem Set</h3>
                        <p>Thousands of coding challenges across various difficulty levels</p>
                    </div>
                    <div className="feature-card">
                        <i className="feature-icon judge-icon"></i>
                        <h3>Real-time Judging</h3>
                        <p>Instant feedback on your code submissions</p>
                    </div>
                    <div className="feature-card">
                        <i className="feature-icon leaderboard-icon"></i>
                        <h3>Global Leaderboards</h3>
                        <p>Compete with programmers worldwide</p>
                    </div>
                    <div className="feature-card">
                        <i className="feature-icon community-icon"></i>
                        <h3>Vibrant Community</h3>
                        <p>Discuss solutions and learn from peers</p>
                    </div>
                </div>
            </div>

            <div className="languages-section">
                <h2>Supported Programming Languages</h2>
                <Slider {...sliderSettings}>
                    {languages.map((lang, index) => (
                        <div key={index} className="language-card">
                            <i className={`${lang.icon} language-icon ${lang.colorClass}`}></i>
                            <span>{lang.name}</span>
                        </div>
                    ))}
                </Slider>
            </div>

            <footer  style={{marginTop:'200px'}} className="footer-container">
                <div className="footer-content">
                    <div className="footer-section">
                        <h3>About Us</h3>
                        <p>
                            We provide everything you need to learn, plan, and excel in the
                            Competitive Programming World.
                        </p>
                    </div>
                    <div className="footer-section">
                        <h3>Contact</h3>
                        <p>Email: tarunkumar147800@gmial.com</p>
                        <p>Phone: +91-7985706039</p>
                    </div>
                    <div className="footer-section">
                        <h3>Follow Us</h3>
                        <div className="social-icons">
                            <FaInstagram />
                            <FaTwitter />
                            <FaLinkedin href='https://www.linkedin.com/in/tarun-kumar-927937251/'/>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Explore;
