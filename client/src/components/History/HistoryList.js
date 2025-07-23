import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import HistoryItem from './HistoryItem';
import { mockApi } from '../../utils/mockApi';
import { calculateAverageScore, calculateTotalTime } from '../../utils/helpers';

const HistoryContainer = styled.div`
  width: 100%;
`;

const StatsOverview = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const StatCard = styled.div`
  background-color: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.lg};
  box-shadow: ${props => props.theme.shadows.md};
  text-align: center;
  transition: transform ${props => props.theme.transitions.fast};

  &:hover {
    transform: translateY(-2px);
  }
`;

const StatIcon = styled.div`
  font-size: ${props => props.theme.typography.fontSize['2xl']};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const StatValue = styled.div`
  font-size: ${props => props.theme.typography.fontSize['2xl']};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const StatLabel = styled.div`
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.typography.fontSize.sm};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const FilterSection = styled.div`
  background-color: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.lg};
  box-shadow: ${props => props.theme.shadows.sm};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const FilterHeader = styled.h3`
  font-size: ${props => props.theme.typography.fontSize.lg};
  color: ${props => props.theme.colors.textPrimary};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const FilterControls = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${props => props.theme.spacing.md};

  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: 2fr 1fr 1fr;
  }
`;

const SearchInput = styled.input`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border: 1px solid ${props => props.theme.colors.gray300};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.typography.fontSize.base};

  &:focus {
    border-color: ${props => props.theme.colors.primary};
    outline: none;
  }

  &::placeholder {
    color: ${props => props.theme.colors.gray500};
  }
`;

const SelectInput = styled.select`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border: 1px solid ${props => props.theme.colors.gray300};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.typography.fontSize.base};
  background-color: white;
  cursor: pointer;

  &:focus {
    border-color: ${props => props.theme.colors.primary};
    outline: none;
  }
`;

const ResultsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${props => props.theme.spacing.lg};
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing.md};
`;

const ResultsCount = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.typography.fontSize.sm};
  margin: 0;
`;

const SortSelect = styled(SelectInput)`
  min-width: 200px;
`;

const HistoryGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.lg};
`;

const LoadingState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${props => props.theme.spacing['3xl']};
  color: ${props => props.theme.colors.textSecondary};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing['3xl']};
  background-color: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.sm};

  h3 {
    color: ${props => props.theme.colors.textPrimary};
    margin-bottom: ${props => props.theme.spacing.md};
  }

  p {
    color: ${props => props.theme.colors.textSecondary};
    margin-bottom: ${props => props.theme.spacing.lg};
  }
`;

const StartQuizButton = styled.button`
  background-color: ${props => props.theme.colors.primary};
  color: white;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.md};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  transition: background-color ${props => props.theme.transitions.fast};

  &:hover {
    background-color: ${props => props.theme.colors.primaryDark};
  }
`;

