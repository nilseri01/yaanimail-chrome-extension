import { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { showErrorToast } from '../../actions/toast';
import { Button } from 'react-bootstrap';
import { logout } from '../../actions/authedUser';
import UtilsService from '../../services/UtilsService';
import LoginService from '../../services/LoginService';
import { useTranslation } from 'react-i18next';

function Logout() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = (event) => {
    setIsLoading(true);
    chrome.action.setBadgeText({ text: '' });
    LoginService.logout()
      .then(() => {
        UtilsService.saveToLocalStorage('ym@user', null).then(() => {
          dispatch(logout());
        });
      })
      .catch((error) => {
        dispatch(
          showErrorToast(
            t(error?.data?.message, t('ERR_UNKNOWN_ERROR_HAS_OCCURED'))
          )
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Button variant="danger" disabled={isLoading} onClick={handleLogout}>
      {t('LOGOUT')}
    </Button>
  );
}

function mapStateToProps({ toast }) {
  return {
    toastInfo: toast
  };
}

export default connect(mapStateToProps)(Logout);
