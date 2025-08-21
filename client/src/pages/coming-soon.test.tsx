import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import ComingSoon from './coming-soon'

// Mock the dependencies
vi.mock('wouter', () => ({
  useLocation: () => ['/coming-soon', vi.fn()]
}))

vi.mock('lucide-react', () => ({
  ArrowLeft: ({ className }: any) => <div data-testid="arrow-left" className={className} />,
  Phone: ({ className }: any) => <div data-testid="phone-icon" className={className} />,
  Brain: ({ className }: any) => <div data-testid="brain-icon" className={className} />,
  Shield: ({ className }: any) => <div data-testid="shield-icon" className={className} />,
  Users: ({ className }: any) => <div data-testid="users-icon" className={className} />,
  Star: ({ className }: any) => <div data-testid="star-icon" className={className} />
}))

vi.mock('@/components/ui/button', () => ({
  Button: ({ children, onClick, className, variant, ...props }: any) => (
    <button 
      onClick={onClick} 
      className={className} 
      data-variant={variant}
      {...props}
    >
      {children}
    </button>
  )
}))

vi.mock('@/components/ui/card', () => ({
  Card: ({ children, className, ...props }: any) => (
    <div className={className} data-testid="card" {...props}>
      {children}
    </div>
  ),
  CardContent: ({ children, className, ...props }: any) => (
    <div className={className} data-testid="card-content" {...props}>
      {children}
    </div>
  )
}))

