const generateKey = () => {
    return `item_${ new Date().getTime() }`;
}

export default generateKey