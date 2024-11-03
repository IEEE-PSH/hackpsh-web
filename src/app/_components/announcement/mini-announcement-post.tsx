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
    <div key={announcement_uuid} className="w-full overflow-hidden">
      <p className="mb-3 text-xs text-muted-foreground">{formattedTimeAgo}</p>
      <p className="mb-1 font-semibold leading-none tracking-tight">
        {announcement_title}
      </p>
      <p className="line-clamp-6 text-ellipsis text-sm">
        {announcement_content}
      </p>
    </div>
  );
}
