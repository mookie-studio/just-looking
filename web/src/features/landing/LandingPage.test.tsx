import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryRouter, RouterProvider } from 'react-router'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { LandingPage } from './LandingPage'
import { LANDING_LANGUAGE_KEY } from './landing-language'

function renderLanding() {
  const router = createMemoryRouter([{ path: '/', Component: LandingPage }], { initialEntries: ['/'] })
  return render(<RouterProvider router={router} />)
}

describe('LandingPage', () => {
  let languages: readonly string[] = ['en-US']

  beforeEach(() => {
    window.localStorage.removeItem(LANDING_LANGUAGE_KEY)
    vi.spyOn(navigator, 'languages', 'get').mockImplementation(() => languages)
  })

  afterEach(() => {
    vi.restoreAllMocks()
    languages = ['en-US']
  })

  it('shows the headline and a Try the demo link to the forja-hardware demo', () => {
    renderLanding()

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Let them look at everything they want.')
    const tryDemo = screen.getAllByRole('link', { name: 'Try the demo' })
    expect(tryDemo).toHaveLength(2)
    tryDemo.forEach((link) => expect(link).toHaveAttribute('href', '/forja-hardware'))
    expect(screen.getByText('3 example shops · no sign-up')).toBeInTheDocument()
  })

  it('links each of the three tags to its demo catalog', () => {
    renderLanding()

    expect(screen.getByRole('link', { name: 'Open the Forja · hardware demo' })).toHaveAttribute('href', '/forja-hardware')
    expect(screen.getByRole('link', { name: 'Open the Lino · apparel demo' })).toHaveAttribute('href', '/lino-apparel')
    expect(screen.getByRole('link', { name: 'Open the Folio · books demo' })).toHaveAttribute('href', '/folio-books')
  })

  it('links the logo to the home page and Sign in to the sign-in page', () => {
    renderLanding()

    const header = screen.getByRole('banner')
    expect(within(header).getByRole('link', { name: 'Just Looking' })).toHaveAttribute('href', '/')
    expect(within(header).getByRole('link', { name: 'Sign in' })).toHaveAttribute('href', '/login')
  })

  it('is in Spanish when the browser prefers Spanish', () => {
    languages = ['es-ES']

    renderLanding()

    expect(screen.getAllByRole('link', { name: 'Probar la demo' })[0]).toHaveAttribute('href', '/forja-hardware')
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Que miren todo lo que quieran.')
    expect(screen.getByRole('link', { name: 'Abrir la demo de Lino · ropa' })).toHaveAttribute('href', '/lino-apparel')
  })

  it('explains the pun behind the name, in English and in Spanish', () => {
    const { unmount } = renderLanding()
    expect(screen.getByText('What you say in a shop when you only want to browse.')).toBeInTheDocument()
    unmount()

    languages = ['es-ES']
    renderLanding()
    expect(screen.getByText('«Solo mirando»: lo que dices en una tienda cuando solo quieres mirar.')).toBeInTheDocument()
  })

  it('turns the how it works tag between what visitors see and what admins edit', async () => {
    renderLanding()

    const turn = screen.getByRole('button', { name: 'Turn the tag' })
    const front = screen.getByText('What visitors see').closest('[data-side]')!
    const back = screen.getByText('What you edit').closest('[data-side]')!
    expect(turn).toHaveAttribute('aria-pressed', 'false')
    expect(front).toHaveAttribute('aria-hidden', 'false')
    expect(back).toHaveAttribute('aria-hidden', 'true')

    await userEvent.click(turn)

    expect(turn).toHaveAttribute('aria-pressed', 'true')
    expect(front).toHaveAttribute('aria-hidden', 'true')
    expect(back).toHaveAttribute('aria-hidden', 'false')
    expect(within(back as HTMLElement).getByText('Import from a CSV file')).toBeInTheDocument()

    await userEvent.click(turn)
    expect(turn).toHaveAttribute('aria-pressed', 'false')
    expect(front).toHaveAttribute('aria-hidden', 'false')
  })

  it('links every Demo tenant in the any business rail to its catalog', () => {
    renderLanding()

    const section = screen.getByRole('region', { name: 'Any business, its own attributes' })
    expect(within(section).getByRole('link', { name: 'See the Forja · hardware catalog' })).toHaveAttribute('href', '/forja-hardware')
    expect(within(section).getByRole('link', { name: 'See the Lino · apparel catalog' })).toHaveAttribute('href', '/lino-apparel')
    expect(within(section).getByRole('link', { name: 'See the Folio · books catalog' })).toHaveAttribute('href', '/folio-books')
  })

  it('says what it does not do and repeats Try the demo at the end', () => {
    renderLanding()

    expect(screen.getByRole('heading', { name: 'What it does not do' })).toBeInTheDocument()
    const closing = screen.getByRole('region', { name: 'See it with real products.' })
    expect(within(closing).getByRole('link', { name: 'Try the demo' })).toHaveAttribute('href', '/forja-hardware')
  })

  it('ends with a footer: Sign in, the year and the mookie studio credit', () => {
    renderLanding()

    const footer = screen.getByRole('contentinfo')
    expect(within(footer).getByRole('link', { name: 'Sign in' })).toHaveAttribute('href', '/login')
    expect(within(footer).getByText(`© ${new Date().getFullYear()}`)).toBeInTheDocument()
    expect(within(footer).getByText('A product by')).toBeInTheDocument()
    expect(within(footer).getByRole('link', { name: 'mookie studio on GitHub' })).toHaveAttribute('href', 'https://github.com/mookie-studio')
  })

  it('shows the footer in Spanish', () => {
    languages = ['es-ES']

    renderLanding()

    const footer = screen.getByRole('contentinfo')
    expect(within(footer).getByText('Un producto de')).toBeInTheDocument()
    expect(within(footer).getByRole('link', { name: 'Entrar' })).toHaveAttribute('href', '/login')
  })
})
