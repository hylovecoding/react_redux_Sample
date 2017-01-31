import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'
import createLogger from 'redux-logger';
import reducer from './reducers/main_reducer';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppContainer from './containers/AppContainer.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();
const logger = createLogger();

const createStoreWithMiddleware = process.env.NODE_ENV === 'production' ?
    applyMiddleware(thunk)(createStore) :
    applyMiddleware(thunk,logger)(createStore);

const store = createStoreWithMiddleware(reducer);

ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider>
            <AppContainer />
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('MoatApp')
)