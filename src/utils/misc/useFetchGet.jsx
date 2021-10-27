import {useState, useCallback} from 'react';

export const useFetchGet = ( url ) => {
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState([]);

    const load = useCallback(
        async () => {
            setLoading(true)

        const response = await fetch(url, {
            headers: {
                'Accept' : 'application/ld+json',
                'Authorization' : 'Bearer ' + localStorage.getItem('token')
            }
        });

        const responseData = await response.json();
        if (response.ok) {
            console.log('ok')
            if (responseData.hasOwnProperty("hydra:member")) {
                setItems(responseData['hydra:member']);
            } else {
                setItems(responseData);
            }
            setLoading(false);
        } else if (response.status === 401){
            setLoading(true);
            console.log('401')
            /* On rafraichit le token avec le refresh token
            * On fait donc une requête pour le refresh token
            * */
            fetch('http://localhost:8000/api/token/refresh', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({"refreshToken":localStorage.getItem('refreshToken')})
            })
            .then(response => {
                /* Si la réponse est ok on relance la requête initiale */
                if(response.ok){
                    console.log('ok')
                    response.json()
                    .then(data => {
                        console.log(data)
                        localStorage.setItem('token', data['token']);
                        localStorage.setItem('refreshToken', data['refreshToken']);

                        fetch(url, {
                            method: 'GET',
                            headers: {
                                'Content-Type' : 'application/json',
                                'Authorization' : 'Bearer ' + localStorage.getItem("token")
                            }
                        })
                        .then(response => {
                            if(response.ok){
                                console.log('ok')
                                response.json()
                                    .then(data => {
                                        if(data.hasOwnProperty("hydra:member")){
                                            setItems(data["hydra:member"]);
                                        } else {
                                            setItems(data);
                                        }
                                    }
                                )
                                setLoading(false);
                            } else if (response.status === 401){
                                /* rediriger vers login*/
                                console.log('401')
                            }
                        })
                    })
                } else {
                    console.log('401')
                    /* Redirection vers le loginPage*/
                }
            })
        }
    }, [url])

    return {
        items,
        load,
        loading
    }
}
