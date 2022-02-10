 /* On récupère la value des inputs text simple grace à leur "name" */
 export const handleChangeInput = (e, setState) => {
    const value = e.target.value;
    const name = e.target.name;

    setState({[name]: value});
};