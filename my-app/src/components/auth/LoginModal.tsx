import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function LoginModal() {
  return (
    <Link href="/login">
      <Button>Login</Button>
    </Link>
  );
}