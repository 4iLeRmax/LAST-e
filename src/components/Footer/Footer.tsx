import { NavLink } from 'react-router-dom';

import { FaFacebookF, FaTwitter, FaYoutube, FaLinkedin, FaTelegramPlane } from 'react-icons/fa';

import css from './Footer.module.scss';

const Footer = () => {
  return (
    <div className={css.footer}>
      <div className={css.main}>
        <h1 className={css.logo}>LAST'e</h1>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo obcaecati, est optio
          debitis doloremque facilis at perferendis dolores. Iure ducimus, architecto natus illo
          maxime qui quia harum voluptatem distinctio doloremque.
        </p>
        <div className={css.socials}>
          <div>
            <FaFacebookF size='20px' />
          </div>
          <div>
            <FaTwitter size='20px' />
          </div>
          <div>
            <FaYoutube size='20px' />
          </div>
          <div>
            <FaLinkedin size='20px' />
          </div>
          <div>
            <FaTelegramPlane size='20px' />
          </div>
        </div>
      </div> 
      <div className={css.end}>
        <p>
          Copyright <span>Lorem, ipsum.</span>
        </p>
        <div className={css.links}>
          <NavLink className={css.link} to='/'>
            Home
          </NavLink>
          <NavLink className={css.link} to='/products'>
            Products
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Footer;
