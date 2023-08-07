import { useSelector } from "react-redux";

import { Row } from "reactstrap";

import GridView from "./GridView";


const AdminUsers = () => {

  const admins = useSelector((state) => state.adminUsersReducer);

  return (
    <Row>
      <GridView userClassName="admin" usersType="Admins" users={admins} />
    </Row>
  );
};

export default AdminUsers;
