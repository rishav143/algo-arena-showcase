
import React, { useState, useMemo, useCallback } from 'react';
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
  onTopicChange?: (topicName: string) => void;
}

const SearchToolbar: React.FC<SearchToolbarProps> = React.memo(({
  problems,
  onFilteredProblems,
  currentTopic,
  topics,
  viewMode,
  onViewModeChange,
  onTopicChange
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const filteredProblems = useMemo(() => {
    let filtered = problems;

    if (debouncedSearchQuery) {
      const query = debouncedSearchQuery.toLowerCase();
      filtered = filtered.filter(problem =>
        problem.title.toLowerCase().includes(query) ||
        problem.companies.some(company => 
          company.toLowerCase().includes(query)
        )
      );
    }

    if (selectedDifficulty) {
      filtered = filtered.filter(problem => problem.difficulty === selectedDifficulty);
    }

    return filtered;
  }, [problems, debouncedSearchQuery, selectedDifficulty]);

  const searchSuggestions = useMemo(() => {
    if (!searchQuery || searchQuery.length < 2) return [];
    
    const query = searchQuery.toLowerCase();
    return problems.filter(problem =>
      problem.title.toLowerCase().includes(query) ||
      problem.companies.some(company => 
        company.toLowerCase().includes(query)
      )
    ).slice(0, 5);
  }, [problems, searchQuery]);

  React.useEffect(() => {
    onFilteredProblems(filteredProblems);
  }, [filteredProblems, onFilteredProblems]);

  const handleSuggestionSelect = useCallback((suggestion: Problem) => {
    setSearchQuery(suggestion.title);
    setIsSearchOpen(false);
  }, []);

  const handleDifficultyChange = useCallback((difficulty: string) => {
    setSelectedDifficulty(difficulty === selectedDifficulty ? '' : difficulty);
  }, [selectedDifficulty]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setIsSearchOpen(value.length >= 2);
  }, []);

  const handleSearchFocus = useCallback(() => {
    if (searchQuery.length >= 2) {
      setIsSearchOpen(true);
    }
  }, [searchQuery]);

  const handleSearchBlur = useCallback(() => {
    // Delay closing to allow suggestion clicks
    setTimeout(() => setIsSearchOpen(false), 200);
  }, []);

  const handleTopicClick = useCallback((topicName: string) => {
    if (onTopicChange) {
      onTopicChange(topicName);
      // Reset filters when topic changes
      setSearchQuery('');
      setSelectedDifficulty('');
    }
  }, [onTopicChange]);

  const difficulties = ['Easy', 'Medium', 'Hard'];

  return (
    <div className="mb-6 lg:mb-8 space-y-4 lg:space-y-6">
      {/* Topic Navigation - Improved Responsiveness */}
      <div className="overflow-x-auto pb-2">
        <div className="flex gap-2 lg:gap-3 justify-start lg:justify-center min-w-max lg:min-w-0 px-1">
          {topics.map((topic) => (
            <button
              key={topic.name}
              onClick={() => handleTopicClick(topic.name)}
              className={`px-3 sm:px-4 lg:px-6 py-2 lg:py-3 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 hover:scale-105 whitespace-nowrap flex-shrink-0 ${
                currentTopic === topic.name
                  ? `${topic.color} text-white shadow-lg transform scale-105`
                  : 'bg-white/90 text-gray-700 hover:bg-white border border-gray-200 shadow-md hover:shadow-lg'
              }`}
            >
              {topic.name}
            </button>
          ))}
        </div>
      </div>

      {/* Enhanced Search and Filter Bar - Better Mobile Layout */}
      <div className="bg-white/95 backdrop-blur-md rounded-2xl lg:rounded-3xl p-4 sm:p-6 border border-gray-200/50 shadow-2xl">
        <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:gap-6 lg:items-center">
          {/* Enhanced Search Input with Suggestions */}
          <div className="relative flex-1 w-full">
            <div className="relative group">
              <Search className="absolute left-3 lg:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 lg:w-5 lg:h-5 group-focus-within:text-blue-500 transition-colors duration-200 z-10" />
              <Input
                type="text"
                placeholder="Search problems by title or company..."
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={handleSearchFocus}
                onBlur={handleSearchBlur}
                className="pl-10 lg:pl-12 pr-4 py-2.5 lg:py-3 w-full bg-white border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 rounded-xl lg:rounded-2xl text-sm lg:text-base shadow-inner transition-all duration-200 hover:border-gray-300"
              />
              {searchQuery && searchSuggestions.length > 0 && (
                <ChevronDown className="absolute right-3 lg:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              )}
            </div>
            
            {/* Search Suggestions Dropdown */}
            {isSearchOpen && searchSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-gray-200 rounded-xl lg:rounded-2xl shadow-xl z-50">
                <div className="p-2">
                  <div className="text-xs text-gray-500 px-3 py-2 font-medium">Suggested Problems</div>
                  {searchSuggestions.map((suggestion) => (
                    <div
                      key={suggestion.id}
                      onClick={() => handleSuggestionSelect(suggestion)}
                      className="cursor-pointer hover:bg-blue-50 rounded-lg p-3 transition-colors"
                    >
                      <div className="flex flex-col gap-1">
                        <span className="font-medium text-gray-900 text-sm lg:text-base">{suggestion.title}</span>
                        <span className="text-xs text-gray-500">
                          {suggestion.companies.join(', ')} • {suggestion.difficulty}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Enhanced Difficulty Filter - Better Mobile Layout */}
          <div className="flex gap-1.5 lg:gap-2 bg-gray-50 p-1.5 lg:p-2 rounded-xl lg:rounded-2xl overflow-x-auto">
            <Button
              variant={selectedDifficulty === '' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setSelectedDifficulty('')}
              className={`text-xs lg:text-sm px-3 lg:px-4 py-1.5 lg:py-2 rounded-lg lg:rounded-xl transition-all duration-200 whitespace-nowrap ${
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
                onClick={() => handleDifficultyChange(difficulty)}
                className={`text-xs lg:text-sm px-3 lg:px-4 py-1.5 lg:py-2 rounded-lg lg:rounded-xl transition-all duration-200 whitespace-nowrap ${
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
          <div className="flex gap-1 bg-gray-100 p-1.5 lg:p-2 rounded-xl lg:rounded-2xl border border-gray-200 self-center lg:self-auto">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('grid')}
              className={`p-2 lg:p-3 rounded-lg lg:rounded-xl transition-all duration-200 ${
                viewMode === 'grid' 
                  ? 'bg-blue-500 text-white shadow-lg hover:bg-blue-600' 
                  : 'hover:bg-white hover:shadow-md'
              }`}
            >
              <Grid className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('list')}
              className={`p-2 lg:p-3 rounded-lg lg:rounded-xl transition-all duration-200 ${
                viewMode === 'list' 
                  ? 'bg-blue-500 text-white shadow-lg hover:bg-blue-600' 
                  : 'hover:bg-white hover:shadow-md'
              }`}
            >
              <List className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
            </Button>
          </div>
        </div>

        {/* Enhanced Active Filters - Better Mobile Layout */}
        {(debouncedSearchQuery || selectedDifficulty) && (
          <div className="flex flex-wrap gap-2 lg:gap-3 mt-4 lg:mt-6 pt-3 lg:pt-4 border-t border-gray-200">
            <span className="text-xs lg:text-sm text-gray-600 font-medium">Active filters:</span>
            {debouncedSearchQuery && (
              <Badge className="bg-blue-100 text-blue-800 border-blue-200 px-2 lg:px-3 py-0.5 lg:py-1 rounded-full text-xs">
                Search: {debouncedSearchQuery}
              </Badge>
            )}
            {selectedDifficulty && (
              <Badge className={`px-2 lg:px-3 py-0.5 lg:py-1 rounded-full text-xs ${
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
});

SearchToolbar.displayName = 'SearchToolbar';

export default SearchToolbar;
