import { Fragment, useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { showErrorToast } from '../../../actions/toast';
import MailboxService from '../../../services/MailboxService';
import { Card, Spinner } from 'react-bootstrap';
import moment from 'moment/moment.js';
import classes from './Mailbox.module.css';
import iconMail from '../../../assets/img/icon-mail.png';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelopeOpen,
  faTrashAlt
} from '@fortawesome/free-regular-svg-icons';

function LastUnreadMails(props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [lastUnreadMails, setLastUnreadMails] = useState([]);

  // url: chrome.runtime.getURL('https://www.google.com/')
  const handleRouteToMail = (emailId) => {
    let emailUrl = `https://yaanimail.turkcell.com.tr/m/${props.accountMail}/PRIMARY/inbox/single/${emailId}/details`;
    chrome.tabs.create(
      {
        url: emailUrl
      },
      function (tab) {
        // Tab opened.
        // TODO: NilS refresh badge
        /*
        chrome.tabs.executeScript(
          tab.id,
          {
            code: 'localStorage.setItem("hellolar", "myVal");'
          },
          function () {
            // chrome.tabs.remove(tab.id);
          }
        );
        */
      }
    );
    /*
    chrome.runtime.sendMessage(
      { method: 'getLocalStorage', key: 'status' },
      function (response) {
        console.log(response.data);
      }
    );
    */
  };

  const updateUnreadCount = () => {
    chrome.runtime.sendMessage('update-unread-count');
  };

  const markAsRead = (emailId) => {
    let markAsReadInfo = { message_id: [emailId] };
    setIsLoading(true);
    MailboxService.markAsRead(markAsReadInfo)
      .then((response) => {
        // reload mails
        setLastUnreadMails(lastUnreadMails.filter((m) => m.id !== emailId));
        updateUnreadCount();
      })
      .catch((error) => {
        dispatch(showErrorToast(error?.message));
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const sendToTrash = (emailId) => {
    let sendToTrashInfo = { message_id: [emailId] };
    setIsLoading(true);
    MailboxService.sendToTrash(sendToTrashInfo)
      .then((response) => {
        setIsLoading(false);
        // reload mails
        setLastUnreadMails(lastUnreadMails.filter((m) => m.id !== emailId));
        updateUnreadCount();
        // TODO: NilS buradan silince service worker trigger et
      })
      .catch((error) => {
        dispatch(showErrorToast(error?.message));
      });
  };

  useEffect(() => {
    setIsLoading(true);
    let data = {
      folder: 'inbox',
      limit: 5,
      message_listing_type: 'message',
      offset: 0,
      order: 'date',
      order_type: 'desc',
      flag: false,
      unread: true,
      attachment: false,
      search: '*'
    };
    MailboxService.getMails(data)
      .then((response) => {
        setLastUnreadMails(response.data);
      })
      .catch((error) => {
        dispatch(showErrorToast(error?.message));
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [lastUnreadMails.length]);

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
        lastUnreadMails &&
        lastUnreadMails.map((mail) => (
          <Card border="info">
            <Card.Header>
              {mail.from.map((f) =>
                f.full_name && f.full_name.length > 0
                  ? f.full_name
                  : f.first_name
              )}{' '}
              - {moment.unix(mail.time).format('Do MMMM YYYY, hh:mm:ss')}
            </Card.Header>
            <Card.Body>
              <div onClick={() => handleRouteToMail(mail.id)}>
                <Card.Text className="fw-bold">{mail.subject}</Card.Text>
                <Card.Text>{mail.first_line}</Card.Text>
              </div>
              <div className="d-flex flex-row justify-content-end">
                <a
                  className={`${classes.quick_actions_icon} me-1`}
                  onClick={() => {
                    markAsRead(mail.id);
                  }}
                >
                  <FontAwesomeIcon
                    icon={faEnvelopeOpen}
                    className="text-primary"
                  />
                </a>
                <a
                  className={classes.quick_actions_icon}
                  onClick={() => {
                    sendToTrash(mail.id);
                  }}
                >
                  <FontAwesomeIcon icon={faTrashAlt} className="text-primary" />
                </a>
              </div>
            </Card.Body>
          </Card>
        ))
      )}
      {!isLoading && (!lastUnreadMails || lastUnreadMails.length === 0) && (
        <div className="container h-100">
          <div
            className={`d-flex justify-content-center align-items-center ${classes.vh70}`}
          >
            <img src={iconMail} alt="Login" className="not-found-image" />
          </div>
          <p class="text-center text-primary fw-bold fs-6">
            {t('NO_UNREAD_MAILS')}
          </p>
        </div>
      )}
    </Fragment>
  );
}

function mapStateToProps({ authedUser }) {
  return {
    accountMail: authedUser ? authedUser.client_id : ''
  };
}

export default connect(mapStateToProps)(LastUnreadMails);
