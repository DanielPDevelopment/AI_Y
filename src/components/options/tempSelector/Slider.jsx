import { useAuth } from 'contexts/user/AuthContext';

const Slider = () => {
  const { user, updateUser } = useAuth();

  const handleChange = (event) => {
    updateUser({ data: { ...user, temp: parseFloat(event.target.value) } });
  };

  return (
    <div className="relative text-grayBlue items-center content-center flex flex-wrap ml-2">
      <input
        type="range"
        min="0.01"
        max="2"
        step="0.01"
        value={parseFloat(user?.temp)}
        onChange={handleChange}
        className="bg-gray-light text-gray-600"
        style={{
          background: '#CBD5E0',
          height: '4px',
          outline: 'none',
        }}
      />
      <div className="text-xs md:text-xs text-gray-600 ml-1 font-poppins">
        Value:
        {parseFloat(user?.temp)}
      </div>
    </div>
  );
};

export default Slider;
