import { combineReducers } from 'redux';
import { applyMiddleware,  createStore } from 'redux';
import roomsReducer from './rooms_reducer';
import currentRoomReducer from './current_room_reducer';
import messagesReducer from './messages_reducer';
import saveUserReducer from './save_user_reducer';
import reduxThunk from 'redux-thunk';

const rootReducer = combineReducers({
  rooms: roomsReducer,
  currentRoom: currentRoomReducer,
  messages: messagesReducer,
  name: saveUserReducer
});

const store = createStore(
  rootReducer,
  applyMiddleware(reduxThunk)
);

export default store;