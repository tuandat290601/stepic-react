const formatPrice = (VNDprice) => {
    return (VNDprice * 1000 / 23326.30).toFixed()
}

export { formatPrice }