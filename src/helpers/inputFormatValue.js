const inputFormatValue = (e) => {
    const value = e.target.value.replace(/[^0-9.]/g, '');
    const parts = value.split('.');
    const formattedValue = parts[0] + (parts.length > 1 ? '.' + parts.slice(1).join('') : '');
    if (formattedValue !== e.target.value) {
        e.target.value = formattedValue;
    }
    return formattedValue;
}
export default inputFormatValue;