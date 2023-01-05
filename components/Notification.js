/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/display-name */
import React from "react";
import { useGenukaDispatch, useGenukaState } from "../utils/genuka.store";

const Notification = React.memo(
  ({ notification, deleteNotification, timeout }) => {
    const [isVisible, setIsVisible] = React.useState(true);
    React.useEffect(() => {
      setTimeout(() => {
        setIsVisible(false);
      }, timeout || 3000);
    }, []);

    React.useEffect(() => {
      if (!isVisible) {
        deleteNotification(notification);
      }
    }, [isVisible]);
    return (
      isVisible && (
        <div
          id="toast-default"
          className="mb-3 flex items-center bg-primary p-4 w-full max-w-xs text-white bg-white rounded-lg shadow"
          role="alert"
        >
          <div class="ml-3 text-sm text-white font-normal">
            {notification.label}
          </div>
          <button
            type="button"
            class="ml-auto -mx-1.5 -my-1.5 bg-primary justify-center items-center text-gray-400 rounded-lg focus:ring-2 inline-flex h-8 w-8 "
            ariaLabel="Close"
            onClick={() => {
              setIsVisible(false);
            }}
          >
            <span class="sr-only">Close</span>
            <svg
              ariaHidden="true"
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
                fill="white"
              ></path>
            </svg>
          </button>
        </div>
      )
    );
  }
);

function Notifications() {
  const { notifications } = useGenukaState();
  const dispatch = useGenukaDispatch();
  return notifications && notifications.length > 0 ? (
    <div className="bottom-0 left-0 flex bg-transparent justify-end items-center  py-3 flex-col fixed w-screen">
      {notifications.map((notification) => {
        return (
          <Notification
            notification={notification}
            key={Math.random()}
            deleteNotification={(notification) => {
              dispatch({
                type: "notifications",
                payload: notifications.filter(
                  (n) => n.value != notification.value
                ),
              });
            }}
          />
        );
      })}
    </div>
  ) : (
    <></>
  );
}

export default Notifications;
