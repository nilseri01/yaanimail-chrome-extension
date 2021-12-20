import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import MailboxService from '../../../services/MailboxService';
import { Button, Badge, Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

function UnreadMailCount() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [unreadEmailCount, setUnreadEmailCount] = useState(0);

  useEffect(() => {
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
  }, []);

  return (
    <Button variant="primary">
      Unread{' '}
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
      <span className="visually-hidden">Unread E-Mail Count</span>
    </Button>
  );
}

export default UnreadMailCount;
