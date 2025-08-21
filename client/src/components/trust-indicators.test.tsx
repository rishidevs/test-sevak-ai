import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { TrustIndicators } from './trust-indicators'

describe('TrustIndicators', () => {
  it('renders the component', () => {
    render(<TrustIndicators />)
    expect(screen.getByText('Why Choose Sevak AI?')).toBeInTheDocument()
  })

  it('displays the main heading', () => {
    render(<TrustIndicators />)
    expect(screen.getByText('Why Choose Sevak AI?')).toBeInTheDocument()
  })

  it('displays the subtitle', () => {
    render(<TrustIndicators />)
    expect(screen.getByText('Connecting families with trusted domestic helpers since 2024')).toBeInTheDocument()
  })

  it('displays all three trust indicators', () => {
    render(<TrustIndicators />)
    expect(screen.getByText('Verified Helpers')).toBeInTheDocument()
    expect(screen.getByText('Perfect Matches')).toBeInTheDocument()
    expect(screen.getByText('24/7 Support')).toBeInTheDocument()
  })

  it('displays the descriptions for each indicator', () => {
    render(<TrustIndicators />)
    expect(screen.getByText('All helpers undergo thorough background verification and skill assessment')).toBeInTheDocument()
    expect(screen.getByText('AI-powered matching based on your specific needs and preferences')).toBeInTheDocument()
    expect(screen.getByText('Round-the-clock customer support for any queries or concerns')).toBeInTheDocument()
  })
}) 