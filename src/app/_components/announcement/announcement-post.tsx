import { Post } from "@/server/dao/announcements";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card";

interface AnnouncementPostProps {
  postData: Post
}

export function AnnouncementPost({ postData }: AnnouncementPostProps) {
  const { announcement_uuid, announcement_content, announcement_author } = postData;

  return (
    <Card key={announcement_uuid}>
      <CardHeader>
        <CardTitle>Test</CardTitle>
        <CardDescription>Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>AnnouncementContent</p>
      </CardContent>
    </Card>
  )
}