import { BigNumber, ethers } from 'ethers';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import roboPunksNFT from './RoboPunksNFT.json';

const roboPunksNFTAddress = "0x5c05a103Ce9626240F847AfC92C0C0f42702A084";

const WalletContext = createContext({});

const WalletProvider = ({ children }) => {

    const [address, setAddress] = useState('');
    const [contract, setContract] = useState();

    const contractABI = roboPunksNFT.abi;

    const connect = useCallback(async () => {
        const accountList = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const hasSomeAccountConnected = accountList?.length > 0;

        if (hasSomeAccountConnected) {
            setAddress(accountList[0]);
            console.log(accountList)
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(roboPunksNFTAddress, contractABI, signer);
            setContract(contract);
            return;
        }
    }, [contractABI]);

    const mint = useCallback(async (mintAmount) => {
        try {
            if (contract.mint) {
                const tx = await contract.mint(BigNumber.from(mintAmount), {
                    value: ethers.utils.parseEther((0.02 * mintAmount).toString()),
                });
                console.log(tx);
            }
        } catch (err) {
            console.log(err);
        }
    }, [contract])

    const value = useMemo(() => ({
        connect,
        mint,
        address
    }), [
        connect, 
        mint,
        address
    ])

    return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
};

const useWallet = () => {
    const context = useContext(WalletContext);
    return context;
}

export { WalletProvider, useWallet };
