import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const fetchTopStories = async () => {
  const response = await fetch(
    "https://hacker-news.firebaseio.com/v0/topstories.json"
  );
  const storyIds = await response.json();
  const top100Ids = storyIds.slice(0, 100);

  const storyPromises = top100Ids.map((id) =>
    fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then((res) =>
      res.json()
    )
  );

  return Promise.all(storyPromises);
};

const StoryItem = ({ story }) => (
  <Card className="mb-4 border-blue-600">
    <CardHeader className="bg-blue-600 text-white">
      <CardTitle className="text-lg">{story.title}</CardTitle>
    </CardHeader>
    <CardContent className="bg-yellow-100">
      <p className="text-sm text-blue-600 mb-2">
        Uppröster: {story.score}
      </p>
      <a
        href={story.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline inline-flex items-center"
      >
        Läs mer
        <ExternalLink className="ml-1 h-4 w-4" />
      </a>
    </CardContent>
  </Card>
);

const SkeletonLoader = () => (
  <div className="space-y-4">
    {[...Array(5)].map((_, index) => (
      <Card key={index} className="mb-4 border-blue-600">
        <CardHeader className="bg-blue-600">
          <Skeleton className="h-6 w-3/4 bg-yellow-200" />
        </CardHeader>
        <CardContent className="bg-yellow-100">
          <Skeleton className="h-4 w-1/4 mb-2 bg-blue-200" />
          <Skeleton className="h-4 w-1/3 bg-blue-200" />
        </CardContent>
      </Card>
    ))}
  </div>
);

const HackerNewsTopStories = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: stories, isLoading, error } = useQuery({
    queryKey: ["topStories"],
    queryFn: fetchTopStories,
  });

  const filteredStories = stories?.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (error) return <div className="text-red-600">Ett fel inträffade: {error.message}</div>;

  return (
    <div className="container mx-auto px-4 py-8 bg-gradient-to-b from-blue-100 to-yellow-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Svenska Hacker News: Topp 100 Nyheter</h1>
      <Input
        type="text"
        placeholder="Sök nyheter..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-6 border-blue-600"
      />
      {isLoading ? (
        <SkeletonLoader />
      ) : (
        <div>
          {filteredStories?.map((story) => (
            <StoryItem key={story.id} story={story} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HackerNewsTopStories;