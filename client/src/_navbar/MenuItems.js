import Dropdown from './Dropdown';
import { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';

const MenuItems = ({ items, depthLevel, onClick }) => {

    const [dropdown, setDropdown] = useState(false);

    let ref = useRef();

    useEffect(() => {
        const handler = (event) => {
            if (dropdown && ref.current && !ref.current.contains(event.target)) {
                setDropdown(false);
            }
        };
        document.addEventListener("mousedown", handler);
        document.addEventListener("touchstart", handler);
        return () => {
            // Cleanup the event listener
            document.removeEventListener("mousedown", handler);
            document.removeEventListener("touchstart", handler);
        };
    }, [dropdown]);

    const handleItemClick = () => {
        if (onClick) {
            onClick(); // Call the onClick handler to close the menu
        }
    };

    return (
        <li className="menu-items" ref={ref}  
            onMouseEnter={() => setDropdown(true)}
            onMouseLeave={() => setDropdown(false)}
            onClick={handleItemClick}
        >
            {items.submenu && items.url ? (
                <>
                    <button type="button"           
                        aria-expanded={dropdown ? "true" : "false"}
                        onClick={() => setDropdown((prev) => !prev)}
                    >
                        {window.innerWidth < 960 && depthLevel === 0 ? (
                            items.title
                        ) : (
                            <Link to={items.url}>{items.title}</Link>
                        )}
                        {/* ... */}
                        {depthLevel > 0 &&
                            window.innerWidth < 960 ? null : depthLevel > 0 &&
                            window.innerWidth > 960 ? (
                                <span>&raquo;</span>
                            ) : (
                                <span className="arrow" />
                            )}
                    </button>
                    <Dropdown submenus={items.submenu} 
                        depthLevel={depthLevel}
                        dropdown={dropdown}
                    />
                </>
            ) : !items.url && items.submenu ? (
                <>
                    <button>
                        {items.title}{' '}
                        {/* ... */}
                    </button>
                </>
            ) :  (       
                <Link to={items.url}>{items.title}</Link>
            )}
        </li>
    );
};

export default MenuItems;
