/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { Pagination, PaginationItem } from '@material-ui/lab';
import { Link } from 'react-router-dom';

// import { getPosts } from '../actions/posts';
import useStyles from './styles';

import {useAppDispatch, useAppSelector} from "../store/hooks";
import {numberOfPagesSelector} from "../store/selectors";
import {getPostsThunk} from "../redux/thunk";

const Paginate = ({ page }: { page: string | number | null}) => {

    const dispatch = useAppDispatch();
    const reduxNumberOfPages = useAppSelector(numberOfPagesSelector);
    console.log(reduxNumberOfPages)

    const classes = useStyles();

    useEffect(() => {
        if (page) {
            dispatch(getPostsThunk(page));
        }
    }, [dispatch, page]);

    return (
        <Pagination
            classes={{ ul: classes.ul }}
            count={reduxNumberOfPages || 0}
            page={Number(page) || 1}
            variant="outlined"
            color="primary"
            renderItem={(item) => (
                <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />
            )}
        />
    );
};

export default Paginate;
