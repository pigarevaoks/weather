import { useState, useEffect } from 'react';

export const useFetch = (url: string, opts) => {
	const [response, setResponse] = useState(null);
	const [loading, setLoading] = useState(false);
	const [hasError, setHasError] = useState(false);

	useEffect(() => {
		setLoading(true);
		fetch(url, opts)
			.then((res) => res.json())
			.then((res) => {
				setResponse(res);
				setLoading(false);
			})
			.catch((error) => {
				setHasError(true);
				setLoading(false);
				throw new Error(error);
			});
	}, [url]);
	return [response, loading, hasError];
};

export const useDebounce = (value, delay) => {
	const [debouncedValue, setDebouncedValue] = useState(value);
	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);
		return () => {
			clearTimeout(handler);
		};
	}, [value, delay]);
	return debouncedValue;
};
