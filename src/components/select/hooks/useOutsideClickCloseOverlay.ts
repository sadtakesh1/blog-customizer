import { useEffect } from 'react';

type useOutsideClickCloseOverlay = {
	optionRef: React.RefObject<HTMLDivElement>;
	onChange: () => void;
	state: boolean;
};

export const useOutsideClickCloseOverlay = ({
	optionRef,
	onChange,
	state,
}: useOutsideClickCloseOverlay) => {
	useEffect(() => {
		if (!state) return;

		const closeOverlay = (e: MouseEvent) => {
			if (state && !optionRef.current?.contains(e.target as Node)) {
				onChange();
			}
		};

		window.addEventListener('mousedown', closeOverlay);

		return () => {
			window.removeEventListener('mousedown', closeOverlay);
		};
	}, [optionRef, onChange, state]);
};