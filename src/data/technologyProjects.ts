import type { Project } from './projects'

export function findProjectsForTechnology(
  technologyId: string,
  technologyName: string,
  portfolioProjects: Project[],
): Project[] {
  return portfolioProjects.filter((project) => {
    if (project.technologies.includes(technologyName)) return true

    switch (technologyId) {
      case 'tanstack':
        return project.technologies.some((technology) => technology.startsWith('TanStack '))
      case 'rest':
        return /API REST/i.test(project.details.architecture.pt)
      case 'cicd':
        return /integração contínua/i.test(project.details.practices.pt)
      case 'qa':
        return /testes automatizados/i.test(project.details.practices.pt)
      case 'git':
        return /controle de versão|\bGit\b/i.test(project.details.practices.pt)
      case 'github':
        return project.githubUrl.startsWith('https://github.com/')
      default:
        return false
    }
  })
}
