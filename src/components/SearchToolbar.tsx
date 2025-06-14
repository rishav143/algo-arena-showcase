import React, { useState, useMemo, useCallback } from 'react';
import { Search, Filter, Grid, List, ChevronDown } from 'lucide-react';
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
    setTimeout(() => setIsSearchOpen(false), 200);
  }, []);

  const handleTopicClick = useCallback((topicName: string) => {
    if (onTopicChange) {
      onTopicChange(topicName);
      setSearchQuery('');
      setSelectedDifficulty('');
    }
  }, [onTopicChange]);

  const difficulties = ['Easy', 'Medium', 'Hard'];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 lg:mb-8 space-y-4 lg:space-y-6">
      {/* Enhanced Topic Navigation with Better Mobile Experience */}
      <div className="w-full">
        <div className="flex overflow-x-auto pb-3 sm:pb-4 scrollbar-hide">
          <div className="flex gap-2 sm:gap-3 lg:gap-4 justify-start lg:justify-center min-w-max lg:min-w-0 mx-auto">
            {topics.map((topic) => (
              <button
                key={topic.name}
                onClick={() => handleTopicClick(topic.name)}
                className={`
                  px-4 sm:px-5 lg:px-8 py-2.5 sm:py-3 lg:py-4 
                  rounded-full text-sm sm:text-base lg:text-lg font-semibold 
                  transition-all duration-300 hover:scale-105 
                  whitespace-nowrap flex-shrink-0 
                  shadow-lg hover:shadow-xl
                  ${currentTopic === topic.name
                    ? `${topic.color} text-white transform scale-105 shadow-2xl`
                    : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-300'
                  }
                `}
              >
                {topic.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Search and Filter Card */}
      <div className="bg-white rounded-2xl lg:rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Main Search and Filter Row */}
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 lg:items-center">
            {/* Enhanced Search Input */}
            <div className="relative flex-1 order-1 lg:order-1">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 lg:w-6 lg:h-6 group-focus-within:text-blue-500 transition-colors duration-300 z-10" />
                <Input
                  type="text"
                  placeholder="Search problems by title or company..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={handleSearchFocus}
                  onBlur={handleSearchBlur}
                  className="pl-12 lg:pl-14 pr-4 py-3 lg:py-4 w-full bg-gray-50 border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 rounded-xl lg:rounded-2xl text-base lg:text-lg font-medium shadow-inner transition-all duration-300 hover:border-gray-300 focus:bg-white"
                />
                {searchQuery && (
                  <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                )}
              </div>
              
              {/* Search Suggestions */}
              {isSearchOpen && searchSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-gray-200 rounded-xl lg:rounded-2xl shadow-2xl z-50 max-h-80 overflow-y-auto">
                  <div className="p-3">
                    <div className="text-sm text-gray-500 px-3 py-2 font-semibold">Suggested Problems</div>
                    {searchSuggestions.map((suggestion) => (
                      <div
                        key={suggestion.id}
                        onClick={() => handleSuggestionSelect(suggestion)}
                        className="cursor-pointer hover:bg-blue-50 rounded-lg p-3 transition-all duration-200 hover:shadow-md"
                      >
                        <div className="flex flex-col gap-1">
                          <span className="font-semibold text-gray-900 text-base">{suggestion.title}</span>
                          <span className="text-sm text-gray-500">
                            {suggestion.companies.join(', ')} • {suggestion.difficulty}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Enhanced Filters Row */}
            <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 order-2 lg:order-2">
              {/* Difficulty Filter */}
              <div className="flex gap-2 bg-gray-50 p-2 rounded-xl lg:rounded-2xl border border-gray-200 overflow-x-auto">
                <Button
                  variant={selectedDifficulty === '' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setSelectedDifficulty('')}
                  className={`text-sm lg:text-base px-4 lg:px-6 py-2 lg:py-3 rounded-lg lg:rounded-xl font-semibold transition-all duration-200 whitespace-nowrap ${
                    selectedDifficulty === '' 
                      ? 'bg-blue-500 text-white shadow-lg hover:bg-blue-600 hover:shadow-xl' 
                      : 'hover:bg-white hover:shadow-md text-gray-700'
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
                    className={`text-sm lg:text-base px-4 lg:px-6 py-2 lg:py-3 rounded-lg lg:rounded-xl font-semibold transition-all duration-200 whitespace-nowrap ${
                      selectedDifficulty === difficulty
                        ? difficulty === 'Easy' 
                          ? 'bg-emerald-500 text-white shadow-lg hover:bg-emerald-600 hover:shadow-xl'
                          : difficulty === 'Medium'
                          ? 'bg-yellow-500 text-white shadow-lg hover:bg-yellow-600 hover:shadow-xl'
                          : 'bg-red-500 text-white shadow-lg hover:bg-red-600 hover:shadow-xl'
                        : 'hover:bg-white hover:shadow-md text-gray-700'
                    }`}
                  >
                    {difficulty}
                  </Button>
                ))}
              </div>

              {/* View Mode Toggle */}
              <div className="flex gap-1 bg-gray-100 p-2 rounded-xl lg:rounded-2xl border-2 border-gray-200 self-start sm:self-center">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => onViewModeChange('grid')}
                  className={`p-3 lg:p-4 rounded-lg lg:rounded-xl transition-all duration-200 ${
                    viewMode === 'grid' 
                      ? 'bg-blue-500 text-white shadow-lg hover:bg-blue-600 hover:shadow-xl' 
                      : 'hover:bg-white hover:shadow-md text-gray-600'
                  }`}
                >
                  <Grid className="w-4 h-4 lg:w-5 lg:h-5" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => onViewModeChange('list')}
                  className={`p-3 lg:p-4 rounded-lg lg:rounded-xl transition-all duration-200 ${
                    viewMode === 'list' 
                      ? 'bg-blue-500 text-white shadow-lg hover:bg-blue-600 hover:shadow-xl' 
                      : 'hover:bg-white hover:shadow-md text-gray-600'
                  }`}
                >
                  <List className="w-4 h-4 lg:w-5 lg:h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Active Filters */}
        {(debouncedSearchQuery || selectedDifficulty) && (
          <div className="bg-gray-50 border-t border-gray-200 px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-wrap gap-2 lg:gap-3 items-center">
              <span className="text-sm lg:text-base text-gray-600 font-semibold">Active filters:</span>
              {debouncedSearchQuery && (
                <Badge className="bg-blue-100 text-blue-800 border-blue-200 px-3 py-1 rounded-full text-sm font-medium">
                  Search: {debouncedSearchQuery}
                </Badge>
              )}
              {selectedDifficulty && (
                <Badge className={`px-3 py-1 rounded-full text-sm font-medium ${
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
          </div>
        )}
      </div>
    </div>
  );
});

SearchToolbar.displayName = 'SearchToolbar';

export default SearchToolbar;
