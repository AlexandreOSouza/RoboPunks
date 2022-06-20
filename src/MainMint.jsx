import { useState } from 'react';
import { ethers, BigNumber } from 'ethers';
import roboPunksNFT from './RoboPunksNFT.json';

const roboPunksNFTAddress = "0x5c05a103Ce9626240F847AfC92C0C0f42702A084";

const MainMint = ({ accounts, setAccount }) => {
    const [mintAmount, setMintAmount] = useState(1);
    const isConnected = Boolean(accounts[0]);

    async function handleMint() {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(roboPunksNFTAddress, roboPunksNFT.abi, signer);

            try {
                const tx = await contract.mint(BigNumber.from(mintAmount));
                console.log(tx);
            } catch (err) {
                console.log(err);
            }
        }
    }

    const handleDecrement = () => {
        if (mintAmount <= 1) return;
        setMintAmount(mintAmount - 1);
    }

    const handleIncrement = () => {
        if (mintAmount >= 3) return;
        setMintAmount(mintAmount + 1);
    }

    return (
        <div>
            <h1>RoboPunks</h1>
            <p>It's 2078. Can the RoboPunks NFT save humans from destructive  rempant NFT speculation? Mint Robopunks to find out.</p>

            {isConnected ? (
                <div>
                    <div>
                        <button onClick={handleDecrement}>-</button>
                        <input type="number" value={mintAmount} />
                        <button onClick={handleIncrement}>+</button>
                    </div>
                    <button onClick={handleMint}>Mint Now</button>
                </div>
            ) : (
                <p>You must be connected to mint</p>
            )}

        </div>
    )
    
}

export default MainMint;