import InputField from 'components/fields/InputField';
import PropTypes from 'prop-types';

const ChunkSelector = ({
  onChange, value, minMax, label, id, extra = '', extraParent = '',
}) => (
  <div className={extraParent}>
    <InputField
      variant="auth"
      extra={extra}
      extraParent={extraParent}
      label={label}
      id={id}
      type="Number"
      value={value}
      onChange={onChange}
      min={minMax[0]}
      max={minMax[1]}
    />
  </div>
);

ChunkSelector.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
  minMax: PropTypes.arrayOf(PropTypes.number).isRequired,
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  extra: PropTypes.string,
  extraParent: PropTypes.string,
};

export default ChunkSelector;
