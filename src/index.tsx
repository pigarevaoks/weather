import React from 'react';
import { render } from 'react-dom';
import { Main } from 'pages/main';
import { ErrorBoundary } from 'components/errorBoundary';
import './styles/styles.less';

const App = () => (
	<ErrorBoundary>
		<Main />
	</ErrorBoundary>
);

render(<App />, document.getElementById('app'));
