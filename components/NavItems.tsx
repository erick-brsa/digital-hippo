'use client';

import { PRODUCT_CATEGORIES } from '@/lib/config';
import { useEffect, useRef, useState } from 'react';
import { NavItem } from './NavItem';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';

export function NavItems() {
	const [activeIndex, setActiveIndex] = useState<null | number>(null);
	const isAnyOpen = activeIndex !== null;
	const navRef = useRef<HTMLDivElement | null>(null);

	useOnClickOutside(navRef, () => {
		setActiveIndex(null);
	});

	useEffect(() => {
		const handler = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				setActiveIndex(null);
			}
		};
		
		document.addEventListener('keydown', handler);

		return () => {
			document.removeEventListener('keydown', handler);
		};
	}, []);

	return (
		<div className="flex gap-4 h-full" ref={navRef}>
			{PRODUCT_CATEGORIES.map((category, i) => {
				const handleOpen = () => {
					if (activeIndex == i) {
						setActiveIndex(null);
					} else {
						setActiveIndex(i);
					}
				};
				const isOpen = i === activeIndex;

				return (
					<NavItem
						key={i}
						category={category}
						handleOpen={handleOpen}
						isOpen={isOpen}
						isAnyOpen={isAnyOpen}
					/>
				);
			})}
		</div>
	);
}
