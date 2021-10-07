import {useState, useCallback} from 'react';

export const usePaginationFetch = ( url ) => {
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState([]);
    const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refresh'));
    localStorage.setItem('refresh', refreshToken);
    const load = useCallback(async () => {
        setLoading(true)
        const response = await fetch(url, {
            headers: {
                'Accept' : 'application/ld+json',
                'Authorization' : 'Bearer ' + localStorage.getItem('itemName')
            }
        });

        const responseData = await response.json();

        if (response.ok) {
            if (responseData.hasOwnProperty("hydra:member")) {
                setItems(responseData['hydra:member']);
            } else {
                setItems(responseData);
            }
            setLoading(false);
        } else if (response.status === 401){
            setLoading(true);
            /* On rafraichit le token avec le refresh token
            * On refait donc une requête pour le refresh token
            * */
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({refreshToken: refreshToken })
            };
            fetch('http://127.0.0.1:8000/api/token/refresh', requestOptions)
            .then(response => {
                /* Si la réponse est ok on relance la requête initiale */
                if(response.ok){
                    response.json()
                    .then(data => {
                        setRefreshToken(data.refreshToken);
                        localStorage.setItem("itemName", data.token);

                        const requestOptions = {
                            method: 'GET',
                            headers: {
                                'Content-Type' : 'application/json',
                                'Authorization' : 'Bearer ' + localStorage.getItem("itemName")
                            }
                        };
                        fetch(url, requestOptions)
                        .then(response => {
                            if(response.ok){
                                response.json()
                                    .then(data => {
                                        if(data.hasOwnProperty("hydra:member")){
                                            setItems(data["hydra:member"]);
                                        } else {
                                            setItems(data);
                                        }
                                    }
                                )
                                setLoading(false)
                            } else if (response.status === 401){/* rediriger vers login*/}
                        })
                    })
                } else {/* Redirection vers le loginPage*/}
            })
        }
    }, [url, refreshToken])

    return {
        items,
        load,
        loading
    }
}