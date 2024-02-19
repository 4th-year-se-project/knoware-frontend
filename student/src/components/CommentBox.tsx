import { IconPentagram, IconBook, IconMessage2 } from "@tabler/icons-react";
import { Avatar, Badge } from "@mantine/core";

type Props = {
  comment: string;
  is_lecturer_comment: boolean;
  timestamp: any;
  page_number: number;
};

function commentBox(props: Props) {
  return (
    <div
      className={`h-auto w-full text-black relative p-6 mb-7 text-sm rounded-r-lg ${
        props.is_lecturer_comment
          ? "bg-red-100 border-l-4 border-red-500"
          : "bg-indigo-50 border-l-4 border-indigo-400"
      }`}
    >
      <div className="absolute -left-7 -top-6 w-15 h-15 bg-white rounded-full flex justify-center items-center p-3">
        <IconPentagram
          className={
            props.is_lecturer_comment
              ? "text-red-500 text-xs"
              : "text-indigo-400 text-xs"
          }
        />
      </div>
      <p>{props.comment}</p>
      <div>
        {props.is_lecturer_comment && (
          <Badge
            className="mt-4 mr-4"
            color={props.is_lecturer_comment ? "red" : "indigo"}
            radius="xs"
          >
            {props.is_lecturer_comment ? "lecturer comment" : ""}
          </Badge>
        )}
        {!props.is_lecturer_comment && (
          <>
            {props.page_number && (
              <Badge className="mt-4 mr-4" color="indigo" radius="xs" variant="dot">
                Page {props.page_number}
              </Badge>
            )}
            {props.timestamp && (
              <Badge className="mt-4 mr-4" color="indigo" radius="xs" variant="dot">
                Timestamp {props.timestamp}
              </Badge>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default commentBox;
