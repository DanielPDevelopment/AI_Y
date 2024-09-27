import { useAuth } from 'contexts/user/AuthContext';
import React from 'react';
import ModelList from 'helpers/ModelList';

const ModelSelector = () => {
  const { user, updateUser } = useAuth();
  const modelList = React.useMemo(() => ModelList.modelList, []);
  const [selected, setSelected] = React.useState(
    modelList.find((item) => item.value === user.model)?.name,
  );

  React.useEffect(() => {
    if (
      modelList.filter((item) => item.name === selected)?.[0]?.value
        && modelList.filter((item) => item.value === user.model)?.[0]?.name !== selected
    ) {
      const selectedModel = modelList.find((item) => item.name === selected);
      updateUser({ data: { ...user, model: selectedModel.value } });
    }
  }, [selected]);

  return (
    <div className="relative text-grayBlue">
      <select
        className="text-gray-600 bg-gray-light active:border-0 ml-0 md:ml-4 text-xs md:text-sm ring-none"
        value={selected || 'all'}
        onChange={(e) => {
          e.stopPropagation();
          setSelected(e.target.value);
        }}
      >
        {modelList?.map((process) => (
          <option
            key={process.name}
            value={process.name}
            className="text-gray-600"
          >
            {process.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ModelSelector;
