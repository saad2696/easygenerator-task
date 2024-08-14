import {combineReducers} from 'redux'
import userReducer from './user/reducer'
import { subscription } from './subscriptions/subscriptionDefault';
import subscriptionsReducer from './subscriptions/reducer';


const rootReducer  =  combineReducers({
    user : userReducer,
    subscription : subscriptionsReducer,    
})

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer