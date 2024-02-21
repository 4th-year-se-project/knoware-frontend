import { Accordion, Badge, Text } from "@mantine/core";
import { format } from "date-fns";

type Comment = {
  comment: string;
  is_lecturer_comment: boolean;
  timestamp: any;
  page_number: number;
  comment_date_added: any;
};

interface CommentSectionProps {
  comments: Comment[];
  title: string;
}

interface CommentsAccordionProps {
  embeddingComment: Comment[];
  otherEmbeddingComments: Comment[];
  lecturerComment: Comment[];
}

function formatTimestampOrPage(comment: Comment): string {
  if (comment.timestamp) {
    return `Timestamp: ${comment.timestamp}`;
  } else if (comment.page_number) {
    return `Page: ${comment.page_number}`;
  }
  return "";
}

function formatCommentAddedDate(comment: Comment): string {
  return `Comment added on ${format(
    new Date(comment.comment_date_added),
    "MMM d, yyyy h:mm a"
  )}`;
}

function CommentSection({ comments, title }: CommentSectionProps) {
  return (
    <Accordion.Item value={title} key={title}>
      <Accordion.Control>
        <div>
          <Text size="md">{title}</Text>
        </div>
      </Accordion.Control>
      <Accordion.Panel className="pt-3 pl-6 bg-white">
        {comments.map((comment) => (
          <div>
            <div className="flex items-center">
              <Text size="sm">{comment.comment}</Text>
              {(comment.timestamp || comment.page_number) && (
                <Badge color="indigo" radius="sm" variant="dot" className="ml-3">
                  {formatTimestampOrPage(comment)}
                </Badge>
              )}
            </div>
            <Text size="xs" color="dimmed">
              {formatCommentAddedDate(comment)}
            </Text>
          </div>
        ))}
      </Accordion.Panel>
    </Accordion.Item>
  );
}

function CommentsAccordion({
  embeddingComment,
  otherEmbeddingComments,
  lecturerComment,
}: CommentsAccordionProps) {
  return (
    <Accordion chevronPosition="right" variant="contained">
      {embeddingComment.length > 0 && (
        <CommentSection
          comments={embeddingComment}
          title="Comments added to this section"
        />
      )}
      {otherEmbeddingComments.length > 0 && (
        <CommentSection
          comments={otherEmbeddingComments}
          title="Comments added on other sections"
        />
      )}
      {lecturerComment.length > 0 && (
        <CommentSection
          comments={lecturerComment}
          title="Comments added by the lecturer"
        />
      )}
    </Accordion>
  );
}

export default CommentsAccordion;
