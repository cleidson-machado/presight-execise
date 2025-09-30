import { useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useVirtualizer } from "@tanstack/react-virtual";
import UserCard from "./UserCard";

const fetchUsers = async ({ pageParam = 1, queryKey }) => {
  const [_key, { search, filters }] = queryKey;
  const params = new URLSearchParams({
    page: pageParam,
    limit: 20,
  });
  if (search) params.append("search", search);
  if (filters.nationality) params.append("nationality", filters.nationality);
  if (filters.hobby) params.append("hobby", filters.hobby);

  const res = await fetch(`/api/users?${params.toString()}`);
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
};

const UserList = ({ search, filters }) => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["users", { search, filters }],
    queryFn: fetchUsers,
    getNextPageParam: (lastPage) => {
      return lastPage.currentPage < lastPage.totalPages
        ? lastPage.currentPage + 1
        : undefined;
    },
  });

  const allUsers = data ? data.pages.flatMap((page) => page.users) : [];
  const parentRef = useRef();

  const rowVirtualizer = useVirtualizer({
    count: hasNextPage ? allUsers.length + 1 : allUsers.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 120,
    overscan: 5,
  });

  const virtualItems = rowVirtualizer.getVirtualItems();
  if (
    virtualItems.length > 0 &&
    virtualItems[virtualItems.length - 1].index >= allUsers.length - 1 &&
    hasNextPage &&
    !isFetchingNextPage
  ) {
    fetchNextPage();
  }

  if (isLoading) {
    return <p>Loading users...</p>;
  }

  if (error) {
    return <p>An error occurred: {error.message}</p>;
  }

  return (
    <div
      ref={parentRef}
      style={{
        height: `100vh`,
        overflow: "auto",
        contain: "strict",
      }}
    >
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: "100%",
          position: "relative",
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualItem) => {
          const isLoaderRow = virtualItem.index > allUsers.length - 1;
          const user = allUsers[virtualItem.index];

          return (
            <div
              key={virtualItem.key}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: `${virtualItem.size}px`,
                transform: `translateY(${virtualItem.start}px)`,
                padding: "8px",
              }}
            >
              {isLoaderRow ? (
                hasNextPage ? (
                  "Loading more..."
                ) : (
                  "Nothing more to load"
                )
              ) : (
                <UserCard user={user} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserList;
