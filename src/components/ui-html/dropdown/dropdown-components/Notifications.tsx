import React, { useMemo, type FC } from "react";
import { type Notification } from "src/types/typings.t";
import Icon from "../../Icon";
import { app_utils } from "@/utils";
import { format } from "date-fns";
import { NavLink, SpinnerLoader } from "@/components";
import type { SetterOrUpdater } from "recoil";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocal from "dayjs/plugin/updateLocale";
import { trpc } from "src/utils/trpc";

type NotificationsProps = {
  notifications: Notification[];
  setShowNotificationDropdown: SetterOrUpdater<boolean>;
  isFetching: boolean;
};

dayjs.extend(relativeTime);
dayjs.extend(updateLocal);
dayjs.updateLocale("en", {
  relativeTime: {
    future: "in %s",
    past: "%s ago",
    s: "1s",
    m: "1m",
    mm: "%dm",
    h: "1h",
    hh: "%dh",
    d: "1d",
    dd: "%dh",
    M: "1M",
    MM: "%dM",
    y: "1y",
    yy: "%dy",
  },
});

const Notifications: FC<NotificationsProps> = ({
  notifications,
  setShowNotificationDropdown,
  isFetching,
}) => {
  /**
   * Component States
   */
  const { getNotificationIcon } = app_utils;
  // const read = trpc.notification.read.useMutation({
  //   onSuccess: () => {
  //     console.log("all read");
  //   },
  // }).mutateAsync;
  const { mutateAsync } = trpc.notification.read.useMutation({
    onSuccess: () => {
      console.log("all read");
    },
  });

  /**
   * Component Functions
   */
  const notification_ids = useMemo(() => {
    const notification_ids = new Set<string>();

    notifications?.forEach((notification) => {
      // const record_found = prisma?.readNotification.;
      notification_ids.add(notification.id || "");
    });

    return [...notification_ids.values()];
  }, [notifications]);

  if (isFetching)
    return (
      <section className="flex h-[100px] w-[150px] justify-center">
        <SpinnerLoader />
      </section>
    );

  return (
    <section>
      {notifications.length > 0 ? (
        <div className="flex flex-col gap-3 px-2">
          {notifications.map((notification, notification_index) => (
            <div
              key={notification_index}
              className="flex cursor-pointer items-center gap-2 rounded-md py-1  px-2 hover:bg-yellow/20"
            >
              <Icon
                icon={getNotificationIcon(notification.type)}
                icon_wrapper_styles="w-fit h-fit text-yellow"
              />

              <div>
                <p className="whitespace-nowrap text-base font-semibold text-dark/80">
                  {notification.message}
                </p>

                <div className="flex items-center gap-1 text-xs text-dark/40">
                  <span>{dayjs(notification.time).fromNow()}</span>
                  <div className="h-1 w-1 rounded-full bg-dark/40" />
                  <span className="font-mono">{notification.title}</span>
                </div>
              </div>
            </div>
          ))}
          <div className="mt-6 flex justify-center">
            <NavLink
              type="medium"
              route={{ to: "/notifications", name: "View All" }}
              active
              moreActions={() => {
                setShowNotificationDropdown(false);
                mutateAsync({ notification_ids: notification_ids });
              }}
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
