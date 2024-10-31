import { type AnnouncementPost } from "@/server/dao/announcements";
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Card,
} from "../ui/card";
import AnnouncementPostActions from "./announcement-post-actions";
import { type TUserRole } from "@/db/drizzle/startup_seed";

type AnnouncementPostProps = {
  postData: AnnouncementPost;
  userRole: TUserRole;
};

export function AnnouncementPost({
  postData,
  userRole,
}: AnnouncementPostProps) {
  const {
    announcement_uuid,
    announcement_created_at,
    announcement_author_display_name,
    announcement_title,
    announcement_content,
    announcement_id,
  } = postData;

  const format_time_options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  const formatted_announcement_created_at = Intl.DateTimeFormat(
    "en-US",
    format_time_options,
  ).format(announcement_created_at);

  return (
    <Card key={announcement_uuid}>
      <CardHeader>
        <div className="relative flex justify-between">
          <CardTitle className="text-lg">{announcement_title}</CardTitle>
          {userRole !== "participant" && (
            <AnnouncementPostActions
              postID={announcement_id}
              userRole={userRole}
            />
          )}
        </div>

        <CardDescription>
          {announcement_author_display_name ?? "Deleted User"}
          {" | "}
          {formatted_announcement_created_at}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="word-break w-full max-w-full whitespace-pre-line break-words text-sm">
          {announcement_content}
        </p>
      </CardContent>
    </Card>
  );
}
