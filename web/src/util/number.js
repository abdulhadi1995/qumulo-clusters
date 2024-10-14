//use this to manipulate numbers and create helper functions 


export const formatNumber = (num) => {
    if (num === null || num === undefined) return '0';

    if (num >= 1e6) {
        return `${(num / 1e6).toFixed(1)}M`; // Millions
    }
    if (num >= 1e3) {
        return `${(num / 1e3).toFixed(1)}K`; // Thousands
    }
    return num.toString(); // Return as is for smaller numbers
};


export const formatMemory = (num) => {
    if (num === null || num === undefined) return '0';

    if (num >= 1e6) {
        return `${(num / 1e6).toFixed(1)}Mbps`; // Millions
    }
    if (num >= 1e3) {
        return `${(num / 1e3).toFixed(1)}Kbps`; // Thousands
    }
    return num.toString()+'bps'; // Return as is for smaller numbers
};