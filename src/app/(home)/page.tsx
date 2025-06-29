import { ProjectForm } from "@/modules/home/ui/components/project-form";
import { ProjectList } from "@/modules/home/ui/components/project-list";
import Image from "next/image";

const Page = () => {
  return (
    <div className="flex flex-col max-w-5xl mx-auto w-full">
      <section className="space-y-6 py-[16vh] sm:pb-[10vh] 2xl:py-40">
        <div className="flex flex-col items-center">
          <Image
            src="/logo.svg"
            alt="Web Weave"
            width={50}
            height={50}
          />
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-center">
          Build something with Web Weave
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground text-center">
          Create apps and website by chatting with AI
        </p>
        <div className="max-w-3xl mx-auto w-full">
          <ProjectForm />
        </div>
      </section>
      <ProjectList />
    </div>
  );
};

export default Page;