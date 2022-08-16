import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux';
import Layout from './components/layout/Layout';
import MailboxContainer from './components/ui/mailbox/MailboxContainer';
import CalendarContainer from './components/ui/calendar/CalendarContainer';
import ContactContainer from './components/ui/contact/ContactContainer';

function App(props) {
  return (
    <Layout>
      {props.selectedView === 'inbox' && <MailboxContainer />}
      {props.selectedView === 'calendar' && <CalendarContainer />}
      {props.selectedView === 'contact' && <ContactContainer />}
    </Layout>
  );
}

function mapStateToProps({ view }) {
  return {
    selectedView: view
  };
}

export default connect(mapStateToProps)(App);
