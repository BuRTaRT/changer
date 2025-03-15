const objectToArray = (object) => {
    const newArray = [];
    for (let [key, value] of Object.entries(object)) {
        newArray.push({id: key, ...value})
    }
    return newArray;
}

export default objectToArray;