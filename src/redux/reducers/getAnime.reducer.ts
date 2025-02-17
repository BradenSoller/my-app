const AllAnime = (state = [], action:any) => {
    switch (action.type) {
      case "SET_ANIME":
        return action.payload;
      default:
        return state;
    }
};
  
export default AllAnime