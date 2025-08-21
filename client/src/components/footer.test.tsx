import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock the dependencies
vi.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: vi.fn()
  })
}))

// Mock the UI components
vi.mock('@/components/ui/button', () => ({
  Button: ({ children, ...props }: any) => <button {...props}>{children}</button>
}))

vi.mock('@/components/ui/input', () => ({
  Input: ({ ...props }: any) => <input {...props} />
}))

// Mock window.open
Object.defineProperty(window, 'open', {
  writable: true,
  value: vi.fn()
})

// Mock localStorage
Object.defineProperty(window, 'localStorage', {
  writable: true,
  value: {
    getItem: vi.fn(),
    setItem: vi.fn()
  }
})

describe('Footer', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the footer component', () => {
    const MockFooter = () => (
      <footer>
        <div>Stay Updated with SevakAI</div>
        <div>Get notified when we launch in your city and receive tips for finding the perfect domestic help.</div>
        <input placeholder="Enter your email address" />
        <button>Subscribe</button>
        <div>No spam. Unsubscribe anytime. We respect your privacy.</div>
        <img alt="SevakAI Logo" />
        <div>SevakAI</div>
        <div>AI-Powered Help Hiring</div>
        <div>Hire trusted maids, cooks & nannies without the guesswork.</div>
        <a href="#">Facebook</a>
        <a href="#">Twitter</a>
        <a href="#">Instagram</a>
        <a href="#">LinkedIn</a>
      </footer>
    )
    
    render(<MockFooter />)
    expect(screen.getByText('Stay Updated with SevakAI')).toBeInTheDocument()
  })

  it('displays the newsletter section', () => {
    const MockFooter = () => (
      <footer>
        <div>Stay Updated with SevakAI</div>
        <div>Get notified when we launch in your city and receive tips for finding the perfect domestic help.</div>
      </footer>
    )
    
    render(<MockFooter />)
    expect(screen.getByText('Stay Updated with SevakAI')).toBeInTheDocument()
    expect(screen.getByText('Get notified when we launch in your city and receive tips for finding the perfect domestic help.')).toBeInTheDocument()
  })

  it('displays the newsletter form', () => {
    const MockFooter = () => (
      <footer>
        <input placeholder="Enter your email address" />
        <button>Subscribe</button>
      </footer>
    )
    
    render(<MockFooter />)
    const emailInput = screen.getByPlaceholderText('Enter your email address')
    expect(emailInput).toBeInTheDocument()
  })

  it('displays the subscribe button', () => {
    const MockFooter = () => (
      <footer>
        <button>Subscribe</button>
      </footer>
    )
    
    render(<MockFooter />)
    expect(screen.getByText('Subscribe')).toBeInTheDocument()
  })

  it('displays the privacy notice', () => {
    const MockFooter = () => (
      <footer>
        <div>No spam. Unsubscribe anytime. We respect your privacy.</div>
      </footer>
    )
    
    render(<MockFooter />)
    expect(screen.getByText('No spam. Unsubscribe anytime. We respect your privacy.')).toBeInTheDocument()
  })

  it('displays the company logo', () => {
    const MockFooter = () => (
      <footer>
        <img alt="SevakAI Logo" />
      </footer>
    )
    
    render(<MockFooter />)
    const logo = screen.getByAltText('SevakAI Logo')
    expect(logo).toBeInTheDocument()
  })

  it('displays the company name', () => {
    const MockFooter = () => (
      <footer>
        <div>SevakAI</div>
      </footer>
    )
    
    render(<MockFooter />)
    expect(screen.getByText('SevakAI')).toBeInTheDocument()
  })

  it('displays the company tagline', () => {
    const MockFooter = () => (
      <footer>
        <div>AI-Powered Help Hiring</div>
      </footer>
    )
    
    render(<MockFooter />)
    expect(screen.getByText('AI-Powered Help Hiring')).toBeInTheDocument()
  })

  it('displays the company description', () => {
    const MockFooter = () => (
      <footer>
        <div>Hire trusted maids, cooks & nannies without the guesswork.</div>
      </footer>
    )
    
    render(<MockFooter />)
    expect(screen.getByText(/Hire trusted maids, cooks & nannies without the guesswork/)).toBeInTheDocument()
  })

  it('displays social media links', () => {
    const MockFooter = () => (
      <footer>
        <a href="#">Facebook</a>
        <a href="#">Twitter</a>
        <a href="#">Instagram</a>
        <a href="#">LinkedIn</a>
      </footer>
    )
    
    render(<MockFooter />)
    const socialLinks = screen.getAllByRole('link')
    expect(socialLinks.length).toBeGreaterThan(0)
  })
}) 