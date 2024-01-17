import React from 'react';
import './App.css'

import { BrowserRouter as Router, Route, RouteProps } from 'react-router-dom';
import Header from "./components/Header";
import NotesListPage from "./pages/NotesListPage";
import NotePage from "./pages/NotePage";
import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./utils/PrivateRoute";
import { AuthProvider } from './context/AuthContext'

const App: React.FC = () => {
    return (
        <Router>
            <AuthProvider>
                <div className="container dark">
                    <div className="app">
                        <Header />
                        <PrivateRoute path="/" exact component={NotesListPage} />
                        <Route path="/note/:id" component={NotePage}/>
                        <Route path="/login" component={LoginPage}/>
                    </div>
                </div>
            </AuthProvider>
        </Router>
    );
}

export default App;
