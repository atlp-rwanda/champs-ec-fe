
import { toast, ToastPosition } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type ToastType = 'default' | 'success' | 'error' | 'info' | 'warning';

export const showToast = (message: string, type: ToastType = 'default') => {
  toast(message, {
    type,
    position: 'top-right' as ToastPosition,
    autoClose: 20000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};