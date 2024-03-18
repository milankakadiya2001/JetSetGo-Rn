import strings from '../i18n/strings';
import {showPopupWithOk} from '../utils/helpers';

// Fetch API to make API calls
export const fetchAPI = async (url, method, body) => {
  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }).then(response => response.json());
    return response;
  } catch (error) {
    return showPopupWithOk(strings.jetSetGo, strings.somethingWentWrong);
  }
};
