let accessToken = '';
let expiresIn = 0;

function isAccessTokenExpired() {
    const timestamp = Math.floor(Date.now() / 1000);
    return timestamp >= expiresIn;
}

async function getAccessToken() {
    if (!isAccessTokenExpired()) {
        return accessToken;
    }
    const requestUrl = `${process.env.TOKEN_URL}?grant_type=client_credentials&client_id=${process.env.API_KEY}&client_secret=${process.env.SECRET_KEY}`;
    try {
        const response = await fetch(requestUrl, {  
            method: 'POST',  
            headers: {  
                'Content-Type': 'application/json'  
            }
        });
        const accessTokenResponse = await response.json();
        accessToken = accessTokenResponse.access_token;
        expiresIn = Math.floor(Date.now() / 1000) + accessTokenResponse.expires_in - 3;
        return accessToken;
    } catch (err) {
        return err.message;
    }
}

async function chat(query) {
    const token = await getAccessToken();
    const requestUrl = `${process.env.CHATBOT_URL}?access_token=${token}`;
    try {
        const chatRequest = {
            messages: [
                {
                    role: 'user',
                    content: query
                }
            ]
        };
        const response = await fetch(requestUrl, {  
            method: 'POST',  
            headers: {  
                'Content-Type': 'application/json'  
            },
            body: JSON.stringify(chatRequest)
        });
        let result = await response.json();
        return result.result;
    } catch (err) {
        return err.message;
    }
}

function init() {
    getAccessToken();
}

init();

module.exports = { chat };