import PropTypes from 'prop-types';

const Notification = ({ notification }) => {
  return <p>{notification}</p>;
};
export default Notification;

// Впровадження PropTypes валідації props та перевірки типів може допомогти у виявленні помилок, пов'язаних з неправильним використанням props.

Notification.propTypes = {
  notification: PropTypes.string.isRequired,
};
