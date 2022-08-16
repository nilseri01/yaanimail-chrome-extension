import { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import classes from './Contact.module.css';
import iconMail from '../../../assets/img/icon-mail.png';
import ContactSearch from './ContactSearch';

function ContactContainer(props) {
  return (
    <Fragment>
      {props.isLoggedIn ? (
        <ContactSearch />
      ) : (
        <div className="container h-100">
          <div
            className={`d-flex justify-content-center align-items-center ${classes.vh70}`}
          >
            <img src={iconMail} alt="Login" className="not-found-image" />
          </div>
        </div>
      )}
    </Fragment>
  );
}

function mapStateToProps({ authedUser }) {
  return {
    isLoggedIn: !!authedUser
  };
}

export default connect(mapStateToProps)(ContactContainer);
