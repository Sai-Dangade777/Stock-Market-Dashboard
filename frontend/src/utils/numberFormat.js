export const formatPrice = (value) => {
  if (value === undefined || value === null || isNaN(value)) {
    return '0.00';
  }
  
  if (Math.abs(value) > 1e10) {
    return Math.sign(value) >= 0 ? '9,999,999,999.99' : '-9,999,999,999.99';
  }
  
  if (Math.abs(value) >= 1e5 || /e/.test(value.toString())) {
    try {
      return parseFloat(value).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    } catch (e) {
      return Number(parseFloat(value).toFixed(2)).toLocaleString();
    }
  }
  
  return parseFloat(value).toFixed(2);
};

export const formatPercent = (value) => {
  return parseFloat(value).toFixed(2) + '%';
};

export const formatLargeNumber = (value) => {
  if (value === undefined || value === null || isNaN(value)) {
    return 'N/A';
  }
  
  let num;
  try {
    num = parseFloat(value);
    if (isNaN(num)) return 'N/A';
  } catch (e) {
    return 'N/A';
  }
  
  if (Math.abs(num) >= 1e15) {
    return (num / 1e12).toFixed(2) + 'T';
  } else if (Math.abs(num) >= 1e12) {
    return (num / 1e12).toFixed(2) + 'T';
  } else if (Math.abs(num) >= 1e9) {
    return (num / 1e9).toFixed(2) + 'B';
  } else if (Math.abs(num) >= 1e6) {
    return (num / 1e6).toFixed(2) + 'M';
  } else if (Math.abs(num) >= 1e3) {
    return (num / 1e3).toFixed(2) + 'K';
  }
  
  return num.toFixed(2);
};
