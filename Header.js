import React from "react";
import './Header.css';
import Logo_Danart from "./Imagini/Logo_kju.png"
import SearchIcon from '@mui/icons-material/Search';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { Link } from 'react-router-dom';
import { useStateValue } from "./StateProvider";
function Header() {
    // Destructurare în Header.js și Product.js
const [{ basket }, dispatch] = useStateValue();
const totalQuantity = basket.reduce((total, item) => total + item.quantity, 0);


    return (
        <div className="header">
            <Link to="/">
            <img className="header_logo" src={Logo_Danart} alt="Logo"></img>
            </Link>
            <div className="header_search">
                <input className="header_searchInput" type="text"/>
                <SearchIcon className="header_searchIcon" /> 
            </div>
            <div className="header_nav">
                <Link to = '/login'>
                <div className="header_option">
                    <span
                    className="header_optionLine1">Bun venit
                    </span>
                    <span
                    className="header_optionLine2">Conectează-te
                    </span>
                </div></Link>
                <div className="header_option">
                    <span
                    className="header_optionLine1">User
                    </span>
                    <span
                    className="header_optionLine2">Istoric
                    </span>
                </div>
                <Link to="/checkout">
                  <div className="header_optionBascket">
                    <LocalMallIcon />
                    <span className="header_optionLineTwoheader__backetCount">
                    <span className="header__basketCount">{totalQuantity}</span>
                        </span>    
                  </div>
                
                 </Link>
               
            </div>
        </div>
    );
}

export default Header;
