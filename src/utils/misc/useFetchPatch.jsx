import {useState, useCallback} from 'react';

export const useFetchPatch = ( url, body ) => {
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState({});
    const [error, setError] = useState('');
    const [responseStatut, setResponseStatut] = useState(0);

    const post = useCallback(
        async () => {

            const response = await fetch(url, {
                method: "PATCH",
                headers: {
                    'Content-type': 'application/merge-patch+json',
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                },
                body: JSON.stringify(body)
            });

            const responseData = await response.json();

            if (response.status === 200) {
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