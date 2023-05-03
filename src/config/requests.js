import { KEYS } from "./keys";

export const POSTREQUEST = async (url, data, setloading) => {
    try {
        if (setloading) setloading(true)
        const response = await fetch(KEYS.api + url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json();
            const errorMessage = errorData.message || errorData.error || `HTTP error ${response.status}`;

            if (errorData.type === "failure") {
                if (setloading) setloading(false)
                return errorData
            }
            throw new Error(errorMessage);
        }
        const jsonData = await response.json();
        if (setloading) setloading(false)
        return jsonData;
    } catch (error) {
        console.table({
            method: "POST",
            message: `${error}`,
            url: `${KEYS.api + url}`
        });
        if (setloading) setloading(false)
        if (error == "Error: HTTP error 401") {
            return { type: "failure", result: "unAuthorized!" }
        }
        return null;
    }
};

export const POSTFORMDATA = async (url, data, setloading) => {
    try {
        if (setloading) setloading(true)
        const response = await fetch(KEYS.api + url, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${localStorage.getItem("userToken")}`
            },
            body: data,
        });
        if (!response.ok) {
            const errorData = await response.json();
            const errorMessage = errorData.message || errorData.error || `HTTP error ${response.status}`;
            if (errorData.type === "failure") {
                if (setloading) setloading(false)
                return errorData
            }
            throw new Error(errorMessage);
        }
        const jsonData = await response.json();
        if (setloading) setloading(false)
        return jsonData;
    } catch (error) {
        console.table({
            method: "POST , formdata",
            message: `${error}`,
            url: `${KEYS.api + url}`
        });
        if (setloading) setloading(false)
        if (error == "Error: HTTP error 401") {
            return { type: "failure", result: "unAuthorized!" }
        }
        return null;
    }
};


export const GETREQUEST = async (url, setloading) => {
    try {
        if (setloading) setloading(true)
        const response = await fetch(KEYS.api + url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            const errorMessage = errorData.message || errorData.error || `HTTP error ${response.status}`;

            if (errorData.type === "failure") {
                if (setloading) setloading(true)
                return errorData
            }
            throw new Error(errorMessage);
        }
        const jsonData = await response.json();
        if (setloading) setloading(false)
        return jsonData;
    } catch (error) {
        console.table({
            method: "GET",
            message: `${error}`,
            url: `${KEYS.api + url}`
        });
        if (setloading) setloading(false)
        return null;
    }
}

export const PUTREQUEST = async (url, data, setloading) => {
    try {
        if (setloading) setloading(true)
        const response = await fetch(KEYS.api + url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json();
            const errorMessage = errorData.message || errorData.error || `HTTP error ${response.status}`;

            if (errorData.type === "failure") {
                if (setloading) setloading(false)
                return errorData
            }
            throw new Error(errorMessage);
        }
        const jsonData = await response.json();
        if (setloading) setloading(false)
        return jsonData;
    } catch (error) {
        console.table({
            method: "POST",
            message: `${error}`,
            url: `${KEYS.api + url}`
        });
        if (setloading) setloading(false)
        if (error == "Error: HTTP error 401") {
            return { type: "failure", result: "unAuthorized!" }
        }
        return null;
    }
};

export const DELETEREQUEST = async (url) => {
    try {
        const response = await fetch(KEYS.api + url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
        });
        if (!response.ok) {
            const errorData = await response.json();
            const errorMessage = errorData.message || errorData.error || `HTTP error ${response.status}`;
            throw new Error(errorMessage);
        }
        const jsonData = await response.json();
        return jsonData;
    } catch (error) {
        console.table({
            method: "DELETE",
            message: `${error}`,
            url: `${KEYS.api + url}`
        });
        return null;
    }
};
