import React, {useContext} from "react";
import AuthContext from "../context/AuthContext";

const LoginPage: React.FC = () => {
    let{loginUser} = useContext(AuthContext)
    const formStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column', 
        alignItems: 'center',   
        justifyContent: 'center',
      };
    
      const inputStyle: React.CSSProperties = {
        margin: '5px',
        padding: '8px',
        borderRadius: '5px',
        border: '1px solid #ccc',
      };
    
      const buttonStyle: React.CSSProperties = {
        backgroundColor: '#f68657',
        color: '#1f2124',
        padding: '5px 10px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
      };
      return (
        <div>
          <form onSubmit={loginUser} style={formStyle}>
            <input type="text" name="username" placeholder="Enter Username" style={inputStyle} />
            <input type="password" name="password" placeholder="Enter Password" style={inputStyle} />
            <input type="submit" style={buttonStyle} value="Log in" />
          </form>
        </div>
      );
    
}

export default LoginPage