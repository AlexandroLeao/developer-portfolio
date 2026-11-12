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

  it('links verified RPG tooling and preserves the audited chart counts', () => {
    expect(ids('docker', 'Docker')).toEqual(['adventure-files'])
    expect(ids('openapi', 'OpenAPI')).toEqual(['adventure-files'])
    expect(ids('playwright', 'Playwright')).toEqual(['adventure-files'])
    expect(ids('nginx', 'Nginx')).toEqual([])
    const rpg = projects.find((project) => project.id === 'adventure-files')!
    expect(rpg.stackFileCounts).toEqual({
      React: 18, TypeScript: 35, 'Node.js': 7, Express: 5,
      PostgreSQL: 2, Supabase: 7, Docker: 4, OpenAPI: 2, Playwright: 5,
    })
    expect(rpg.details.practices.pt).toContain('358 verificações aprovadas')
    expect(rpg.details.practices.en).toContain('358 passing checks')
    expect(rpg.details.architecture.en).toContain('local API Docker')
  })

  it('does not invent associations for topics not documented in projects', () => {
    expect(ids('java', 'Java')).toEqual([])
    expect(ids('aws', 'AWS')).toEqual([])
    expect(ids('llms', 'LLMs')).toEqual([])
  })
})
