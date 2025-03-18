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

  const addDelegateData = allowanceInterface.encodeFunctionData("addDelegate", [
    process.env.DELEGATE!,
  ]);

  const safeTransactionData: MetaTransactionData = {
    // allowanceModuleAddress
    to: ALLOWANCE_MODULE_WORLDCHAIN,
    // 0
    value: "0",
    data: addDelegateData,
    operation: OperationType.Call,
  };

  const safeTransaction = await safeOwner.createTransaction({
    transactions: [safeTransactionData],
  });

  const txResponse = await safeOwner.executeTransaction(safeTransaction);
  console.log(txResponse);
}