const HistoryList = ({ userId = 1 }) => {
  const [attempts, setAttempts] = useState([]);
  const [filteredAttempts, setFilteredAttempts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const loadUserHistory = useCallback(async () => {
    try {
      setLoading(true);
      const response = await mockApi.getUserAttempts(userId);
      setAttempts(response.data);
    } catch (error) {
      console.error('Error loading user history:', error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const filterAndSortAttempts = useCallback(() => {
    let filtered = [...attempts];

    // Apply search filter
    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(attempt =>
        attempt.quiz?.title.toLowerCase().includes(search) ||
        attempt.quiz?.category.toLowerCase().includes(search)
      );
    }

    // Apply category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(attempt =>
        attempt.quiz?.category.toLowerCase() === categoryFilter.toLowerCase()
      );
    }

    // Apply date filter
    if (startDate) {
      filtered = filtered.filter(attempt => {
        const attemptDate = new Date(attempt.completedAt);
        return attemptDate >= new Date(startDate);
      });
    }
    if (endDate) {
      filtered = filtered.filter(attempt => {
        const attemptDate = new Date(attempt.completedAt);
        // Add 1 day to endDate to include the end date itself
        const end = new Date(endDate);
        end.setHours(23,59,59,999);
        return attemptDate <= end;
      });
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'recent':
          return new Date(b.completedAt) - new Date(a.completedAt);
        case 'oldest':
          return new Date(a.completedAt) - new Date(b.completedAt);
        case 'score-high':
          return b.score - a.score;
        case 'score-low':
          return a.score - b.score;
        case 'title':
          return (a.quiz?.title || '').localeCompare(b.quiz?.title || '');
        default:
          return 0;
      }
    });

    setFilteredAttempts(filtered);
  }, [attempts, searchTerm, categoryFilter, sortBy, startDate, endDate]);

  useEffect(() => {
    loadUserHistory();
  }, [loadUserHistory]);

  useEffect(() => {
    filterAndSortAttempts();
  }, [filterAndSortAttempts]);

  const getUniqueCategories = () => {
    const categories = [...new Set(attempts.map(attempt => attempt.quiz?.category).filter(Boolean))];
    return categories.sort();
  };

  const getStatsData = () => {
    if (attempts.length === 0) {
      return {
        totalQuizzes: 0,
        averageScore: 0,
        totalTime: 0,
        bestScore: 0
      };
    }

    return {
      totalQuizzes: attempts.length,
      averageScore: calculateAverageScore(attempts),
      totalTime: calculateTotalTime(attempts),
      bestScore: Math.max(...attempts.map(a => a.score))
    };
  };

  const formatTotalTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  if (loading) {
    return (
      <LoadingState>
        <div className="loading"></div>
        <span style={{ marginLeft: '1rem' }}>Loading your quiz history...</span>
      </LoadingState>
    );
  }

  const stats = getStatsData();

  if (attempts.length === 0) {
    return (
      <HistoryContainer>
        <EmptyState>
          <h3>No Quiz History Yet</h3>
          <p>
            You haven't taken any quizzes yet. Start your learning journey by taking your first quiz!
          </p>
          <StartQuizButton onClick={() => window.location.href = '/quizzes'}>
            Browse Quizzes
          </StartQuizButton>
        </EmptyState>
      </HistoryContainer>
    );
  }

  return (
    <HistoryContainer>
      <StatsOverview>
        <StatCard>
          <StatIcon>📚</StatIcon>
          <StatValue>{stats.totalQuizzes}</StatValue>
          <StatLabel>Quizzes Taken</StatLabel>
        </StatCard>
        <StatCard>
          <StatIcon>📊</StatIcon>
          <StatValue>{stats.averageScore}%</StatValue>
          <StatLabel>Average Score</StatLabel>
        </StatCard>
        <StatCard>
          <StatIcon>🏆</StatIcon>
          <StatValue>{stats.bestScore}%</StatValue>
          <StatLabel>Best Score</StatLabel>
        </StatCard>
        <StatCard>
          <StatIcon>⏱️</StatIcon>
          <StatValue>{formatTotalTime(stats.totalTime)}</StatValue>
          <StatLabel>Total Time</StatLabel>
        </StatCard>
      </StatsOverview>

      <FilterSection>
        <FilterHeader>Filter Your History</FilterHeader>
        <FilterControls>
          <SearchInput
            type="text"
            placeholder="Search by quiz title or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <SelectInput
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">All Categories</option>
            {getUniqueCategories().map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </SelectInput>

          <SortSelect
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="recent">Most Recent</option>
            <option value="oldest">Oldest First</option>
            <option value="score-high">Highest Score</option>
            <option value="score-low">Lowest Score</option>
            <option value="title">Quiz Title</option>
          </SortSelect>

          {/* Date filter controls */}
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '1rem' }}>
            <label>
              Start Date:
              <input
                type="date"
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
                style={{ marginLeft: '0.5rem' }}
              />
            </label>
            <label>
              End Date:
              <input
                type="date"
                value={endDate}
                onChange={e => setEndDate(e.target.value)}
                style={{ marginLeft: '0.5rem' }}
              />
            </label>
          </div>
        </FilterControls>
      </FilterSection>

      <ResultsHeader>
        <ResultsCount>
          {filteredAttempts.length} attempt{filteredAttempts.length !== 1 ? 's' : ''} found
        </ResultsCount>
      </ResultsHeader>

      {filteredAttempts.length === 0 ? (
        <EmptyState>
          <h3>No Results Found</h3>
          <p>
            Try adjusting your search criteria or browse your complete history.
          </p>
        </EmptyState>
      ) : (
        <HistoryGrid>
          {filteredAttempts.map(attempt => (
            <HistoryItem 
              key={attempt.id} 
              attempt={attempt}
              onViewDetails={(attempt) => {
                // Navigate to results page with attempt data
                window.location.href = `/results?attempt=${attempt.id}`;
              }}
            />
          ))}
        </HistoryGrid>
      )}
    </HistoryContainer>
  );
};

export default HistoryList;