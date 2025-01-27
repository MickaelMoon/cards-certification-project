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

    event CardCertified(uint256 indexed tokenId, string name, uint256 grade, string imageUrl);
    event CardTransferred(uint256 indexed tokenId, address indexed from, address indexed to);
    event CardBurned(uint256 indexed tokenId);

    constructor() ERC721("PokemonCertification", "POKE") Ownable(msg.sender) {}

    function certifyCard(string memory name, uint256 grade, string memory imageUrl) public onlyOwner {
        // Vérifier que le grade est valide (entre 1 et 10)
        require(grade >= 1 && grade <= 10, "PokemonCertification: Grade must be between 1 and 10");

        // Vérifier que le nom n'est pas vide
        require(bytes(name).length > 0, "PokemonCertification: Name cannot be empty");

        // Vérifier que l'URL de l'image n'est pas vide
        require(bytes(imageUrl).length > 0, "PokemonCertification: Image URL cannot be empty");

        // Générer un nouvel ID de token
        uint256 tokenId = _tokenIdCounter;
        _tokenIdCounter += 1;

        // Enregistrer les informations de la carte
        cards[tokenId] = Card(name, grade, imageUrl);

        // Mint le NFT
        _safeMint(msg.sender, tokenId);

        // Émettre un événement
        emit CardCertified(tokenId, name, grade, imageUrl);
    }

    function getCard(uint256 tokenId) public view returns (string memory name, uint256 grade, string memory imageUrl) {
        require(exists(tokenId), "PokemonCertification: card does not exist");
        Card memory card = cards[tokenId];
        return (card.name, card.grade, card.imageUrl);
    }

    function transferCard(address to, uint256 tokenId) public {
        require(ownerOf(tokenId) == msg.sender, "PokemonCertification: transfer of token that is not own");

        _safeTransfer(msg.sender, to, tokenId, "");

        //Émet un événement
        emit CardTransferred(tokenId, msg.sender, to);
    }

    function burnCard(uint256 tokenId) public {
        require(
            ownerOf(tokenId) == msg.sender || msg.sender == owner(),
            "PokemonCertification: You are not authorized to burn this token"
        );

        _burn(tokenId);
        delete cards[tokenId];

        //Émet un événement
        emit CardBurned(tokenId);
    }

    //Vérifier si token existe
    function exists(uint256 tokenId) public view returns (bool) {
        return _ownerOf(tokenId) != address(0);
    }

}
