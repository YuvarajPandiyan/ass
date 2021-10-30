import { Sample } from "@apiType/sample";
import dayjs from "dayjs";

type CardPropTye = { qna: Sample };
const IMAGE_PATH = "/image/";

export const QuestionCard = ({
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
