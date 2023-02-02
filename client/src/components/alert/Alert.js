import { Store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'

export default function AddAlertMessage({ type, message, container, ...rest }) {
  Store.addNotification({
    type: type === "error" ? "danger" : type,
    message: message,
    container: container ? container : "top-right",
    dismiss: {
      duration: rest.duration ? rest.duration : 5000,
      showIcon: true,
      touch: true,
      click: false,
      pauseOnHover: true,
      onScreen: true,
    },
    ...rest
  });
}