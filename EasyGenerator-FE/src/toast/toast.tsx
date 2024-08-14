// toastService.ts
import { toast, ToastOptions, Id } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const toastOptions: ToastOptions = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

let currentToastId: Id | null = null;

const toastService = {
  success: (message: string) => {
    if (currentToastId !== null) {
      toast.dismiss(currentToastId);
    }
    currentToastId = toast.success(message, toastOptions);
  },
  error: (message: string) => {
    if (currentToastId !== null) {
      toast.dismiss(currentToastId);
    }
    currentToastId = toast.error(message, toastOptions);
  },
  info: (message: string) => {
    if (currentToastId !== null) {
      toast.dismiss(currentToastId);
    }
    currentToastId = toast.info(message, toastOptions);
  },
  warn: (message: string) => {
    if (currentToastId !== null) {
      toast.dismiss(currentToastId);
    }
    currentToastId = toast.warn(message, toastOptions);
  },
  close: () => {
    if (currentToastId !== null) {
      toast.dismiss(currentToastId);
      currentToastId = null;
    }
  }
};

export default toastService;
