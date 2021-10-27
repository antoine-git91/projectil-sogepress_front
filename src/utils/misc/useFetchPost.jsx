import {useState, useCallback} from 'react';

export const useFetchPost = ( url, body ) => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const post = useCallback(
        async () => {
            setLoading(true)

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-type': 'application/json',
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                },
                body: JSON.stringify(body)
            });

            const responseData = await response.json();
            if (response.status === 201) {
                console.log('ok')
                setSuccess(responseData)
                setLoading(false);
            } else {
                setError(responseData);
                setLoading(true);
            }
        }, [url, body])

    return {
        success,
        error,
        post,
        loading
    }
}