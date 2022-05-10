// SPDX-License-Identifier: MIT


pragma solidity ^0.8.4;

import './IERC721ABurnable.sol';
import '../ERC721A.sol';

abstract contract ERC721ABurnable is ERC721A, IERC721ABurnable {
    function burn(uint256 tokenId) public virtual override {
        _burn(tokenId, true);
    }
}
