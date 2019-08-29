import axios from 'axios';
import { 
  FETCH_ROOMS, 
  SELECT_CURRENT_ROOM, 
  FETCH_MESSAGES, 
  SAVE_USER, 
  SEND_MESSAGE ,
  ADD_USER_TO_ROOM,
  UPDATE_TIMER
} from './types';

var headers = {
  'Access-Control-Allow-Origin': '*',        
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}


export const fetchRooms = () => {
  return dispatch => {
    return axios.get(`http://localhost:8000/api/rooms`, headers)
      .then(res => {
        return dispatch({
          type: FETCH_ROOMS,
          payload: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
};

export const selectCurrentRoom = (roomId) => {
  return dispatch => {
    axios.get(`http://localhost:8000/api/rooms/${roomId}`)
      .then(res => {
        dispatch({
          type: SELECT_CURRENT_ROOM,
          payload: res.data
        })
      })
      .catch(err => {
        console.log(err);
      });
  }
}

export const fetchMessages = (roomId) => {
  return dispatch => {
    return axios.get(`http://localhost:8000/api/rooms/${roomId}/messages`)
      .then(res => {
        console.log(res);
        return dispatch({
          type: FETCH_MESSAGES,
          payload: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
};

export const saveUser = (name) => {

  localStorage.setItem('name', name);

  return {
    type: SAVE_USER,
    payload: name
  };
};


export const sendMessage = (roomId, message, name) => {
  let messagePackage = {
    name: name,
    message: message
  };
  
  return dispatch => {
    axios.post(`/api/rooms/${roomId}/messages`, messagePackage)
      .then(res => {
        dispatch({
          type: SEND_MESSAGE,
          payload: messagePackage
        });

        dispatch({
          type: ADD_USER_TO_ROOM,
          payload: name
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
};


export const updateTimer = () => {
  return {
    type: UPDATE_TIMER
  };
}