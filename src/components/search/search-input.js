import React, { useState } from 'react';
import '@elastic/eui/dist/eui_theme_light.css';

import { EuiComboBox } from '@elastic/eui';

const options = [];
let groupOptions = [];
for (let i = 1; i < 5000; i++) {
	groupOptions.push({ label: `option${i}` });
	if (i % 25 === 0) {
		options.push({
			label: `Options ${i - (groupOptions.length - 1)} to ${i}`,
			options: groupOptions,
		});
		groupOptions = [];
	}
}

const Demo = () => {
	const [selectedOptions, setSelected] = useState([]);

	const onChange = (selectedOptions) => {
		setSelected(selectedOptions);
	};

	return (
		<EuiComboBox
			placeholder='Select one or more options'
			options={options}
			selectedOptions={selectedOptions}
			onChange={onChange}
		/>
	);
};

export default Demo;
