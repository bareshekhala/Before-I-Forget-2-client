import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent} from "@/components/ui/tabs"
import DiscoverM from "@/components/discover/ByMood"
import DiscoveredPageCategory from "@/components/discover/ByCategory"


function DiscoverPage() {
  const shelves = ["All", "Books", "Movies", "Songs"]

  const [shelf, setShelf] = useState("All")

  return (
    <div className="mx-auto box-content max-w-295 px-4 pt-4.5 pb-6 lg:px-10 lg:pt-6.5 lg:pb-16">
      <div className="app-backdrop" />

      <h1 className="mb-6 font-display text-[1.75rem] leading-none font-[740] tracking-[-0.02em] text-ink lg:text-[2.125rem] dark:text-night-ink">
        Discover
      </h1>

          <Tabs className="" defaultValue="Mood">
      <div className="mb-4.5 flex flex-wrap items-center justify-between gap-3">
      <TabsList className="seg">
        <TabsTrigger className="seg-item" value="Mood">By Mood</TabsTrigger>
        <TabsTrigger className="seg-item" value="Category">By Category</TabsTrigger>
      </TabsList>

      <div className="seg">
        {shelves.map((each) => (
          <button
            key={each}
            onClick={() => setShelf(each)}
            className={shelf === each ? "seg-item active" : "seg-item"}
          >
            {each}
          </button>
        ))}
      </div>
      </div>
      <div>
      <TabsContent value="Mood">
        <DiscoverM shelf={shelf}/>
      </TabsContent>
      <TabsContent value="Category">
        <DiscoveredPageCategory shelf={shelf}/>
      </TabsContent>
</div>
    </Tabs>
    </div>
  )
}

export default DiscoverPage
