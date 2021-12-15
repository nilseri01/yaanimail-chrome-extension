import { Link } from 'react-router-dom';
import { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import HttpHeadersService from '../../../services/HttpHeadersService';
import UtilsService from '../../../services/UtilsService';
import { Card, Spinner } from 'react-bootstrap';
import moment from 'moment/moment.js';
import classes from './Mailbox.module.css';

function LastUnreadMails() {
  const [isLoading, setIsLoading] = useState(true);
  const [lastUnreadMails, setLastUnreadMails] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    HttpHeadersService.getAuthHeaders().then((headers) => {
      axios
        .get(
          UtilsService.getGatewayApiUrl() +
            '/emails/messages?folder=inbox&limit=5&message_listing_type=message&offset=0&order=date&order_type=desc&flag=false&unread=true&attachment=false&search=*',
          {
            headers: headers
          }
        )
        .then((response) => {
          // TODO: NilS
          setIsLoading(false);
          setLastUnreadMails(response.data);
        });
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
          <div>
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
    </Fragment>
  );
}
export default LastUnreadMails;
