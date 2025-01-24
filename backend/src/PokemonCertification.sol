// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PokemonCertification is ERC721, Ownable {
    uint256 private _tokenIdCounter;

    struct Card{
        string name;
        uint256 grade;
        string imageUrl;
    }

    mapping(uint256 => Card) public cards;

    constructor() ERC721("PokemonCertification", "POKE") Ownable(msg.sender) {}

    function certifyCard(string memory name, uint64 grade, string memory imageUrl) public onlyOwner {
        uint256 tokenId = _tokenIdCounter;
        _tokenIdCounter += 1;

        cards[tokenId] = Card(name, grade, imageUrl);
        _safeMint(msg.sender, tokenId);
    }

    function getCard(uint256 tokenId) public view returns(Card memory){
        return cards[tokenId];
    }

}

