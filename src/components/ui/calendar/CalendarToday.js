import { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import CalendarService from '../../../services/CalendarService';
import { Spinner, Card, Badge } from 'react-bootstrap';
import Linkify from 'linkify-react';
import moment from 'moment/moment.js';
import 'moment/locale/tr';
import { useTranslation } from 'react-i18next';
import classes from './Calendar.module.css';
import iconMail from '../../../assets/img/icon-mail.png';

const linkProps = {
  onClick: (event) => {
    chrome.tabs.create({
      url: event.target.href
    });
  }
};

const checkIsLongEvent = (appointment) => {
  const start = new Date(appointment.invitation_date);
  const end = new Date(appointment.end_date);
  let isLongEvent = false;
  if (
    appointment.all_day !== 1 &&
    start.getFullYear() === end.getFullYear() &&
    start.getMonth() === end.getMonth() &&
    start.getDate() !== end.getDate()
  ) {
    isLongEvent = true;
  }
  return isLongEvent;
};

const formatEvents = (appointments) => {
  let formattedAppointments = [];
  for (const appointment of appointments) {
    const startDate = new Date(appointment.invitation_date);
    const endDate = new Date(appointment.end_date);
    const isLongEvent = checkIsLongEvent(appointment);
    let formattedAppointment;
    // TODO: NilS location (linkli)
    if (isLongEvent) {
      formattedAppointment = {
        title: appointment.subject,
        start: moment(startDate.toString()).format('DD-MM-YYYY'),
        end: moment(endDate.toString()).add(1, 'days').format('DD-MM-YYYY'),
        id: appointment.appointment_id,
        location: appointment.location
      };
    } else {
      formattedAppointment = {
        title: appointment.subject,
        start: moment(startDate.toString()).format('DD-MM-YYYY HH:mm'),
        end: moment(endDate.toString()).format('DD-MM-YYYY HH:mm'),
        id: appointment.appointment_id,
        location: appointment.location,
        allDay: appointment.all_day === 1 ? true : false
      };
    }
    formattedAppointments.push(formattedAppointment);
  }
  formattedAppointments.sort((a, b) => (a.start < b.start ? -1 : 1));
  return formattedAppointments;
};

function CalendarToday(props) {
  moment.locale(props.language);
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [todaysAppointments, setTodaysAppointments] = useState([]);

  useEffect(() => {
    setIsLoading(true);

    const beginEpoc = moment(new Date()).startOf('day').valueOf();
    let data = {
      calendarId: 10,
      startTime: moment(beginEpoc).startOf('day').valueOf(),
      endTime: moment(beginEpoc).endOf('day').valueOf()
    };

    CalendarService.getEvents(data)
      .then((response) => {
        setIsLoading(false);
        setTodaysAppointments(formatEvents(response.data));
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
        // TODO: NilS error objesi?
        if (error && error.data) {
          console.log(t(error.data.message));
        }
      });
  }, []);

  return (
    <Fragment>
      {isLoading ? (
        <div className="container h-100">
          <div
            className={`d-flex justify-content-center align-items-center ${classes.vh70}`}
          >
            <Spinner animation="border" variant="info" />
          </div>
        </div>
      ) : (
        todaysAppointments &&
        todaysAppointments.map((event) => (
          <div>
            <Card border="info" key={event.id}>
              <Card.Header>
                <div className="fs-6">
                  <Badge bg="primary">{event.start}</Badge>
                  <span className="text-primary"> - </span>
                  <Badge bg="primary">{event.end}</Badge>
                </div>
                <Badge variant="primary" pill>
                  {event.allDay}
                </Badge>
              </Card.Header>
              <Card.Body>
                <Card.Text>{event.title}</Card.Text>
                <Card.Text>
                  <Linkify options={{ attributes: linkProps }}>
                    {event.location}
                  </Linkify>
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        ))
      )}
      {!isLoading && (!todaysAppointments || todaysAppointments.length === 0) && (
        <div className="container h-100">
          <div
            className={`d-flex justify-content-center align-items-center ${classes.vh70}`}
          >
            <img src={iconMail} alt="Login" className="not-found-image" />
          </div>
          <p class="text-center text-primary fw-bold fs-6">
            {t('NO_APPOINTMENTS_TODAY')}
          </p>
        </div>
      )}
    </Fragment>
  );
}

function mapStateToProps({ authedUser }) {
  return {
    language:
      authedUser && (authedUser.language || '').length > 0
        ? authedUser.language
        : 'tr'
  };
}

export default connect(mapStateToProps)(CalendarToday);
