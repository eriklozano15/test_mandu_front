import logo from '../logo.svg';
import logo2 from '../logo-white.svg';
import { Component } from 'react';
import '../App.css';
import '../scss/bootstrap-new.css';
import 'antd/dist/antd.css';
import { QuestionCircleOutlined, BellOutlined, ShoppingOutlined } from '@ant-design/icons';

class Header extends Component{
  constructor(props) {
    super(props);
  }

  render(){
    
    return (
        <nav className="navbar navbar-expand-sm navbar-custom">
        <img src={logo2} style={{maxWidth: '5%'}} className="img-fluid"></img>
            <div className="navbar-collapse collapse" id="navbarCustom">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <a className="nav-link" href="#">Dashboard</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Organización</a>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Modelos
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        </div>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Seguimiento
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        </div>
                    </li>
                </ul>
                <div className="ml-auto">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" href="#" id="navbarDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <ShoppingOutlined style={{fontSize: '15px' }}/>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#" id="navbarDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <QuestionCircleOutlined style={{fontSize: '15px' }}/>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#" id="navbarDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <BellOutlined style={{fontSize: '15px' }}/>
                        </a>
                    </li>
                    <li className="nav-item active">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> Administrador</a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown"></div>
                    </li>
                </ul>
                </div>
                <img src={logo2} style={{maxWidth: '5%',marginLeft: '5px'}} className="img-fluid"></img>
            </div>
        </nav>
    );
  }
}

export default Header;
