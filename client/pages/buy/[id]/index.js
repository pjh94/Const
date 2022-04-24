import { useRouter } from "next/router";

import Header from "../../../components/Layout/Header";
import SetBuy from "../../../components/GetContract/setBuy";

import { useQuery, dehydrate, QueryClient } from "react-query";
import { fetchSetBuy } from "../../../hooks";

// import { fetchLocals } from "../../hooks/locals";

const Buy = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading, isFetching } = useQuery(["setBuy"], () =>
    fetchSetBuy(id)
  );

  return (
    <div>
      <p>BuySell 파라미터 : {id}</p>

      {/* 전체 css 이걸로 설정해 줄 것임 */}
      <Header></Header>
      <SetBuy></SetBuy>
    </div>
  );
};

// 여기서 SSG 하는 방법을 알아보아야 겠다
export async function getServerSideProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["setBuy"], () => fetchSetBuy(id));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default Buy;
