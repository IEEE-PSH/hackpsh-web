"use client";
import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { trpc } from "@/app/_trpc/react";

export default function Announcements() {
  const obj = trpc.announcements.get_announcement_posts.useQuery().data;
  const newArr = obj?.map((item) => JSON.parse(item.announcement_content));
  newArr?.reverse();
  useEffect(() => {
    console.log(newArr);
  }, [obj]);

  return (
    <>
      {newArr?.map((item, i) => (
        <Card key={i}>
          <CardHeader>
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{item.created_at}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{item.message}</p>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
