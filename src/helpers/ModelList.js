let modelList = [
  {
    name: 'codellama',
    value: 'codellama',
    info: 'CodeLlama is an advanced language model from Meta, specifically designed for coding-related tasks. It excels at generating code snippets, completing code, debugging, and explaining code in various programming languages. Its capabilities make it particularly useful for software development, assisting programmers in writing efficient and accurate code.',
  },
  {
    name: 'dolphin-phi',
    value: 'dolphin-phi:2.7b-v2.6-q8_0',
    info: 'Dolphin-phi is an advanced AI model designed for financial analysis and forecasting. It is adept at processing and interpreting extensive financial data, predicting market trends, and offering insights for investment strategies. Its analytical capabilities are particularly useful for financial institutions and investors requiring data-driven decision-making.',
  },
  {
    name: 'everythinglm',
    value: 'everythinglm',
    info: 'EverythingLM is a versatile language model developed to handle a wide range of text-based tasks. It performs well in generating and completing text, summarizing information, translating languages, and providing coherent responses in conversational AI applications. Its adaptability makes it useful across various industries and applications requiring natural language processing.',
  },
  {
    name: 'llama2',
    value: 'llama2',
    info: 'Llama2 is an advanced large language model developed by Meta, designed to generate human-like text based on the input it receives. It excels at tasks such as text completion, summarization, translation, and generating creative content.',
  },
  {
    name: 'llama2-uncensored',
    value: 'llama2-uncensored',
    info: 'Llama2 is an advanced large language model developed by Meta, designed to generate human-like text based on the input it receives. It excels at tasks such as text completion, summarization, translation, and generating creative content.',
  },
  {
    name: 'llama3',
    value: 'llama3',
    info: 'Llama3 is an advanced language model designed by Meta, known for its enhanced capabilities in natural language processing. It excels at tasks such as text generation, summarization, translation, and conversational AI, providing accurate and contextually appropriate responses. Its improvements over previous versions make it highly effective for a broad range of applications requiring sophisticated text handling.',
  },
  {
    name: 'wizard-vicuna',
    value: 'wizard-vicuna-uncensored:13b-q5_0',
    info: 'Wizard-Vicuna is a specialized language model known for its proficiency in complex and technical language tasks. It excels at generating detailed technical documentation, explaining intricate concepts, and assisting with specialized knowledge domains. Its advanced capabilities make it particularly valuable for professionals and researchers who need precise and expert-level text generation.',
  },
  {
    name: 'rouge/daybreak-kunoichi-2dpo-7b',
    value: 'rouge/daybreak-kunoichi-2dpo-7b',
    info: '',
  },
];

if (import.meta.env.VITE_APP_DEMO === 'true') {
  modelList = modelList.filter((model) => !model.value.includes('uncensored'));
}

export default {
  modelList,
};
