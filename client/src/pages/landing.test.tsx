import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import Landing from './landing'

// Mock the dependencies
vi.mock('wouter', () => ({
  useLocation: () => ['/', vi.fn()]
}))

vi.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: vi.fn()
  })
}))

vi.mock('@/lib/analytics', () => ({
  trackFormSubmission: vi.fn(),
  trackButtonClick: vi.fn(),
  trackWhatsAppClick: vi.fn(),
  initScrollTracking: vi.fn(() => vi.fn()),
  trackSectionView: vi.fn()
}))

vi.mock('@vercel/analytics/react', () => ({
  Analytics: () => null
}))

// Mock all Lucide React icons
vi.mock('lucide-react', () => ({
  CheckCircle: ({ className }: any) => <div data-testid="check-circle" className={className} />,
  Star: ({ className }: any) => <div data-testid="star" className={className} />,
  Phone: ({ className }: any) => <div data-testid="phone" className={className} />,
  Mic: ({ className }: any) => <div data-testid="mic" className={className} />,
  Shield: ({ className }: any) => <div data-testid="shield" className={className} />,
  Users: ({ className }: any) => <div data-testid="users" className={className} />,
  Heart: ({ className }: any) => <div data-testid="heart" className={className} />,
  MapPin: ({ className }: any) => <div data-testid="map-pin" className={className} />,
  Clock: ({ className }: any) => <div data-testid="clock" className={className} />,
  Award: ({ className }: any) => <div data-testid="award" className={className} />,
  Zap: ({ className }: any) => <div data-testid="zap" className={className} />,
  IndianRupee: ({ className }: any) => <div data-testid="indian-rupee" className={className} />,
  Download: ({ className }: any) => <div data-testid="download" className={className} />,
  ChevronRight: ({ className }: any) => <div data-testid="chevron-right" className={className} />,
  Globe: ({ className }: any) => <div data-testid="globe" className={className} />,
  UserCheck: ({ className }: any) => <div data-testid="user-check" className={className} />,
  Headphones: ({ className }: any) => <div data-testid="headphones" className={className} />
}))

// Mock UI components
vi.mock('@/components/ui/button', () => ({
  Button: ({ children, onClick, className, ...props }: any) => (
    <button onClick={onClick} className={className} {...props}>
      {children}
    </button>
  )
}))

vi.mock('@/components/ui/input', () => ({
  Input: ({ ...props }: any) => <input {...props} />
}))

vi.mock('@/components/ui/badge', () => ({
  Badge: ({ children, className, variant, ...props }: any) => (
    <span className={className} data-variant={variant} {...props}>
      {children}
    </span>
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
  ),
  CardHeader: ({ children, className, ...props }: any) => (
    <div className={className} data-testid="card-header" {...props}>
      {children}
    </div>
  ),
  CardTitle: ({ children, className, ...props }: any) => (
    <h3 className={className} data-testid="card-title" {...props}>
      {children}
    </h3>
  )
}))

vi.mock('@/components/ui/label', () => ({
  Label: ({ children, className, ...props }: any) => (
    <label className={className} {...props}>
      {children}
    </label>
  )
}))

vi.mock('@/components/ui/textarea', () => ({
  Textarea: ({ ...props }: any) => <textarea {...props} />
}))

vi.mock('@/components/ui/select', () => ({
  Select: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  SelectContent: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  SelectItem: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  SelectTrigger: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  SelectValue: ({ ...props }: any) => <div {...props} />
}))

vi.mock('@/components/ui/accordion', () => ({
  Accordion: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  AccordionItem: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  AccordionTrigger: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  AccordionContent: ({ children, ...props }: any) => <div {...props}>{children}</div>
}))

vi.mock('@/components/ui/carousel', () => ({
  Carousel: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  CarouselContent: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  CarouselItem: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  CarouselNext: ({ ...props }: any) => <div {...props} />,
  CarouselPrevious: ({ ...props }: any) => <div {...props} />
}))

