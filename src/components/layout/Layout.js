import Header from './Header';
import classes from './Layout.module.css';
import { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { handleInitialData } from '../../actions/shared';
import { useTranslation } from 'react-i18next';
import Toolbar from './Toolbar';

// className={classes.main}

function Layout(props) {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handleInitialData());
  }, []);

  useEffect(() => {
    i18n.changeLanguage(props.language || 'tr');
  }, [props.language]);

  return (
    <div>
      <Header />
      {props.isLoggedIn && <Toolbar />}
      <main className={classes.main}>{props.children}</main>
    </div>
  );
}

function mapStateToProps({ authedUser }) {
  return {
    isLoggedIn: !!authedUser,
    language:
      authedUser && (authedUser.language || '').length > 0
        ? authedUser.language
        : 'tr'
  };
}

export default connect(mapStateToProps)(Layout);
