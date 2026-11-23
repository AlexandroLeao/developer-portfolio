import { describe, expect, it } from 'vitest'
import { projects } from './projects'
import { findProjectsForTechnology } from './technologyProjects'

const ids = (technologyId: string, name: string) =>
  findProjectsForTechnology(technologyId, name, projects).map((project) => project.id)

describe('findProjectsForTechnology', () => {
  it('matches explicit project technology stacks', () => {
    expect(ids('react', 'React')).toEqual([
      'ami-108',
      'adventure-files',
      'ideas-organizer',
      'natsu-matsuri',
    ])
    expect(ids('typescript', 'TypeScript')).toEqual([
      'ami-108',
      'adventure-files',
      'ideas-organizer',
    ])
    expect(ids('postgresql', 'PostgreSQL')).toEqual(['ami-108', 'adventure-files'])
  })

  it('matches documented aliases and development practices', () => {
    expect(ids('tanstack', 'TanStack')).toEqual(['ideas-organizer'])
    expect(ids('rest', 'APIs REST')).toEqual(['ami-108', 'adventure-files'])
    expect(ids('cicd', 'CI/CD')).toEqual(['ami-108', 'adventure-files', 'ideas-organizer'])
    expect(ids('qa', 'QA')).toEqual(['ami-108', 'adventure-files', 'ideas-organizer'])
    expect(ids('github', 'GitHub')).toHaveLength(4)
  })

  it('links verified RPG tooling and preserves the audited chart counts', () => {
    expect(ids('docker', 'Docker')).toEqual(['ami-108', 'adventure-files'])
    expect(ids('openapi', 'OpenAPI')).toEqual(['ami-108', 'adventure-files'])
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

  it('links the verified AMI-108 frameworks, providers and quality tools', () => {
    for (const [id, name] of [
      ['nextjs', 'Next.js'], ['nestjs', 'NestJS'], ['prisma', 'Prisma'],
      ['python', 'Python'], ['fastapi', 'FastAPI'], ['groq', 'Groq'],
      ['vercel', 'Vercel'], ['jest', 'Jest'], ['pytest', 'Pytest'],
      ['nodejs', 'Node.js'], ['vitest', 'Vitest'],
      ['generative-ai', 'IA Generativa'], ['applied-ai', 'IA Aplicada'],
    ]) {
      expect(ids(id, name), `${name} should link to AMI-108`).toContain('ami-108')
    }
    expect(ids('vercel', 'Vercel')).toEqual(['ami-108'])
    expect(ids('jest', 'Jest')).toEqual(['ami-108'])
    expect(ids('pytest', 'Pytest')).toEqual(['ami-108'])
  })

  it('does not invent associations for topics not documented in projects', () => {
    expect(ids('java', 'Java')).toEqual([])
    expect(ids('aws', 'AWS')).toEqual([])
    expect(ids('llms', 'LLMs')).toEqual(['ami-108'])
    expect(ids('ai-agents', 'Agentes de IA')).toEqual([])
  })
})
