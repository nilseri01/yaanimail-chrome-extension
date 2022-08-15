import { connect } from 'react-redux';
import { Navbar, Container } from 'react-bootstrap';
import logo from '../../assets/img/logo.png';
import Login from './Login';
import Logout from './Logout';
import UnreadMailCount from './../ui/mailbox/UnreadMailCount';

function Header(props) {
  return (
    <Navbar bg="light">
      <Container>
        <Navbar.Brand href="#home">
          <img
            alt="YaaniMail"
            src={logo}
            width="150"
            className="d-inline-block align-top pt-1"
          />
        </Navbar.Brand>
        {props.isLoggedIn === false ? (
          <Login />
        ) : (
          <div>
            <UnreadMailCount />
            <Logout />
          </div>
        )}
      </Container>
    </Navbar>
  );
}

function mapStateToProps({ authedUser }) {
  return {
    isLoggedIn: !!authedUser,
    authedUser: authedUser
  };
}

export default connect(mapStateToProps)(Header);
