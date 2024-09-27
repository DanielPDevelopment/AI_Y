/* eslint-disable react/style-prop-object */
import { useState, useRef, useEffect } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { IoStop, IoCloseOutline } from 'react-icons/io5';
import { Typewriter } from 'react-simple-typewriter';

import useKeyDown from 'hooks/useKeyDown';
import { Logo } from '../components/brand/Logo';
import QueryResults from '../components/QueryResults/QueryResults';
import SpinningImage from '../components/Animated/SpinningImage';
import brain from '../assets/img/Brain2.png';

import Result from '../components/results/Result';
import Options from '../components/options/Options';
import Settings from '../components/settings/Settings';

// text to speech feature
// export chat log to pdf, text file.
// copy each line option.

const isDemo = import.meta.env.VITE_APP_DEMO === 'true';

const MarketingHome = () => {
  const [filterText, setFilterText] = useState('');
  const inputRef = useRef(null);
  const [parent] = useAutoAnimate();
  const [results, setResults] = useState('');
  const [isQuerying, setIsQuerying] = useState(false);
  const [context, setContext] = useState([]);
  const resultsRef = useRef(null);
  const [cancelMessageHandling, setCancelMessageHandling] = useState(false);
  const [userQuestion, setUserQuestion] = useState('');

  useEffect(() => {
    if (resultsRef.current) {
      resultsRef.current.scrollTop = resultsRef.current.scrollHeight;
    }
  }, [results]);

  useEffect(() => {
    setResults('');
    if (isQuerying) {
      setUserQuestion(filterText);
      setFilterText('');
    }
  }, [isQuerying]);

  useEffect(() => {
    inputRef?.current?.focus();
  }, []);

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      setIsQuerying(true);
    } else if (event.key === 'Escape') {
      if (isQuerying) {
        setCancelMessageHandling(true);
        setIsQuerying(false);
        setCancelMessageHandling(false);
      } else if (!isQuerying && !filterText) {
        setResults('');
        setFilterText('');
        setIsQuerying(false);
        setCancelMessageHandling(false);
        inputRef.current.focus();
      } else {
        setFilterText('');
      }
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      // Reset the height to auto to shrink if eventually needed
      inputRef.current.style.height = '50px';
      // Set the height to the scroll height, but no larger than the max height
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 200)}px`; // 200px is the max height
    }
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [isQuerying, filterText]);

  useEffect(() => {
    inputRef.current.style.height = '50px';
    inputRef.current.focus();
  }, [results]);

  return (
    <div className="min-h-screen max-w-100% flex flex-wrap justify-center">
      <div className="bg-lightGray w-full flex flex-wrap justify-center " ref={parent}>

        {isDemo
          ? (
            <div className="absolute top-2 right-2  font-mono">
              <div className="text-primaryBlue text-xs underline">Developmental Demo</div>
              <div className="text-primaryYellow text-xs font-mono">Model Discretion advised</div>
              <div className="text-primaryYellow text-xs font-mono">Uncensored Models unavailable</div>
              <div className="text-primaryYellow text-xs font-mono">Model Parameters limited ~7billion [cpu limitations]</div>
              <div className="text-primaryYellow text-xs font-mono">RAG Ingestion slowed | limited</div>

            </div>
          )
          : (
            ''
          )}

        <div className="w-full max-w-[1800px] py-3 px-3 2xl:px-0 px-4">
          <Settings />

          {isQuerying || (results && results.length) || (context && context.length)
            ? (
              <div className="h-90px pt-3 flex flex-wrap justify-start">
                <div className="flex flex-wrap items-center justify-center font-poppins m-auo" />
                <div className="w-full px-0 md:px-20 pt-20 md:pt-10 text-white flex flex-wrap justify-between ">
                  <div className="md:w-[200px] w-full flex-shrink-0 ">
                    <div
                      className="font-mono text-xs text-primaryBlue cursor-pointer"
                      onClick={() => {
                        setResults('');
                        setFilterText('');
                        setContext([]);
                        setIsQuerying(false);
                        setCancelMessageHandling(false);
                        inputRef.current.focus();
                      }}
                      onKeyDown={(e) => useKeyDown(e, 'Enter', [() => {
                        setResults('');
                        setFilterText('');
                        setContext([]);
                        setIsQuerying(false);
                        setCancelMessageHandling(false);
                        inputRef.current.focus();
                      }])}
                      role="button"
                      tabIndex={0}
                    >
                      Query
                      <span className="text-creamyWhite/50">
                        <Typewriter
                          words={['Intelligence']}
                          loop={1}
                          cursor
                          cursorStyle=""
                          typeSpeed={70}
                          deleteSpeed={50}
                          delaySpeed={1000}
                        />
                      </span>
                      <Typewriter
                        words={['']}
                        loop={1}
                        cursor
                        cursorStyle="|"
                        typeSpeed={70}
                        deleteSpeed={50}
                        delaySpeed={1000}
                      />
                    </div>
                    <Options />
                  </div>
                  <div className="md:w-[calc(100%-250px)] w-full">

                    {isQuerying ? (
                      <img
                        src={brain}
                        className={`opacity-10 z-[-1] ${isQuerying && 'z-[0]'} grayscale fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-400 ease-in-out ${isQuerying && 'opacity-20'}`}
                        alt="Is Querying"
                      />
                    )
                      : ''}
                    <QueryResults
                      isQuerying={isQuerying}
                      query={filterText}
                      results={results}
                      setResults={setResults}
                      setIsQuerying={setIsQuerying}
                      question={filterText}
                      context={context}
                      setContext={setContext}
                      cancelMessageHandling={cancelMessageHandling}
                    />
                    <div
                      className="overflow-y-auto module-content scrollbar-hide md:max-h-[calc(100vh-250px)] max-h-[calc(100vh-450px)] whitespace-pre-line"
                      ref={resultsRef}
                    >
                      <div className=" pb-4 ">
                        <div className="w-full text-grayBlue py-2 pl-4" />
                        {context && context?.map((mes) => (
                          <div className="flex flex-wrap w-full space-between" key={mes.answer[0]}>
                            <div className="w-full flex flex-wrap my-6">
                              <div className="rounded-lg text-gray-300 px-4 py-1 flex flex-wrap w-full items-center">
                                {mes.question}
                              </div>
                            </div>
                            <Result result={mes.answer} />
                          </div>
                        ))}
                        {userQuestion && isQuerying ? (
                          <div className="flex flex-wrap w-full space-between">
                            <div className="w-full flex flex-wrap my-6">
                              <div className="rounded-lg text-gray-300 px-4 py-1 flex flex-wrap w-full items-center">
                                {userQuestion}
                              </div>
                            </div>
                            <Result result={results} />
                          </div>
                        )
                          : ''}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-0 right-1/2 translate-x-1/2 md:-translate-x-0 md:right-0 md:px-20 py-5 rounded-lg  text-white z-50  px-4 w-[100%] md:w-[calc(100%-250px)] max-h-screen overflow-y-auto module-content scrollbar-hide">
                  <div className="flex flex-wrap">
                    <div className="my-2 h-px bg-gray-300 opacity-30 w-full" />
                    <div className="relative mb-0 pb-0 w-full">
                      <textarea
                        type="textarea"
                        placeholder=""
                        ref={inputRef}
                        className="pl-6 pr-10 w-full py-3 bg-gray-light bg-opacity-80 rounded-lg text-gray-300 ring-white focus:outline-none focus:bg-gray-light focus:bg-opacity-80 focus:ring-2 focus:ring-gray-light resize-none module-content scrollbar-hide h-auto max-h-[200px]"
                        value={filterText}
                        onChange={(e) => setFilterText(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                          }
                        }}
                      />

                      <div>
                        {isQuerying ? (
                          <IoStop
                            className="absolute top-3 right-[60px] p-0 focus:outline-none h-[20px] w-[20px] cursor-pointer"
                            onClick={() => {
                              setCancelMessageHandling(true);
                              setIsQuerying(false);
                              setCancelMessageHandling(false);
                            }}
                          />
                        )
                          : ''}
                        <div
                          className={`absolute top-2 right-0 p-0 focus:outline-none transition-all duration-400 ease-in-out ${filterText ? 'cursor-pointer opacity-100' : 'opacity-30'}`}
                          onClick={() => {
                            setIsQuerying(true);
                          }}
                          onKeyDown={(e) => useKeyDown(e, 'Enter', [() => {
                            setIsQuerying(true);
                          }])}
                          role="button"
                          tabIndex={0}
                        >
                          {isQuerying
                            ? (
                              <SpinningImage
                                image={brain}
                                style="h-[30px] md:px-1 px-1"
                              />
                            )
                            : (
                              <img
                                src={brain}
                                alt="Logo"
                                className="h-[30px] md:px-1 px-1"
                                style={{ width: 'auto' }}
                              />
                            )}
                        </div>

                        {filterText ? (
                          <IoCloseOutline
                            className={`absolute top-3 left-[5px] p-0 focus:outline-none font-mono text-white h-[25px] w-[15px]  transition-all duration-400 ease-in-out ${filterText && filterText.length ? 'opacity-100 cursor-pointer' : 'opacity-0'}`}
                            onClick={() => {
                              setFilterText('');
                              inputRef.current.focus();
                            }}
                          />
                        )
                          : (
                            ''
                          )}

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
            : (
              <div className=" h-[calc(100vh-80px)] flex flex-wrap items-center content-center justify-center">
                <div className="flex flex-wrap align-end lg:w-1/2 justify-start pl-4">
                  <div className="flex flex-wrap w-full">
                    <Options
                      compactStyle="mr-2"
                      compact
                    />
                    <div className="my-2 h-px bg-gray-300 opacity-30 w-full" />
                    <div className="relative mb-0 pb-0 w-full">
                      <textarea
                        type="text"
                        placeholder=""
                        ref={inputRef}
                        className="pl-6 pr-10 w-full py-3 bg-gray-light bg-opacity-80 rounded-lg text-gray-300 ring-white focus:outline-none focus:bg-gray-light focus:bg-opacity-80 focus:ring-2 focus:ring-gray-light resize-none module-content scrollbar-hide h-auto max-h-[200px]"
                        value={filterText}
                        onChange={(e) => setFilterText(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                          }
                        }}
                      />
                      <div>
                        <div
                          className={`absolute top-2 right-0 p-0 focus:outline-none transition-all duration-400 ease-in-out ${filterText ? 'cursor-pointer opacity-100' : 'opacity-30'}`}
                          onClick={() => {
                            if (filterText && filterText.length) {
                              setIsQuerying(true);
                            } else {
                              inputRef.current.focus();
                            }
                          }}
                          onKeyDown={(e) => useKeyDown(e, 'Enter', [() => {
                            if (filterText && filterText.length) {
                              setIsQuerying(true);
                            } else {
                              inputRef.current.focus();
                            }
                          }])}
                          role="button"
                          tabIndex={0}
                        >
                          {isQuerying
                            ? (
                              <SpinningImage
                                image={brain}
                                style="h-[30px] md:px-1 px-1"
                              />
                            )
                            : (
                              <img
                                src={brain}
                                alt="Logo"
                                className="h-[30px] md:px-1 px-1"
                                style={{ width: 'auto' }}
                              />
                            )}
                        </div>
                        <IoCloseOutline
                          className={`absolute top-3 left-[5px] p-0 focus:outline-none font-mono text-white h-[25px] w-[15px]  transition-all duration-400 ease-in-out ${filterText && filterText.length ? 'opacity-100 cursor-pointer' : 'opacity-0'}`}
                          onClick={() => {
                            setFilterText('');
                            inputRef.current.focus();
                          }}
                        />
                      </div>
                    </div>
                    <Logo
                      textExtra="md:text-4xl text-2xl"
                      imageExtra="md:h-64 drop-shadow-xl cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default MarketingHome;
