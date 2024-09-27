import Logtastic from '@ofrepose/logtastic';

const helloWorld = () => {
  console.clear();

  Logtastic.log('👋 Welcome to doc-xandria - I hope you find this application useful.', { color: 'blue' });
  Logtastic.log('📢 If you have any questions or want to collab on something feel free to reach out to me https://www.linkedin.com/in/danielfpayne/ ', { color: 'green' });
};

export default helloWorld;
