import { Tabs, TabsList, TabsTrigger, TabsContent} from "@/components/ui/tabs"

function DiscoverPage() {
  return (
    <div>
          <Tabs className="" defaultValue="By Mood">
      <TabsList className="glass mx-auto w-full max-w-200 justify-start overflow-x-auto mt-40">
        <TabsTrigger  value="Mood">By Mood</TabsTrigger>
        <TabsTrigger value="Category">By Category</TabsTrigger>
      </TabsList>
      <div className="min-h-screen">
      <TabsContent value="Mood">
        {/* <FavBooks/> */}
      </TabsContent>
      <TabsContent value="Category">
        {/* <FavBooks/> */}
      </TabsContent>
</div>
    </Tabs>
    </div>
  )
}

export default DiscoverPage
