
const reducer = (posts = [], action) => {

    switch (action.type) {

        case 'CREATE':
            return [ ...posts, action.payload];
        case 'FETCH_ALL':
            return action.payload;
        case 'UPDATE':
            return posts.map((post) => post._id === action.payload._id ? action.payload : post);
        case 'UPDATE':
            return posts.filter((post) => post._id !== action.payload._id);

        default:
            return posts;
    }
}

export default reducer