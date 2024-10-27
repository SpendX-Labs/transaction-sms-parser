export const bankKeyWords = [
    "ICICI",
    "HDFC",
    "SBI",
    "State Bank of India",
    "Axis Bank",
    "Kotak Mahindra",
    "BOB",
    "Bank of Baroda",
    "PNB",
    "Punjab National Bank",
    "Canara Bank",
    "UBI",
    "Union Bank of India",
    "IndusInd Bank",
    "CBI",
    "Central Bank of India",
    "IB",
    "Indian Bank",
    "IOB",
    "Indian Overseas Bank",
    "BOI",
    "Bank of India",
    "UCO",
    "UCO Bank",
    "BOM",
    "Bank of Maharashtra",
    "Yes Bank",
    "IDFC",
    "IDFC First Bank",
    "RBL",
    "RBL Bank",
    "DB",
    "Deutsche Bank"
];

export function extractBankName(message) {
    for (const keyword of bankKeyWords) {
        if (message.includes(keyword)) {
            return keyword;
        }
    }
    return null;
}