export const formatNumberWithCommas = (number) => {
    const numberStr = String(number);
    return numberStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
