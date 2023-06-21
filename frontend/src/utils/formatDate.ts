export function formatDate(dateString: string): string {
    // const dateObj = new Date(dateString);
    // const month = dateObj.getMonth() + 1;
    // const day = dateObj.getDate();
    // const year = dateObj.getFullYear();
    // return `${month}/${day}/${year}`;

    return new Date(dateString).toLocaleDateString(
        'en-US',
        {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
        }
    );
    }
