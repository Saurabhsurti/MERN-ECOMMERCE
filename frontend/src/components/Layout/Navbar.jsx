import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../styles/styles';
// import navItems from "../../static/data"
const Navbar = ({ active, navItems }) => {
  return (
    <div className={`block 800px:${styles.noramlFlex}`}>
      {navItems &&
        navItems.map((i, index) => (
          <div className='flex' key={index}>
            <Link
              to={i.url}
              className={`${
                active === index + 1 ? 'text-[#fff]' : 'text-[#fff] 800px:text-[#010103]'
              } pb-[30px] 800px:pb-0 font-[500] px-6 cursor-pointer`}
            >
              {i.title}
            </Link>
          </div>
        ))}
    </div>
  );
};

export default Navbar;
