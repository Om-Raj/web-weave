"use client";

import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [value, setValue] = useState("");
  const router = useRouter();

  const trpc = useTRPC();
  const createProject = useMutation(trpc.projects.create.mutationOptions({
    onSuccess: (data) => {
      router.push(`/projects/${data.id}`);
    },
    onError: (error) => {
      toast.success(error.message);
    }
  }));


  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="flex gap-2 w-full max-w-md mx-auto">
        <Input value={value} onChange={(e) => setValue(e.target.value)}/>
        <Button 
          disabled={createProject.isPending || !value} 
          onClick={() => createProject.mutate({ value: value })}
        >
          Create
        </Button>
      </div>
    </div>
  );
}
