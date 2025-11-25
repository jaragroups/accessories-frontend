import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ProductDescription({ description, specification }) {
  return (
    <section className="mx-3 mt-14 min-h-80 md:mx-0">
      <Tabs defaultValue="description" className="items-center">
        <TabsList className="mb-4 h-auto w-full rounded-none border-b bg-transparent p-0">
          <TabsTrigger
            value="description"
            className="relative cursor-pointer rounded-none py-2 text-xl after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-[#2A8EBA]"
          >
            Description
          </TabsTrigger>
          <TabsTrigger
            value="specification"
            className="relative cursor-pointer rounded-none py-2 text-xl after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-[#2A8EBA]"
          >
            Specification
          </TabsTrigger>
        </TabsList>

        <TabsContent value="description" className={"bg-transparent pt-5"}>
          {description ? (
            <article
              className="prose mt-2 max-w-full bg-transparent"
              dangerouslySetInnerHTML={{ __html: description }}
            ></article>
          ) : (
            <p className="p-4 text-center text-muted-foreground">
              No description available
            </p>
          )}
        </TabsContent>

        <TabsContent value="specification" className={"bg-transparent pt-5"}>
          {specification ? (
            <article
              className="prose mt-2 max-w-full"
              dangerouslySetInnerHTML={{ __html: specification }}
            ></article>
          ) : (
            <p className="mt-12 p-4 text-center text-muted-foreground">
              No specification available
            </p>
          )}
        </TabsContent>
      </Tabs>
    </section>
  );
}
