import { Fragment, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { showSuccessToast, showErrorToast } from '../../../actions/toast';
import ContactService from '../../../services/ContactService';
import CalendarService from '../../../services/CalendarService';
import {
  Form,
  Modal,
  Button,
  Container,
  Navbar,
  Row,
  Col
} from 'react-bootstrap';
import moment from 'moment/moment.js';
import 'moment/locale/tr';
import { useTranslation } from 'react-i18next';
import classes from './Calendar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBookmark,
  faCalendarPlus,
  faClock,
  faUser,
  faMap
} from '@fortawesome/free-regular-svg-icons';
import Chips, { Chip } from 'react-chips';
import DatetimeRangePicker from 'react-datetime-range-picker';

function CreateEvent(props) {
  moment.locale(props.language);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [attendees, setAttendees] = useState([]);
  const [eventTitle, setEventTitle] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleCloseCreateEventModal = () => setShow(false);
  const handleShowCreateEventModal = () => setShow(true);

  // TODO: NilS dışarı taşı?
  const getFilteredSuggestions = (data) => {
    const items = [];
    for (let i = 0; i < data.length; i++) {
      const email = data[i].email;
      if ((email || '').length > 0 && items.some((y) => y === email) !== true) {
        // skip tag, get only contact
        items.push(email);
      }
    }
    setFilteredSuggestions(items);
  };

  const fetchAttendeeSuggestions = async (input) => {
    await ContactService.autoSuggest(input)
      .then((response) => {
        getFilteredSuggestions(response.data);
      })
      .catch((error) => {
        dispatch(showErrorToast(error?.message));
      })
      .finally(() => {
        setIsLoading(false);
      });
    return filteredSuggestions;
  };

  const handleAttendeesChange = (addedAttendees) => {
    const emailRegex = /^[\w\.=-]+@[\w\.-]+\.[\w]{2,}$/;
    const validAttendees = [];
    addedAttendees.forEach((attendee) => {
      if (emailRegex.test(attendee) === true) {
        validAttendees.push(attendee);
      }
    });
    setAttendees(validAttendees);
  };

  const onStartDateChange = (startDateMoment) => {
    setStartDate(startDateMoment);
  };

  const onEndDateChange = (endDateMoment) => {
    setEndDate(endDateMoment);
  };

  const prepareEventData = () => {
    let eventData = {
      allDay: 0,
      reminder_duration_action: 'DISPLAY',
      reminder_duration_type: 'm',
      reminder_duration: 5
    };
    if (attendees.length > 0) {
      const attendeeEmails = [];
      const to = [];
      for (let i = 0; i < attendees.length; i++) {
        const attendee = {
          address: attendees[i],
          role: 'REQ',
          rsvp: 1
        };
        const email = {
          email: attendees[i]
        };
        to.push(email);
        attendeeEmails.push(attendee);
      }
      eventData = { ...eventData, to: to, attendees: attendeeEmails };
    }

    eventData = {
      ...eventData,
      start_time: moment(startDate, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'").valueOf(), // 2022-08-14T21:14:40.797Z
      end_time: moment(endDate, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'").valueOf()
    };

    if ((eventTitle || '').length !== 0) {
      eventData = { ...eventData, name: eventTitle };
    }
    if ((eventLocation || '').length !== 0) {
      eventData = { ...eventData, location: eventLocation };
    }
    return eventData;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let eventData = prepareEventData();

    setIsLoading(true);
    CalendarService.createAppointment(eventData)
      .then((response) => {
        props.setRefreshRequired(true);
        setShow(false);
        dispatch(showSuccessToast(t('SUCCESS_APPOINTMENT_CREATED')));
      })
      .catch((error) => {
        dispatch(showErrorToast(error?.message));
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Fragment>
      <Navbar
        bg="light"
        variant="light"
        fixed="bottom"
        className={classes.create_event_navbar}
      >
        <Container className="justify-content-end pe-1">
          <FontAwesomeIcon icon={faCalendarPlus} className="text-primary" />
          <Button
            variant="link"
            className={`ps-1 ${classes.create_event_button}`}
            onClick={handleShowCreateEventModal}
          >
            {t('CREATE_EVENT')}
          </Button>
        </Container>
      </Navbar>
      <Modal show={show} onHide={handleCloseCreateEventModal}>
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>{t('CREATE_EVENT')}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row className="align-items-center pb-3">
              <Col xs={1}>
                <FontAwesomeIcon
                  icon={faBookmark}
                  className="text-primary pe-2"
                />
              </Col>
              <Col>
                <Form.Control
                  type="input"
                  className="flex-grow-1"
                  placeholder={t('ADD_TITLE')}
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  autoFocus
                />
              </Col>
            </Row>
            <Row className="align-items-center pb-3">
              <Col xs={1}>
                <FontAwesomeIcon icon={faClock} className="text-primary pe-2" />
              </Col>
              <Col>
                <DatetimeRangePicker
                  className="flex-grow-1"
                  dateFormat="DD-MM-YYYY"
                  timeFormat="HH:mm"
                  locale={moment.locale()}
                  onStartDateChange={onStartDateChange}
                  onEndDateChange={onEndDateChange}
                />
              </Col>
            </Row>
            <Row className="align-items-center pb-3">
              <Col xs={1}>
                <FontAwesomeIcon icon={faUser} className="text-primary pe-2" />
              </Col>
              <Col>
                <Chips
                  placeholder={t('ADD_ATTENDEE')}
                  value={attendees}
                  fromSuggestionsOnly={false}
                  uniqueChips={true}
                  onChange={handleAttendeesChange}
                  fetchSuggestions={fetchAttendeeSuggestions}
                />
              </Col>
            </Row>
            <Row className="align-items-center pb-3">
              <Col xs={1}>
                <FontAwesomeIcon icon={faMap} className="text-primary pe-2" />
              </Col>
              <Col>
                <Form.Control
                  type="input"
                  className="flex-grow-1"
                  placeholder={t('ADD_LOCATION')}
                  value={eventLocation}
                  onChange={(e) => setEventLocation(e.target.value)}
                />
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseCreateEventModal}>
              {t('BUTTON_CLOSE')}
            </Button>
            <Button variant="primary" type="submit" disabled={isLoading}>
              {t('BUTTON_SAVE_EVENT')}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
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

export default connect(mapStateToProps)(CreateEvent);
