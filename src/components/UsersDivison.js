import DefaultUsers from "./DefaultUsers";
import AdminUsers from "./AdminUsers";

const UsersDivision = () => {
  return (
    <>
      <DefaultUsers />
      <hr />
      <AdminUsers />
    </>
  );
};

export default UsersDivision;
