import { describe, expect, it } from 'vitest'
import { ongoingEducation } from './certifications'
import { projects } from './projects'

describe('portfolio content integrity', () => {
  it('uses the official Itaú Java bootcamp name in both languages', () => {
    const bootcamp = ongoingEducation.find((education) => education.id === 'java-bootcamp')

    expect(bootcamp).toBeDefined()
    expect(bootcamp?.title.pt).toBe('Bootcamp Itaú | Java com Inteligência Artificial')
    expect(bootcamp?.title.en).toBe('Bootcamp Itaú | Java com Inteligência Artificial')
    expect(bootcamp?.status).toBe('in-progress')
  })

  it('uses canonical Natsu Matsuri repository and live URLs', () => {
    const natsu = projects.find((project) => project.id === 'natsu-matsuri')

    expect(natsu).toBeDefined()
    expect(natsu?.githubUrl).toBe('https://github.com/AlexandroLeao/natsu-matsuri-project')
    expect(natsu?.liveUrl).toBe('https://alexandroleao.github.io/natsu-matsuri-project/')
  })
})
