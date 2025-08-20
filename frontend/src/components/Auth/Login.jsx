import React, { useState, useContext } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  MenuItem,
  Button,
  IconButton,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";

const Login = () => {
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { isAuthorized, setIsAuthorized, setUser } = useContext(Context);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!role || !email || !password) {
      toast.error("Please fill all fields");
      return;
    }
    try {
      setLoading(true);
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/login",
        { email, password, role },
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );
      toast.success(data.message);
      setUser(data.user);
      setIsAuthorized(true);
      setEmail("");
      setPassword("");
      setRole("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
      setIsAuthorized(false);
    } finally {
      setLoading(false);
    }
  };

  if (isAuthorized) return <Navigate to="/" />;

  return (
    <Box sx={{height:"100vh",backgroundImage:'url("/login_img.png")',backgroundSize:"cover",backgroundPosition:"center",display:"flex",alignItems:"center",justifyContent:"center",p:2}}>
      <Paper elevation={6} sx={{display:"flex",flexDirection:{xs:"column",md:"row"},borderRadius:3,overflow:"hidden",width:"85%",height:{xs:"auto",md:"85%"},maxWidth:1300,backgroundColor:"white"}}>
        <Box sx={{flex:{xs:"1 1 100%",md:"0 0 60%"},backgroundImage:'url("/login1.png")',backgroundSize:"cover",backgroundPosition:"center",minHeight:{xs:200,md:"100%"}}} />
        <Box sx={{flex:{xs:"1 1 100%",md:"0 0 40%"},display:"flex",alignItems:"center",justifyContent:"center",p:{xs:3,md:6}}}>
          <Box sx={{width:"100%",maxWidth:350}}>
            <Box textAlign="center" mb={2}>
              <Typography variant="h6" fontWeight="bold">Login to your account</Typography>
            </Box>
            <TextField select fullWidth value={role} onChange={(e)=>setRole(e.target.value)} margin="normal" displayEmpty renderValue={(val)=>val?val:<span style={{color:"#9e9e9e"}}>Login As</span>} InputProps={{startAdornment:<InputAdornment position="start"><FaRegUser/></InputAdornment>}}>
              <MenuItem value="Job Seeker">Job Seeker</MenuItem>
              <MenuItem value="Employer">Employer</MenuItem>
            </TextField>
            <TextField fullWidth label="Email Address" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} margin="normal" InputLabelProps={{shrink:true}} InputProps={{startAdornment:<InputAdornment position="start"><MdOutlineMailOutline/></InputAdornment>}}/>
            <TextField fullWidth label="Password" type={showPassword?"text":"password"} value={password} onChange={(e)=>setPassword(e.target.value)} margin="normal" variant="outlined" InputLabelProps={{shrink:true}} InputProps={{startAdornment:<InputAdornment position="start"><RiLock2Fill/></InputAdornment>,endAdornment:<InputAdornment position="end"><IconButton onClick={()=>setShowPassword(!showPassword)}>{showPassword?<VisibilityOff/>:<Visibility/>}</IconButton></InputAdornment>}}/>
            <Button fullWidth variant="contained" color="primary" sx={{mt:2,py:1.2}} onClick={handleLogin} disabled={loading}>
              {loading?<CircularProgress size={24} sx={{color:"white"}}/>:"Login"}
            </Button>
            <Box textAlign="center" mt={2}>
              <Typography variant="body2">Don't have an account? <Link to="/register" style={{color:"#1976d2",fontWeight:"bold"}}>Register Now</Link></Typography>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
