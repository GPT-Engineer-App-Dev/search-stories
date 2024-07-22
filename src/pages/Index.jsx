import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4 bg-gradient-to-b from-blue-600 to-yellow-400">
      <h1 className="text-4xl font-bold mb-6 text-white">Välkommen till Svenska Hacker News</h1>
      <p className="text-xl mb-8 text-white">Utforska de 100 bästa nyheterna från Hacker News</p>
      <Button asChild className="bg-yellow-400 text-blue-600 hover:bg-yellow-500">
        <Link to="/hacker-news">Visa Toppnyheter</Link>
      </Button>
    </div>
  );
};

export default Index;