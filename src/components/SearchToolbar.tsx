
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
    <div className="w-full max-w-6xl mx-auto px-4 mb-8 space-y-6">
      {/* Topic Navigation */}
      <div className="flex flex-wrap gap-3 justify-center">
        {topics.map((topic) => (
          <button
            key={topic.name}
            onClick={() => handleTopicClick(topic.name)}
            className={`
              px-6 py-3 rounded-full text-sm font-semibold transition-all duration-200
              ${currentTopic === topic.name
                ? `${topic.color} text-white shadow-lg`
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }
            `}
          >
            {topic.name}
          </button>
        ))}
      </div>

      {/* Search and Filter Card */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center">
          {/* Search Input */}
          <div className="relative flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search problems by title or company..."
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={handleSearchFocus}
                onBlur={handleSearchBlur}
                className="pl-10 pr-4 py-3 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
              />
            </div>
            
            {/* Search Suggestions */}
            {isSearchOpen && searchSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                {searchSuggestions.map((suggestion) => (
                  <div
                    key={suggestion.id}
                    onClick={() => handleSuggestionSelect(suggestion)}
                    className="cursor-pointer hover:bg-gray-50 p-3 border-b border-gray-100 last:border-b-0"
                  >
                    <div className="font-medium text-gray-900">{suggestion.title}</div>
                    <div className="text-sm text-gray-500">
                      {suggestion.companies.join(', ')} • {suggestion.difficulty}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Difficulty Filter */}
            <div className="flex gap-2">
              <Button
                variant={selectedDifficulty === '' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedDifficulty('')}
              >
                All
              </Button>
              {difficulties.map((difficulty) => (
                <Button
                  key={difficulty}
                  variant={selectedDifficulty === difficulty ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleDifficultyChange(difficulty)}
                  className={
                    selectedDifficulty === difficulty
                      ? difficulty === 'Easy' 
                        ? 'bg-green-500 hover:bg-green-600'
                        : difficulty === 'Medium'
                        ? 'bg-yellow-500 hover:bg-yellow-600'
                        : 'bg-red-500 hover:bg-red-600'
                      : ''
                  }
                >
                  {difficulty}
                </Button>
              ))}
            </div>

            {/* View Mode Toggle */}
            <div className="flex gap-1 border border-gray-300 rounded-lg p-1">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => onViewModeChange('grid')}
                className="p-2"
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => onViewModeChange('list')}
                className="p-2"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Active Filters */}
        {(debouncedSearchQuery || selectedDifficulty) && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm text-gray-600">Active filters:</span>
              {debouncedSearchQuery && (
                <Badge variant="secondary">
                  Search: {debouncedSearchQuery}
                </Badge>
              )}
              {selectedDifficulty && (
                <Badge variant="secondary">
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
