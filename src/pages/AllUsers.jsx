import { useState, useCallback, useMemo } from "react";

import Axios from "axios";
import { useQuery } from "react-query";

import { Row, Col } from "reactstrap";

import { FIRST_PAGE } from "../constants";

import UsersTable from "../components/UsersTable";
import Paginate from "../components/Paginate";
import UsersDivision from "../components/UsersDivision";


const AllUsers = () => {

  const [currentPage, setCurrentPage] = useState(FIRST_PAGE);


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
    error,
    isError
  } = useQuery({
    queryKey: ["users", currentPage],
    queryFn: ({ pageParam = currentPage }) => fetchUsers(pageParam),
  });

  if (isError) {
    console.log(error);
  }
  
  const usersData = useMemo(() => {
    if (isSuccess) {
      return data;
    }
  }, [isSuccess, data]);


  return (
    <Row>
      <Col lg={6}>
        {isSuccess && usersData?.data.length > 0 && (
          <>
            <UsersTable usersData={usersData?.data}/>
            <Paginate
              dataCurrentPage={usersData?.currPage}
              setCurrentPage={setCurrentPage}
              totalPages={usersData?.totalPages}
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
