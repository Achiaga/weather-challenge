const parseApiStatus = (apiStatus) => {
	const isLoading = apiStatus === 'loading';
	const isSuccess = apiStatus === 'success';
	const hasError = apiStatus === 'error';
	return { isLoading, isSuccess, hasError };
};

export default parseApiStatus;
