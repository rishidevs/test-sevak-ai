import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import EverythingYourHomeNeeds from './everything-your-home-needs'

// Mock the UI components
vi.mock('@/components/ui/card', () => ({
  Card: ({ children, className, ...props }: any) => (
    <div className={className} data-testid="card" {...props}>
      {children}
    </div>
  ),
  CardHeader: ({ children, className, ...props }: any) => (
    <div className={className} data-testid="card-header" {...props}>
      {children}
    </div>
  ),
  CardContent: ({ children, className, ...props }: any) => (
    <div className={className} data-testid="card-content" {...props}>
      {children}
    </div>
  ),
  CardTitle: ({ children, className, ...props }: any) => (
    <h3 className={className} data-testid="card-title" {...props}>
      {children}
    </h3>
  )
}))

vi.mock('@/components/ui/badge', () => ({
  Badge: ({ children, className, variant, ...props }: any) => (
    <span className={className} data-variant={variant} data-testid="badge" {...props}>
      {children}
    </span>
  )
}))

describe('EverythingYourHomeNeeds', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the component without crashing', () => {
    expect(() => render(<EverythingYourHomeNeeds />)).not.toThrow()
  })

  it('displays the main heading', () => {
    render(<EverythingYourHomeNeeds />)
    
    expect(screen.getByText('🧩 Everything Your Home Needs — In One Place')).toBeInTheDocument()
  })

  it('displays the subtitle', () => {
    render(<EverythingYourHomeNeeds />)
    
    expect(screen.getByText('Verified domestic helpers, AI-matched to your needs.')).toBeInTheDocument()
  })

  it('renders all five helper type cards', () => {
    render(<EverythingYourHomeNeeds />)
    
    // Check for all helper type titles
    expect(screen.getByText('Maids & Housekeepers')).toBeInTheDocument()
    expect(screen.getByText('Cooks & Chefs')).toBeInTheDocument()
    expect(screen.getByText('Nannies & Babysitters')).toBeInTheDocument()
    expect(screen.getByText('Elderly Care Assistants')).toBeInTheDocument()
    expect(screen.getByText('Patient Care at Home')).toBeInTheDocument()
  })

  it('displays helper type emojis', () => {
    render(<EverythingYourHomeNeeds />)
    
    expect(screen.getByText('👩‍🔧')).toBeInTheDocument()
    expect(screen.getByText('🍳')).toBeInTheDocument()
    expect(screen.getByText('👶')).toBeInTheDocument()
    expect(screen.getByText('👵')).toBeInTheDocument()
    expect(screen.getByText('🩺')).toBeInTheDocument()
  })

  it('renders maids and housekeepers highlights', () => {
    render(<EverythingYourHomeNeeds />)
    
    expect(screen.getByText('For: Daily cleaning, dishes, sweeping, mopping, dusting')).toBeInTheDocument()
    expect(screen.getByText('✅ Full-time | ✅ Part-time | ✅ One-time deep clean')).toBeInTheDocument()
    expect(screen.getByText('🎯 Trust score + availability match')).toBeInTheDocument()
    expect(screen.getByText('🗣 Multilingual onboarding: Hindi, Telugu, Tamil, etc.')).toBeInTheDocument()
  })

  it('renders cooks and chefs highlights', () => {
    render(<EverythingYourHomeNeeds />)
    
    expect(screen.getByText('For: Daily meals, diet-specific cooking, regional specialties')).toBeInTheDocument()
    expect(screen.getByText('✅ Breakfast, lunch, dinner shifts')).toBeInTheDocument()
    expect(screen.getByText('🎯 Audio answers for food preferences, skill tags (veg/non-veg)')).toBeInTheDocument()
  })

  it('renders nannies and babysitters highlights', () => {
    render(<EverythingYourHomeNeeds />)
    
    expect(screen.getByText('For: Infant care, toddler engagement, after-school help')).toBeInTheDocument()
    expect(screen.getByText('✅ Screened for child-safety + behavior score')).toBeInTheDocument()
    expect(screen.getByText('🗣 Listen to how they interact with children')).toBeInTheDocument()
  })

  it('renders elderly care assistants highlights', () => {
    render(<EverythingYourHomeNeeds />)
    
    expect(screen.getByText('For: Mobility help, meal support, companionship, reminders')).toBeInTheDocument()
    expect(screen.getByText('✅ Compassionate & calm helpers with past experience')).toBeInTheDocument()
    expect(screen.getByText('🎯 AI picks patient-friendly profiles with language match')).toBeInTheDocument()
  })

  it('renders patient care at home highlights', () => {
    render(<EverythingYourHomeNeeds />)
    
    expect(screen.getByText('For: Post-surgery care, medication reminders, hygiene help')).toBeInTheDocument()
    expect(screen.getByText('✅ Trained attendants | ✅ Female/male preference')).toBeInTheDocument()
    expect(screen.getByText('🎯 Skill tags: lifting, bathing, oxygen familiarity')).toBeInTheDocument()
  })

  it('displays the bottom badge with AI trust scoring information', () => {
    render(<EverythingYourHomeNeeds />)
    
    const badge = screen.getByTestId('badge')
    expect(badge).toBeInTheDocument()
    expect(badge).toHaveAttribute('data-variant', 'secondary')
    expect(screen.getByText(/All helpers go through AI-driven trust scoring/)).toBeInTheDocument()
    expect(screen.getByText(/Hyderabad, soon expanding to Bengaluru, Chennai & Dubai/)).toBeInTheDocument()
  })

  it('renders all card components with proper structure', () => {
    render(<EverythingYourHomeNeeds />)
    
    const cards = screen.getAllByTestId('card')
    expect(cards).toHaveLength(5)
    
    const cardHeaders = screen.getAllByTestId('card-header')
    expect(cardHeaders).toHaveLength(5)
    
    const cardContents = screen.getAllByTestId('card-content')
    expect(cardContents).toHaveLength(5)
    
    const cardTitles = screen.getAllByTestId('card-title')
    expect(cardTitles).toHaveLength(5)
  })

  it('has proper styling classes on cards', () => {
    render(<EverythingYourHomeNeeds />)
    
    const cards = screen.getAllByTestId('card')
    cards.forEach(card => {
      expect(card).toHaveClass('shadow-lg', 'border-none')
    })
  })

  it('has proper styling on card headers', () => {
    render(<EverythingYourHomeNeeds />)
    
    const cardHeaders = screen.getAllByTestId('card-header')
    cardHeaders.forEach(header => {
      expect(header).toHaveClass('flex', 'flex-row', 'items-center', 'gap-4', 'bg-orange-50', 'rounded-t-xl')
    })
  })

  it('has proper styling on card content', () => {
    render(<EverythingYourHomeNeeds />)
    
    const cardContents = screen.getAllByTestId('card-content')
    cardContents.forEach(content => {
      expect(content).toHaveClass('pt-4', 'pb-6', 'px-6', 'text-left', 'space-y-2')
    })
  })

  it('has proper styling on card titles', () => {
    render(<EverythingYourHomeNeeds />)
    
    const cardTitles = screen.getAllByTestId('card-title')
    cardTitles.forEach(title => {
      expect(title).toHaveClass('text-xl', 'font-semibold')
    })
  })

  it('has proper badge styling', () => {
    render(<EverythingYourHomeNeeds />)
    
    const badge = screen.getByTestId('badge')
    expect(badge).toHaveClass('bg-green-100', 'text-green-800', 'px-4', 'py-2', 'text-base')
  })

  it('renders emojis with proper accessibility', () => {
    render(<EverythingYourHomeNeeds />)
    
    const emojiElements = document.querySelectorAll('[aria-label]')
    expect(emojiElements.length).toBe(5)
    
    // Check that each emoji has an aria-label
    const helperTitles = [
      'Maids & Housekeepers',
      'Cooks & Chefs', 
      'Nannies & Babysitters',
      'Elderly Care Assistants',
      'Patient Care at Home'
    ]
    
    helperTitles.forEach(title => {
      const element = document.querySelector(`[aria-label="${title}"]`)
      expect(element).toBeInTheDocument()
    })
  })

  it('has proper container structure', () => {
    render(<EverythingYourHomeNeeds />)
    
    const mainContainer = document.querySelector('.min-h-screen.bg-white.py-16.px-4')
    expect(mainContainer).toBeInTheDocument()
    
    const headerContainer = document.querySelector('.max-w-3xl.mx-auto.text-center.mb-12')
    expect(headerContainer).toBeInTheDocument()
    
    const gridContainer = document.querySelector('.max-w-4xl.mx-auto.grid.gap-8.md\\:grid-cols-2')
    expect(gridContainer).toBeInTheDocument()
    
    const badgeContainer = document.querySelector('.max-w-2xl.mx-auto.mt-12.text-center')
    expect(badgeContainer).toBeInTheDocument()
  })

  it('renders all text content without errors', () => {
    render(<EverythingYourHomeNeeds />)
    
    // Verify all major text content is present
    const textContent = [
      '🧩 Everything Your Home Needs — In One Place',
      'Verified domestic helpers, AI-matched to your needs.',
      'Maids & Housekeepers',
      'Cooks & Chefs',
      'Nannies & Babysitters', 
      'Elderly Care Assistants',
      'Patient Care at Home',
      'For: Daily cleaning, dishes, sweeping, mopping, dusting',
      'For: Daily meals, diet-specific cooking, regional specialties',
      'For: Infant care, toddler engagement, after-school help',
      'For: Mobility help, meal support, companionship, reminders',
      'For: Post-surgery care, medication reminders, hygiene help',
      'All helpers go through AI-driven trust scoring'
    ]
    
    textContent.forEach(text => {
      expect(screen.getByText(new RegExp(text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')))).toBeInTheDocument()
    })
  })

  it('displays all highlight items for each helper type', () => {
    render(<EverythingYourHomeNeeds />)
    
    // Check all highlight items are present
    const highlights = [
      '✅ Full-time | ✅ Part-time | ✅ One-time deep clean',
      '🎯 Trust score + availability match',
      '🗣 Multilingual onboarding: Hindi, Telugu, Tamil, etc.',
      '✅ Breakfast, lunch, dinner shifts',
      '🎯 Audio answers for food preferences, skill tags (veg/non-veg)',
      '✅ Screened for child-safety + behavior score',
      '🗣 Listen to how they interact with children',
      '✅ Compassionate & calm helpers with past experience',
      '🎯 AI picks patient-friendly profiles with language match',
      '✅ Trained attendants | ✅ Female/male preference',
      '🎯 Skill tags: lifting, bathing, oxygen familiarity'
    ]
    
    highlights.forEach(highlight => {
      expect(screen.getByText(highlight)).toBeInTheDocument()
    })
  })

  it('maintains responsive design classes', () => {
    render(<EverythingYourHomeNeeds />)
    
    // Check for responsive classes
    const responsiveHeading = document.querySelector('.text-3xl.md\\:text-4xl')
    expect(responsiveHeading).toBeInTheDocument()
    
    const responsiveGrid = document.querySelector('.md\\:grid-cols-2')
    expect(responsiveGrid).toBeInTheDocument()
  })

  it('has proper spacing and layout', () => {
    render(<EverythingYourHomeNeeds />)
    
    // Check for proper spacing classes
    const mainHeading = document.querySelector('.text-3xl.md\\:text-4xl.font-bold.mb-4')
    expect(mainHeading).toBeInTheDocument()
    
    const subtitle = document.querySelector('.text-lg.text-slate-700')
    expect(subtitle).toBeInTheDocument()
    
    const grid = document.querySelector('.grid.gap-8')
    expect(grid).toBeInTheDocument()
  })

  it('renders exactly 5 helper types', () => {
    render(<EverythingYourHomeNeeds />)
    
    const cards = screen.getAllByTestId('card')
    expect(cards).toHaveLength(5)
    
    const titles = screen.getAllByTestId('card-title')
    expect(titles).toHaveLength(5)
  })

  it('has proper text alignment in different sections', () => {
    render(<EverythingYourHomeNeeds />)
    
    // Header should be center aligned
    const headerContainer = document.querySelector('.text-center')
    expect(headerContainer).toBeInTheDocument()
    
    // Card content should be left aligned
    const cardContents = screen.getAllByTestId('card-content')
    cardContents.forEach(content => {
      expect(content).toHaveClass('text-left')
    })
    
    // Badge container should be center aligned
    const badgeContainer = document.querySelector('.mt-12.text-center')
    expect(badgeContainer).toBeInTheDocument()
  })
})

