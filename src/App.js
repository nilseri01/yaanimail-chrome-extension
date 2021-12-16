import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './components/layout/Layout';
import MailboxContainer from './components/ui/mailbox/MailboxContainer';

function App() {
  return (
    <Layout>
      <MailboxContainer />
    </Layout>
  );
}

export default App;
