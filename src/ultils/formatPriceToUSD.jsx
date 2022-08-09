const formatPrice = (VNDprice) => {
    return (VNDprice * 1000 / 23326.30).toFixed(2)
}

export { formatPrice }