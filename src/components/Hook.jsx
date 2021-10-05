import {useState, useCallback} from 'react';

export const usePaginationFetch = ( url ) => {
    const [loading, setLoading] = useState(false)
    const [items, setItems] = useState([])
    const load = useCallback(async () => {
        setLoading(true)
        const response = await fetch(url, {
            headers: {
                'Accept' : 'application/ld+json',
                'Authorization' : 'Bearer ' + localStorage.getItem('itemName')
            }
        })
        const responseData = await response.json()
        if (response.ok) if (responseData.hasOwnProperty("hydra:member")) {
            setItems(responseData['hydra:member'])
        } else {
            setItems(responseData)
        }
        else{
            console.error(responseData)
        }
        setLoading(false)
    }, [url])
    return {
        items,
        load,
        loading
    }
}