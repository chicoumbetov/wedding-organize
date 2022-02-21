import React, {useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux";
// import {getUsers} from "../../actions/user";
import { getUsers as getUsersAction } from "../../redux/usersSlice";
import {Col, Row} from "react-bootstrap";

// function useQuery() { return new URLSearchParams(useLocation().search) }

const Admin = () => {
    const [ user ] = useState(JSON.parse(localStorage.getItem('profile')))

    // const query = useQuery();
    // const searchQuery = query.get('searchQuery');

    if(user && user.result) {
        console.log("user 1", user.result._id)
        console.log("user 2", user.result.isAdmin)
        console.log("user 3", user.result.googleId)
    }
    const dispatch = useDispatch();

    const {users} = useSelector((state) => state?.usersSlice)
    // console.log("users Admin.js :", users, typeof users)

    useEffect(() => {
        dispatch(getUsersAction());
    }, [dispatch]);

    const haveRigthToModify = () => {
        if(
            user && user.result
            && user.result.isAdmin
        ) {
            return(<div> Have rights to modify </div>)
        } else {
            return(<div> No rights to modify </div>)
        }
    }

    return (
        <div>
            {haveRigthToModify()}
            {
                users
                && users.map((user) => {
                    return(
                            React.Children.toArray(
                                <Row lg={12} style={{ display: 'flex'}}>
                                    <Col lg={6} style={{ marginRight: "50px"}}>{user.name}</Col>
                                    <Col lg={6}>{user.isAdmin ? "Admin" : "Not admin"}</Col>
                                </Row>
                            )
                        )
                })
           }
        </div>
    )
}

export default Admin;
