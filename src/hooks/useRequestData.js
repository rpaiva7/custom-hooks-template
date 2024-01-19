import axios from "axios";
import { useEffect, useState } from "react";


export function useRequestData(baseURL, url){
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(false)

const getData=async()=> {
    try {
    const response = await axios.get(url)
    setIsLoading(false)
    setData(response.data)
} catch (error) {
    console.log(error);
    setIsLoading(false)
    setError(true);
}
}

const getNewData=async()=> {
    try {
    const response = await axios.get(baseURL)
    setIsLoading(false)
    setData(response.data)
} catch (error) {
    console.log(error);
    setIsLoading(false)
    setError(true);
}
}

    useEffect(() => {
      getData(), getNewData()
    }, []);

    return [data, isLoading, error];
}