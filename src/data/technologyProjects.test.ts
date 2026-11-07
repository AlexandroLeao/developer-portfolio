import { describe, expect, it } from 'vitest'
import { projects } from './projects'
import { findProjectsForTechnology } from './technologyProjects'

const ids = (technologyId: string, name: string) =>
  findProjectsForTechnology(technologyId, name, projects).map((project) => project.id)

describe('findProjectsForTechnology', () => {
  it('matches explicit project technology stacks', () => {
    expect(ids('react', 'React')).toEqual([
      'adventure-files',
      'ideas-organizer',
      'natsu-matsuri',
    ])
    expect(ids('typescript', 'TypeScript')).toEqual([
      'adventure-files',
      'ideas-organizer',
    ])
    expect(ids('postgresql', 'PostgreSQL')).toEqual(['adventure-files'])
  })

  it('matches documented aliases and development practices', () => {
    expect(ids('tanstack', 'TanStack')).toEqual(['ideas-organizer'])
    expect(ids('rest', 'APIs REST')).toEqual(['adventure-files'])
    expect(ids('cicd', 'CI/CD')).toEqual(['adventure-files', 'ideas-organizer'])
    expect(ids('qa', 'QA')).toEqual(['adventure-files', 'ideas-organizer'])
    expect(ids('github', 'GitHub')).toHaveLength(3)
  })

  it('does not invent associations for topics not documented in projects', () => {
    expect(ids('java', 'Java')).toEqual([])
    expect(ids('aws', 'AWS')).toEqual([])
    expect(ids('llms', 'LLMs')).toEqual([])
  })
})
