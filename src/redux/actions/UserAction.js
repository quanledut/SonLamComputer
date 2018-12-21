import * as UserActionType from './UserActionType'

export const getUserById = (userId) => {
    return{
        type: UserActionType.GET_USER_BY_ID,
        userId
    }
}