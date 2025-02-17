const selectAnime = (state = [], action:any) => {
  switch (action.type) {
    case "SELECT_ANIME":
      console.log("Selected anime data in reducer:", action.payload);  // Check what data is being passed

      // If the payload is a single anime object, wrap it in an array
      return Array.isArray(action.payload) ? action.payload : [action.payload];

    default:
      return state;
  }
};

export default selectAnime;