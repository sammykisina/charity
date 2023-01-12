import { Icon, SpinnerLoader, Title } from "@/components";
import { app_utils, queries } from "@/utils";
import { format, isEqual } from "date-fns";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { type FC } from "react";
import { HiXMark } from "react-icons/hi2";
import { type Notification } from "src/types/typings.t";

type SingleNotificationProps = {
  notification: Notification;
};

const SingleNotification: FC<SingleNotificationProps> = ({ notification }) => {
  /**
   * Component States
   */
  const { getNotificationIcon } = app_utils;

  return (
    <div className="flex flex-col gap-3 rounded-[1.5rem] border border-dark/10 px-5 py-2">
      <Icon
        icon={getNotificationIcon(notification.type)}
        icon_wrapper_styles="text-yellow"
      />

      <div className="flex justify-between ">
        <div>
          <div className="flex items-center justify-center gap-3">
            <Title title={notification.title} />
            <div className="h-1 w-1 rounded-full bg-dark/40" />
            <span className="text-sm font-semibold">
              {format(notification.time, "EE, MMM d, yyy, hh:mm")}
            </span>
          </div>
          <p>{notification.message}</p>
        </div>

        <Icon
          icon={<HiXMark className="h-5 w-5" />}
          icon_wrapper_styles="text-dark/50 hover:bg-dark hover:text-white rounded-full duration-300  p-1 w-10 h-10 flex justify-center items-center"
        />
      </div>
    </div>
  );
};

const Notifications = () => {
  /**
   * Page States
   */
  const { push } = useRouter();
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      push("auth/signin");
    },
  });

  const { getNotifications } = queries;
  const { notifications, isFetching } = getNotifications(
    session?.user?.role,
    50
  );

  const todays_notifications = notifications.filter((notification) =>
    isEqual(
      new Date(format(new Date(), "EE, MMM d, yyy")),
      new Date(format(notification.time, "EE, MMM d, yyy"))
    )
  );
  // const todays_notifications: any[] = [];

  const earlier_notifications = notifications.filter(
    (notification) =>
      !isEqual(
        new Date(format(new Date(), "EE, MMM d, yyy")),
        new Date(format(notification.time, "EE, MMM d, yyy"))
      )
  );

  // const earlier_notifications: any[] = [];

  // const isFetching = true;

  const notification_wrapper_styles =
    "w-full space-y-3 rounded-xl border border-yellow px-3 py-2";

  return (
    <section className="mt-2 flex h-[44.5rem] flex-col gap-2  overflow-y-scroll  px-2 scrollbar-hide xs:h-[39rem] xl:h-[39rem]">
      {/* Title */}
      <Title title="Notifications" title_styles="text-lg" />

      <div className="flex h-[44.5rem]   flex-col gap-5  space-y-4 overflow-y-scroll  pt-2   scrollbar-hide xs:h-[39rem] xl:h-[39rem] ">
        {/* Todays Notifications */}
        <div className={`h-[14rem] ${notification_wrapper_styles}`}>
          {/* Title */}
          <Title title="Today" title_styles="text-base" />

          {/* Notifications */}
          <div>
            {isFetching ? (
              <div className="flex h-[11rem] items-center justify-center">
                <SpinnerLoader />
              </div>
            ) : todays_notifications?.length !== 0 ? (
              <div className="flex h-[11rem] flex-col gap-2 overflow-y-scroll py-2 scrollbar-hide">
                {todays_notifications.map(
                  (notification, notification_index) => (
                    <SingleNotification
                      notification={notification}
                      key={notification_index}
                    />
                  )
                )}
              </div>
            ) : (
              <div className="flex h-[10rem] items-center text-lg tracking-wider">
                No new notifications.
              </div>
            )}
          </div>
        </div>

        {/* Other Days Notifications */}
        <div
          className={`h-[24rem] xs:h-[20.5rem]  ${notification_wrapper_styles}`}
        >
          {/* Title */}
          <Title title="Earlier" title_styles="text-base" />

          {/* Notifications */}
          <div>
            {isFetching ? (
              <div className="flex h-[11rem] items-center justify-center">
                <SpinnerLoader />
              </div>
            ) : earlier_notifications?.length !== 0 ? (
              <div className="flex h-[19.5rem] flex-col gap-2 overflow-y-scroll py-2  scrollbar-hide xs:h-[17rem]">
                {earlier_notifications.map(
                  (notification, notification_index) => (
                    <SingleNotification
                      notification={notification}
                      key={notification_index}
                    />
                  )
                )}
              </div>
            ) : (
              <div className="flex h-[10rem] items-center text-lg tracking-wider">
                No new notifications.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Notifications;
