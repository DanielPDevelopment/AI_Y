/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-unsafe-optional-chaining */
import { useEffect, useRef } from 'react';
import { useAuth } from 'contexts/user/AuthContext';
import PropTypes from 'prop-types';

const socketAdd = JSON.parse(import.meta.env.VITE_APP_DEVELOPMENT)
  ? import.meta.env.VITE_APP_WEBSOKET_DEV
  : import.meta.env.VITE_APP_WEBSOCKET_PROD;

const QueryResults = ({
  setIsQuerying,
  isQuerying,
  query,
  results,
  setResults,
  context,
  setContext,
  cancelMessageHandling,
}) => {
  let transcript;
  const resultsRef = useRef(null);
  const { user, updateUser } = useAuth();
  const {
    model,
    temp,
    sysPrompt,
    RAG,
  } = user;

  useEffect(() => {
    if (resultsRef.current) {
      resultsRef.current.scrollTop = resultsRef.current.scrollHeight;
    }
  }, [results]);

  useEffect(() => {
    setResults('');
  }, []);

  useEffect(() => {
    let websocket = null;
    if (isQuerying) {
      try {
        websocket = new WebSocket(socketAdd);

        websocket.onopen = () => {
          const dataToSend = {
            type: 'query',
            query,
            context,
            model,
            temp,
            sysPrompt,
            RAG,

          };
          websocket.send(JSON.stringify(dataToSend));
        };

        websocket.onmessage = (event) => {
          if (cancelMessageHandling) {
            const dataToSend = {
              type: 'cancel',
              query: '',
              context,
            };
            websocket.send(JSON.stringify(dataToSend));
            return;
          }
          setResults((r) => r + JSON.parse(event.data)?.message);
          transcript = transcript
            ? transcript + JSON.parse(event.data)?.message
            : JSON.parse(event.data)?.message;
          if (JSON.parse(event?.data)?.complete) {
            setResults((prev) => `${prev}\n\n`);
            setIsQuerying(false);
            setContext([...context, { question: query, answer: transcript }]);
            websocket.close();
          }
        };

        websocket.onclose = () => {
          console.log('disconnected');
          updateUser({ data: { ...user, RAG: { ...user.RAG, new: false } } });
        };

        websocket.onerror = (error) => {
          console.error('WebSocket error:', error);
          websocket.close();
        };

        return () => {
          if (websocket.readyState === WebSocket.OPEN
            || websocket.readyState === WebSocket.CONNECTING) {
            websocket.close();
          }
        };
      } catch (err) {
        console.log(err);
      }
    }

    return () => {
      // ensure websocket is cleaned up.
      if (websocket) {
        websocket.close();
      }
    };
  }, [isQuerying, cancelMessageHandling]);
};

QueryResults.propTypes = {
  setIsQuerying: PropTypes.func.isRequired,
  isQuerying: PropTypes.bool.isRequired,
  query: PropTypes.string.isRequired,
  results: PropTypes.string.isRequired,
  setResults: PropTypes.func.isRequired,
  context: PropTypes.array.isRequired,
  setContext: PropTypes.func.isRequired,
  cancelMessageHandling: PropTypes.bool.isRequired,
};

export default QueryResults;
