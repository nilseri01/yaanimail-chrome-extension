import { Fragment, useState } from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import { connect, useDispatch } from 'react-redux';
import { setAuthedUser } from '../../actions/authedUser';
import { setView } from '../../actions/view';
import UtilsService from '../../services/UtilsService';
import LoginService from '../../services/LoginService';
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';
import TwoFaAuth from '../ui/login/TwoFaAuth';

function Login() {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const [isTwoFaRequired, setTwoFaRequired] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [twoFaUuid, setTwoFaUuid] = useState('');
  const [twoFaTimeout, setTwoFaTimeout] = useState(0);
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
    LoginService.login(loginInfo)
      .then((response) => {
        // TODO: NilS
        setIsLoading(false);
        if (response.data.two_fa_security === 1) {
          setTwoFaUuid(response.data.two_fa_code);
          setTwoFaTimeout(response.data.two_fa_time_out);
          setTwoFaRequired(true);
        } else {
          UtilsService.saveMultipleToLocalStorage({
            'ym@user': JSON.stringify(response.data),
            'ym@view': 'inbox'
          }).then((data) => {
            dispatch(setAuthedUser(JSON.parse(data['ym@user'])));
            dispatch(setView('inbox'));
          });
        }
      })
      .catch((error) => {
        // TODO: NilS error objesi?
        console.log(error.message);
        toast.error(error.message);
      });
  };

  // <InputGroup.Text id="basic-addon2">@yaani.com</InputGroup.Text>

  return (
    <Fragment>
      <form onSubmit={handleSubmit}>
        <div className="d-flex flex-column py-2">
          <InputGroup size="sm" className="mb-3">
            <FormControl
              placeholder={t('E-MAIL')}
              aria-label={t('E-MAIL')}
              aria-describedby="basic-addon2"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </InputGroup>
          <InputGroup size="sm" className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-sm">
              {t('PASSWORD')}
            </InputGroup.Text>
            <FormControl
              placeholder={t('PASSWORD')}
              aria-label={t('PASSWORD')}
              aria-describedby="inputGroup-sizing-sm"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputGroup>
          <div>
            <Button variant="primary" className="float-end" type="submit">
              {t('LOGIN')}
            </Button>
          </div>
        </div>
        <ToastContainer position="bottom-left" autoClose={1500} closeOnClick />
      </form>
      <TwoFaAuth
        isTwoFaRequired={isTwoFaRequired}
        setTwoFaRequired={setTwoFaRequired}
        twoFaUuid={twoFaUuid}
        twoFaTimeout={twoFaTimeout}
      ></TwoFaAuth>
    </Fragment>
  );
}

export default connect()(Login);
