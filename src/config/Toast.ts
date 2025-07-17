import { ToastOptions } from "react-toastify";

/**
 * Configuration object for toast notifications.
 *
 * @constant
 * @type {import('react-toastify').ToastOptions}
 *
 * @description
 * Defines the default behavior and position of toast messages:
 * - `draggable`: Allows the toast to be moved by dragging.
 * - `position`: Displays the toast at the bottom-center of the screen.
 */
export const ToastConfig: ToastOptions = {
  draggable: true,
  position: "bottom-center"
}