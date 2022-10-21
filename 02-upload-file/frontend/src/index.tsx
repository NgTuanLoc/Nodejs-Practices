import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { SkeletonTheme } from 'react-loading-skeleton';
import { store } from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<SkeletonTheme
				width={`100%`}
				height={`100%`}
				baseColor='#d9d7d9'
				highlightColor='#f5f5f5'
				borderRadius='var(--radius)'
				duration={3}>
				<App />
			</SkeletonTheme>
		</Provider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
