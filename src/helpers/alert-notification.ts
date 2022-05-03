import { toast } from 'react-toastify';
import { Notification } from '../common/enums';

export const alertNotification = (msg: string, notificationType: Notification) => {
  toast(msg, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 2000,
    type: notificationType
  });
};
