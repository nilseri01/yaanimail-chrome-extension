import Header from './Header';
import classes from './Layout.module.css';
import { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { handleInitialData } from '../../actions/shared';
import { useTranslation } from 'react-i18next';
import Toolbar from './Toolbar';
import { ToastContainer, toast } from 'react-toastify';

function Layout(props) {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handleInitialData());
  }, []);

  useEffect(() => {
    i18n.changeLanguage(props.language || 'tr');
  }, [props.language]);

  useEffect(() => {
    if ((props.toastInfo?.message || '').trim().length === 0) {
      return;
    }

    if (props.toastInfo?.isSuccess) {
      toast.success(props.toastInfo.message);
    } else if (props.toastInfo?.isError) {
      toast.error(props.toastInfo.message);
    }
  }, [props.toastInfo?.message]);

  return (
    <div>
      <Header />
      {props.isLoggedIn && <Toolbar />}
      <main className={classes.main}>{props.children}</main>
      <ToastContainer position="bottom-left" autoClose={1500} closeOnClick />
    </div>
  );
}

function mapStateToProps({ authedUser, toast }) {
  return {
    isLoggedIn: !!authedUser,
    language:
      authedUser && (authedUser.language || '').length > 0
        ? authedUser.language
        : 'tr',
    toastInfo: toast
  };
}

export default connect(mapStateToProps)(Layout);
