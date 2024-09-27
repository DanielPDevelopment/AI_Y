import { useState } from 'react';

const useCopyItem = () => {
  const [isCopied, setIsCopied] = useState(false);

  function handleCopyClick(data) {
    navigator.clipboard.writeText(data)
      .then(() => setIsCopied(data))
      .catch((err) => console.error('Could not copy text: ', err));
  }

  return [isCopied, setIsCopied, handleCopyClick];
};

export default useCopyItem;
