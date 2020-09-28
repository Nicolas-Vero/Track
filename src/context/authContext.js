import createContext from './createDataContext';
import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';
import { AsyncStorage } from 'react-native';
import { navigate } from '../navigationRefjs'
const authReducer = (state, action) => {
    switch (action.type) {
        case 'add_error':
            return { ...state, errorMessage: action.payload };
        case 'signin':
            return { errorMessage: '', token: action.payload };
        case 'clear_error_message':
            return { ...state, errorMessage: '' }
        case 'signout':
            return { token: null, errorMessage: '' }
        default:
            return state
    }
};
const tryLocalSignin = dispatch => async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
        dispatch({ type: 'signin', payload: token });
        navigate('TrackList');
    } else {
        navigate('Signup');
    }
}
const clearErrorMassage = dispatch => () => {
    dispatch({ type: 'clear_error_message' });
}
const signup = dispatch => async ({ email, password }, callback) => {
    try {
        const response = await trackerApi.post('/signup', { email, password });
        await AsyncStorage.setItem('token', response.data.token);
        dispatch({ type: 'signin', payload: response.data.token });
        navigate('TrackList');
    } catch (error) {
        console.log(error);
        dispatch({ type: 'add_error', payload: 'error with sign up' });
    }

};


const signin = dispatch => async ({ email, password }) => {
    try {
        const response = await trackerApi.post('/signin', { email, password });
        await AsyncStorage.setItem('token', response.data.token);
        dispatch({ type: 'signin', payload: response.data.token });
        navigate('TrackList')
    } catch (err) {
        console.log(err);
        dispatch({ tyoe: 'add_error', payload: 'something Wrong' });
    }
};


const signout = (dispatch) => async () => {
    await AsyncStorage.removeItem('token');
    dispatch({ type: 'signout' });
    navigate('loginFlow')

};


export const { Provider, Context } = createDataContext(authReducer, { signin, signout, signup, clearErrorMassage, tryLocalSignin }, { token: null, errorMessage: '' });