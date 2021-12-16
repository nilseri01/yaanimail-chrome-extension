import { useState, useEffect } from 'react';
import axios from 'axios';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import { connect, useDispatch } from 'react-redux';
import { setAuthedUser } from '../../actions/authedUser';
import HttpHeadersService from '../../services/HttpHeadersService';
import UtilsService from '../../services/UtilsService';

function Login() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    //  + '@yaani.com'
    let loginInfo = {
      email: username,
      password: password,
      details: 1
    };
    setIsLoading(true);
    HttpHeadersService.getNonAuthHeaders().then((headers) => {
      axios
        .post(UtilsService.getGatewayApiUrl() + '/accounts/login', loginInfo, {
          headers: headers
        })
        .then((response) => {
          // TODO: NilS
          setIsLoading(false);
          /* UtilsService.saveToLocalStorage(
            'ym@user',
            JSON.stringify(response.data)
          ); */
          UtilsService.saveToLocalStorage(
            'ym@user',
            JSON.stringify(response.data)
          ).then((data) => {
            dispatch(setAuthedUser(data));
          });
        })
        .catch((error) => {
          console.log(error);
          // TODO: NilS error objesi?
          console.log(error.error.message);
        });
    });
  };

  // <InputGroup.Text id="basic-addon2">@yaani.com</InputGroup.Text>

  return (
    <form onSubmit={handleSubmit}>
      <div className="d-flex flex-column py-2">
        <InputGroup size="sm" className="mb-3">
          <FormControl
            placeholder="E-mail"
            aria-label="E-mail"
            aria-describedby="basic-addon2"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </InputGroup>
        <InputGroup size="sm" className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-sm">Password</InputGroup.Text>
          <FormControl
            placeholder="Password"
            aria-label="Password"
            aria-describedby="inputGroup-sizing-sm"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputGroup>
        <div>
          <Button variant="primary" className="float-end" type="submit">
            Login
          </Button>
        </div>
      </div>
    </form>
  );
}

export default connect()(Login);
