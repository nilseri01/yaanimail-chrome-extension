import { connect } from 'react-redux';
import LastUnreadMails from './LastUnreadMails';
import classes from './Mailbox.module.css';
import iconMail from '../../../assets/img/icon-mail.png';

function MailboxContainer(props) {
  return props.isLoggedIn ? (
    <LastUnreadMails />
  ) : (
    <div className="container h-100">
      <div
        className={`d-flex justify-content-center align-items-center ${classes.vh70}`}
      >
        <img src={iconMail} alt="Login" className="not-found-image" />
      </div>
    </div>
  );
}

function mapStateToProps({ authedUser }) {
  return {
    isLoggedIn: !!authedUser
  };
}

export default connect(mapStateToProps)(MailboxContainer);
