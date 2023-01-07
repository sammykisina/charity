import React, { type FC } from "react";
import { type Notification } from "src/types/typings.t";
import Icon from "../../Icon";
import { app_utils } from "@/utils";
import { format } from "date-fns";
import { NavLink } from "@/components";

type NotificationsProps = {
  notifications: Notification[];
};

const Notifications: FC<NotificationsProps> = ({ notifications }) => {
  console.log("notifications", notifications);
  const { getNotificationIcon } = app_utils;

  return (
    <section className="flex flex-col gap-2 py-2 px-4">
      {notifications.length > 0 ? (
        <div>
          {notifications.map((notification, notification_index) => (
            <div
              key={notification_index}
              className="flex cursor-pointer flex-row gap-2 rounded-md border border-yellow/20 px-4 py-1 hover:bg-yellow/20"
            >
              <Icon
                icon={getNotificationIcon(notification.type)}
                icon_wrapper_styles="w-fit h-fit text-yellow"
              />
              <div>
                <div>
                  <div className="flex items-center gap-2">
                    {notification.status === "unread" && (
                      <div className="h-2 w-2 rounded-full bg-yellow" />
                    )}
                    <span className="font-semibold text-dark/50">
                      {notification.title}
                    </span>
                  </div>

                  <p className=" whitespace-nowrap text-sm text-dark">
                    {notification.message}
                  </p>
                </div>

                <div className="mt-2 w-full text-end text-xs font-bold">
                  {format(notification.time, "EE, MMM d, yyy  hh:mm")}
                </div>
              </div>
            </div>
          ))}
          <div className="mt-6 flex justify-center">
            <NavLink
              type="medium"
              route={{ to: "/notifications", name: "View All" }}
              active
            />
          </div>
        </div>
      ) : (
        <div className="whitespace-nowrap font-semibold text-dark/50">
          You Don&apos;t Have New Notifications Yet.
        </div>
      )}
    </section>
  );
};

export default Notifications;
