export const applyDiscount = (originalPrice, discountPercentage) => {
    if (originalPrice <= 0 || discountPercentage < 0 || discountPercentage > 100) {
        throw new Error('Invalid input: originalPrice must be positive and discountPercentage must be between 0 and 100.');
    }

    const discountAmount = originalPrice * (discountPercentage / 100);
    const discountedPrice = originalPrice - discountAmount;
    return discountedPrice;
};