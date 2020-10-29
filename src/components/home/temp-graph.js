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

const getGraphWithd = () => {
	const windowWithd = window.innerWidth;
	if (windowWithd > 600) return 500;
	return '100%';
};
const getGraphWithd2 = () => {
	const windowWithd = window.innerWidth;
	if (windowWithd > 600) return '50%';
	return '100%';
};

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

	if (!graphData) return null;
	return (
		<div style={{ margin: 'auto', width: getGraphWithd2() }}>
			<ResponsiveContainer width={getGraphWithd()} height={200}>
				<LineChart
					data={data}
					aspect={1}
					margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
					<YAxis
						domain={['dataMin', 'dataMax']}
						type='number'
						width={40}
						unit='ºC'
						tick={{ stroke: 'white', strokeWidth: 1 }}
						stroke='white'
					/>
					<Line
						type='basis'
						dot={false}
						dataKey='pv'
						stroke='#ffffff'
						strokeWidth={3}
					/>
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
};
export default TempGraph;
