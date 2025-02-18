import { toast } from 'react-toastify';

export const showToast = (message, type) => {
    toast(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        type: type,
        theme: 'colored'
    });
}