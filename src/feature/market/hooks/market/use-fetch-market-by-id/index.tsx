import { dryrun } from "@permaweb/aoconnect";
import { useQuery } from "@tanstack/react-query";

const useFetchMarketById = (id: string) => {
  return useQuery({
    queryKey: [`/GET /market/${id}`],
    queryFn: async () => {
      const result = await dryrun({
        process: id,
        tags: [{ name: "Action", value: "GetMarketInfo" }],
      });

      const payload = JSON.parse(result.Messages[0]?.Data);
      return payload;
    },
  });
};

export default useFetchMarketById;
