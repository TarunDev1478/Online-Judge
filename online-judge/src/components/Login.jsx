    import React, { useState } from 'react'
    import Card from '@mui/material/Card';
    import TextField from '@mui/material/TextField';
    import Button from '@mui/material/Button'
    import FacebookIcon from '@mui/icons-material/Facebook';
    import GoogleIcon from '@mui/icons-material/Google';
    import IconButton from '@mui/material/IconButton';
    import OutlinedInput from '@mui/material/OutlinedInput';
    import InputLabel from '@mui/material/InputLabel';
    import InputAdornment from '@mui/material/InputAdornment';
    import FormHelperText from '@mui/material/FormHelperText';
    import FormControl from '@mui/material/FormControl';
    import Visibility from '@mui/icons-material/Visibility';
    import VisibilityOff from '@mui/icons-material/VisibilityOff';
   
    function Login() {
    const [userName, setUserName] = useState();
    const [type,setType] =React.useState(true);
    const [userPassword, setPassword] = useState();
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
   
    const url = process.env.url;
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
        };
        const handleAdminLoginClick = () => {
            setType(false);
          };
        
          const handleUserLoginClick = () => {
            setType(true);
          };
        const handleLoginClick =async ()=>{
            function callback2(data){
              const token = data.token;
              localStorage.setItem('token',token);
              window.location='/';
              console.log(data);
            }
            function callback1(res){
              res.json().then(callback2);
            }
            try {
              const response = await fetch(`https://backend.codeingjudge.online/auth/admin/login`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                  username:userName,
                  password:userPassword}),
              }).then(callback1);
              if (response.ok) {
                console.log('Login successful');
              } else {
                console.error('Login failed');
              }
            } catch (error) {
              console.error('Error during login:', error);
            }
          };

          const handleLoginClick2 =async ()=>{
            function callback2(data){
              const token = data.token;
              localStorage.setItem('token',token);
              window.location='/';
              console.log(data);
            }
            function callback1(res){
              res.json().then(callback2);
            }
            try {
              const response = await fetch(`https://backend.codeingjudge.online/auth/user/login`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                  username:userName,
                  password:userPassword}),
              }).then(callback1);
              if (response.ok) {
                console.log('Login successful');
              } else {
                console.error('Login failed');
              }
            } catch (error) {
              console.error('Error during login:', error);
            }
          };
    return(
        <div>
        <div className="main" style={{width:"100vw", height:"91vh",display:"flex",backgroundColor:"#dae0e3",flexDirection:'column', justifyContent:"center", alignItems:'center'}}>
        <div className="welcome" style={{display:'flex',flexDirection:'column',marginBottom:'10px',color:'grey',justifyContent:'center',alignItems:'center'}}>
            <h2 style={{ display: type ? 'flex' : 'none' }}>Welcome back User!</h2>
            <h2 style={{ display: !type ? 'flex' : 'none' }}>Welcome back Admin!</h2>
            <h4>Let's get you Signed In</h4>
            <Button style={{ display: type ? 'flex' : 'none' }} onClick={handleAdminLoginClick}>
            Login as Admin
          </Button>
          <Button style={{ display: !type ? 'flex' : 'none' }} onClick={handleUserLoginClick}>
            Login as User
          </Button>
        </div>  
        <div className="box" style={{boxShadow:'20px'}}>
        <Card style={{display:"flex",alignItems:'center',flexDirection:'column', width:'520px',height:"500px",borderRadius:'10px'}} variant="outlined">
        <div className="option" style={{justifyContent:'center',display:"flex"}}>
        <Button style={{margin:"10px",width:"230px",fontSize:'0.81rem',postiton:'realtive',top:'50px',height:'40px'}} variant="contained"><FacebookIcon style={{paddingRight:'5px', fontSize:'1.7rem'}}></FacebookIcon>Log in with Facebook</Button>
        <Button style={{margin:"10px",width:"230px",fontSize:'0.81rem',backgroundColor:'#dae0e3',color:'black',postiton:'realtive',top:'50px',height:'40px'}} variant="contained"><GoogleIcon style={{paddingRight:'5px', fontSize:'1.7rem'}}></GoogleIcon>log in with Google</Button>
        </div>
        <TextField onChange={(e)=> setUserName(e.target.value)} style={{margin:"10px",width:"481px",postiton:'realtive',top:'100px'}} id="username" label="Username" variant="outlined" />
        
        <FormControl style={{margin:"10px",width:"481px",postiton:'realtive',top:'100px'}} sx={{ m: 1, width: '25ch' }} variant="outlined">
            <InputLabel  htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput  onChange={(e)=> setPassword(e.target.value)}
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                <InputAdornment position="end">
                    <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                </InputAdornment>
                }
                label="Password"
            />
            </FormControl>
        <Button onClick={!type?handleLoginClick:handleLoginClick2} style={{margin:"10px",width:"100px",postiton:'realtive',top:'100px'}} variant="contained">Login</Button>
        <div className="line" style={{width:'93%', backgroundColor:'#dae0e3',height:'5px',position:'relative',top:'120px'}}></div>
        <div className="learn">
            <h5 style={{height:'5px',position:'relative',color:'gray',top:'150px'}}>Remember your details and save them for future use.</h5>
        </div>
            </Card>
        </div>
        </div>
        </div>
    )
    
    }

    export default Login;

