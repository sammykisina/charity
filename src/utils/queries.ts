import { useSession } from "next-auth/react";
import { trpc } from "./trpc";

const getNotifications = (owner: string) => {
  const LIMIT = 10;
  const { data, hasNextPage, fetchNextPage, isFetching } =
    trpc.notification.get.useInfiniteQuery(
      { limit: LIMIT, owner: owner || "" },
      { getNextPageParam: (lastPage) => lastPage.next_cursor }
    );
  const notifications = data?.pages.flatMap((page) => page.notifications) ?? [];

  return {
    hasNextPage,
    fetchNextPage,
    isFetching,
    notifications,
  };
};

const queries = {
  getNotifications,
};

export default queries;
