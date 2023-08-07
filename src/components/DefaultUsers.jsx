import { useSelector } from "react-redux";

import { Row } from "reactstrap";

import GridView from "./GridView";


const DefaultUsers = () => {

  const defaultUsers = useSelector((state) => state.defaultUsersReducer);

  return (
    <Row>
      <GridView
        userClassName="default-user"
        usersType="Defaults"
        users={defaultUsers}
      />
    </Row>
  );
};

export default DefaultUsers;
