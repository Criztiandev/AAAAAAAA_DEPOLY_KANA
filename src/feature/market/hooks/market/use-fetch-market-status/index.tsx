import { useAccountStore } from "@/feature/user/store/account-store";
import { dryrun } from "@permaweb/aoconnect";
import { useSuspenseQuery } from "@tanstack/react-query";

const useFetchMarketStatus = () => {
  const { address } = useAccountStore();

  return useSuspenseQuery({
    queryKey: [`/GET /${address}/market/list`],
    queryFn: async () => {
      const walletAddress = await window.arweaveWallet.getActiveAddress();
      const result = await dryrun({
        process: "jIRuxblllcBIDUmYbrbbEI90nJs40duNA6wR6NkYVvI",
        tags: [
          { name: "Action", value: "HasWaitFor" },
          {
            name: "ProfileId",
            value: walletAddress,
          },
        ],
      });

      const payload = JSON.parse(result.Messages[0]?.Data);
      return payload;
    },
  });
};

export default useFetchMarketStatus;
