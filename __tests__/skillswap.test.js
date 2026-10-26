// Unit tests for Skill Swap functions

const { filterSkillsByCategory, calculateTotalCost } = require('../skillswap-functions');

const skills = [
  { title: 'Python Tutoring', category: 'Programming', price: 20 },
  { title: 'Guitar Lessons', category: 'Music', price: 15 },
  { title: 'Resume Review', category: 'Career', price: 0 },
  { title: 'Web Development', category: 'Programming', price: 25 }
];

describe('filterSkillsByCategory', () => {
  test('filters skills by category', () => {
    const result = filterSkillsByCategory(skills, 'Programming');
    expect(result).toEqual([
      { title: 'Python Tutoring', category: 'Programming', price: 20 },
      { title: 'Web Development', category: 'Programming', price: 25 }
    ]);
  });

  test('returns all skills when category is "All"', () => {
    const result = filterSkillsByCategory(skills, 'All');
    expect(result).toEqual(skills);
  });

  test('returns an empty array when no skills match', () => {
    const result = filterSkillsByCategory(skills, 'Cooking');
    expect(result).toEqual([]);
  });
});

describe('calculateTotalCost', () => {
  test('returns the correct total for different rates and hours', () => {
    expect(calculateTotalCost(20, 2)).toBe(40);
    expect(calculateTotalCost(15, 3)).toBe(45);
  });

  test('handles free sessions and zero hours', () => {
    expect(calculateTotalCost(0, 3)).toBe(0);
    expect(calculateTotalCost(20, 0)).toBe(0);
  });

  test('returns the correct total for decimal hours', () => {
    expect(calculateTotalCost(25, 1.5)).toBe(37.5);
  });
});