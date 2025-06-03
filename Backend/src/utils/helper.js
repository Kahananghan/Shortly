import { nanoid } from "nanoid"

export const genNanoId = (length) => {
    return nanoid(length)
}