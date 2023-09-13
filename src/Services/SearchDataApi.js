function fetchData(searchText, Base_URL, page, pageSize, apiKey) {
  const url = `${Base_URL}?key=${apiKey}&q=${searchText}&page=${page}&per_page=${pageSize}&image_type=photo&orientation=horizontal`;
    return fetch(url).then(response => {
        // console.log(response);
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(new Error(`Картинки не найдены`));
  });
}

const api = {
  fetchData,
};

export default api;
