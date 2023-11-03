import { type AnnouncementPost } from "@/server/dao/announcements";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card";

interface AnnouncementPostProps {
  postData: AnnouncementPost
}

export function AnnouncementPost({ postData }: AnnouncementPostProps) {
  const {
    announcement_uuid,
    announcement_created_at,
    announcement_author_display_name,
    announcement_title,
    announcement_content,
  } = postData;

  const format_time_options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  };

  const formatted_announcement_created_at = Intl.DateTimeFormat('en-US', format_time_options).format(announcement_created_at);
  return (
    <Card key={announcement_uuid}>
      <CardHeader>
        <CardTitle>{announcement_title}</CardTitle>
        <CardDescription>
          <span className="font-semibold">Created By: </span>
          {announcement_author_display_name!}
          {" | "}
          <span className="font-semibold">Posted On: </span>
          {formatted_announcement_created_at}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>{announcement_content}</p>
      </CardContent>
    </Card>
  )
}