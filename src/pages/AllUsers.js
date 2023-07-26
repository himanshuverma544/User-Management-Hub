import { useState, useEffect, useCallback, useMemo } from "react";

import Axios from "axios";
import { useInfiniteQuery } from "react-query";

import { Row, Col } from "reactstrap";
import ReactPaginate from "react-paginate";

import UsersTable from "../components/UsersTable";
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
    isSuccess
    // hasNextPage,
    // fetchNextPage,
    // isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["users", currentPage],
    queryFn: ({ pageParam = currentPage }) => fetchUsers(pageParam)
    // getNextPageParam: lastPage => lastPage.data.length ? lastPage.currPage + 1 : undefined,
    // getPreviousPageParam: lastPage => !lastPage.data.length ? undefined : lastPage.currPage - 1
  });

  const usersData = useMemo(() => {
    if (isSuccess) {
      return data?.pages;
    }
  }, [isSuccess, data]);

  const handlePageChange = useCallback(
    (selectedPage) => {
      setCurrentPage(selectedPage.selected + 1);
    },
    [setCurrentPage]
  );

  return (
    <Row>
      <Col lg={6}>
        {isSuccess && usersData.length && (
          <>
            <UsersTable usersData={usersData} />
            <ReactPaginate
              previousLabel="Previous"
              nextLabel="Next"
              breakLabel="..."
              pageCount={usersData.at(0).totalPages}
              onPageChange={handlePageChange}
              containerClassName="pagination"
              activeClassName="active"
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
