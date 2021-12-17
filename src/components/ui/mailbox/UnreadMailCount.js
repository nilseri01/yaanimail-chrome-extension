import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import HttpHeadersService from '../../../services/HttpHeadersService';
import UtilsService from '../../../services/UtilsService';
import { Button, Badge, Spinner } from 'react-bootstrap';

function UnreadMailCount() {
  const [isLoading, setIsLoading] = useState(true);
  const [unreadEmailCount, setUnreadEmailCount] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    HttpHeadersService.getAuthHeaders().then((headers) => {
      axios
        .get(UtilsService.getGatewayApiUrl() + '/emails/folders/all', {
          headers: headers
        })
        .then((response) => {
          // TODO: NilS
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
          chrome.action.setBadgeText({ text: '' });
          console.log(error);
          // TODO: NilS error objesi?
          console.log(error.error.message);
        });
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
