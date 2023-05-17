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

export const signinState = atom({
    key: "signinState",
    default: false
})