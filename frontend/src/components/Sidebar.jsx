import React, { useState } from 'react';




import {
    
    FaBars,
    FaMagic,
   
    FaAddressCard,
    FaHandshake,
    FaChartBar,
    FaBook
   
}from "react-icons/fa";
import { NavLink } from 'react-router-dom';


const Sidebar = ({children}) => {
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const menuItem=[
        {
            path:"/",
            name:"Fruit-Couting",
            icon:< FaMagic/>
        },
        {
            path:"/Price-Prediction",
            name:"Price-Prediction",
            icon:<FaChartBar/>
        },
        {
            path:"/Selling-Platform",
            name:"Selling-Platform",
            icon:<FaHandshake/>
        },
        {
            path:"/Educational-Platform",
            name:"EducationalBlog",
            icon:<FaBook/>
        }
    ]
    const lastmenuItem=[
        {
            path:"/User",
            
            icon:<FaAddressCard/>
            


        }
    ]
    return (
        <div className="container">
           <div style={{width: isOpen ? "350px" : "80px"}} className="sidebar">
                <div className="top_section">
                    <h1 style={{ display: isOpen ? "block" : "none", marginTop: '15px' }} className="logo">
                        YeildPro
                    </h1>
                    <div style={{ marginLeft: isOpen ? "120px" : "0px", marginTop: '15px' }} className="bars">
                        <FaBars onClick={toggle} />
                    </div>
                 </div>
                <div className='Bottom'>

                {menuItem.map((item, index)=>(
                    <div key={index} className="menu-item-wrapper">
                        <NavLink to={item.path} className="link" activeClassName="active">
                        <div className="icon">{item.icon}</div>
                        <div style={{ display: isOpen ? "block" : "none"  }} className="link_text">
                            {item.name}
                        </div>
                        </NavLink>
                    </div>
                ))}

                
                
                
                    <div className={`bottomopt ${isOpen ? 'open' : ''}`}>
                    {lastmenuItem.map((item, index)=>(
                        <div key={index} className="menu-item-wrapper1">
                            <NavLink to={item.path} className="link" activeClassName="active">
                            <div className="icon">{item.icon}</div>
                            <div style={{ display: isOpen ? "block" : "none"  }} className="link_text">
                            {item.name}
                            </div>
                            </NavLink>
                        </div>
                    ))}
                </div>
                </div>              
           </div>
           <main>{children}</main>
        </div>
    );
};

export default Sidebar;