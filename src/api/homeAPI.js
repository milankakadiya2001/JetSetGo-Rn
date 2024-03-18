import {fetchAPI} from './fetchAPI';
import {GET_FLIGHT_DATA} from './url';

// Home API
export const getFlightData = async () => {
  const response = await fetchAPI(GET_FLIGHT_DATA, 'GET');
  return response || [];
};
