"use client";

import React from "react";

interface Props {
  children?: React.ReactNode;
}

export default function SessionProvider({ children }: Props) {
  return <>{children}</>;
}