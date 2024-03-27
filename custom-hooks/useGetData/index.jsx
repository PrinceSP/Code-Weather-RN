import React, {useState,useEffect} from 'react'

const useGetData = (url)=>{
  const [datas,setDatas] = useState(null)

  useEffect(()=>{
    let ignore = false
    fetch(url)
    .then(res=>res.json())
    .then(data=>{
      if (!ignore) {
        setDatas(data)
      }
    })
    .catch(error=>error)
    return ()=>{
      ignore = true
    }
  },[url])

  return datas
}

export default useGetData
