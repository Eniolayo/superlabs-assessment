/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "framer-motion";
import React, { ReactElement } from "react";

import { ToastOptions, ToastType } from "./types";

function ToastContainer({ toasts, removeToast }: ToastContainerProps) {
  const groupedToasts = toasts.reduce(
    (acc, toast) => {
      const position = toast.position || "top-right";

      if (!acc[position]) {
        acc[position] = [];
      }
      acc[position].push(toast);
      return acc;
    },
    {} as Record<string, ToastOptions[]>
  );

  return (
    <AnimatePresence>
      {Object.entries(groupedToasts).map(([position, positionToasts]) => (
        <motion.div
          key={position}
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
          transition={{ duration: 0.3 }}
          className={`fixed z-[9999] flex flex-col justify-start p-4 ${getPositionClasses(position as ToastOptions["position"])}`}
        >
          {positionToasts.map(toast => (
            <motion.div
              layout
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              transition={{ duration: 0.3 }}
              key={toast.id}
              className="mb-2 last:mb-0"
            >
              <Toast {...toast} onRemove={removeToast} />
            </motion.div>
          ))}
        </motion.div>
      ))}
    </AnimatePresence>
  );
}

function Toast({
  id,
  message,
  type,
  duration = 5000,
  onRemove,
}: ToastOptions & { onRemove: (id: string) => void }) {
  React.useEffect(() => {
    if (id) {
      const timer = setTimeout(() => {
        onRemove(id);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, []);

  const toastIcon = {
    success: (
      <Icon
        icon="mdi:check-circle-outline"
        className="h-6 w-6 text-green-400"
      />
    ),
    error: (
      <Icon icon="mdi:close-circle-outline" className="h-6 w-6 text-red-400" />
    ),
    info: (
      <Icon
        icon="mdi:information-outline"
        className="h-6 w-6 rounded-full text-blue-400"
      />
    ),
    warning: (
      <Icon icon="mdi:alert-outline" className="h-6 w-6 text-yellow-400" />
    ),
  } satisfies Record<ToastType, ReactElement>;

  return (
    <div
      className={`toast-container pointer-events-auto relative w-fit overflow-hidden rounded-lg bg-white text-gray-900 shadow-lg ring-1 ring-black ring-opacity-5 ${typeClasses[type]}`}
      aria-live="assertive"
      role="alert"
      style={
        { "--gradient-color": gradientColors[type] } as React.CSSProperties
      }
    >
      <div className="relative p-4">
        <div className="flex items-center">
          <div className="flex-shrink-0 rounded-lg bg-white p-1.5 ring-1 ring-gray-500 ring-opacity-10">
            {toastIcon[type] ?? ""}
          </div>
          <div className="ml-3 mr-8 flex-grow">
            {typeof message === "string" ? (
              <p className="text-sm font-medium">{message}</p>
            ) : (
              message
            )}
          </div>
          <button
            className="absolute right-2.5 top-2.5 inline-flex rounded-md bg-white text-gray-400 ring-gray-500 hover:text-gray-500"
            onClick={() => {
              if (id) {
                onRemove(id);
              }
            }}
          >
            <span className="sr-only">Close</span>
            <Icon icon="mdi:close" className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ToastContainer;

const getPositionClasses = (position: ToastOptions["position"]) => {
  switch (position) {
    case "top-left":
      return "top-0 left-0";
    case "top-center":
      return "top-0 left-1/2 transform -translate-x-1/2";
    case "top-right":
      return "top-0 right-0";
    case "bottom-left":
      return "bottom-0 left-0";
    case "bottom-center":
      return "bottom-0 left-1/2 transform -translate-x-1/2";
    case "bottom-right":
    default:
      return "bottom-0 right-0";
  }
};

const typeClasses = {
  success: "toast-success",
  error: "toast-error",
  info: "toast-info",
  warning: "toast-warning",
} satisfies Record<ToastType, string>;

const gradientColors = {
  success: "rgba(52, 211, 153, 1)",
  error: "rgba(248, 113, 113, 1)",
  info: "rgba(96, 165, 250, 1)",
  warning: "rgba(251, 191, 36, 1)",
} satisfies Record<ToastType, string>;

type ToastContainerProps = {
  toasts: ToastOptions[];
  removeToast: (id: string) => void;
};
