import React from 'react';

import { CiSettings } from 'react-icons/ci';
import SettingsContent from './SettingsContent';

const Settings = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="absolute top-4 right-4">
      <CiSettings
        onClick={() => setOpen(true)}
        className="text-white z-100 hover:text-white text-gray-300 h-[20px] w-[20px] transition-all duration-400 ease-in-out cursor-pointer"
      />

      {open ? (
        <SettingsContent
          open={open}
          setOpen={setOpen}
        />
      )
        : (
          ''
        )}

    </div>
  );
};

export default Settings;
