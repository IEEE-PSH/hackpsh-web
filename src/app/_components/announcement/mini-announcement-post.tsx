import { type AnnouncementPost } from "@/server/dao/announcements";
import { formatDistanceToNow } from "date-fns";

type AnnouncementPostProps = {
  postData: AnnouncementPost;
};

export function MiniAnnouncementPost({ postData }: AnnouncementPostProps) {
  const {
    announcement_uuid,
    announcement_created_at,
    announcement_title,
    announcement_content,
  } = postData;

  const formattedTimeAgo = formatDistanceToNow(
    new Date(announcement_created_at),
    { addSuffix: true },
  );

  return (
    <div key={announcement_uuid} className="w-full space-y-2 overflow-hidden">
      <p className="text-sm text-muted-foreground">{formattedTimeAgo}</p>
      <p className="font-semibold leading-none tracking-tight">
        {announcement_title}
      </p>

      <p className="line-clamp-6 text-ellipsis text-sm">
        {announcement_content}
      </p>
    </div>
  );
}
