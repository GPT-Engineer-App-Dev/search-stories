import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
      <h1 className="text-4xl font-bold mb-6">Welcome to Hacker News Top Stories</h1>
      <p className="text-xl mb-8">Explore the top 100 stories from Hacker News</p>
      <Button asChild>
        <Link to="/hacker-news">View Top Stories</Link>
      </Button>
    </div>
  );
};

export default Index;