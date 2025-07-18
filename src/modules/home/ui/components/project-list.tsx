"use client";

import Link from "next/link";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";

export const ProjectList = () => {
  const { user } = useUser();

  const trpc = useTRPC();
  const { data: projects } = useQuery(
    trpc.projects.getMany.queryOptions(),
  );

  if (!user) return null;
  
  return (
    <div className="w-full bg-white dark:bg-sidebar rounded-xl p-8 border flex flex-col gap-y-6 sm:gap-y-4">
      <h2 className="text-2xl font-semibold">
        {user?.firstName}&apos;s Weaves
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {projects?.length === 0 && (
          <div className="col-span-full text-center">
            <p className="text-sm text-muted-foreground">
              No projects found
            </p>
          </div>
        )}
        {projects?.map((project) => (
          <Button
            key={project.id}
            variant="outline"
            className="font-normal h-auto justify-start w-full text-start p-4"
            asChild
          >
            <Link href={`/projects/${project.id}`}>
              <div className="flex items-center gap-x-4 w-full">
                <Image 
                  src="/logo.svg"
                  alt="Web Weave"
                  width={24}
                  height={24}
                  className="object-contain flex-shrink-0"
                />
                <div className="flex flex-col min-w-0 flex-1">
                  <p className="truncate font-medium text-sm">
                    {project.name}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {formatDistanceToNow(project.updatedAt, {
                      addSuffix: true,
                    })}
                  </p>
                </div>
              </div>
            </Link>
          </Button>
        ))}
      </div>
    </div>
  );
};