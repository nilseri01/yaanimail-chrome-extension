import { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import CalendarToday from './CalendarToday';
import classes from './Calendar.module.css';
import iconCalendar from '../../../assets/img/icon-calendar.svg';
import CreateEvent from './CreateEvent';

function CalendarContainer(props) {
  const [isRefreshRequired, setRefreshRequired] = useState(false);

  return (
    <Fragment>
      {props.isLoggedIn ? (
        <CalendarToday isRefreshRequired={isRefreshRequired} />
      ) : (
        <div className="container h-100">
          <div
            className={`d-flex justify-content-center align-items-center ${classes.vh60}`}
          >
            <img
              src={iconCalendar}
              alt="no-events"
              className="not-found-image"
            />
          </div>
        </div>
      )}
      <CreateEvent setRefreshRequired={setRefreshRequired}></CreateEvent>
    </Fragment>
  );
}

function mapStateToProps({ authedUser }) {
  return {
    isLoggedIn: !!authedUser
  };
}

export default connect(mapStateToProps)(CalendarContainer);
