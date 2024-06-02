let accounts

function connect() {
    if (!window.ethereum) {
        console.log("metamask not found")
        return;
    }

    window.ethereum.request({ method: "eth_requestAccounts" })
        .then(res => {
            accounts = res
        }).catch(err => {
            const statusDiv = document.getElementById("metamask-status");
            statusDiv.textContent = 'MetaMask wallet connected';
            console.log(err);
        });

    window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [
            {
                "chainId": "0xAA36A7" // 11155111
            }
        ]
    });
}

function addLocalChain() {
    window.ethereum
        .request({
            method: 'wallet_addEthereumChain',
            params: [
                {
                    "nativeCurrency": {
                        "name": "HETH",
                        "symbol": "HETH",
                        "decimals": 18
                    },
                    "rpcUrls": [
                        "http://127.0.0.1:8545"
                    ],
                    "chainId": "0x7A69",
                    "chainName": "Hardhat Local"
                },
            ],
        })
        .then((res) => console.log('add', res))
        .catch((e) => console.log('ADD ERR', e));
}

const transferButton = document.getElementById("transfer-eth");

transferButton.addEventListener("click", () => {
    const decodedDataElement = document.getElementById("decoded-data");
    const txData = JSON.parse(decodedDataElement.textContent)

    if (!txData) {
        console.log("error parsing decoded tx data");
        return;
    }

    window.ethereum.request({
        method: "eth_sendTransaction",
        params: [
            {
                from: accounts[0],
                to: txData['to'],
                // value: "0xDE0B6B3A7640000", // 1000000000000000000 wei or 0.1 eth
                data: txData['data'],
                chainId: "11155111"
            },
        ]
    }).then((result) => {
        console.log(result);
    }).catch((error) => {
        alert("smth went wrong while sending transaction");
        console.log(error);
    })
});

connect();