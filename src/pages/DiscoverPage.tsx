import { Tabs, TabsList, TabsTrigger, TabsContent} from "@/components/ui/tabs"
import DiscoverM from "@/components/discover/ByMood"
import DiscoveredPageCategory from "@/components/discover/ByCategory"
function DiscoverPage() {
  return (
    <div>
          <Tabs className="" defaultValue="By Mood">
      <TabsList className="glass mx-auto w-full max-w-200 mt-40">
        <TabsTrigger  value="Mood">By Mood</TabsTrigger>
        <TabsTrigger value="Category">By Category</TabsTrigger>
      </TabsList>
      <div className="min-h-screen">
      <TabsContent value="Mood">
        <DiscoverM/>
      </TabsContent>
      <TabsContent value="Category">
        <DiscoveredPageCategory/>
      </TabsContent>
</div>
    </Tabs>
    </div>
  )
}

export default DiscoverPage
