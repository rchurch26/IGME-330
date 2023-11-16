const loadXHR = (url, callback) => {
    // set up the connection
    const xhr = new XMLHttpRequest();
    xhr.onload = () => callback(xhr);
    // when the data loads, invoke the callback function and pass it the `xhr` object
    xhr.open("GET", url);
    xhr.send();
  };

  export {loadXHR};