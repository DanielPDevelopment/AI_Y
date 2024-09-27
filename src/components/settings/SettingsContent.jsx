import { CiTrash } from 'react-icons/ci';
import { useAuth } from 'contexts/user/AuthContext';
import useKeyDown from 'hooks/useKeyDown';
import PropTypes from 'prop-types';

const SettingsContent = ({ setOpen }) => {
  const { deleteUser } = useAuth();

  return (
    <div>
      <div
        onClick={() => setOpen(false)}
        onKeyDown={(e) => useKeyDown(e, 'Enter', [() => setOpen(false)])}
        role="button"
        tabIndex={0}
      >

        <div className="fixed inset-0 z-40 backdrop-blur-sm backdrop-opacity-70 transition-all duration-400 ease-in-out" />

      </div>

      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-light py-5 rounded-lg
            shadow-lg text-white z-50 py-6  px-4 w-[90%] xl:w-[800px]  max-h-screen overflow-y-auto module-content scrollbar-hide flex flex-wrap transition-all duration-400 ease-in-out"
      >
        <div className="Title w-full text-center text-xl text-gray-300 font-mono">
          Settings
        </div>

        <div
          className="flex flex-wrap justify-start items-center hover:text-grayBlue text-gray-300 transition-all duration-400 ease-in-out py-2 cursor-pointer"
          onClick={() => deleteUser()}
          onKeyDown={(e) => useKeyDown(e, 'Enter', [deleteUser])}
          role="button"
          tabIndex={0}
        >
          <CiTrash
            className="h-[20px] w-[20px] pr-1"
          />
          <div className="font-poppins text-xs ">Reset User</div>
          <div className="font-poppins text-xs text-grayBlue pl-[20px] w-full">{localStorage.getItem('user') ? '*This will erase your settings from your browser cache' : '*No user save data found.'}</div>
        </div>

      </div>
    </div>
  );
};

SettingsContent.propTypes = {
  setOpen: PropTypes.func.isRequired,
};

export default SettingsContent;
