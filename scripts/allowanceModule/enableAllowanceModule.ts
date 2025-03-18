import Safe from "@safe-global/protocol-kit";
import dotenv from "dotenv";

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

  // Create transaction to enable module
  const safeTransaction = await safeOwner.createEnableModuleTx(
    ALLOWANCE_MODULE_WORLDCHAIN
  );

  // Execute the transaction
  const txResponse = await safeOwner.executeTransaction(safeTransaction);

  console.log(txResponse);
}
