import React, {useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux";
import {getUsers} from "../../actions/user";

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

    const users = useSelector((state) => state.users)
    console.log("users Admin.js :",users.users, typeof users)

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

    const haveRigthToModify = () => {
        if(
            user && user.result
            && user.result.isAdmin
        ) {
            return(<div>
                Have rights to modify
            </div>)
        } else {
            return(<div>
                No rights to modify
            </div>)
        }
    }

    return (
        <div>
            {haveRigthToModify()}
            {
                users && users.users
                && users.users.map((user) => {
                    return(
                            React.Children.toArray(
                                <div style={{ display: 'flex'}}>
                                    <p style={{ marginRight: "50px"}}>{user.name}</p>
                                    <p>{user.isAdmin && "Admin"}</p>
                                </div>
                            )
                        )
                })
            }
        </div>
    )
}

export default Admin;
