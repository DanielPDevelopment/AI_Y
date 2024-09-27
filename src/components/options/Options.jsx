/* eslint-disable max-len */
import React from 'react';
import { TbAugmentedReality, TbTemperature, TbPrompt } from 'react-icons/tb';
import { SiDatabricks, SiDocsdotrs } from 'react-icons/si';
import { useAuth } from 'contexts/user/AuthContext';
import { IoMdOptions } from 'react-icons/io';
import { MdArrowRightAlt } from 'react-icons/md';
import { PiArrowElbowRightDownLight } from 'react-icons/pi';
import { BsGrid1X2 } from 'react-icons/bs';
import { AiOutlineSwapRight } from 'react-icons/ai';
import PropTypes from 'prop-types';

import Modal from 'components/modal/Modal';
import ModelList from 'helpers/ModelList';

import UploadAndProcessFiles from 'components/upload/UploadAndProcessFiles';
import useKeyDown from 'hooks/useKeyDown';
import SystemPromptSelector from './systemPrompt/SystemPromptSelector';
import Slider from './tempSelector/Slider';
import ModelSelector from './modelSelector/ModelSelector';
import ChunkSlider from './chunkSelector/ChunkSlider';

// TODO: refactor each item of like elements into a new component called OptionItem.jsx

const Options = ({ compact = false, compactStyle = '' }) => {
  const { user, updateUser } = useAuth();

  const [open, setOpen] = React.useState(false);
  const [openRag, setOpenRag] = React.useState(false);

  const modelList = React.useMemo(() => ModelList.modelList, []);

  return (
    <div className={`w-full ${compact ? 'flex flex-wrap' : ''}`}>

      {openRag ? (
        <Modal open={openRag} setOpen={setOpenRag} extra="min-h-[150px]">

          <div className="Title w-full text-center text-xl text-gray-300 font-mono">
            RAG Options
          </div>
          <div className="font-poppins text-xs text-red-400 pl-[20px] w-full">

            TODO: Build presets for books, resumes, excels, docs, etc
            <br />
            [Having to find out manually what works blind wont help the user]
          </div>

          <div className="flex flex-wrap justify-start items-center text-gray-300 transition-all duration-400 ease-in-out py-2  items-center">
            <SiDocsdotrs
              className="h-[20px] w-[20px] pr-1"
            />
            <div className="font-poppins text-xs ">Current Doc</div>
            {user.RAG.fileName ? (
              <div className="font-poppins text-xs text-grayBlue pl-[20px] w-full">{user.RAG.fileName}</div>
            )
              : (
                <div className="font-poppins text-xs text-grayBlue pl-[20px] w-full">Current documents you have uploaded for your Retrieval Augmented Generations</div>

              )}
          </div>

          <div className="flex flex-wrap justify-start items-center content-start text-gray-300 transition-all duration-400 ease-in-out py-2">
            <BsGrid1X2
              className="h-[20px] w-[20px] pr-1"
            />
            <div className="font-poppins text-xs ">Chunk Size</div>
            <ChunkSlider
              onChange={(e) => updateUser(
                { data: { ...user, RAG: { ...user.RAG, chunkSize: e.target.value } } },
              )}
              value={parseFloat(user.RAG.chunkSize)}
              minMax={[0, 5000]}
              extraParent="w-full pl-[10px] mt-1"
              step="10"
            />
            <div className="font-poppins text-xs text-grayBlue pl-[20px] w-full">The chunk size defines the amount of text processed at one time to generate embeddings, influencing the granularity and context captured in the vector representations.</div>

          </div>

          <div className="flex flex-wrap justify-start items-center content-start text-gray-300 transition-all duration-400 ease-in-out py-2">
            <AiOutlineSwapRight
              className="h-[20px] w-[20px] pr-1"
            />
            <div className="font-poppins text-xs ">Chunk Offset</div>
            <ChunkSlider
              onChange={(e) => updateUser(
                { data: { ...user, RAG: { ...user.RAG, chunkOffset: e.target.value } } },
              )}
              value={parseFloat(user.RAG.chunkOffset)}
              minMax={[0, 5000]}
              extraParent="w-full pl-[10px] mt-1"
              step="10"
            />
            <div className="font-poppins text-xs text-grayBlue pl-[20px] w-full">The Step or interval amount by which the sliding window moves when dividing text into chunks for processing. This parameter is crucial in ensuring overlapping context between chunks, which helps maintain coherence and context continuity in the generated embeddings. By adjusting the chunk offset amount, one can control how much of the previous text is retained in each subsequent chunk, balancing between capturing sufficient context and managing computational efficiency.</div>
          </div>

          <div className="flex flex-wrap w-full justify-around">
            <UploadAndProcessFiles setOpenRag={setOpenRag} />
          </div>

        </Modal>
      )
        : (
          ''
        )}

      {
                open ? (
                  <Modal open={open} setOpen={setOpen} extra="min-h-[150px]">

                    <div className="Title w-full text-center text-xl text-gray-300 font-mono">
                      Configuration
                    </div>

                    <div className="flex flex-wrap justify-start items-center text-gray-300 transition-all duration-400 ease-in-out py-2  items-center">
                      <SiDatabricks
                        className="h-[20px] w-[20px] pr-1"
                      />
                      <div className="font-poppins text-xs ">Select Model</div>
                      <ModelSelector />
                      <div className="font-poppins text-xs text-grayBlue pl-[20px] w-full mt-2">{modelList.filter((item) => item.value === user.model)?.[0]?.info || ''}</div>
                    </div>

                    <div className="flex flex-wrap justify-start items-center text-gray-300 transition-all duration-400 ease-in-out py-2  items-center">
                      <TbTemperature
                        className="h-[20px] w-[20px] pr-1"
                      />
                      <div className="font-poppins text-xs ">Adjust Tempature</div>
                      <Slider />
                      <div className="font-poppins text-xs text-grayBlue pl-[20px] w-full mt-2">
                        Controls the randomness of the model's output. It influences the probability distribution of the generated text. A lower temperature value (closer to 0) makes the model's output more deterministic and focused, choosing words with higher probability, resulting in more conservative and repetitive responses. Conversely, a higher temperature value (closer to 1 or above) increases the randomness, allowing the model to produce more diverse and creative responses by considering less likely word choices. Adjusting the temperature parameter helps balance between generating predictable text and exploring more varied and creative language outputs.
                      </div>
                    </div>

                    <div className="flex flex-wrap justify-start items-center text-gray-300 transition-all duration-400 ease-in-out py-2  items-center">
                      <TbPrompt
                        className="h-[20px] w-[20px] pr-1"
                      />
                      <div className="font-poppins text-xs ">System Prompt</div>
                      <SystemPromptSelector />
                      <div className="font-poppins text-xs text-grayBlue pl-[20px] w-full mt-2">
                        The initial input or context provided to the model to generate text or perform a specific task. It serves as the starting point from which the model generates responses or outputs based on the input data.

                        The system prompt typically consists of a piece of text or structured data that defines the task or query the user wants the model to perform. It can range from a simple sentence to a more complex set of instructions or questions. The quality and specificity of the prompt play a crucial role in influencing the relevance and accuracy of the model's outputs.
                      </div>
                    </div>
                  </Modal>
                )
                  : (
                    ''
                  )
            }

      <div
        onClick={() => setOpen(true)}
        className="flex flex-wrap justify-start items-center text-gray-300 transition-all duration-400 ease-in-out py-2 opacity-80 hover:opacity-100 cursor-pointer"
        onKeyDown={(e) => useKeyDown(e, 'Enter', [() => setOpen(true)])}
        role="button"
        tabIndex={0}
      >
        <IoMdOptions
          className="h-[20px] w-[20px] pr-1"
        />
        <div className="font-poppins text-xs ">config</div>
        {compact ? (
          <MdArrowRightAlt
            className="h-[20px] w-[20px]"
          />
        )
          : (
            <PiArrowElbowRightDownLight
              className="h-[20px] w-[20px]"
            />
          )}

      </div>

      <div className={`flex flex-wrap justify-start items-center text-gray-300 transition-all duration-400 ease-in-out py-2 opacity-50 ${compactStyle}`}>
        <SiDatabricks
          className="h-[20px] w-[20px] pr-1"
        />
        <div className="font-poppins text-xs ">
          [
          {user?.model || 'Model'}
          ]
        </div>
      </div>

      <div className={`flex flex-wrap justify-start items-center text-gray-300 transition-all duration-400 ease-in-out py-2 opacity-50 ${compactStyle}`}>
        <TbTemperature
          className="h-[20px] w-[20px] pr-1"
        />
        <div className="font-poppins text-xs ">
          [
          {user?.temp || 'Temp'}
          ]
        </div>
      </div>

      <div className={`flex flex-wrap justify-start items-center text-gray-300 transition-all duration-400 ease-in-out py-2 opacity-50 ${compactStyle}`}>
        <TbPrompt
          className="h-[20px] w-[20px] pr-1"
        />
        <div className="font-poppins text-xs ">[...]</div>
      </div>

      {!compact && <div className="my-3 h-px bg-gray-300 w-full opacity-30" />}

      <div className={`flex flex-wrap justify-start items-center text-gray-300 transition-all duration-400 ease-in-out py-2 opacity-50 ${compactStyle}`}>
        <TbAugmentedReality
          className="h-[20px] w-[20px] pr-1"
        />
        <div
          onClick={() => setOpenRag(true)}
          className="flex flex-wrap justify-start items-center text-gray-300 transition-all duration-400 ease-in-out py-2 opacity-80 hover:opacity-100 cursor-pointer font-poppins text-xs "
          onKeyDown={(e) => useKeyDown(e, 'Enter', [() => setOpenRag(true)])}
          role="button"
          tabIndex={0}
        >
          RAG Settings
        </div>
      </div>
    </div>
  );
};

Options.propTypes = {
  compact: PropTypes.bool,
  compactStyle: PropTypes.string,
};

export default Options;
