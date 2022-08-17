import { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import classes from './Contact.module.css';
import iconContact from '../../../assets/img/icon-contact.png';
import ContactSearch from './ContactSearch';

function ContactContainer(props) {
  return (
    <Fragment>
      {props.isLoggedIn ? (
        <ContactSearch />
      ) : (
        <div className="container h-100">
          <div
            className={`d-flex justify-content-center align-items-center ${classes.vh60}`}
          >
            <img
              src={iconContact}
              alt="no-contact"
              className="not-found-image"
            />
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
