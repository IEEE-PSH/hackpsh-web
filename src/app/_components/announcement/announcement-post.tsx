import { type AnnouncementPost } from "@/server/dao/announcements";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card";

interface AnnouncementPostProps {
  postData: AnnouncementPost
}

export function AnnouncementPost({ postData }: AnnouncementPostProps) {
  const {
    announcement_uuid,
    announcement_title,
    announcement_content,
  } = postData;

  return (
    <Card key={announcement_uuid}>
      <CardHeader>
        <CardTitle>{announcement_title}</CardTitle>
        <CardDescription>Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{announcement_content}</p>
      </CardContent>
    </Card>
  )
}