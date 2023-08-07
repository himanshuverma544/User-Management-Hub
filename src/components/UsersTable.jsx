import { useRef, useCallback, useContext } from "react";

import { usersTableContext } from "../global-context-API/context";
import { storeData } from "../global-context-API/action.creators";

import { useDispatch } from "react-redux";

import { addDefaultUser } from "../redux/slices/defaultUsers";
import { addAdminUser } from "../redux/slices/adminUsers";

import { Button } from "reactstrap";

import { DEFAULT_BTN_NODE, ADMIN_BTN_NODE } from "../constants";


const UsersTable = ({ usersData }) => {

  const { dispatch: usersTableDispatch } = useContext(usersTableContext);

  const dispatch = useDispatch();
  const btnNodes = useRef({});

  
  const handleDefault = useCallback((defaultUserObj, defaultBtnNode, adminBtnNode) => {

      dispatch(addDefaultUser(defaultUserObj));

      defaultBtnNode.disabled = true;
      adminBtnNode.style.display = "none";

      const { id } = defaultUserObj;

      usersTableDispatch(storeData({
        [`${DEFAULT_BTN_NODE}${id}`]: defaultBtnNode, 
        [`${ADMIN_BTN_NODE}${id}`]: adminBtnNode
      }, "nodes"));

  }, [dispatch, usersTableDispatch]);


  const handleAdmin = useCallback((adminUserObj, adminBtnNode, defaultBtnNode) => {

      dispatch(addAdminUser(adminUserObj));

      adminBtnNode.disabled = true;
      defaultBtnNode.style.display = "none";

      const { id } = adminUserObj;

      usersTableDispatch(storeData({
        [`${ADMIN_BTN_NODE}${id}`]: adminBtnNode, 
        [`${DEFAULT_BTN_NODE}${id}`]: defaultBtnNode
      }, "nodes"));

    }, [dispatch, usersTableDispatch]);

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
        {usersData.map((userData) => (
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
                    btnNodes.current[`default-${userData.id}`],
                    btnNodes.current[`admin-${userData.id}`]
                  )
                }
              >
                Default
              </Button>
              <Button
                innerRef={btnNodeRef => btnNodes.current[`admin-${userData.id}`] = btnNodeRef}
                className={`admin-btn-${userData.id}`}
                onClick={() =>
                  handleAdmin(
                    userData,
                    btnNodes.current[`admin-${userData.id}`],
                    btnNodes.current[`default-${userData.id}`]
                  )
                }
              >
                Admin
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UsersTable;
