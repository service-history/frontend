const transferButton = document.getElementById("transfer-eth");

transferButton.addEventListener("click", () => {
  window.ethereum.request({
    method: "eth_sendTransaction",
    params: [
      {
        to: "0x9F59a11B90556902DEf7e46de61D5db7F478ea05",
        value: "0xDE0B6B3A7640000", // 1000000000000000000 wei or 0.1 eth
      },
    ]
  }).then((result) => {
    console.log(result);
  })
    .catch((error) => {
      console.log(error);
    })
});
