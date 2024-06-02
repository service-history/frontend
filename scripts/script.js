// Function to get query parameter
function getQueryParam(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

// Function to decode base64 encoded JSON data
function decodeBase64JSON(data) {
  try {
    const decodedData = atob(data);
    const jsonData = JSON.parse(decodedData);
    return jsonData;
  } catch (error) {
    console.error("Error decoding data:", error);
    return null;
  }
}

function decodeData() {
  // Get the query parameter named "data"
  const dataParam = getQueryParam("data");

  if (!dataParam) {
    console.error("Missing required query parameter 'data'");
    return;
  }

  // Decode the base64 encoded JSON data
  const decodedData = decodeBase64JSON(dataParam);

  if (!decodedData) {
    console.error("Error decoding JSON data");
    return;
  }

  const decodedDataElement = document.getElementById("decoded-data");
  decodedDataElement.textContent = JSON.stringify(decodedData, null, 2);
}

// Call the main function
decodeData();