describe('ComingSoon', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the coming soon page', () => {
    render(<ComingSoon />)
    expect(screen.getByText('SevakAI 🙌')).toBeInTheDocument()
  })

  it('displays the main heading and subtitle', () => {
    render(<ComingSoon />)
    
    expect(screen.getByText('SevakAI 🙌')).toBeInTheDocument()
    expect(screen.getByText('Revolutionary AI Features Coming Soon!')).toBeInTheDocument()
    expect(screen.getByText(/We're building India's smartest platform/)).toBeInTheDocument()
  })

  it('renders the back to home button', () => {
    render(<ComingSoon />)
    
    const backButton = screen.getByText('Back to Home')
    expect(backButton).toBeInTheDocument()
    expect(backButton.closest('button')).toHaveAttribute('data-variant', 'ghost')
  })

  it('displays all four feature cards', () => {
    render(<ComingSoon />)
    
    // Check for all feature card titles
    expect(screen.getByText('📞 AI Interview Agent')).toBeInTheDocument()
    expect(screen.getByText('📋 ML Scoring')).toBeInTheDocument()
    expect(screen.getByText('🔍 Smart Verification')).toBeInTheDocument()
    expect(screen.getByText('🧠 Personalized Matching')).toBeInTheDocument()
  })

  it('renders feature card descriptions', () => {
    render(<ComingSoon />)
    
    expect(screen.getByText(/Our multilingual AI will interview helpers/)).toBeInTheDocument()
    expect(screen.getByText(/Advanced machine learning algorithms/)).toBeInTheDocument()
    expect(screen.getByText(/Discover verified maids, cooks, nannies/)).toBeInTheDocument()
    expect(screen.getByText(/AI learns your family preferences/)).toBeInTheDocument()
  })

  it('displays feature card icons', () => {
    render(<ComingSoon />)
    
    expect(screen.getByTestId('phone-icon')).toBeInTheDocument()
    expect(screen.getByTestId('brain-icon')).toBeInTheDocument()
    expect(screen.getAllByTestId('shield-icon')).toHaveLength(2) // One in feature card, one in social proof
    expect(screen.getAllByTestId('users-icon')).toHaveLength(2) // One in feature card, one in social proof
  })

  it('renders the mission statement section', () => {
    render(<ComingSoon />)
    
    expect(screen.getByText('👩‍👧 Our Mission')).toBeInTheDocument()
    expect(screen.getByText(/Focused on empowering women/)).toBeInTheDocument()
  })

  it('displays the timeline section', () => {
    render(<ComingSoon />)
    
    expect(screen.getByText('Coming Soon Timeline')).toBeInTheDocument()
    expect(screen.getByText(/Phase 1 - Currently Live/)).toBeInTheDocument()
    expect(screen.getByText(/Phase 2 - Q1 2024/)).toBeInTheDocument()
    expect(screen.getByText(/Phase 3 - Q2 2024/)).toBeInTheDocument()
    expect(screen.getByText(/Phase 4 - Q3 2024/)).toBeInTheDocument()
  })

  it('shows timeline phase descriptions', () => {
    render(<ComingSoon />)
    
    expect(screen.getByText(/Houseowner onboarding & requirement collection/)).toBeInTheDocument()
    expect(screen.getByText(/AI Interview Agent for helper interviews/)).toBeInTheDocument()
    expect(screen.getByText(/ML scoring and smart matching system/)).toBeInTheDocument()
    expect(screen.getByText(/Full platform launch with mobile app/)).toBeInTheDocument()
  })

  it('renders the call to action section', () => {
    render(<ComingSoon />)
    
    expect(screen.getByText('Be the First to Experience SevakAI')).toBeInTheDocument()
    expect(screen.getByText(/Join our early access program/)).toBeInTheDocument()
    expect(screen.getByText('Get Early Access')).toBeInTheDocument()
  })

  it('displays the get early access button', () => {
    render(<ComingSoon />)
    
    const earlyAccessButton = screen.getByText('Get Early Access')
    expect(earlyAccessButton).toBeInTheDocument()
    expect(earlyAccessButton.closest('button')).toBeInTheDocument()
  })

  it('renders social proof section', () => {
    render(<ComingSoon />)
    
    expect(screen.getByText('Trusted by 1000+ families')).toBeInTheDocument()
    expect(screen.getByText('100% Verified helpers')).toBeInTheDocument()
    expect(screen.getByText('500+ Active helpers')).toBeInTheDocument()
  })

  it('displays social proof icons', () => {
    render(<ComingSoon />)
    
    expect(screen.getAllByTestId('star-icon')).toHaveLength(1)
    expect(screen.getAllByTestId('shield-icon')).toHaveLength(2) // One in features, one in social proof
    expect(screen.getAllByTestId('users-icon')).toHaveLength(2) // One in features, one in social proof
  })

  it('renders timeline dots with correct colors', () => {
    render(<ComingSoon />)
    
    const timelineDots = document.querySelectorAll('.w-3.h-3.rounded-full')
    expect(timelineDots.length).toBeGreaterThan(0)
  })

  it('has proper gradient styling on main heading', () => {
    render(<ComingSoon />)
    
    const mainHeading = screen.getByText('SevakAI 🙌')
    expect(mainHeading).toHaveClass('bg-gradient-to-r', 'from-blue-600', 'to-green-600', 'bg-clip-text', 'text-transparent')
  })

  it('renders cards with proper styling classes', () => {
    render(<ComingSoon />)
    
    const cards = screen.getAllByTestId('card')
    expect(cards.length).toBeGreaterThan(0)
    
    // Check that feature cards have shadow and hover effects
    // The mission card has different styling (bg-gradient-to-r from-blue-50 to-green-50)
    cards.forEach((card, index) => {
      if (index < 4) { // First 4 cards are feature cards
        expect(card).toHaveClass('shadow-lg', 'hover:shadow-xl', 'transition-shadow')
      } else { // Mission card
        expect(card).toHaveClass('shadow-lg', 'bg-gradient-to-r', 'from-blue-50', 'to-green-50')
      }
    })
  })

  it('displays feature card icons in colored circles', () => {
    render(<ComingSoon />)
    
    // Check for the colored background circles around icons
    const iconCircles = document.querySelectorAll('.w-16.h-16.rounded-full.flex.items-center.justify-center.mx-auto.mb-4')
    expect(iconCircles.length).toBe(4)
  })

  it('renders the page with proper container structure', () => {
    render(<ComingSoon />)
    
    const container = document.querySelector('.container.mx-auto.px-4.py-8')
    expect(container).toBeInTheDocument()
  })

  it('has proper background gradient', () => {
    render(<ComingSoon />)
    
    const mainDiv = document.querySelector('.min-h-screen.bg-gradient-to-br')
    expect(mainDiv).toHaveClass('from-blue-50', 'via-white', 'to-green-50')
  })

  it('renders all text content without errors', () => {
    render(<ComingSoon />)
    
    // Verify all major text content is present
    const textContent = [
      'SevakAI 🙌',
      'Revolutionary AI Features Coming Soon!',
      'Back to Home',
      '📞 AI Interview Agent',
      '📋 ML Scoring',
      '🔍 Smart Verification',
      '🧠 Personalized Matching',
      '👩‍👧 Our Mission',
      'Coming Soon Timeline',
      'Be the First to Experience SevakAI',
      'Get Early Access'
    ]
    
    textContent.forEach(text => {
      expect(screen.getByText(text)).toBeInTheDocument()
    })
  })

  it('maintains proper spacing and layout classes', () => {
    render(<ComingSoon />)
    
    // Check for proper spacing classes
    const maxWidthContainer = document.querySelector('.max-w-4xl.mx-auto.text-center')
    expect(maxWidthContainer).toBeInTheDocument()
    
    const gridContainer = document.querySelector('.grid.md\\:grid-cols-2.gap-6')
    expect(gridContainer).toBeInTheDocument()
  })
  it('renders without crashing', () => {
    expect(() => render(<ComingSoon />)).not.toThrow()
  })
})
