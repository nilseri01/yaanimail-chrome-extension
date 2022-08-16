import { Fragment, useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import axios from 'axios';
import { showErrorToast } from '../../../actions/toast';
import ContactService from '../../../services/ContactService';
import { Form, Button, Spinner, Card, Badge, Navbar } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component';
import 'moment/locale/tr';
import { useTranslation } from 'react-i18next';
import classes from './Contact.module.css';
import iconMail from '../../../assets/img/icon-mail.png';
import ContactDetails from './ContactDetails';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard } from '@fortawesome/free-regular-svg-icons';

const handleMailTo = (email) => {
  let emailUrl = `mailto:${email}`;
  chrome.tabs.create(
    {
      url: emailUrl
    },
    function (tab) {
      setTimeout(function () {
        chrome.tabs.remove(tab.id);
      }, 500);
    }
  );
};

function ContactSearch() {
  let cancelToken;
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [offset, setOffset] = useState(0);
  const [query, setQuery] = useState('');
  const [contactType, setContactType] = useState('contact');
  const [contacts, setContacts] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [contactDetails, setContactDetails] = useState({});
  const [showDetails, setShowDetails] = useState(false);
  const [isAppended, setIsAppended] = useState(false);

  const handleShowDetails = (contactToShow) => {
    setContactDetails(contactToShow);
    setShowDetails(true);
  };

  const getMyContactFilter = () => {
    let url = '';

    url = `${url}?offset=${offset}`;
    url = `${url}&limit=5`;
    url = `${url}&sort=name`;

    if ((query || '').trim().length !== 0) {
      url = `${url}&search=${query}`;
    }
    return url;
  };

  const getMyContacts = (cancelToken) => {
    setIsLoading(true);
    ContactService.getContacts(getMyContactFilter(), cancelToken.token)
      .then((response) => {
        setContacts([...(isAppended ? contacts : []), ...response.data]);
        setHasMore(+response.headers['x-more'] === 1);
      })
      .catch((error) => {
        dispatch(showErrorToast(error?.message));
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const getGlobalContactFilter = () => {
    let url = '';

    url = `${url}?page=${page}`;
    url = `${url}&perPage=5`;
    url = `${url}&sort=name`;

    if ((query || '').trim().length !== 0) {
      url = `${url}&search=${query}`;
    }
    return url;
  };

  const getGlobalContacts = (cancelToken) => {
    setIsLoading(true);
    ContactService.getGlobalContacts(
      getGlobalContactFilter(),
      cancelToken.token
    )
      .then((response) => {
        setContacts([...(isAppended ? contacts : []), ...response.data]);
        setHasMore(+response.headers['x-more'] === 1);
      })
      .catch((error) => {
        dispatch(showErrorToast(error?.message));
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const search = () => {
    //Check if there are any previous pending requests
    if (typeof cancelToken != typeof undefined) {
      cancelToken.cancel('CANCELLED_DUE_TO_NEW_REQUEST');
    }
    //Save the cancel token for the current request
    cancelToken = axios.CancelToken.source();

    if (contactType === 'gal') {
      getGlobalContacts(cancelToken);
    } else {
      // contacts
      getMyContacts(cancelToken);
    }
  };

  const setSearchKeyword = (keyword) => {
    setIsAppended(false);
    setQuery(keyword);
    setPage(1);
    setOffset(0);
    setIsAppended(false);
  };

  const handleSearch = (type) => {
    setIsAppended(false);
    setContactType(type);
    setPage(1);
    setOffset(0);
  };

  const fetchMoreContacts = () => {
    setIsAppended(true);
    setOffset(contacts.length + 5);
    setPage(page + 1);
  };

  useEffect(() => {
    search();
  }, [query, contactType, page, offset, isAppended]);

  return (
    <Fragment>
      <Form>
        <Navbar
          bg="light"
          variant="light"
          fixed="bottom"
          className={classes.search_contacts_navbar}
        >
          <Form.Group
            className="d-flex flex-row py-1 px-1"
            controlId="formContactSearch"
          >
            <Form.Select
              className="me-1"
              onChange={(e) => handleSearch(e.target.value)}
            >
              <option value="contact">{t('MY_CONTACTS')}</option>
              <option value="gal">{t('GLOBAL_ADDRESS_LIST')}</option>
            </Form.Select>
            <Form.Control
              type="input"
              placeholder={t('SEARCH')}
              value={query}
              onChange={(e) => setSearchKeyword(e.target.value)}
              autoFocus
            />
          </Form.Group>
        </Navbar>
        {isLoading ? (
          <div className="container h-100">
            <div
              className={`d-flex justify-content-center align-items-center ${classes.vh70}`}
            >
              <Spinner animation="border" variant="info" />
            </div>
          </div>
        ) : (
          contacts &&
          contacts.length > 0 && (
            <div
              id="contactsListContainer"
              className={classes.contacts_list_container}
            >
              <InfiniteScroll
                dataLength={contacts.length}
                next={fetchMoreContacts}
                hasMore={hasMore}
                scrollableTarget="contactsListContainer"
                scrollThreshold="5px"
              >
                {contacts.map((contact) => (
                  <Card border="info" key={contact.id}>
                    <Card.Header>
                      <div className="fs-6">
                        <Badge bg="primary">
                          {contact.fullname ? contact.fullname : ''}
                        </Badge>
                        <Button
                          variant="link"
                          className={`ps-1 ${classes.link_button}`}
                          onClick={() => handleShowDetails(contact)}
                        >
                          <FontAwesomeIcon
                            icon={faAddressCard}
                            className="text-primary pe-2"
                          />
                        </Button>
                      </div>
                    </Card.Header>
                    <Card.Body>
                      <Button
                        variant="link"
                        className={`ps-1 ${classes.link_button}`}
                        onClick={() => handleMailTo(contact.email)}
                      >
                        {contact.email}
                      </Button>
                    </Card.Body>
                  </Card>
                ))}
              </InfiniteScroll>
            </div>
          )
        )}
        {!isLoading && (!contacts || contacts.length === 0) && (
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
      </Form>
      <ContactDetails
        showDetails={showDetails}
        setShowDetails={setShowDetails}
        contactDetails={contactDetails}
      ></ContactDetails>
    </Fragment>
  );
}

export default connect()(ContactSearch);
