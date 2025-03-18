import { ethers, Interface } from "ethers"; // Import Interface directly
import Safe from "@safe-global/protocol-kit";
import dotenv from "dotenv";
import ABI from "./abi";
import { MetaTransactionData, OperationType } from "@safe-global/types-kit";

dotenv.config();

const ALLOWANCE_MODULE_WORLDCHAIN =
  "0xa9bcF56d9FCc0178414EF27a3d893C9469e437B7";

main();

async function main() {
  const safeOwner = await Safe.init({
    provider: "https://worldchain-mainnet.g.alchemy.com/public",
    signer: process.env.PRIVATE_KEY!,
    safeAddress: process.env.SAFE_ADDRESS!,
  });

  const allowanceAbi = ABI.abi;

  const allowanceInterface = new Interface(allowanceAbi);

  //   function setAllowance(
  //      address delegate,
  //      address token,
  //      uint96 allowanceAmount,
  //      uint16 resetTimeMin,
  //      uint32 resetBaseMin
  //   )
  const wldTokenAddress = "0x2cFc85d8E48F8EAB294be644d9E25C3030863003";

  const wldTokenAmount = ethers.parseUnits("100", 18);

  // 1 day in minutes
  const dayInMinutes = 1440;

  const currentMinute = new Date().getMinutes();

  const setAllowanceData = allowanceInterface.encodeFunctionData(
    "setAllowance",
    [
      process.env.DELEGATE!,
      wldTokenAddress,
      wldTokenAmount,
      dayInMinutes,
      currentMinute,
    ]
  );

  const safeTransactionData: MetaTransactionData = {
    to: ALLOWANCE_MODULE_WORLDCHAIN,
    value: "0",
    data: setAllowanceData,
    operation: OperationType.Call,
  };

  const safeTransaction = await safeOwner.createTransaction({
    transactions: [safeTransactionData],
  });

  const txResponse = await safeOwner.executeTransaction(safeTransaction);
  console.log(txResponse);
}
