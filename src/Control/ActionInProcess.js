import { message } from 'antd';
// eslint-disable-next-line react/prop-types
export const ActionInProcess = (title) => {
  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: 'loading',
      content: title,
      duration: 0
    });
    // Dismiss manually and asynchronously
    setTimeout(messageApi.destroy, 2500);
  };
  contextHolder;
  success;
};
export default ActionInProcess;
