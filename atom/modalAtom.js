import { atom } from "recoil";

export const modalState= atom({
    key: "modalState",
    default: false
}) 

export const idState= atom({
    key: "idState",
    default: "id"
})

export const loadingState= atom ({
    key: "loadingState",
    default: false
})

export const editPostModalState = atom({
    key: "editPostModalState",
    default: false
})

export const postTextState = atom({
    key: "postTextState",
    default: ""
})