import { Sample } from "@apiType/sample";
import { useEffect, useState } from "react";
import { QuestionCard } from "@components/card";

const END_PONT = "https://recruitingmonk-v2.azurewebsites.net/qna";

type FetchStateType = {
  loading: boolean;
  error: { isError: boolean; errorMessage: any };
  response: null | Sample[];
};

const TaskTwo = () => {
  const [fetchState, setFetchState] = useState<FetchStateType>({
    loading: false,
    error: { isError: false, errorMessage: null },
    response: null,
  });

  const handelAPiCall = async () => {
    const header = new Headers();
    header.append("Access-Control-Allow-Credentials", "true");
    header.append("Access-Control-Allow-Origin", "*");
    try {
      setFetchState((fetchState) => {
        return { ...fetchState, loading: true };
      });

      const response: Sample[] = await (
        await fetch(END_PONT, {
          method: "GET",
          headers: header,
        })
      ).json();

      setFetchState((fetchState) => {
        return { ...fetchState, loading: false, response: response };
      });
    } catch (error) {
      setFetchState((fetchState) => {
        return {
          ...fetchState,
          loading: false,
          error: { isError: true, errorMessage: error },
        };
      });
    }
  };

  useEffect(() => {
    handelAPiCall();
  }, []);

  return (
    <div className="container mx-auto">
      {fetchState.loading && (
        <div className="text-center text-blue-600 text-2xl">....Loading</div>
      )}

      {fetchState.error.isError && (
        <div className="text-center text-red-600 text-2xl py-20">
          some thing went wrong,
        </div>
      )}

      {fetchState.response && (
        <div className="grid gap-10">
          {fetchState.response.map((data) => (
            <QuestionCard key={data._id} qna={data} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskTwo;
