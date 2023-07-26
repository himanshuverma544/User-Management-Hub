import { useCallback } from "react";

import { useDispatch } from "react-redux";

import { removeDefaultUser } from "../redux/slices/users";
import { removeAdminUser } from "../redux/slices/admins";

import { Col, Card, CardTitle, CardText, Button } from "reactstrap";

const GridView = ({ userClassName, users, usersType }) => {
  const dispatch = useDispatch();

  const handleRemoveUser = useCallback(
    (userID) => {
      switch (usersType) {
        case "Defaults":
          dispatch(removeDefaultUser({ id: userID }));
          break;

        case "Admins":
          dispatch(removeAdminUser({ id: userID }));
          break;

        default:
          console.log("Something's Wrong");
      }
    },
    [usersType, dispatch]
  );

  return (
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
  );
};

export default GridView;
