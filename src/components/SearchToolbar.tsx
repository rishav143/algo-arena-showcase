
import React, { useState, useMemo } from 'react';
import { Search, Filter, Grid, List, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
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
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
}

const SearchToolbar: React.FC<SearchToolbarProps> = ({
  problems,
  onFilteredProblems,
  currentTopic,
  topics,
  viewMode,
  onViewModeChange
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
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

  // Search suggestions based on current input
  const searchSuggestions = useMemo(() => {
    if (!searchQuery || searchQuery.length < 2) return [];
    
    const suggestions = problems.filter(problem =>
      problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      problem.companies.some(company => 
        company.toLowerCase().includes(searchQuery.toLowerCase())
      )
    ).slice(0, 5);
    
    return suggestions;
  }, [problems, searchQuery]);

  React.useEffect(() => {
    onFilteredProblems(filteredProblems);
  }, [filteredProblems, onFilteredProblems]);

  const difficulties = ['Easy', 'Medium', 'Hard'];

  const handleSuggestionSelect = (suggestion: Problem) => {
    setSearchQuery(suggestion.title);
    setIsSearchOpen(false);
  };

  return (
    <div className="mb-8 space-y-6">
      {/* Topic Navigation */}
      <div className="flex flex-wrap gap-3 justify-center">
        {topics.map((topic) => (
          <a
            key={topic.name}
            href={topic.route}
            className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 ${
              currentTopic === topic.name
                ? `${topic.color} text-white shadow-xl transform scale-105`
                : 'bg-white/90 text-gray-700 hover:bg-white border border-gray-200 shadow-md hover:shadow-lg'
            }`}
          >
            {topic.name}
          </a>
        ))}
      </div>

      {/* Enhanced Search and Filter Bar */}
      <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 border border-gray-200/50 shadow-2xl">
        <div className="flex flex-col lg:flex-row gap-6 items-center">
          {/* Enhanced Search Input with Suggestions */}
          <div className="relative flex-1 w-full lg:w-auto">
            <Popover open={isSearchOpen && searchSuggestions.length > 0} onOpenChange={setIsSearchOpen}>
              <PopoverTrigger asChild>
                <div className="relative group">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-500 transition-colors duration-200" />
                  <Input
                    type="text"
                    placeholder="Search problems by title or company..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setIsSearchOpen(true);
                    }}
                    onFocus={() => setIsSearchOpen(true)}
                    className="pl-12 pr-4 py-3 w-full bg-white border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 rounded-2xl text-base shadow-inner transition-all duration-200 hover:border-gray-300"
                  />
                  {searchQuery && (
                    <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  )}
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0 rounded-2xl border-2 shadow-xl" align="start">
                <Command>
                  <CommandList className="max-h-64">
                    <CommandEmpty>No problems found.</CommandEmpty>
                    <CommandGroup heading="Suggested Problems">
                      {searchSuggestions.map((suggestion) => (
                        <CommandItem
                          key={suggestion.id}
                          onSelect={() => handleSuggestionSelect(suggestion)}
                          className="cursor-pointer hover:bg-blue-50 rounded-xl m-1 p-3"
                        >
                          <div className="flex flex-col gap-1">
                            <span className="font-medium text-gray-900">{suggestion.title}</span>
                            <span className="text-xs text-gray-500">
                              {suggestion.companies.join(', ')} • {suggestion.difficulty}
                            </span>
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          {/* Enhanced Difficulty Filter */}
          <div className="flex gap-2 bg-gray-50 p-2 rounded-2xl">
            <Button
              variant={selectedDifficulty === '' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setSelectedDifficulty('')}
              className={`text-sm px-4 py-2 rounded-xl transition-all duration-200 ${
                selectedDifficulty === '' 
                  ? 'bg-blue-500 text-white shadow-lg hover:bg-blue-600' 
                  : 'hover:bg-white hover:shadow-md'
              }`}
            >
              All
            </Button>
            {difficulties.map((difficulty) => (
              <Button
                key={difficulty}
                variant={selectedDifficulty === difficulty ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSelectedDifficulty(difficulty === selectedDifficulty ? '' : difficulty)}
                className={`text-sm px-4 py-2 rounded-xl transition-all duration-200 ${
                  selectedDifficulty === difficulty
                    ? difficulty === 'Easy' 
                      ? 'bg-emerald-500 text-white shadow-lg hover:bg-emerald-600'
                      : difficulty === 'Medium'
                      ? 'bg-yellow-500 text-white shadow-lg hover:bg-yellow-600'
                      : 'bg-red-500 text-white shadow-lg hover:bg-red-600'
                    : 'hover:bg-white hover:shadow-md'
                }`}
              >
                {difficulty}
              </Button>
            ))}
          </div>

          {/* Enhanced View Mode Toggle */}
          <div className="flex gap-1 bg-gray-100 p-2 rounded-2xl border border-gray-200">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('grid')}
              className={`p-3 rounded-xl transition-all duration-200 ${
                viewMode === 'grid' 
                  ? 'bg-blue-500 text-white shadow-lg hover:bg-blue-600' 
                  : 'hover:bg-white hover:shadow-md'
              }`}
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('list')}
              className={`p-3 rounded-xl transition-all duration-200 ${
                viewMode === 'list' 
                  ? 'bg-blue-500 text-white shadow-lg hover:bg-blue-600' 
                  : 'hover:bg-white hover:shadow-md'
              }`}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Enhanced Active Filters */}
        {(debouncedSearchQuery || selectedDifficulty) && (
          <div className="flex flex-wrap gap-3 mt-6 pt-4 border-t border-gray-200">
            <span className="text-sm text-gray-600 font-medium">Active filters:</span>
            {debouncedSearchQuery && (
              <Badge className="bg-blue-100 text-blue-800 border-blue-200 px-3 py-1 rounded-full">
                Search: {debouncedSearchQuery}
              </Badge>
            )}
            {selectedDifficulty && (
              <Badge className={`px-3 py-1 rounded-full ${
                selectedDifficulty === 'Easy' 
                  ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                  : selectedDifficulty === 'Medium'
                  ? 'bg-yellow-100 text-yellow-800 border-yellow-200'
                  : 'bg-red-100 text-red-800 border-red-200'
              }`}>
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
