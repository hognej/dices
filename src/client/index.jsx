import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';

import Layout from './components/Layout.js';
import store from './store.js';

render(<Provider store={store}>
	<Layout />
	</Provider>, document.getElementById('app'));