import React, { useEffect, useState } from "react";
import UserCard from "@/components/shared/UserCard";
import Loader from "@/components/shared/Loader";
import { useGetUsers } from "@/lib/react-query/queriesAndMutations";
import { useInView } from "react-intersection-observer";

const AllUsers: React.FC = () => {
  const { ref, inView } = useInView();
  const { data: users, fetchNextPage, hasNextPage } = useGetUsers();
  const [columns, setColumns] = useState(2);

  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;
      if (width < 640) setColumns(1); // Mobile
      else if (width < 1024) setColumns(2); // Tablet
      else setColumns(3); // Desktop
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView]);

  if (!users) {
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      <h2 className="h3-bold md:h2-bold w-full text-center mb-6">All Users</h2>
      <div className={`grid gap-6 w-full ${columns === 1 ? "grid-cols-1" : columns === 2 ? "grid-cols-2" : "grid-cols-3"}`}> 
        {users.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page.documents.map((user: any) => (
              <UserCard key={user.id} user={user} />
            ))}
          </React.Fragment>
        ))}
      </div>
      {hasNextPage && (
        <div ref={ref} className="mt-10">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default AllUsers;
