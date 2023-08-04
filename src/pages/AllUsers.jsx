import { useState, useCallback, useMemo } from "react";

import Axios from "axios";
import { useInfiniteQuery } from "react-query";

import { Row, Col } from "reactstrap";

import UsersTable from "../components/UsersTable";
import Paginate from "../components/Paginate";
import UsersDivision from "../components/UsersDivision";

const AllUsers = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const fetchUsers = useCallback(async (pageParam) => {
    const URL = "https://reqres.in/api/users";

    const { data } = await Axios.get(URL, {
      params: {
        page: pageParam
      }
    });

    return {
      data: data.data,
      currPage: pageParam,
      totalPages: data.total_pages
    };
  }, []);

  const {
    data,
    isSuccess,
    hasPreviousPage,
    fetchPreviousPage,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["users", currentPage],
    queryFn: ({ pageParam = currentPage }) => fetchUsers(pageParam),
    getPreviousPageParam: lastPage => !lastPage.data.length ? undefined : lastPage.currPage - 1,
    getNextPageParam: lastPage => lastPage.data.length ? lastPage.currPage + 1 : undefined
  });

  const fetchThePrevPage = useCallback(() => {
    if (hasPreviousPage) {
      fetchPreviousPage();
    }
  }, [hasPreviousPage, fetchPreviousPage]);

  const fetchTheNextPage = useCallback(() => {
    if (hasNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, fetchNextPage]);

  const usersData = useMemo(() => {
    if (isSuccess) {
      return data?.pages;
    }
  }, [isSuccess, data?.pages]);

  return (
    <Row>
      <Col lg={6}>
        {isSuccess && usersData?.length > 0 && (
          <>
            <UsersTable usersData={usersData}/>
            <Paginate
              totalPages={usersData[0]?.totalPages}
              fetchThePrevPage={fetchThePrevPage}
              setTheCurrentPage={setCurrentPage}
              fetchTheNextPage={fetchTheNextPage}
            />
          </>
        )}
      </Col>

      <Col lg={6}>
        <UsersDivision />
      </Col>
    </Row>
  );
};

export default AllUsers;
