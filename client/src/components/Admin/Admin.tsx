import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { getUsersThunk } from "../../redux/thunk";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { usersSelector } from "../../store/selectors";

// function useQuery() { return new URLSearchParams(useLocation().search) }

const Admin = () => {
  const [user] = useState(JSON.parse(localStorage.getItem("profile") || "{}"));
  // const query = useQuery();
  // const searchQuery = query.get('searchQuery');

  const dispatch = useAppDispatch();

  const reduxUsers = useAppSelector(usersSelector);

  useEffect(() => {
    dispatch(getUsersThunk());
  }, [dispatch]);

  const haveRigthToModify = () => {
    if (
      user &&
      user?.isAdmin
      // mongo db /* user.result && user.result.isAdmin */
    ) {
      return <div> Have rights to modify </div>;
    } else {
      return <div> No rights to modify </div>;
    }
  };

  return (
    <div>
      {haveRigthToModify()}
      {reduxUsers &&
        reduxUsers.map((user) => {
          return React.Children.toArray(
            <Row lg={12} style={{ display: "flex" }}>
              <Col lg={6} style={{ flex: "1", marginRight: "50px" }}>
                {user.username}
              </Col>
              <Col lg={6} style={{ flex: "1", marginRight: "50px" }}>
                {user.email}
              </Col>
              <Col lg={6} style={{ flex: "1" }}>
                {user.isAdmin ? "Admin" : "Not admin"}
              </Col>
            </Row>
          );
        })}
    </div>
  );
};

export default Admin;
