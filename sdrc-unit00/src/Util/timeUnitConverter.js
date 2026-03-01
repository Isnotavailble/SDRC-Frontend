// utils.js (or whatever you name your helper file)

export function timeAgo(dateString) {
    if (!dateString) return "";

    const past = new Date(dateString);
    const now = new Date();

    // Get the difference in seconds
    const diffInSeconds = Math.floor((now - past) / 1000);

    // If the time is in the future or within the last 60 seconds
    if (diffInSeconds < 60) {
        return "just now";
    }

    const minutes = Math.floor(diffInSeconds / 60);
    if (minutes < 60) {
        return `${minutes} min${minutes === 1 ? '' : 's'} ago`;
    }

    const hours = Math.floor(diffInSeconds / 3600);
    if (hours < 24) {
        return `${hours} hour${hours === 1 ? '' : 's'} ago`;
    }

    const days = Math.floor(diffInSeconds / 86400);
    if (days < 30) {
        return `${days} day${days === 1 ? '' : 's'} ago`;
    }

    const months = Math.floor(days / 30);
    if (months < 12) {
        return `${months} month${months === 1 ? '' : 's'} ago`;
    }

    const years = Math.floor(days / 365);
    return `${years} year${years === 1 ? '' : 's'} ago`;
}

// Function to get a start and end date formatted as YYYY-MM-DD
export const getRecentDateRange = (daysAgo = 30) => {
    const end = new Date(); // Today's date
    const start = new Date();

    // Subtract the number of days from today
    start.setDate(end.getDate() - daysAgo);

    // Format both as YYYY-MM-DD
    const endDate = end.toLocaleDateString('en-CA');
    const startDate = start.toLocaleDateString('en-CA');

    return { startDate, endDate };
};