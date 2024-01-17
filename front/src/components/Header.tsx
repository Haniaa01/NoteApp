import React, {useContext} from 'react';
import { Link } from 'react-router-dom'
import AuthContext from "../context/AuthContext";


const Header: React.FC = () => {
    let {user, logoutUser} = useContext(AuthContext);
    return (
    
    <div className="app-header" style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
    <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
        <h1> NOTE APP <span>|</span></h1>
    </div>
    <div style={{ marginTop: '65px', display: 'flex', alignItems: 'center' }}>
        {user && <p style={{ marginRight: '10px' }}>Hello {user.username}</p>}
        {user ? (
            <p onClick={logoutUser}><Link to="/login" style={{ color: '#f68657' }}>Logout</Link></p>
        ) : (
            <p style={{ color: '#f68657' }}>Login</p>
        )}
    </div>
</div>



    );
}

export default Header;