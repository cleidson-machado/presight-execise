import { useRef, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import UserCard from "./UserCard";

const fetchUsers = async ({ pageParam = 1, queryKey }) => {
  const [_key, { search, filters }] = queryKey;
  const params = new URLSearchParams({
    page: pageParam,
    limit: 18,
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

const styles = {
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "24px",
    padding: "24px",
  },
  statusText: {
    textAlign: "center",
    padding: "20px",
    fontFamily: "sans-serif",
    color: "#7f8c8d",
  },
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

  const loadMoreRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    const currentRef = loadMoreRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return <p style={styles.statusText}>Loading users...</p>;
  }

  if (error) {
    return <p style={styles.statusText}>An error occurred: {error.message}</p>;
  }

  const allUsers = data ? data.pages.flatMap((page) => page.users) : [];

  return (
    <>
      <div style={styles.gridContainer}>
        {allUsers.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
      <div ref={loadMoreRef} />
      <div style={styles.statusText}>
        {isFetchingNextPage
          ? "Loading more..."
          : hasNextPage
            ? ""
            : "You have seen it all!"}
      </div>
    </>
  );
};

export default UserList;
