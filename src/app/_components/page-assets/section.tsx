import React, { ReactNode } from "react";

export default function Section({
  children,
  bg,
  className,
}: {
  children?: ReactNode;
  bg: string;
  className?: string;
}) {
  return (
    <section className={`${bg} ${className}`}>
      <div className="container max-w-[64rem] py-16">{children}</div>
    </section>
  );
}
