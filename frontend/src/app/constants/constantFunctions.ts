/**
 * Maps the status of the incident to an associated color
 * @param status The status of the incident
 * @returns The associated background color in Tailwind CSS
 */
export const getStatusColor = (status: string) => {
    switch(status) {
        case "Open":
            return "bg-blue-500";
        case "Investigating":
            return "bg-purple-500";
        case "Closed":
            return "bg-gray-500";
        default:
            return "bg-gray-400";
    }
};

/**
 * Maps the severity of the incident to an associated color
 * @param severity The severity of the incident
 * @returns The associated background and border color in Tailwind CSS
 */
export const getSeverityColor = (severity: string) => {
    switch(severity) {
        case "Critical":
            return "bg-red-500 border-red-600";
        case "High":
            return "bg-orange-500 border-orange-600";
        case "Medium":
            return "bg-yellow-500 border-yellow-600";
        case "Low":
            return "bg-green-500 border-green-600";
        default:
            return "bg-gray-500 border-gray-500";
    }
};

/**
 * Formats an ISO date/time into a readable string
 * @param dateString ISO date string
 * @returns Formmatted date and time (e.g. "12/12/12 12:12:12")
 */
export const formatDate = (dateString: string | Date): string => {
    const date = new Date(dateString);
    const formattedDate = `${String(date.getUTCDate()).padStart(2, '0')}/${String(date.getUTCMonth() + 1).padStart(2, '0')}/${date.getUTCFullYear()}`;
    const formattedTime = `${String(date.getUTCHours()).padStart(2, '0')}:${String(date.getUTCMinutes()).padStart(2, '0')}:${String(date.getUTCSeconds()).padStart(2, '0')}`
    return `${formattedDate}, ${formattedTime}`;
};

/**
 * Calculate the duration between two dates and return as a formatted string
 * @param startDateTime ISO date string for start date/time
 * @param endDateTime ISO date string for end date/time
 * @returns Formatted duration string (e.g. "12h 12m 12s")
 */
export const calculateDuration = (startDateTime: string, endDateTime: string): string => {
    // Parse the dates
    const startDate = new Date(startDateTime);
    const endDate = new Date(endDateTime);

    // Calculate the hours, minutes and seconds
    const diffInSeconds = Math.floor((endDate.getTime() - startDate.getTime()) / 1000);
    const hours = Math.floor(diffInSeconds / 3600);
    const minutes = Math.floor((diffInSeconds % 3600) / 60);
    const seconds = diffInSeconds % 60;

    // Format the duration string
    let durationString = "";
    if (hours > 0) {
        durationString += `${hours}h `;
    } if (minutes > 0 || hours > 0) {
        durationString += `${minutes}m `;
    }
    durationString += `${seconds}s `
    return durationString;
};

/**
 * Sorts the taken incident object by the score
 * @param incidents An object that contains many incidents
 * @returns The incident object that is sorted by its score
 */
export const sortIncidentsByScore = (incidents: any): any[] => {
    return Object.values(incidents).sort((a: any, b: any) => b.score - a.score);
};

/**
 * Converts a Unix timestamp to a readable date format (dd/mm/yyyy, hh:mm:ss)
 * @param timestamp - Unix timestamp in seconds
 * @returns Formatted date string in dd/mm/yyyy, hh:mm:ss format
 */
export const formatUnixTimestamp = (timestamp: number): string => {
    // Create a new Date object (JavaScript expects milliseconds)
    const date = new Date(timestamp * 1000);
    
    // Extract date components
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // getMonth() returns 0-11
    const year = date.getFullYear();
    
    // Extract time components
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    
    // Format the date string
    return `${day}/${month}/${year}, ${hours}:${minutes}:${seconds}`;
  };

  /**
   * Function to extract the name of the user from their email
   * @param email company email
   * @returns their name
   */
  export const extractNameFromEmail = (email: string): string => {
    // Extract the part before the @ symbol
    const namePart = email.split('@')[0];
    
    // Check if there's an underscore in the name part
    if (namePart.includes('_')) {
      // Split by underscore and format as firstname lastname
      const [firstName, lastName] = namePart.split('_');
      return `${firstName.charAt(0).toUpperCase()}${firstName.slice(1)} ${lastName.charAt(0).toUpperCase()}${lastName.slice(1)}`;
    } else {
      // Just return the name part with first letter capitalized
      return `${namePart.charAt(0).toUpperCase()}${namePart.slice(1)}`;
    }
  };