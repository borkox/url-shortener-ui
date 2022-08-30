import axios from 'axios'

export const urlShortenService = {
  shortenUrl
};

function shortenUrl(url) {
  return axios.post(`http://localhost:8080/api/url`, ({url}))
  .then(handleResponse)
  .then(responseData => {
    console.log(responseData.shortUrl);
    return responseData.shortUrl;
  });
  function handleResponse(response) {
    if (response.status === 200) {
      console.log(response);
      return response.data;
    }
  }
}

//
// function login(username, password) {
//     return axios.post(`http://localhost:8080/login`, ({ username, password }))
//         .then(handleResponse)
//         .then(user => {
//             // store user details and jwt token in local storage to keep user logged in between page refreshes
//             localStorage.setItem('currentUser', JSON.stringify(user));
//             currentUserSubject.next(user);
//
//             return user;
//         });
//     function handleResponse(response) {
//         if (response.status === 200) {
//             axios.defaults.headers.common['Authorization'] = response.headers['authorization'] ;
//             localStorage.setItem('authheader', response.headers['authorization']);
//             return username;
//         } else {
//             authenticationService.logout();
//             location.reload(true);
//         }
//
//     }}

