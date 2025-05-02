import { toast } from "react-toastify";

const notify = (message: string, type: 'info' | 'success' | 'warning' | 'error') => {
  toast(message, {
    type,
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};

export const notifySuccess = (message: string) => {
  notify(message, 'success');
};

export const notifyError = (message: string) => {
  notify(message, 'error');
};

export const notifyWarning = (message: string) => {
  notify(message, 'warning');
};

export const notifyInfo = (message: string) => {
  notify(message, 'info');
};

