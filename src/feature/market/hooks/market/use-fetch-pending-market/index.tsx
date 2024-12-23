import { useAccountStore } from "@/feature/user/store/account-store";
import { dryrun } from "@permaweb/aoconnect";
import { useSuspenseQuery } from "@tanstack/react-query";

const useFetchPendingMarket = () => {
  const { address } = useAccountStore();
  return useSuspenseQuery({
    queryKey: [`/GET /market/status/pending`],
    queryFn: async () => {
      const result = await dryrun({
        process: "jIRuxblllcBIDUmYbrbbEI90nJs40duNA6wR6NkYVvI",
        tags: [
          { name: "Action", value: "HasWaitFor" },
          {
            name: "ProfileId",
            value: address,
          },
        ],
      });

      const payload = JSON.parse(result.Messages[0]?.Data);
      return payload;
    },
  });
};

export default useFetchPendingMarket;
