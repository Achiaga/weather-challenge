import { LOADING, SUCCESS, ERROR } from '../constants';

const parseApiStatus = (apiStatus) => {
	const isLoading = apiStatus === LOADING;
	const isSuccess = apiStatus === SUCCESS;
	const hasError = apiStatus === ERROR;
	return { isLoading, isSuccess, hasError };
};

export default parseApiStatus;
