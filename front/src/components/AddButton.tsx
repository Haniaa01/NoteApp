import React from "react";
import { Link } from 'react-router-dom'; // Poprawny import Link
import { ReactComponent as AddIcon } from '../assets/add.svg'; // Załóżmy, że ścieżka jest ../assets/add.svg

const AddButton: React.FC = () => {
    return (
        <Link to="/note/new" className="floating-button">
            <AddIcon />
        </Link>
    );
}

export default AddButton;
