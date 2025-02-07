// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract PokemonCertification is ERC1155, Ownable {
    uint256 private _tokenIdCounter;

    struct Card {
        string name;
        uint256 grade;
        string imageUrl;
    }

    mapping(uint256 => Card) public cards;

    event CardCertified(uint256 indexed tokenId, string name, uint256 grade, string imageUrl);
    event CardTransferred(uint256 indexed tokenId, address indexed from, address indexed to, uint256 amount);
    event CardBurned(uint256 indexed tokenId, address indexed owner, uint256 amount);

    constructor() ERC1155("http://localhost:3000/token/{id}.json") Ownable(msg.sender) {}

    function certifyCard(address owner, string memory name, uint256 grade, string memory imageUrl, uint256 amount) public onlyOwner {
        // Vérifier que le grade est valide (entre 1 et 10)
        require(grade >= 1 && grade <= 10, "PokemonCertification: Grade must be between 1 and 10");

        // Vérifier que le nom n'est pas vide
        require(bytes(name).length > 0, "PokemonCertification: Name cannot be empty");

        // Vérifier que l'URL de l'image n'est pas vide
        require(bytes(imageUrl).length > 0, "PokemonCertification: Image URL cannot be empty");

        // Vérifier que l'adresse du propriétaire n'est pas l'adresse nulle
        require(owner != address(0), "PokemonCertification: Owner address cannot be null");

        // Générer un nouvel ID de token
        uint256 tokenId = _tokenIdCounter;
        _tokenIdCounter += 1;

        // Enregistrer les informations de la carte
        cards[tokenId] = Card(name, grade, imageUrl);

        // Mint le NFT et l'attribuer à l'adresse spécifiée
        _mint(owner, tokenId, amount, "");

        // Émettre un événement
        emit CardCertified(tokenId, name, grade, imageUrl);
    }

    function getCard(uint256 tokenId) public view returns (string memory name, uint256 grade, string memory imageUrl) {
        require(exists(tokenId), "PokemonCertification: card does not exist");
        Card memory card = cards[tokenId];
        return (card.name, card.grade, card.imageUrl);
    }

    function transferCard(address to, uint256 tokenId, uint256 amount) public {
        require(balanceOf(msg.sender, tokenId) >= amount, "PokemonCertification: insufficient balance");

        _safeTransferFrom(msg.sender, to, tokenId, amount, "");

        // Émettre un événement
        emit CardTransferred(tokenId, msg.sender, to, amount);
    }

    function burnCard(uint256 tokenId, uint256 amount) public {
        require(
            balanceOf(msg.sender, tokenId) >= amount || msg.sender == owner(),
            "PokemonCertification: You are not authorized to burn this token"
        );

        _burn(msg.sender, tokenId, amount);

        // Émettre un événement
        emit CardBurned(tokenId, msg.sender, amount);
    }

    // Vérifier si token existe
    function exists(uint256 tokenId) public view returns (bool) {
        return cards[tokenId].grade != 0;
    }

    // Fonction pour retourner l'URI du token
    function uri(uint256 tokenId) public view override returns (string memory) {
        require(exists(tokenId), "PokemonCertification: URI query for nonexistent token");
        return string(abi.encodePacked("https://api.example.com/token/", Strings.toString(tokenId), ".json"));
    }
}