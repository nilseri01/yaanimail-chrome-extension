import { useState, useEffect } from 'react';
import classes from './Mailbox.module.css';
import MailboxService from '../../../services/MailboxService';
import { Button, Badge, Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const handleRouteToInbox = () => {
  chrome.tabs.create({
    url: 'https://kurumsal.yaanimail.com'
  });
};

function UnreadMailCount() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [unreadEmailCount, setUnreadEmailCount] = useState(0);

  const updateUnreadMailCount = () => {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request?.updatedCound) {
        setUnreadEmailCount(request.updatedCound);
      }
    });
  };

  const getUnreadMailCount = () => {
    setIsLoading(true);
    MailboxService.getAllFolders()
      .then((response) => {
        setIsLoading(false);
        let inbox = response.data.filter((f) => f.id == 2);
        let unreadCount = inbox && inbox.length > 0 ? inbox[0].unread : 0;
        setUnreadEmailCount(unreadCount);

        chrome.action.setBadgeText({ text: '' });
        if (unreadCount !== 0) {
          chrome.action.setBadgeText({
            text: `${unreadCount > 999 ? '+999' : unreadCount}`
          });
        }
      })
      .catch((error) => {
        setIsLoading(false);
        chrome.action.setBadgeText({ text: '' });
        console.log(error);
        // TODO: NilS error objesi?
        if (error && error.data) {
          console.log(t(error.data.message));
        }
      });
  };

  useEffect(() => {
    updateUnreadMailCount();
    getUnreadMailCount();
  }, []);

  return (
    <Button variant="primary" onClick={handleRouteToInbox} className="me-2">
      <span className={classes.badge_label}>{t('UNREAD')} </span>
      {isLoading ? (
        <Spinner
          as="span"
          animation="grow"
          size="sm"
          role="status"
          aria-hidden="true"
        />
      ) : (
        <Badge bg="secondary">
          {unreadEmailCount > 999 ? '+999' : unreadEmailCount}
        </Badge>
      )}
      <span className="visually-hidden">{t('UNREAD_MAIL_COUNT')}</span>
    </Button>
  );
}

export default UnreadMailCount;
