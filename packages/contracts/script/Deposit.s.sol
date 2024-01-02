// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Script.sol";
import "../src/base/MynaWalletPaymaster.sol";

contract DepositScript is Script {
    function setUp() public {}

    function run() public {
        vm.startBroadcast(vm.envUint("PRIVATE_KEY"));
        MynaWalletPaymaster paymaster = MynaWalletPaymaster(vm.envAddress("DEPOSIT_TARGET_PAYMASTER_ADDRESS"));
        paymaster.deposit{value: 0.2 ether}(); // 送金額を指定
        vm.stopBroadcast();
    }
}
