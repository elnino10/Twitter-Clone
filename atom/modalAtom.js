import { atom } from "recoil";

export const modalState= atom({
    key: "modalState",
    default: false
})

export const getPostState= atom({
    key: "get[PostState",
    default: "id"
})