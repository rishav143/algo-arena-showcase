
import React, { useState, useMemo } from 'react';
import { Search, Filter, Grid, List } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useDebounce } from '@/hooks/useDebounce';

interface Problem {
  id: number;
  title: string;
  difficulty: string;
  time: string;
  solved: number;
  companies: string[];
}

interface SearchToolbarProps {
  problems: Problem[];
  onFilteredProblems: (problems: Problem[]) => void;
  currentTopic: string;
  topics: Array<{
    name: string;
    route: string;
    color: string;
  }>;
}

const SearchToolbar: React.FC<SearchToolbarProps> = ({
  problems,
  onFilteredProblems,
  currentTopic,
  topics
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const filteredProblems = useMemo(() => {
    let filtered = problems;

    // Search filter
    if (debouncedSearchQuery) {
      filtered = filtered.filter(problem =>
        problem.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
        problem.companies.some(company => 
          company.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
        )
      );
    }

    // Difficulty filter
    if (selectedDifficulty) {
      filtered = filtered.filter(problem => problem.difficulty === selectedDifficulty);
    }

    return filtered;
  }, [problems, debouncedSearchQuery, selectedDifficulty]);

  React.useEffect(() => {
    onFilteredProblems(filteredProblems);
  }, [filteredProblems, onFilteredProblems]);

  const difficulties = ['Easy', 'Medium', 'Hard'];

  return (
    <div className="mb-8 space-y-4">
      {/* Topic Navigation */}
      <div className="flex flex-wrap gap-2 justify-center">
        {topics.map((topic) => (
          <a
            key={topic.name}
            href={topic.route}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              currentTopic === topic.name
                ? `${topic.color} text-white shadow-lg`
                : 'bg-white/80 text-gray-600 hover:bg-white border border-gray-200'
            }`}
          >
            {topic.name}
          </a>
        ))}
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-gray-200 shadow-lg">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          {/* Search Input */}
          <div className="relative flex-1 w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search problems by title or company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* Difficulty Filter */}
          <div className="flex gap-2">
            <Button
              variant={selectedDifficulty === '' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedDifficulty('')}
              className="text-xs"
            >
              All
            </Button>
            {difficulties.map((difficulty) => (
              <Button
                key={difficulty}
                variant={selectedDifficulty === difficulty ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedDifficulty(difficulty === selectedDifficulty ? '' : difficulty)}
                className="text-xs"
              >
                {difficulty}
              </Button>
            ))}
          </div>

          {/* View Mode Toggle */}
          <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="p-2"
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="p-2"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Active Filters */}
        {(debouncedSearchQuery || selectedDifficulty) && (
          <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-gray-200">
            <span className="text-sm text-gray-500">Active filters:</span>
            {debouncedSearchQuery && (
              <Badge variant="outline" className="text-xs">
                Search: {debouncedSearchQuery}
              </Badge>
            )}
            {selectedDifficulty && (
              <Badge variant="outline" className="text-xs">
                Difficulty: {selectedDifficulty}
              </Badge>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchToolbar;
