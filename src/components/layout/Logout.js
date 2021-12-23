import { useState, useEffect } from 'react';
import axios from 'axios';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import { connect, useDispatch } from 'react-redux';
import { setAuthedUser } from '../../actions/authedUser';
import { logout } from '../../actions/authedUser';
import HttpHeadersService from '../../services/HttpHeadersService';
import UtilsService from '../../services/UtilsService';
import LoginService from '../../services/LoginService';
import { useTranslation } from 'react-i18next';

function Logout() {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();

  const handleLogout = (event) => {
    setIsLoading(true);
    chrome.action.setBadgeText({ text: '' });
    LoginService.logout()
      .then(() => {
        UtilsService.saveToLocalStorage('ym@user', null).then(() => {
          setIsLoading(false);
          dispatch(logout());
        });
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
        // TODO: NilS error objesi?
      });
  };

  return (
    <Button variant="danger" onClick={handleLogout}>
      {t('LOGOUT')}
    </Button>
  );
}

export default Logout;
