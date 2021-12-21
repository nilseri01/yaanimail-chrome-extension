import { connect, useDispatch } from 'react-redux';
import { setView } from '../../actions/view';
import { ButtonToolbar, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faSmile } from '@fortawesome/free-regular-svg-icons';
import moment from 'moment/moment.js';
import 'moment/locale/tr';
import { useTranslation } from 'react-i18next';

function Toolbar(props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleChangeView = (selectedView) => {
    dispatch(setView(selectedView));
  };

  return (
    <ButtonToolbar
      aria-label="Toolbar with Button groups"
      className="border border-info p-1"
    >
      <div className="m-auto">
        <span className="pe-2">
          {t('WELCOME')}{' '}
          {props.authedUser.name
            ? props.authedUser.name
            : props.authedUser.client_id}
        </span>
        <FontAwesomeIcon icon={faSmile} />
        <span className="ps-2">
          {moment(new Date()).format('DD-MM-YYYY dddd')}
        </span>
      </div>
      <div className="ms-2 me-1">
        <Button
          variant={props.selectedView === 'inbox' ? 'secondary' : 'primary'}
          className="rounded-circle"
          disabled={props.selectedView === 'inbox'}
          onClick={() => handleChangeView('inbox')}
          // onClick={dispatch(setView('inbox'))}
        >
          <FontAwesomeIcon icon={faEnvelope} />
        </Button>
      </div>
      <div>
        <Button
          variant={props.selectedView === 'calendar' ? 'secondary' : 'primary'}
          className="rounded-circle"
          disabled={props.selectedView === 'calendar'}
          onClick={() => handleChangeView('calendar')}
        >
          <FontAwesomeIcon icon={faCalendar} />
        </Button>
      </div>
    </ButtonToolbar>
  );
}

function mapStateToProps({ authedUser, view }) {
  return {
    authedUser: authedUser,
    selectedView: view
  };
}

export default connect(mapStateToProps)(Toolbar);
