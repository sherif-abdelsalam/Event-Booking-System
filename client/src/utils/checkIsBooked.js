const BASE_URL = process.env.REACT_APP_API_URL + "/api/v1";


export const checkIsBooked = async (token, eventId) => {
    const response = await fetch(`${BASE_URL}/bookings`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ eventId }),
    });

    return response;
};
