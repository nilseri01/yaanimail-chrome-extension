import { useCallback } from 'react';
import { connect, useDispatch } from 'react-redux';
import { setView } from '../../actions/view';
import UtilsService from '../../services/UtilsService';
import { ButtonToolbar, Button } from 'react-bootstrap';
import classes from './Toolbar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faSmile } from '@fortawesome/free-regular-svg-icons';
import moment from 'moment/moment.js';
import 'moment/locale/tr';
import { useTranslation } from 'react-i18next';

function Toolbar(props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleChangeView = useCallback((selectedView) => {
    UtilsService.saveToLocalStorage('ym@view', selectedView).then((view) => {
      dispatch(setView(view));
    });
  }, []);

  return (
    <ButtonToolbar
      aria-label="header toolbar"
      className="border border-info p-1 d-flex justify-content-between"
    >
      <div className={`d-flex flex-column ms-2 ${classes.toolbar_container}`}>
        <div className="text-truncate">
          <span className="me-1">
            {t('WELCOME')}{' '}
            {props.authedUser.name
              ? props.authedUser.name
              : props.authedUser.client_id}
          </span>
          <FontAwesomeIcon icon={faSmile} />
        </div>
        <div>{moment(new Date()).format('DD-MM-YYYY dddd')}</div>
      </div>
      <div className="d-flex flex-row me-1">
        <div className="me-1">
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
            variant={
              props.selectedView === 'calendar' ? 'secondary' : 'primary'
            }
            className="rounded-circle"
            disabled={props.selectedView === 'calendar'}
            onClick={() => handleChangeView('calendar')}
          >
            <FontAwesomeIcon icon={faCalendar} />
          </Button>
        </div>
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
