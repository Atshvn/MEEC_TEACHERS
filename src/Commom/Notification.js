import {NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

export const  Alerterror = (title) => {
    NotificationManager.error(title,'Lỗi', 5000);
};

export const  Alertwarning = (title) => {
  NotificationManager.warning(title,'Cảnh báo');
};


export const  Alertsuccess = (title) => {
  NotificationManager.success(title,'Thành công');
};


export const  Alertinfo = (title) => {
  NotificationManager.info(title);
};

