import { useRef, useCallback } from "react";

import { useDispatch } from "react-redux";

import { addDefaultUser } from "../redux/slices/users";
import { addAdminUser } from "../redux/slices/admins";

import { Button } from "reactstrap";


const UsersTable = ({ usersData }) => {


  const dispatch = useDispatch();
  const btnNodes = useRef({});


  const handleDefault = useCallback(
    (defaultUserObj, btnEle) => {
      dispatch(addDefaultUser(defaultUserObj));
      // btnEle.disabled = true;
    },
    [dispatch]
  );


  const handleAdmin = useCallback(
    (adminUserObj, btnEle) => {
      dispatch(addAdminUser(adminUserObj));
      // btnEle.disabled = true;
    },
    [dispatch]
  );


  return (
    <table border="1">
      <thead>
        <tr>
          <th>ID</th>
          <th>Avatar</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>User Type</th>
        </tr>
      </thead>
      <tbody>
        {usersData.map((userDataObj) => {
          return userDataObj.data.map((userData) => (
            <tr key={userData.id}>
              <td>{userData.id}</td>
              <td>
                <img
                  src={userData.avatar}
                  alt={`Avatar of ${userData.first_name}`}
                />
              </td>
              <td>{userData.first_name}</td>
              <td>{userData.last_name}</td>
              <td>{userData.email}</td>
              <td>
                <Button
                  innerRef={btnNodeRef => btnNodes.current[`default-${userData.id}`] = btnNodeRef}
                  className={`default-btn-${userData.id}`}
                  onClick={() =>
                    handleDefault(
                      userData,
                      btnNodes.current[`default-${userData.id}`]
                    )
                  }
                >
                  Default
                </Button>
                {console.log()}
                <Button
                  innerRef={btnNodeRef => btnNodes.current[`admin-${userData.id}`] = btnNodeRef}
                  className={`admin-btn-${userData.id}`}
                  onClick={() =>
                    handleAdmin(
                      userData,
                      btnNodes.current[`admin-${userData.id}`]
                    )
                  }
                >
                  Admin
                </Button>
              </td>
            </tr>
          ));
        })}
      </tbody>
    </table>
  );
};


export default UsersTable;
