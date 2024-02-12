export const applyDiscount = (originalPrice, discountPercentage) => {
    const discountAmount = originalPrice * (discountPercentage / 100);
    const discountedPrice = originalPrice - discountAmount;
    return Math.round(discountedPrice);
};