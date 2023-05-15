import { atom } from "recoil";

export const modalState= atom({
    key: "modalState",
    default: false
})

export const idState= atom({
    key: "idState",
    default: "id"
})

export const panelState= atom({
    key: "panelState",
    default: false
})