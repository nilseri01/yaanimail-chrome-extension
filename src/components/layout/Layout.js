import Header from './Header';
import classes from './Layout.module.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { handleInitialData } from '../../actions/shared';

// className={classes.main}

function Layout(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handleInitialData());
  }, []);

  return (
    <div>
      <Header />
      <main className={classes.main}>{props.children}</main>
    </div>
  );
}

export default Layout;
