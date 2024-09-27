import PropTypes from 'prop-types';

const ChunkSlider = ({
  minMax, step, value, onChange,
}) => (
  <div className="relative text-grayBlue items-center content-center flex flex-wrap ml-2 w-auto ">
    <input
      type="range"
      min={minMax[0]}
      max={minMax[1]}
      step={step}
      value={value}
      onChange={onChange}
      className="bg-gray-light text-gray-600 w-auto md:min-w-[400px]"
      style={{
        background: '#CBD5E0',
        height: '4px',
        outline: 'none',
      }}
    />
    <div className="text-xs md:text-xs text-gray-600 ml-1 font-poppins">
      Value:
      {value}
    </div>
  </div>
);

ChunkSlider.propTypes = {
  minMax: PropTypes.arrayOf(PropTypes.number).isRequired,
  step: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ChunkSlider;
