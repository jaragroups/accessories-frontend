import toast from 'react-hot-toast';

/**
 * Dismisses a toast notification.
 *
 * @param {string} [toastId] - The id of the toast to dismiss. If not provided, all notifications will be dismissed.
 * @returns {void}
 */
export default function removeNotification(toastId) {
    toast.dismiss(toastId && toastId);
}
