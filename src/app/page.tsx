"use client";

import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useState } from "react";
import { json } from "stream/consumers";

export default function Home() {
  const [value, setValue] = useState("");

  const trpc = useTRPC();
  const messages = useQuery(trpc.messages.getMany.queryOptions());
  const createMessage = useMutation(trpc.messages.create.mutationOptions({
    onSuccess: () => {
      toast.success("Message created");
    }
  }));


  return (
    <div>
      <Input value={value} onChange={(e) => setValue(e.target.value)} />
      <Button 
        disabled={createMessage.isPending || !value} 
        onClick={() => createMessage.mutate({ value: value })}
      >
        Create Message
      </Button>
      { JSON.stringify(messages.data) }
    </div>
  );
}
