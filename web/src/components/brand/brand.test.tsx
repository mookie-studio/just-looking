import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'
import { HangTag } from './HangTag'
import { Logo } from './Logo'
import { MookieStudioCredit } from './MookieStudioCredit'

describe('HangTag', () => {
  it('is one link to the demo with its attributes and the stamp', () => {
    render(
      <MemoryRouter>
        <HangTag
          tenantLine="forja · hardware"
          name="Claw hammer 450 g"
          attributes={[
            { name: 'Material', value: 'Forged steel' },
            { name: 'Weight', value: '450 g' },
            { name: 'Handle', value: 'Ash' },
            { name: 'Origin', value: 'Spain' },
          ]}
          href="/forja-hardware"
          linkLabel="Open the demo"
        />
      </MemoryRouter>,
    )

    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(1)
    const link = screen.getByRole('link', { name: 'Open the forja · hardware demo' })
    expect(link).toHaveAttribute('href', '/forja-hardware')
    expect(within(link).getByText('Forged steel')).toBeInTheDocument()
    expect(within(link).getByText('Ash')).toBeInTheDocument()
    expect(within(link).queryByText('Spain')).not.toBeInTheDocument()
    expect(within(link).getByText('Just looking')).toBeInTheDocument()
  })

  it('is not a link without href', () => {
    render(<HangTag tenantLine="folio · books" name="Atlas" />)
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
    expect(screen.getByText('Atlas')).toBeInTheDocument()
  })
})

describe('Logo', () => {
  it('shows the reversed mark file named Just Looking', () => {
    render(<Logo kind="mark" variant="reversed" />)
    expect(screen.getByRole('img', { name: 'Just Looking' })).toHaveAttribute('src', '/brand/just-looking-mark.svg')
  })
})

describe('MookieStudioCredit', () => {
  it('shows its label above the mookie studio wordmark, linking to mookie studio on GitHub', () => {
    render(<MookieStudioCredit label="Un producto de" />)
    expect(screen.getByText('Un producto de')).toBeInTheDocument()
    const link = screen.getByRole('link', { name: 'mookie studio on GitHub' })
    expect(link).toHaveAttribute('href', 'https://github.com/mookie-studio')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    expect(screen.getByRole('img', { name: 'mookie studio' })).toHaveAttribute('src', '/brand/mookie-studio/wordmark-on-dark.svg')
  })

  it('uses the light-ground file on light grounds', () => {
    render(<MookieStudioCredit onLight />)
    expect(screen.getByText('A product by')).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'mookie studio' })).toHaveAttribute('src', '/brand/mookie-studio/wordmark-on-light.svg')
  })
})
