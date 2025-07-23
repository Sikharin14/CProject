import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import QuizCard from './QuizCard';
import { mockApi } from '../../utils/mockApi';

const ListContainer = styled.div`
  width: 100%;
`;

const FilterSection = styled.div`
  background-color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.borderRadius.lg};
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
  transition: border-color ${props => props.theme.transitions.fast};

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
  transition: border-color ${props => props.theme.transitions.fast};

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

const QuizGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${props => props.theme.spacing.xl};

  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: repeat(3, 1fr);
  }
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
    margin-bottom: 0;
  }
`;

const QuizList = ({ searchQuery = '', categoryFilter = 'all', difficultyFilter = 'all' }) => {
  const [quizzes, setQuizzes] = useState([]);
  const [filteredQuizzes, setFilteredQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(searchQuery);
  const [category, setCategory] = useState(categoryFilter);
  const [difficulty, setDifficulty] = useState(difficultyFilter);
  const [sortBy, setSortBy] = useState('title');

  // Move filterAndSortQuizzes above its usage and use the full logic
  const filterAndSortQuizzes = useCallback(() => {
    let filtered = [...quizzes];

    // Apply search filter
    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(quiz =>
        quiz.title.toLowerCase().includes(search) ||
        quiz.description.toLowerCase().includes(search) ||
        quiz.category.toLowerCase().includes(search)
      );
    }

    // Apply category filter
    if (category !== 'all') {
      filtered = filtered.filter(quiz =>
        quiz.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Apply difficulty filter
    if (difficulty !== 'all') {
      filtered = filtered.filter(quiz =>
        quiz.difficulty.toLowerCase() === difficulty.toLowerCase()
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'difficulty':
          const difficultyOrder = { 'Beginner': 1, 'Intermediate': 2, 'Advanced': 3 };
          return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
        case 'questions':
          return b.questionCount - a.questionCount;
        case 'duration':
          return a.timeLimit - b.timeLimit;
        default:
          return 0;
      }
    });

    setFilteredQuizzes(filtered);
  }, [quizzes, searchTerm, category, difficulty, sortBy]);

  useEffect(() => {
    loadQuizzes();
  }, []);

  useEffect(() => {
    filterAndSortQuizzes();
  }, [filterAndSortQuizzes]);

  const loadQuizzes = async () => {
    try {
      setLoading(true);
      const response = await mockApi.getQuizzes();
      setQuizzes(response.data);
    } catch (error) {
      console.error('Error loading quizzes:', error);
    } finally {
      setLoading(false);
    }
  };

  const getUniqueCategories = () => {
    const categories = [...new Set(quizzes.map(quiz => quiz.category))];
    return categories.sort();
  };

  if (loading) {
    return (
      <LoadingState>
        <div className="loading"></div>
        <span style={{ marginLeft: '1rem' }}>Loading quizzes...</span>
      </LoadingState>
    );
  }

  return (
    <ListContainer>
      <FilterSection>
        <FilterHeader>Find Your Perfect Quiz</FilterHeader>
        <FilterControls>
          <SearchInput
            type="text"
            placeholder="Search quizzes by title, description, or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          <SelectInput
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            {getUniqueCategories().map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </SelectInput>
          
          <SelectInput
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="all">All Levels</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </SelectInput>
        </FilterControls>
      </FilterSection>

      <ResultsHeader>
        <ResultsCount>
          {filteredQuizzes.length} quiz{filteredQuizzes.length !== 1 ? 'es' : ''} found
        </ResultsCount>
        
        <SortSelect
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="title">Sort by Title</option>
          <option value="difficulty">Sort by Difficulty</option>
          <option value="questions">Sort by Question Count</option>
          <option value="duration">Sort by Duration</option>
        </SortSelect>
      </ResultsHeader>

      {filteredQuizzes.length === 0 ? (
        <EmptyState>
          <h3>No quizzes found</h3>
          <p>
            Try adjusting your search criteria or browse all available quizzes.
          </p>
        </EmptyState>
      ) : (
        <QuizGrid>
          {filteredQuizzes.map(quiz => (
            <QuizCard key={quiz.id} quiz={quiz} />
          ))}
        </QuizGrid>
      )}
    </ListContainer>
  );
};

export default QuizList;