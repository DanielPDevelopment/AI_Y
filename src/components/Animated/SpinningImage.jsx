import PropTypes from 'prop-types';

const SpinningImage = ({ image, style = '' }) => (
  <img
    src={image}
    alt="Logo"
    className={`animate-spin ${style}`}
  />
);

SpinningImage.propTypes = {
  image: PropTypes.node.isRequired,
  style: PropTypes.string,
};

export default SpinningImage;
