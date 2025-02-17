const newAnime = (state = [], action:any) => {

    switch (action.type) {
        case 'NEW_ANIME':
            return action.payload
        default:
            return state;
    }
}

export default newAnime