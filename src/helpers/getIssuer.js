export const getIssuer = (number) => {
    const numStr = number.replace(/\s/g, ''); // Remove spaces for checking
    const length = numStr.length;
  
    if ((numStr.startsWith("34") || numStr.startsWith("37")) && length === 15) {
        return "AMEX";
    }
    if (numStr.startsWith("6011") && length === 16) {
        return "Discover";
    }
    if ((numStr.startsWith("51") || numStr.startsWith("52") || numStr.startsWith("53") ||
         numStr.startsWith("54") || numStr.startsWith("55")) && length === 16) {
        return "Mastercard";
    }
    if (numStr.startsWith("4") && (length === 13 || length === 16)) {
        return "VISA";
    }
    return "Unknown";
  };
  