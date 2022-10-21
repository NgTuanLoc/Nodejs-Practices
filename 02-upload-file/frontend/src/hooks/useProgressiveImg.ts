import { useState, useEffect } from 'react';

export const useProgressiveImg = (url: string) => {
	const [isImageLoaded, setIsImageLoaded] = useState(false);

	useEffect(() => {
		setIsImageLoaded(false);
		const img = new Image();
		img.src = url;
		img.onload = () => {
			setIsImageLoaded(true);
		};
	}, [url]);

	return isImageLoaded;
};
