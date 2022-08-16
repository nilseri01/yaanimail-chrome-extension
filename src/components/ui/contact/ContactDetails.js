import { connect, useDispatch } from 'react-redux';
import { Modal, Button, Container, Row, Col } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component';
import 'moment/locale/tr';
import { useTranslation } from 'react-i18next';
import classes from './Contact.module.css';

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
        <Modal.Title>
          {contactDetails.fullname ? contactDetails.fullname : ''}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={classes.contact_details_container}>
        <Container>
          <Row>
            <Col xs={4}>EMAIL</Col>
            <Col xs={{ offset: 1 }}>{contactDetails.email}</Col>
            {contactDetails.other_email && (
              <Col>{contactDetails.other_email}</Col>
            )}
          </Row>
          {contactDetails.phone?.mobile &&
            contactDetails.phone.mobile?.map((phone) => {
              <Row>
                <Col xs={4}>MOBILE</Col>
                <Col xs={{ offset: 1 }}>{phone}</Col>
              </Row>;
            })}
          {contactDetails.phone?.work &&
            contactDetails.phone.work?.map((phone) => {
              <Row>
                <Col xs={4}>WORK</Col>
                <Col xs={{ offset: 1 }}>{phone}</Col>
              </Row>;
            })}
          {contactDetails.phone?.home &&
            contactDetails.phone.home?.map((phone) => {
              <Row>
                <Col xs={4}>HOME</Col>
                <Col xs={{ offset: 1 }}>{phone}</Col>
              </Row>;
            })}
          {contactDetails.job_title && (
            <Row>
              <Col xs={4}>JOB_TITLE</Col>
              <Col xs={{ offset: 1 }}>{contactDetails.job_title}</Col>
            </Row>
          )}
          {contactDetails.company && (
            <Row>
              <Col xs={4}>COMPANY</Col>
              <Col xs={{ offset: 1 }}>{contactDetails.company}</Col>
            </Row>
          )}
          {contactDetails.department && (
            <Row>
              <Col xs={4}>DEPARTMENT</Col>
              <Col xs={{ offset: 1 }}>{contactDetails.department}</Col>
            </Row>
          )}
          {contactDetails.group && (
            <Row>
              <Col xs={4}>GROUP</Col>
              <Col xs={{ offset: 1 }}>{contactDetails.group}</Col>
            </Row>
          )}
          {contactDetails.manager && (
            <Row>
              <Col xs={4}>MANAGER</Col>
              <Col xs={{ offset: 1 }}>{contactDetails.manager}</Col>
            </Row>
          )}
          {contactDetails.extensions_attributes &&
            contactDetails.extensions_attributes.home?.map((attribute) => {
              <Row>
                <Col xs={4}>{attribute.name}</Col>
                <Col xs={{ offset: 1 }}>{attribute.value}</Col>
              </Row>;
            })}
          {contactDetails.notes && (
            <Row>
              <Col xs={4}>NOTES</Col>
              <Col xs={{ offset: 1 }}>{contactDetails.notes}</Col>
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
