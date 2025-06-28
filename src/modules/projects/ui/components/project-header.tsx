import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronDownIcon, SunMoonIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuTrigger,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";

interface Props {
  projectId: string;
}

export const ProjectHeader = ({ projectId }: Props) => {
  const trpc = useTRPC();
  const { data: project } = useSuspenseQuery(
    trpc.projects.getOne.queryOptions({ id: projectId }),
  );

  const { theme, setTheme } = useTheme();

  return (
    <header className="flex items-center justify-between p-2 border-b">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="focus-visible:ring-0 hover:bg-transparent hover:opacity-75 transition-opacity pl-2!"
          >
            <Image src="/logo.svg" alt="Web Weave" width={18} height={18} />
            <span className="text-sm font-medium">{project.name}</span>
            <ChevronDownIcon className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" side="bottom">
          <DropdownMenuItem asChild>
            <Link href="/">
              <ChevronLeftIcon />
              <span>Go to Dashboard</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="gap-2">
              <SunMoonIcon className="size-4 text-muted-foreground" />
              <span>Appearance</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
                  <DropdownMenuRadioItem value="light">
                    <span>Light</span>
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="dark">
                    <span>Dark</span>
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="system">
                    <span>System</span>
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};