describe('Landing', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Mock localStorage
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: vi.fn(),
        setItem: vi.fn(),
        removeItem: vi.fn()
      },
      writable: true
    })
    // Mock window.open
    Object.defineProperty(window, 'open', {
      value: vi.fn(),
      writable: true
    })
    // Mock IntersectionObserver
    Object.defineProperty(window, 'IntersectionObserver', {
      value: vi.fn(() => ({
        observe: vi.fn(),
        disconnect: vi.fn()
      })),
      writable: true
    })
  })

  it('renders the component without crashing', () => {
    expect(() => render(<Landing />)).not.toThrow()
  })

  it('displays the main hero heading', () => {
    render(<Landing />)
    
    expect(screen.getByText(/Hire Trusted Maids, Cooks & Nannies/)).toBeInTheDocument()
    expect(screen.getByText(/Without the Guesswork/)).toBeInTheDocument()
  })

  it('displays the hero subtitle', () => {
    render(<Landing />)
    
    expect(screen.getByText(/Say goodbye to random referrals/)).toBeInTheDocument()
    expect(screen.getByText(/SevakAI connects you with verified helpers/)).toBeInTheDocument()
  })

  it('renders key feature badges', () => {
    render(<Landing />)
    
    expect(screen.getByText(/🕒 Full-time \| Part-time \| One-time/)).toBeInTheDocument()
    expect(screen.getByText(/🛡️ Verified profiles \| ₹ No commissions/)).toBeInTheDocument()
    expect(screen.getByText(/🌐 Multilingual AI/)).toBeInTheDocument()
  })

  it('displays app download section', () => {
    render(<Landing />)
    
    expect(screen.getAllByText('Download Our App')).toHaveLength(2) // One in hero, one in app download section
    expect(screen.getAllByText('App Store')).toHaveLength(2) // One in hero, one in app download section
    expect(screen.getAllByText('Google Play')).toHaveLength(2) // One in hero, one in app download section
  })

  it('shows location badge', () => {
    render(<Landing />)
    
    expect(screen.getByText(/Now in Hyderabad/)).toBeInTheDocument()
    expect(screen.getByText(/Expanding to Bengaluru, Chennai, and Dubai/)).toBeInTheDocument()
  })

  it('renders the "Why SevakAI Works" section', () => {
    render(<Landing />)
    
    expect(screen.getByText('Smarter, Safer Hiring – Powered by AI')).toBeInTheDocument()
  })

  it('displays feature cards with icons', () => {
    render(<Landing />)
    
    expect(screen.getByText('AI-Matched Helpers')).toBeInTheDocument()
    expect(screen.getByText('Multilingual Support')).toBeInTheDocument()
    expect(screen.getByText('Background Verified')).toBeInTheDocument()
    expect(screen.getByText('Interview Options')).toBeInTheDocument()
    expect(screen.getByText('No Commissions')).toBeInTheDocument()
    expect(screen.getByText('30-Day Match Guarantee')).toBeInTheDocument()
  })

  it('renders feature card descriptions', () => {
    render(<Landing />)
    
    expect(screen.getByText(/Find the right fit by skills, language & availability/)).toBeInTheDocument()
    expect(screen.getByText(/Helpers available in multiple languages/)).toBeInTheDocument()
    expect(screen.getByText(/ID checks, face scans, and experience verified/)).toBeInTheDocument()
  })

  it('displays feature card icons', () => {
    render(<Landing />)
    
    expect(screen.getAllByTestId('zap')).toHaveLength(2) // One in features, one in workflow
    expect(screen.getAllByTestId('mic')).toHaveLength(1)
    expect(screen.getAllByTestId('shield')).toHaveLength(1) // Only in features section
    expect(screen.getAllByTestId('phone')).toHaveLength(3) // One in features, one in workflow, one in contact
    expect(screen.getAllByTestId('indian-rupee')).toHaveLength(1)
    expect(screen.getAllByTestId('award')).toHaveLength(1)
  })

  it('renders the "How It Works" section', () => {
    render(<Landing />)
    
    expect(screen.getByText('Hiring Help Should Be Simple. Here\'s How It Works:')).toBeInTheDocument()
  })

  it('displays workflow steps', () => {
    render(<Landing />)
    
    expect(screen.getByText('Tell us what you need')).toBeInTheDocument()
    expect(screen.getByText('Get matched by our AI')).toBeInTheDocument()
    expect(screen.getByText('View profiles & interviews')).toBeInTheDocument()
    expect(screen.getByText('Choose how to interview')).toBeInTheDocument()
    expect(screen.getByText('Hire directly. Pay directly.')).toBeInTheDocument()
  })

  it('shows workflow step descriptions', () => {
    render(<Landing />)
    
    expect(screen.getByText(/via quick form or chat/)).toBeInTheDocument()
    expect(screen.getByText(/Top 3 verified helpers based on your needs/)).toBeInTheDocument()
    expect(screen.getByText(/Video interviews \+ skill tags \+ availability/)).toBeInTheDocument()
  })

  it('renders the pricing section', () => {
    render(<Landing />)
    
    expect(screen.getByText('One-Time Fee. No Hidden Charges.')).toBeInTheDocument()
  })

  it('displays pricing cards', () => {
    render(<Landing />)
    
    expect(screen.getByText('Basic Access')).toBeInTheDocument()
    expect(screen.getByText('Premium Screening')).toBeInTheDocument()
  })

  it('shows pricing features', () => {
    render(<Landing />)
    
    expect(screen.getByText(/Flat one-time fee to access SevakAI's verified helper pool/)).toBeInTheDocument()
    expect(screen.getByText(/You pay the helper directly — no salary cuts or commissions/)).toBeInTheDocument()
    expect(screen.getByText(/30-Day Money-Back Guarantee if no suitable match is found/)).toBeInTheDocument()
  })

  it('renders the testimonials section', () => {
    render(<Landing />)
    
    expect(screen.getByText('What Families and Helpers Are Saying')).toBeInTheDocument()
  })

  it('displays client and helper review sections', () => {
    render(<Landing />)
    
    expect(screen.getByText('CLIENT REVIEWS')).toBeInTheDocument()
    expect(screen.getByText('HELPER REVIEWS')).toBeInTheDocument()
  })

  it('renders the FAQ section', () => {
    render(<Landing />)
    
    expect(screen.getByText('Frequently Asked Questions')).toBeInTheDocument()
  })

  it('displays FAQ items', () => {
    render(<Landing />)
    
    expect(screen.getByText('How do I find a reliable helper?')).toBeInTheDocument()
    expect(screen.getByText('What safety measures are in place?')).toBeInTheDocument()
    expect(screen.getByText('How does pricing work?')).toBeInTheDocument()
    expect(screen.getByText('Can I cancel a booking?')).toBeInTheDocument()
    expect(screen.getByText('How do I become a helper?')).toBeInTheDocument()
  })

  it('renders the app download section', () => {
    render(<Landing />)
    
    expect(screen.getAllByText('Download Our App')).toHaveLength(2) // One in hero, one in app download section
    expect(screen.getByText('Get started today and connect with verified domestic helpers in your area')).toBeInTheDocument()
  })

  it('displays app store buttons', () => {
    render(<Landing />)
    
    const appStoreButtons = screen.getAllByText('App Store')
    const playStoreButtons = screen.getAllByText('Google Play')
    
    expect(appStoreButtons.length).toBeGreaterThan(0)
    expect(playStoreButtons.length).toBeGreaterThan(0)
  })

  it('renders the contact section', () => {
    render(<Landing />)
    
    expect(screen.getByText('Need Help or Have Questions?')).toBeInTheDocument()
  })

  it('displays contact options', () => {
    render(<Landing />)
    
    expect(screen.getByText('💬 Chat on WhatsApp')).toBeInTheDocument()
    expect(screen.getByText('📞 Call Us')).toBeInTheDocument()
    expect(screen.getByText('📍 Office')).toBeInTheDocument()
  })

  it('shows contact details', () => {
    render(<Landing />)
    
    expect(screen.getByText('+91 98765 43210')).toBeInTheDocument()
    expect(screen.getByText('Hyderabad, India')).toBeInTheDocument()
    expect(screen.getByText('(Dubai & Chennai Coming Soon)')).toBeInTheDocument()
  })

  it('renders sticky CTA button on mobile', () => {
    render(<Landing />)
    
    expect(screen.getByText('Download App - Get Started')).toBeInTheDocument()
  })

  it('has proper container structure', () => {
    render(<Landing />)
    
    const mainContainer = document.querySelector('.min-h-screen.bg-white')
    expect(mainContainer).toBeInTheDocument()
  })

  it('renders all major sections', () => {
    render(<Landing />)
    
    const sections = [
      'home',
      'how-it-works', 
      'pricing',
      'testimonials',
      'faq',
      'app-download',
      'contact'
    ]
    
    sections.forEach(sectionId => {
      const section = document.getElementById(sectionId)
      expect(section).toBeInTheDocument()
    })
  })

  it('displays all text content without errors', () => {
    render(<Landing />)
    
    // Verify all major text content is present
    const textContent = [
      'Hire Trusted Maids, Cooks & Nannies',
      'Without the Guesswork',
      'Say goodbye to random referrals',
      'Smarter, Safer Hiring – Powered by AI',
      'Hiring Help Should Be Simple',
      'One-Time Fee. No Hidden Charges.',
      'What Families and Helpers Are Saying',
      'Frequently Asked Questions',
      'Need Help or Have Questions?'
    ]
    
    textContent.forEach(text => {
      expect(screen.getByText(new RegExp(text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')))).toBeInTheDocument()
    })
    
    // Check for Download Our App separately since it appears twice
    expect(screen.getAllByText('Download Our App')).toHaveLength(2)
  })

  it('maintains responsive design classes', () => {
    render(<Landing />)
    
    // Check for responsive classes
    const responsiveHeading = document.querySelector('.text-4xl.md\\:text-6xl')
    expect(responsiveHeading).toBeInTheDocument()
    
    const responsiveGrid = document.querySelector('.md\\:grid-cols-2')
    expect(responsiveGrid).toBeInTheDocument()
  })

  it('has proper gradient backgrounds', () => {
    render(<Landing />)
    
    const heroGradient = document.querySelector('.bg-gradient-to-br.from-orange-50.to-amber-50')
    expect(heroGradient).toBeInTheDocument()
    
    const downloadGradient = document.querySelector('.bg-gradient-to-br.from-orange-50.to-amber-50')
    expect(downloadGradient).toBeInTheDocument()
  })

  it('renders cards with proper styling', () => {
    render(<Landing />)
    
    const cards = screen.getAllByTestId('card')
    expect(cards.length).toBeGreaterThan(0)
    
    // Check that cards have shadow and hover effects
    // Different cards have different styling
    cards.forEach((card, index) => {
      if (index < 6) { // Feature cards
        expect(card).toHaveClass('shadow-lg', 'hover:shadow-xl', 'transition-shadow')
      } else if (index < 8) { // Pricing cards
        expect(card).toHaveClass('shadow-xl', 'border-2')
      } else { // Other cards (testimonials, contact, etc.)
        expect(card).toHaveClass('shadow-lg', 'hover:shadow-xl', 'transition-shadow')
      }
    })
  })

  it('displays all icons properly', () => {
    render(<Landing />)
    
    // Check for various icons
    expect(screen.getAllByTestId('zap')).toHaveLength(2) // One in features, one in workflow
    expect(screen.getAllByTestId('shield')).toHaveLength(1) // Only in features section
    expect(screen.getAllByTestId('phone')).toHaveLength(3) // One in features, one in workflow, one in contact
    expect(screen.getAllByTestId('users')).toHaveLength(1)
    expect(screen.getAllByTestId('check-circle')).toHaveLength(7) // Multiple instances in pricing and workflow
  })

  it('renders without crashing', () => {
    expect(() => render(<Landing />)).not.toThrow()
  })
})
