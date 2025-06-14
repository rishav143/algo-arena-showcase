
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ArraysStrings from "./pages/ArraysStrings";
import LinkedLists from "./pages/LinkedLists";
import StacksQueues from "./pages/StacksQueues";
import TreesGraphs from "./pages/TreesGraphs";
import DynamicProgramming from "./pages/DynamicProgramming";
import SortingSearching from "./pages/SortingSearching";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/arrays-strings" element={<ArraysStrings />} />
          <Route path="/linked-lists" element={<LinkedLists />} />
          <Route path="/stacks-queues" element={<StacksQueues />} />
          <Route path="/trees-graphs" element={<TreesGraphs />} />
          <Route path="/dynamic-programming" element={<DynamicProgramming />} />
          <Route path="/sorting-searching" element={<SortingSearching />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
