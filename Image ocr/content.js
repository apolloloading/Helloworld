chrome.runtime.onMessage.addListener(async function(request, sender, sendResponse) {
  if (request.action === 'recognizeText') {
    const firstImage = document.querySelector('img');

    if (!firstImage) {
      console.error('No image found on the page');
      sendResponse({text: 'No image found on the page'});
      return false;
    }

    const imageUrl = firstImage.src;

    const API_KEY = "ukeyHtSazMqYkZjGvLGF2gnv";
    const SECRET_KEY = "67FXIykT8EfLlTycu5Fd7GBidknGS0zB";

    const accessTokenUrl = `https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=${API_KEY}&client_secret=${SECRET_KEY}`;

    try {
      const tokenResponse = await fetch(accessTokenUrl);
      const tokenData = await tokenResponse.json();
      const accessToken = tokenData.access_token;

      const apiUrl = "https://aip.baidubce.com/rest/2.0/ocr/v1/doc_analysis";
      const params = new URLSearchParams({
        access_token: accessToken,
        url: imageUrl,
        line_probability: false,
        disp_line_poly: false,
        words_type: 'handprint_mix',
        layout_analysis: false
      });

      const recognitionResponse = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
        body: params
      });

      const recognitionData = await recognitionResponse.json();
      const recognizedText = recognitionData.words_result.map(result => result.words).join('\n');

      sendResponse({text: recognizedText});
    } catch (error) {
      console.error('Error during text recognition:', error);
      sendResponse({text: 'Error during text recognition'});
    }

    return true;
  }
});
