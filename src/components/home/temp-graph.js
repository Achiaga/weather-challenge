import React, { useState, useEffect } from 'react';
import {
	LineChart,
	Line,
	YAxis,
	ResponsiveContainer,
	CartesianGrid,
	XAxis,
	Tooltip,
	Legend,
} from 'recharts';

const TempGraph = ({ graphData }) => {
	const [data, setData] = useState();

	useEffect(() => {
		setData(createGraphData());
	}, [graphData]);

	const createGraphData = () => {
		return graphData.hoy.temperatura.reduce((acc, value, index) => {
			if (index % 2 === 0) return [...acc, { name: index, pv: +value }];
			return acc;
		}, []);
	};

	function ReferenceLabel(props) {
		const { fill, value, textAnchor, fontSize, viewBox, dy, dx } = props;
		const x = viewBox.width + viewBox.x - 7;
		const y = viewBox.y + 30;
		return (
			<text
				x={x}
				y={y}
				dy={dy}
				dx={dx}
				fill={fill}
				fontSize={fontSize || 18}
				textAnchor={textAnchor}>
				{value}
			</text>
		);
	}

	if (!graphData) return null;

	return (
		<ResponsiveContainer width={'100%'} height={200}>
			<LineChart
				data={data}
				aspect={1}
				margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
				<YAxis />
				<Line
					type='basis'
					dot={false}
					// label={<ReferenceLabel />}
					dataKey='pv'
					stroke='#ffffff'
					strokeWidth={3}
				/>
			</LineChart>
		</ResponsiveContainer>
	);
};
export default TempGraph;
