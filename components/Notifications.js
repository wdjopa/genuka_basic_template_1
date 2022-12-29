/* eslint-disable react/display-name */
import React from "react";
import { useGenukaDispatch, useGenukaState } from "../../store/genukaStore";
import Plus from "../icons/Plus";


const Notification = React.memo(({ notification, deleteNotification, timeout }) => {
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
      <div key={Math.random()} color={notification.color}>
        <div>{notification.label}</div>
        <div
          onClick={() => {
            setIsVisible(false);
          }}
        >
          <Plus style={{ transform: "rotate(45deg)" }} color={"white"} />
        </div>
      </div>
    )
  );
});

function Notifications(props) {
  const { notifications } = useGenukaState();
  const dispatch = useGenukaDispatch();
  return (
    <div>
      {notifications &&
        notifications.map((notification) => {
          return (
            <Notification
              notification={notification}
              key={Math.random()}
              deleteNotification={(notification) => {
                dispatch({ type: "notifications", payload: notifications.filter((n) => n.value != notification.value) });
              }}
            />
          );
        })}
    </div>
  );
}

export default Notifications;
