import { BsCopy } from 'react-icons/bs';
import useCopyItem from 'hooks/useCopyItem';
import Markdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import 'highlight.js/styles/atom-one-dark.css';
import PropTypes from 'prop-types';

const Result = ({ result }) => {
  const [isCopied, setIsCopied, handleCopyClick] = useCopyItem();

  return (
    <div className=" w-full flex flex-wrap">
      <div className="w-[calc(100%-50px)] text-sm font-poppins">
        <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>{result || ''}</Markdown>
      </div>
      <BsCopy
        className={`hover:text-gray-300 text-white/20 cursor-pointer w-[15px] h-[15px] ${isCopied ? 'text-grayBlue' : ''}`}
        onClick={() => {
          handleCopyClick(result);
          setIsCopied(true);
        }}
      />
    </div>
  );
};

Result.propTypes = {
  result: PropTypes.string.isRequired,
};

export default Result;
