// SDPX-License-Identifier: MIT

pragma solidity ^0.8.5;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

contract RoboPunksNFT is ERC721, Ownable {
    uint256 public mintPrice;
    uint256 public totalSupply;
    uint256 public maxSupply;
    uint256 public maxPerWallet;
    bool public isPublicMintEnabled;
    string internal baseTokenUri;
    address payable public withdrawWallet;
    mapping(address => uint256) public walletMints;

    constructor() payable ERC721('RoboPunks', 'RP') {
        mintPrice = 0.02 ether;
        totalSupply = 0;
        maxSupply = 1000;
        maxPerWallet = 3;
        // withdrawWallet = msg.sender;
    }

    function setIsPublicMintEnabled(bool _isPublicMintEnabled) external onlyOwner {
        isPublicMintEnabled = _isPublicMintEnabled;
    }

    function setBaseTokenUri(string calldata _baseTokenUri) external onlyOwner {
        baseTokenUri = _baseTokenUri;
    }

    function tokenURI(uint256 _tokenId) public view override returns (string memory) {
        require(_exists(_tokenId), 'Token does not exist.');
        return string(abi.encodePacked(baseTokenUri, Strings.toString(_tokenId), ".json"));
    }

    function withdraw() external onlyOwner {
        (bool success, ) = withdrawWallet.call{ value: address(this).balance }('');
        require(success, 'Withdraw failed.');
    }

    function mint(uint256 _quantity) public payable {
        require(isPublicMintEnabled, 'Public minting is disabled.');
        require(msg.value == _quantity * mintPrice, 'Not enough ether.');
        require(totalSupply + _quantity <= maxSupply, 'Sold out.');
        require(walletMints[msg.sender] + _quantity <= maxPerWallet, 'Too many tokens.');

        for (uint256 i = 0; i < _quantity; i++) {
            uint256 tokenId = totalSupply + 1;
            totalSupply++;
            _safeMint(msg.sender, tokenId);
        }

    }
}

