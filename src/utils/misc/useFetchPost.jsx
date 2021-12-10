import {useState, useCallback} from 'react';

export const useFetchPost = ( url, body ) => {
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [responseStatut, setResponseStatut] = useState(0);

    const post = useCallback(
        async () => {

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
                setResponseStatut(response.status);
                setSuccess(responseData);
                setLoading(false);
            } else {
                setResponseStatut(response.status);
                setError(responseData);
                setLoading(false);
            }
        }, [url, body])

    return {
        success,
        error,
        post,
        loading,
        responseStatut
    }
}