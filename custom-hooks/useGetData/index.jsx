import React, { useState, useEffect, useCallback } from 'react';

const useGetData = (url) => {
  const [datas, setDatas] = useState(null);

  const fetchData = useCallback(() => {
    fetch(url)
      .then((res) => res.json())
      .then((response) => {
        setDatas(response);
      })
      .catch((error) => error);
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);


  return datas;
};

export default useGetData;
