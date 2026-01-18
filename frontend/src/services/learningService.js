const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

/**
 * Build query string from filters object
 */
const buildQueryString = (filters = {}) => {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      params.append(key, value);
    }
  });
  const queryString = params.toString();
  return queryString ? `?${queryString}` : '';
};

/**
 * Fetch helper with error handling
 */
const fetchData = async (url) => {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || data.detail || 'Failed to fetch data');
  }

  return data;
};

/**
 * Learning Service
 * API service for fetching learning content (rules, techniques, sections, topics)
 */
export const learningService = {
  /**
   * Get all rules with optional filters
   * @param {Object} filters - { sport, difficulty_level, category, is_legal, is_myth }
   * @returns {Promise} - List of rules
   */
  getRules: async (filters = {}) => {
    const queryString = buildQueryString(filters);
    return fetchData(`${API_BASE_URL}/learn/rules/${queryString}`);
  },

  /**
   * Get a single rule by rule_id
   * @param {string} ruleId - The rule_id
   * @returns {Promise} - Rule details
   */
  getRuleDetail: async (ruleId) => {
    return fetchData(`${API_BASE_URL}/learn/rules/${ruleId}/`);
  },

  /**
   * Get all techniques with optional filters
   * @param {Object} filters - { sport, skill_type, difficulty_level }
   * @returns {Promise} - List of techniques
   */
  getTechniques: async (filters = {}) => {
    const queryString = buildQueryString(filters);
    return fetchData(`${API_BASE_URL}/learn/techniques/${queryString}`);
  },

  /**
   * Get a single technique by technique_id
   * @param {string} techniqueId - The technique_id
   * @returns {Promise} - Technique details
   */
  getTechniqueDetail: async (techniqueId) => {
    return fetchData(`${API_BASE_URL}/learn/techniques/${techniqueId}/`);
  },

  /**
   * Get all learning sections with nested topics
   * @returns {Promise} - List of sections with topics
   */
  getLearnSections: async () => {
    return fetchData(`${API_BASE_URL}/learn/sections/`);
  },

  /**
   * Get a single learning section by section_id
   * @param {string} sectionId - The section_id
   * @returns {Promise} - Section details with topics
   */
  getSectionDetail: async (sectionId) => {
    return fetchData(`${API_BASE_URL}/learn/sections/${sectionId}/`);
  },

  /**
   * Get all learning topics with optional filters
   * @param {Object} filters - { section }
   * @returns {Promise} - List of topics
   */
  getTopics: async (filters = {}) => {
    const queryString = buildQueryString(filters);
    return fetchData(`${API_BASE_URL}/learn/topics/${queryString}`);
  },

  /**
   * Get a single learning topic by topic_id
   * @param {string} topicId - The topic_id
   * @returns {Promise} - Topic details
   */
  getTopicDetail: async (topicId) => {
    return fetchData(`${API_BASE_URL}/learn/topics/${topicId}/`);
  },

  /**
   * Get all sports
   * @returns {Promise} - List of sports
   */
  getSports: async () => {
    return fetchData(`${API_BASE_URL}/learn/sports/`);
  },
};

export default learningService;
