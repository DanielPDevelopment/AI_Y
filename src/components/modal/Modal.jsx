import useKeyDown from 'hooks/useKeyDown';
import PropTypes from 'prop-types';

const Modal = ({ setOpen, children, extra = '' }) => (
  <div>
    <div
      onClick={() => setOpen(false)}
      onKeyDown={(e) => useKeyDown(e, 'Enter', [() => setOpen(false)])}
      role="button"
      tabIndex={0}
    >
      <div className="fixed inset-0 z-40 backdrop-blur-sm backdrop-opacity-70 transition-all duration-400 ease-in-out" />
    </div>
    <div
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-light py-5 px-6 rounded-lg 
                shadow-lg text-white z-50 py-6   w-[90%] xl:w-[800px]  max-h-screen overflow-y-auto module-content scrollbar-hide flex flex-wrap transition-all duration-400 ease-in-out ${extra}`}
    >
      {children}
    </div>
  </div>
);

Modal.propTypes = {
  setOpen: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  extra: PropTypes.string,
};

export default Modal;
