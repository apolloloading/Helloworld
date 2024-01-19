chrome.runtime.onInstalled.addListener(function() {
  // Your API Key and Secret Key
  const API_KEY = "ukeyHtSazMqYkZjGvLGF2gnv";
  const SECRET_KEY = "67FXIykT8EfLlTycu5Fd7GBidknGS0zB";

  // Request access token
  chrome.identity.getAuthToken({ interactive: true }, async function(token) {
    const accessTokenUrl = `https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=${API_KEY}&client_secret=${SECRET_KEY}`;

    try {
      const tokenResponse = await fetch(accessTokenUrl, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const tokenData = await tokenResponse.json();
      const accessToken = tokenData.access_token;

      // Save the access token in storage
      chrome.storage.local.set({ accessToken });
    } catch (error) {
      console.error('Error getting access token:', error);
    }
  });
});
