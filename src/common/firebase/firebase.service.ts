import { db } from "./firebase-config"


export const notifyUsersInRoom_updatecontent = ({
    roomId,
    userId,
    content,
    id
}) => {
    db.ref(`/chat_room/${roomId}/${userId}`).set({
        content,
        id,
        action:'update_content'
    })
}
export const notifyUsersInRoom_updatereaction = ({
    roomId,
    userId,
    likes,
    id
}) => {
    db.ref(`/chat_room/${roomId}/${userId}`).set({
        likes,
        id,
        action:'update_reaction'
    })
}

export const notifyUsersInHall_updatecontent = ({
    roomId,
    userId,
    content,
    id
}) => {
    db.ref(`/chat_hall/${roomId}/${userId}`).set({
        content,
        id,
        action:'update_content'
    })
}

export const notifyUsersInHall_updatereaction = ({
    roomId,
    userId,
    likes,
    id
}) => {
    db.ref(`/chat_hall/${roomId}/${userId}`).set({
        likes,
        id,
        action:'update_reaction'
    })
}

export const notifyNewChatRoom = ({
    id,
    name,
    type
}) => {
    db.ref(`/new_chatrom`).set({
        id,
        name,
        type
    })
}

export const notifyNewMessage = ({
    id,
    userId,
    roomId,
    displayName,
    photoID,
    content,
    time,
    likes,
    attachments,
}) => {
    db.ref(`/new_message`).set({
        id,
        userId,
        roomId,
        displayName,
        photoID,
        content,
        time,
        likes,
        attachments
    })
}

export const notifyDeleteMsg = ({
    roomId,
    id,
    userId
}) => {
    db.ref(`/delete_message`).set({
        roomId,
        id,
        userId
    })
}

export const notifyUpdateMsgContent = ({
    roomId,
    id,
    userId,
    content
}) => {
    db.ref(`/update_message`).set({
        id,
        roomId,
        userId,
        content
    })
}

export const notifyLikeMessage = ({
    roomId,
    id,
    userId,
    likes
}) => {
    db.ref(`/like_message`).set({
        roomId,
        id,
        userId,
        likes
    })
}
