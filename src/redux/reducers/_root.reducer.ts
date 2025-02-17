import { combineReducers } from 'redux';
import AllAnime from './getAnime.reducer';
import selectAnime from './selectedAnime.reducer';

// rootReducer combines all reducers
const rootReducer = combineReducers({
  AllAnime,
  selectAnime,
  // You can add more reducers here
});

// Type the RootState so it's accessible in components
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
