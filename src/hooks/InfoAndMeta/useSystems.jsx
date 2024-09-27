import { BsFillQuestionDiamondFill } from 'react-icons/bs';
import useKeyDown from 'hooks/useKeyDown';
import TerminalBlock from '../../components/codeBlock/TerminalBlock';

export const clickableStyling = 'text-white mr-2 text-2xl cursor-pointer hover:text-brand-400';

export function connectHelpGeneral({
  showHelp,
  setShowHelp,
  codeLanguage,
  code,
  CallOut,
  orientation = 'top',
  extra,
  extraCallOut,
  iconColor,
  standardHelpMessage = '',
}) {
  const orientationSanitized = orientation.toLowerCase();
  return (
    <div className={`${extra}`}>
      {showHelp && code && !standardHelpMessage && orientationSanitized === 'top' ? (
        <TerminalBlock
          codeLanguage={codeLanguage}
          code={code}
        />
      ) : ''}
      {showHelp && !code && standardHelpMessage && orientationSanitized === 'top' ? (
        <div className="font-mono text-xs">{standardHelpMessage}</div>
      ) : ''}
      <div
        className={`flex items-center w-full text-gray-400 text-xs 
                ${orientationSanitized === 'top' ? 'mb-2' : ''} 
                ${code || standardHelpMessage ? 'cursor-pointer hover:text-brand-400' : ''} 
                ${extraCallOut || ''} 
                ${iconColor ? `!text-${iconColor}` : ''}`}
        onClick={code || standardHelpMessage ? () => setShowHelp((prev) => !prev) : null}
        onKeyDown={(e) => useKeyDown(e, 'Enter', [code || standardHelpMessage ? () => setShowHelp((prev) => !prev) : null])}
        role="button"
        tabIndex={0}
      >
        <BsFillQuestionDiamondFill className={`mr-2 ${iconColor ? `text-${iconColor}` : ''}`} />
        {CallOut}
      </div>
      {showHelp && code && !standardHelpMessage && orientationSanitized === 'bottom' ? (
        <TerminalBlock
          codeLanguage={codeLanguage}
          code={code}
        />
      ) : ''}
      {showHelp && !code && standardHelpMessage && orientationSanitized === 'bottom' ? (
        <div className="font-mono text-xs py-1">{standardHelpMessage}</div>
      ) : ''}
    </div>
  );
}
