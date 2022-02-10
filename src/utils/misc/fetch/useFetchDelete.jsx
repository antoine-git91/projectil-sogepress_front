import {useState, useCallback} from 'react';

export const useFetchDelete = ( url ) => {
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(false);

    const load = useCallback(

        async () => {
            setLoading(true);
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                'Accept' : 'application/ld+json',
                'Authorization' : 'Bearer ' + localStorage.getItem('token')
            }
        });

        if (response.status === 204) {
            setResponse(response.status);
            setLoading(false);
        } else if (response.status === 401){
            setLoading(true)
            /* On rafraichit le token avec le refresh token
            * On fait donc une requête pour le refresh token
            * */
            fetch('https://localhost:8000/api/token/refresh', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({"refreshToken":localStorage.getItem('refreshToken')})
            })
            .then(response => {
                /* Si la réponse est ok on relance la requête initiale */
                if(response.ok){
                    response.json()
                    .then(data => {
                        console.log(data)
                        localStorage.setItem('token', data['token']);
                        localStorage.setItem('refreshToken', data['refreshToken']);

                        fetch(url, {
                            method: 'DELETE',
                            headers: {
                                'Content-Type' : 'application/json',
                                'Authorization' : 'Bearer ' + localStorage.getItem("token")
                            }
                        })
                        .then(response => {
                            if(response.status === 204){
                                response.json()
                                    .then(data => {
                                        console.log(data)
                                    }
                                )
                                setLoading(false);
                            } else if (response.status === 401){
                                /* rediriger vers login*/

                            }
                        })
                    })
                } else {
                    console.log('401')
                    /* Redirection vers le loginPage*/
                }
            })
        }
    }, [url]);

    return {
        load,
        loading,
        response
    }
}
