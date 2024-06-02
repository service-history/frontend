
function connect() {
    if (window.ethereum) {
        console.log("already connected");

        window.ethereum.request({ method: "eth_requestAccounts" })
        return;
    }
    MMSDK.connect()
        .then((res) => {
            MMSDK.getProvider();
            const statusDiv = document.getElementById("metamask-status");
            statusDiv.textContent = 'MetaMask wallet connected'
        })
        .catch((e) => console.log('request accounts ERR', e));
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

connect();