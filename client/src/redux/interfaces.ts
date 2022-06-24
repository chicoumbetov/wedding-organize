import {Status} from "../utils/status";

export interface postProps {
    comments?: []
    createdAt?: string
    creator?: string
    likes?: []
    message?: string
    name?: string
    selectedFile?: string
    tags?: string[]
    title: string
    __v?: number
    _id: string // server mongo
    id?: number; // server-jp
}

export interface usersProps {

}

export interface userProps {

}

export interface searchProps {

}

export interface initStateProps {
    posts: postProps[] | any,
    post: postProps | null,
    users: any[],
    user: any | null,
    isLoading: boolean,
    currentPage: number | null,
    numberOfPage?: number | null,
    search: any | null,
    status: Status,
    comment?: any,
    likes?: any[]
}
