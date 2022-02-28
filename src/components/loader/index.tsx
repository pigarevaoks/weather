import React from 'react';
import * as classes from './styles.module.less';

interface ILoaderProps {
	height?: string | number;
	width?: string | number;
}

export const Loader: React.FC<ILoaderProps> = ({
	height = 24,
	width = 24,
}): React.ReactElement => (
	<div className={classes.loader}>
		<svg
			width={width}
			height={height}
			viewBox="-20.5 -20.5 43 43"
			xmlns="http://www.w3.org/2000/svg"
			stroke="#730641"
			aria-label="loading"
		>
			<g fill="none" fillRule="evenodd">
				<g transform="translate(1 1)" strokeWidth={3}>
					<circle
						strokeOpacity=".5"
						cx="0"
						cy="0"
						r={20}
						stroke="#730641"
						strokeWidth={3}
					/>
					<path d="M20 0c0-9.94-8.06-20-20-20">
						<animateTransform
							attributeName="transform"
							type="rotate"
							from="0 0 0"
							to="360 0 0"
							dur="1s"
							repeatCount="indefinite"
						/>
					</path>
				</g>
			</g>
		</svg>
	</div>
);
