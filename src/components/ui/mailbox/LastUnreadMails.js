import { Link } from 'react-router-dom';
import { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import MailboxService from '../../../services/MailboxService';
import { Card, Spinner } from 'react-bootstrap';
import moment from 'moment/moment.js';
import classes from './Mailbox.module.css';
import iconMail from '../../../assets/img/icon-mail.png';
import { useTranslation } from 'react-i18next';

function LastUnreadMails(props) {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [lastUnreadMails, setLastUnreadMails] = useState([]);

  // url: chrome.runtime.getURL('https://www.google.com/')
  function handleRouteToMail(emailId) {
    let emailUrl = `https://kurumsal.yaanimail.com/m/${props.accountMail}/PRIMARY/inbox/single/${emailId}/details`;
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
  }

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
        setIsLoading(false);
        setLastUnreadMails(response.data);
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
        lastUnreadMails &&
        lastUnreadMails.map((mail) => (
          <div onClick={() => handleRouteToMail(mail.id)}>
            <Card border="info">
              <Card.Header>
                {mail.from.map((f) =>
                  f.full_name && f.full_name.length > 0
                    ? f.full_name
                    : f.first_name
                )}{' '}
                - {moment.unix(mail.time).format('MMMM Do YYYY, h:mm:ss a')}
              </Card.Header>
              <Card.Body>
                <Card.Text className="fw-bold">{mail.subject}</Card.Text>
                <Card.Text>{mail.first_line}</Card.Text>
              </Card.Body>
            </Card>
          </div>
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
