import { connect, useDispatch } from 'react-redux';
import { Modal, Button, Container, Row, Col } from 'react-bootstrap';
import 'moment/locale/tr';
import { useTranslation } from 'react-i18next';
import classes from './Contact.module.css';

const handleMailTo = (email) => {
  let emailUrl = `mailto:${email}`;
  chrome.tabs.create(
    {
      url: emailUrl
    },
    function (tab) {
      setTimeout(function () {
        chrome.tabs.remove(tab.id);
      }, 500);
    }
  );
};

function ContactDetails(props) {
  const { t } = useTranslation();
  const contactDetails = props.contactDetails;

  const handleCloseDetails = () => props.setShowDetails(false);

  return (
    <Modal
      show={props.showDetails}
      onHide={handleCloseDetails}
      animation={false}
    >
      <Modal.Header closeButton>
        <Modal.Title className="text-truncate">
          {contactDetails.fullname ? contactDetails.fullname : ''}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={classes.contact_details_container}>
        <Container>
          {contactDetails.email && (
            <Row className="align-items-center">
              <Col xs={4} className="text-truncate">
                {t('EMAIL')}
              </Col>
              {contactDetails.email && (
                <Col className="text-truncate">
                  <Button
                    variant="link"
                    className={`ps-1 ${classes.link_button}`}
                    onClick={() => handleMailTo(contactDetails.email)}
                  >
                    {contactDetails.email}
                  </Button>
                </Col>
              )}
            </Row>
          )}
          {contactDetails.other_email && (
            <Row className="align-items-center">
              <Col xs={4} className="text-truncate">
                {t('OTHER_EMAIL')}
              </Col>
              <Col className="text-truncate">
                <Button
                  variant="link"
                  className={`ps-1 ${classes.link_button}`}
                  onClick={() => handleMailTo(contactDetails.other_email)}
                >
                  {contactDetails.other_email}
                </Button>
              </Col>
            </Row>
          )}
          {contactDetails.phone?.mobile &&
            contactDetails.phone.mobile?.map((phone) => {
              <Row className="align-items-center">
                <Col xs={4} className="text-truncate">
                  {t('MOBILE')}
                </Col>
                <Col className="text-truncate">{phone}</Col>
              </Row>;
            })}
          {contactDetails.phone?.work &&
            contactDetails.phone.work?.map((phone) => {
              <Row className="align-items-center">
                <Col xs={4} className="text-truncate">
                  {t('WORK')}
                </Col>
                <Col className="text-truncate">{phone}</Col>
              </Row>;
            })}
          {contactDetails.phone?.home &&
            contactDetails.phone.home?.map((phone) => {
              <Row className="align-items-center">
                <Col xs={4} className="text-truncate">
                  {t('HOME')}
                </Col>
                <Col className="text-truncate">{phone}</Col>
              </Row>;
            })}
          {contactDetails.phone?.other &&
            contactDetails.phone.other?.map((phone) => {
              <Row className="align-items-center">
                <Col xs={4} className="text-truncate">
                  {t('OTHER')}
                </Col>
                <Col className="text-truncate">{phone}</Col>
              </Row>;
            })}
          {contactDetails.job_title && (
            <Row className="align-items-center">
              <Col xs={4} className="text-truncate">
                {t('JOB_TITLE')}
              </Col>
              <Col className="text-truncate">{contactDetails.job_title}</Col>
            </Row>
          )}
          {contactDetails.company && (
            <Row className="align-items-center">
              <Col xs={4} className="text-truncate">
                {t('COMPANY')}
              </Col>
              <Col className="text-truncate">{contactDetails.company}</Col>
            </Row>
          )}
          {contactDetails.department && (
            <Row className="align-items-center">
              <Col xs={4} className="text-truncate">
                {t('DEPARTMENT')}
              </Col>
              <Col className="text-truncate">{contactDetails.department}</Col>
            </Row>
          )}
          {contactDetails.group && (
            <Row className="align-items-center">
              <Col xs={4} className="text-truncate">
                {t('GROUP')}
              </Col>
              <Col className="text-truncate">{contactDetails.group}</Col>
            </Row>
          )}
          {contactDetails.manager && (
            <Row className="align-items-center">
              <Col xs={4} className="text-truncate">
                {t('MANAGER')}
              </Col>
              <Col className="text-truncate">{contactDetails.manager}</Col>
            </Row>
          )}
          {contactDetails.extensions_attributes?.map((attribute) => {
            <Row className="align-items-center">
              <Col xs={4} className="text-truncate">
                {attribute.name}
              </Col>
              <Col className="text-truncate">{attribute.value}</Col>
            </Row>;
          })}
          {contactDetails.addresses?.home?.map((address) => {
            <Row className="align-items-center">
              <Col xs={4} className="text-truncate">
                {t('HOME')}
              </Col>
              <Col className="text-truncate">
                {address.street} {address.state} {address.postalcode}{' '}
                {address.city}
              </Col>
            </Row>;
          })}
          {contactDetails.addresses?.work?.map((address) => {
            <Row className="align-items-center">
              <Col xs={4} className="text-truncate">
                {t('WORK')}
              </Col>
              <Col className="text-truncate">
                {address.street} {address.state} {address.postalcode}{' '}
                {address.city}
              </Col>
            </Row>;
          })}
          {contactDetails.addresses?.other?.map((address) => {
            <Row className="align-items-center">
              <Col xs={4} className="text-truncate">
                {t('OTHER')}
              </Col>
              <Col className="text-truncate">
                {address.street} {address.state} {address.postalcode}{' '}
                {address.city}
              </Col>
            </Row>;
          })}
          {contactDetails.notes && (
            <Row className="align-items-center">
              <Col xs={4} className="text-truncate">
                {t('NOTES')}
              </Col>
              <Col className="text-truncate">{contactDetails.notes}</Col>
            </Row>
          )}
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseDetails}>
          {t('BUTTON_CLOSE')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default connect()(ContactDetails);
