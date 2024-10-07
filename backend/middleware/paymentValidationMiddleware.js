// backend/middleware/paymentValidation.js
export const validatePaymentInput = (req, res, next) => {
    const { amount, currency, accountNumber } = req.body;

    // Whitelist input using RegEx patterns
    const amountPattern = /^\d+(\.\d{1,2})?$/; // Allows up to two decimal places
    const currencyPattern = /^[A-Z]{3}$/; // Allows 3 uppercase letters (e.g., USD)
    const accountNumberPattern = /^[0-9]{10,18}$/; // Only numbers, 10-18 digits for account number

    if (!amountPattern.test(amount)) {
        return res.status(400).json({ message: 'Invalid amount format' });
    }

    if (!currencyPattern.test(currency)) {
        return res.status(400).json({ message: 'Invalid currency format' });
    }

    if (!accountNumberPattern.test(accountNumber)) {
        return res.status(400).json({ message: 'Invalid account number format' });
    }

    // If validation passes, proceed to next middleware
    next();
};
export default validatePaymentInput;
