import { useState, useEffect } from 'react';
import axios from 'axios';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import { connect, useDispatch } from 'react-redux';
import { setAuthedUser } from '../../actions/authedUser';
import { logout } from '../../actions/authedUser';
import HttpHeadersService from '../../services/HttpHeadersService';
import UtilsService from '../../services/UtilsService';

function Logout() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();

  const handleLogout = (event) => {
    setIsLoading(true);
    HttpHeadersService.getAuthHeaders().then((headers) => {
      axios
        .delete(UtilsService.getGatewayApiUrl() + '/accounts/logout', {
          headers: headers
        })
        .then(() => {
          // TODO: NilS
          // UtilsService.removeFromLocalStorage('ym@user');
          UtilsService.saveToLocalStorage('ym@user', null).then(() => {
            setIsLoading(false);
            dispatch(logout());
          });
        })
        .catch((error) => {
          console.log(error);
          // TODO: NilS error objesi?
          console.log(error.error.message);
        });
    });
  };

  return (
    <Button variant="danger" onClick={handleLogout}>
      Logout
    </Button>
  );
}

export default Logout;
