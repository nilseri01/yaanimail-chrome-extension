import { Fragment } from 'react';
import { connect } from 'react-redux';
import CalendarToday from './CalendarToday';
import classes from './Calendar.module.css';
import iconMail from '../../../assets/img/icon-mail.png';
import CreateEvent from './CreateEvent';

function CalendarContainer(props) {
  return (
    <Fragment>
      {props.isLoggedIn ? (
        <CalendarToday />
      ) : (
        <div className="container h-100">
          <div
            className={`d-flex justify-content-center align-items-center ${classes.vh70}`}
          >
            <img src={iconMail} alt="Login" className="not-found-image" />
          </div>
        </div>
      )}
      <CreateEvent></CreateEvent>
    </Fragment>
  );
}

function mapStateToProps({ authedUser }) {
  return {
    isLoggedIn: !!authedUser
  };
}

export default connect(mapStateToProps)(CalendarContainer);
