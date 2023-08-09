import { useCallback, useContext } from "react";

import { usersTableContext } from "../global-context-API/context";

import { useDispatch } from "react-redux";

import { removeDefaultUser } from "../redux/slices/defaultUsers";
import { removeAdminUser } from "../redux/slices/adminUsers";

import { Col, Card, CardTitle, CardText, Button } from "reactstrap";

import { DEFAULT_BTN_NODE, ADMIN_BTN_NODE } from "../constants";


const GridView = ({ userClassName, users, usersType }) => {

  const { data: { nodes, triggered } } = useContext(usersTableContext);

  const dispatch = useDispatch();


  const handleRemoveUser = useCallback(userID => {

    const { adminBtnNode } = nodes[`${ADMIN_BTN_NODE}${userID}`];
    const { defaultBtnNode } = nodes[`${DEFAULT_BTN_NODE}${userID}`];

      switch (usersType) {

        case "Defaults":
          dispatch(removeDefaultUser({ id: userID }));
          defaultBtnNode.disabled = false;
          adminBtnNode.style.display = "block";
          break;

        case "Admins":
          dispatch(removeAdminUser({ id: userID }));
          adminBtnNode.disabled = false;
          defaultBtnNode.style.display = "block";
          break;

        default:
          console.log("Something's Wrong");
      }
    },
    [usersType, nodes, dispatch]
  );

  return (
    <>
      {triggered && 
        <>
          <h6>{usersType}</h6>
          <Col lg={3}>
            {users.map((user) => (
              <Card key={user.id} className={`${userClassName}-card`}>
                <img
                  className={`${userClassName}-avatar`}
                  src={user.avatar}
                  alt={`Avatar of ${user.firstName}`}
                />
                <CardTitle className={`${userClassName}-name`}>
                  {`${user.first_name} ${user.last_name}`}
                </CardTitle>
                <CardText className={`${userClassName}-email`}>
                  {user.email}
                </CardText>
                <Button onClick={() => handleRemoveUser(user.id)}>
                  Remove User
                </Button>
              </Card>
            ))}
          </Col>
        </>
      }
    </>
  );
};

export default GridView;
