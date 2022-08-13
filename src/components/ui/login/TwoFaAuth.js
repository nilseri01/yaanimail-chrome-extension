import { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { setAuthedUser } from '../../../actions/authedUser';
import { setView } from '../../../actions/view';
import LoginService from '../../../services/LoginService';
import UtilsService from '../../../services/UtilsService';
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';
import { Form, Modal, Button } from 'react-bootstrap';
import Countdown, { zeroPad } from 'react-countdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';

function TwoFaAuth(props) {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [twoFaCode, setTwoFaCode] = useState('');

  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);

  const dispatch = useDispatch();

  const countDownRenderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      return <span>---</span>;
    } else {
      return (
        <span>
          {zeroPad(minutes)}:{zeroPad(seconds)}
        </span>
      );
    }
  };

  const sendTwoFaPassword = (event) => {
    event.preventDefault();
    console.log(props);
    let twoFaInfo = {
      code: props.twoFaUuid,
      password: twoFaCode
    };
    setIsLoading(true);
    LoginService.sendTwoFaPassword(twoFaInfo)
      .then((response) => {
        setIsLoading(false);
        UtilsService.saveMultipleToLocalStorage({
          'ym@user': JSON.stringify(response.data),
          'ym@view': 'inbox'
        }).then((data) => {
          dispatch(setAuthedUser(JSON.parse(data['ym@user'])));
          dispatch(setView('inbox'));
          setShow(false);
        });
      })
      .catch((error) => {
        // TODO: NilS error objesi?
        console.log(error.message);
        toast.error(error.message);
      });
  };

  return (
    <Modal show={show}>
      <Modal.Header closeButton>
        <Modal.Title className="text-primary">{t('TWO_FA_HEADER')}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="h-200">
        <Form>
          <Form.Group controlId="twoFaCode">
            <Form.Control
              as="input"
              placeholder={t('ENTER_CODE_HERE')}
              autoFocus
              value={twoFaCode}
              onChange={(e) => setTwoFaCode(e.target.value)}
              maxLength={6}
              required
            />
          </Form.Group>
          <Form.Group
            controlId="twoFaCountDown"
            className="d-flex flex-row pt-1"
          >
            <div>
              <FontAwesomeIcon icon={faClock} />
            </div>
            <div class="ps-2">
              <Countdown
                date={Date.now() + props.twoFaTimeout * 1000}
                renderer={countDownRenderer}
              />
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          {t('BUTTON_CLOSE')}
        </Button>
        <Button
          variant="primary"
          onClick={sendTwoFaPassword}
          disabled={isLoading}
        >
          {t('BUTTON_CONTINUE')}
        </Button>
      </Modal.Footer>
      <ToastContainer position="bottom-left" autoClose={1500} closeOnClick />
    </Modal>
  );
}

export default connect()(TwoFaAuth);
