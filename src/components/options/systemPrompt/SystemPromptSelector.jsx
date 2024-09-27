import { useAuth } from 'contexts/user/AuthContext';

const SystemPromptSelector = () => {
  const { user, updateUser } = useAuth();

  return (
    <input
      type="textarea"
      placeholder=""
      className=" ml-[20px] pl-2 pr-10 w-full py-1 font-poppins text-xs text-gray-light bg-grayBlue rounded-lg focus:text-black ring-white focus:outline-none focus:bg-grayBlue focus:ring-2 focus:ring-gray-light resize-none module-content scrollbar-hide h-auto max-h-[200px]"
      value={user?.sysPrompt}
      onChange={(e) => updateUser({ data: { ...user, sysPrompt: e.target.value } })}
    />
  );
};

export default SystemPromptSelector;
