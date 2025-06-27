"use client";

import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Home() {
  const trpc = useTRPC();
  const invoke = useMutation(trpc.invoke.mutationOptions({
    onSuccess: () => {
      toast.success("Background job invoked");
    },
    onError: () => {
      toast.error("Failed to invoke background job");
    },
  }));
  return (
    <div>
      <Button onClick={() => invoke.mutate({ text: "Om" })}>
        Invoke Background Job
      </Button>
    </div>
  );
}
