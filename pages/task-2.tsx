import { Sample } from "@apiType/sample";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

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
    try {
      setFetchState((fetchState) => {
        return { ...fetchState, loading: true };
      });

      const response: Sample[] = await (
        await fetch(END_PONT, {
          method: "GET",
          headers: {
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
            "Access-Control-Allow-Headers":
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
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

type CardPropTye = { qna: Sample };
const IMAGE_PATH = "/image/";
const QuestionCard = ({
  qna: {
    date,
    score,
    name,
    question,
    desc,
    threshHold: { answers, upvotes },
  },
}: CardPropTye) => (
  <div className="shadow-lg p-6">
    <div className="flex justify-between">
      <div className="flex gap-4">
        <div className="w-[50px] h-[50px] rounded-full bg-gray-500" />
        <div className="">
          <h4>{name}</h4>
          <p className="text-gray-400">{dayjs(date).format("MMM DD")}</p>
        </div>
      </div>
      <p className="text-gray-400 text-xl cursor-pointer">x</p>
    </div>

    <h4 className="font-semibold text-xl mt-5">{question}</h4>
    <p className="mt-2">{desc}</p>

    <div className="flex justify-center rounded-xl gap-4 bg-gray-100 py-2 w-24">
      <div className="flex">
        <img
          src={`${IMAGE_PATH}/upvote-svgrepo-com.svg`}
          alt="upvote-svgrepo-com"
        />
        <p className="pl-1">{upvotes}</p>
      </div>
      <img
        src={`${IMAGE_PATH}/downvote-svgrepo-com.svg`}
        alt="downvote-svgrepo-com"
      />
    </div>
  </div>
);
