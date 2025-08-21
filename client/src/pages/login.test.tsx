import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import Login from './login'

// Mock the dependencies
vi.mock('wouter', () => ({
  useLocation: () => ['/login', vi.fn()]
}))

vi.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: vi.fn()
  })
}))

vi.mock('@/lib/supabase', () => ({
  signIn: vi.fn()
}))

// Mock all Lucide React icons
vi.mock('lucide-react', () => ({
  Eye: ({ className }: any) => <div data-testid="eye-icon" className={className} />,
  EyeOff: ({ className }: any) => <div data-testid="eye-off-icon" className={className} />,
  Mail: ({ className }: any) => <div data-testid="mail-icon" className={className} />,
  Lock: ({ className }: any) => <div data-testid="lock-icon" className={className} />,
  Loader2: ({ className }: any) => <div data-testid="loader-icon" className={className} />
}))

// Mock UI components
vi.mock('@/components/ui/button', () => ({
  Button: ({ children, onClick, type, className, disabled, ...props }: any) => (
    <button onClick={onClick} type={type} className={className} disabled={disabled} {...props}>
      {children}
    </button>
  )
}))

vi.mock('@/components/ui/input', () => ({
  Input: ({ ...props }: any) => <input {...props} />
}))

vi.mock('@/components/ui/label', () => ({
  Label: ({ children, htmlFor, className, ...props }: any) => (
    <label htmlFor={htmlFor} className={className} {...props}>
      {children}
    </label>
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
  CardFooter: ({ children, className, ...props }: any) => (
    <div className={className} data-testid="card-footer" {...props}>
      {children}
    </div>
  )
}))

describe('Login', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the component without crashing', () => {
    expect(() => render(<Login />)).not.toThrow()
  })

  it('displays the SevakAI branding', () => {
    render(<Login />)
    
    expect(screen.getByText('SevakAI 🙌')).toBeInTheDocument()
    expect(screen.getByText("India's smartest way to hire trusted helpers")).toBeInTheDocument()
    expect(screen.getByText('Empowering homes and workers with AI')).toBeInTheDocument()
  })

  it('displays the login form header', () => {
    render(<Login />)
    
    expect(screen.getByText('Welcome Back')).toBeInTheDocument()
    expect(screen.getByText('Sign in to find your perfect helper')).toBeInTheDocument()
  })

  it('renders email input field', () => {
    render(<Login />)
    
    expect(screen.getByLabelText('Email Address')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('your.email@example.com')).toBeInTheDocument()
  })

  it('renders password input field', () => {
    render(<Login />)
    
    expect(screen.getByLabelText('Password')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter your password')).toBeInTheDocument()
  })

  it('displays form icons', () => {
    render(<Login />)
    
    expect(screen.getAllByTestId('mail-icon')).toHaveLength(1)
    expect(screen.getAllByTestId('lock-icon')).toHaveLength(1)
  })

  it('shows password visibility toggle button', () => {
    render(<Login />)
    
    const toggleButton = screen.getByRole('button', { name: '' })
    expect(toggleButton).toBeInTheDocument()
  })

  it('toggles password visibility when eye button is clicked', () => {
    render(<Login />)
    
    const passwordInput = screen.getByLabelText('Password')
    const toggleButton = screen.getByRole('button', { name: '' })
    
    // Initially password should be hidden
    expect(passwordInput).toHaveAttribute('type', 'password')
    expect(screen.getByTestId('eye-icon')).toBeInTheDocument()
    
    // Click toggle button
    fireEvent.click(toggleButton)
    
    // Password should be visible
    expect(passwordInput).toHaveAttribute('type', 'text')
    expect(screen.getByTestId('eye-off-icon')).toBeInTheDocument()
    
    // Click toggle button again
    fireEvent.click(toggleButton)
    
    // Password should be hidden again
    expect(passwordInput).toHaveAttribute('type', 'password')
    expect(screen.getByTestId('eye-icon')).toBeInTheDocument()
  })

  it('displays sign in button', () => {
    render(<Login />)
    
    expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument()
  })

  it('shows sign up link', () => {
    render(<Login />)
    
    expect(screen.getByText("Don't have an account?")).toBeInTheDocument()
    expect(screen.getByText('Sign up here')).toBeInTheDocument()
  })

  it('displays trust indicators', () => {
    render(<Login />)
    
    expect(screen.getByText('🔍')).toBeInTheDocument()
    expect(screen.getByText('AI Verification')).toBeInTheDocument()
    expect(screen.getByText('📞')).toBeInTheDocument()
    expect(screen.getByText('Video Interviews')).toBeInTheDocument()
    expect(screen.getByText('🧠')).toBeInTheDocument()
    expect(screen.getByText('Smart Matching')).toBeInTheDocument()
  })

  it('renders the main container with proper styling', () => {
    render(<Login />)
    
    const mainContainer = document.querySelector('.min-h-screen.bg-gradient-to-br')
    expect(mainContainer).toBeInTheDocument()
  })

  it('renders the card with proper styling', () => {
    render(<Login />)
    
    const card = screen.getByTestId('card')
    expect(card).toBeInTheDocument()
    expect(card).toHaveClass('border-0', 'shadow-xl')
  })

  it('renders card sections', () => {
    render(<Login />)
    
    expect(screen.getByTestId('card-header')).toBeInTheDocument()
    expect(screen.getByTestId('card-content')).toBeInTheDocument()
    expect(screen.getByTestId('card-footer')).toBeInTheDocument()
  })

  it('displays form labels correctly', () => {
    render(<Login />)
    
    expect(screen.getByText('Email Address')).toBeInTheDocument()
    expect(screen.getByText('Password')).toBeInTheDocument()
  })

  it('has proper form structure', () => {
    render(<Login />)
    
    const form = document.querySelector('form')
    expect(form).toBeInTheDocument()
  })

  it('renders input fields with proper attributes', () => {
    render(<Login />)
    
    const emailInput = screen.getByLabelText('Email Address')
    const passwordInput = screen.getByLabelText('Password')
    
    expect(emailInput).toHaveAttribute('type', 'email')
    expect(emailInput).toHaveAttribute('id', 'email')
    expect(passwordInput).toHaveAttribute('type', 'password')
    expect(passwordInput).toHaveAttribute('id', 'password')
  })

  it('displays all text content without errors', () => {
    render(<Login />)
    
    const textContent = [
      'SevakAI 🙌',
      "India's smartest way to hire trusted helpers",
      'Empowering homes and workers with AI',
      'Welcome Back',
      'Sign in to find your perfect helper',
      'Email Address',
      'Password',
      'Sign In',
      "Don't have an account?",
      'Sign up here',
      'AI Verification',
      'Video Interviews',
      'Smart Matching'
    ]
    
    textContent.forEach(text => {
      expect(screen.getByText(text)).toBeInTheDocument()
    })
  })

  it('has proper gradient background', () => {
    render(<Login />)
    
    const gradientContainer = document.querySelector('.bg-gradient-to-br.from-blue-50.via-white.to-green-50')
    expect(gradientContainer).toBeInTheDocument()
  })

  it('renders the form with proper spacing', () => {
    render(<Login />)
    
    const form = document.querySelector('form')
    expect(form).toHaveClass('space-y-4')
  })

  it('displays input fields with proper styling', () => {
    render(<Login />)
    
    const emailInput = screen.getByLabelText('Email Address')
    const passwordInput = screen.getByLabelText('Password')
    
    expect(emailInput).toHaveClass('pl-10')
    expect(passwordInput).toHaveClass('pl-10', 'pr-10')
  })

  it('shows trust indicators with proper layout', () => {
    render(<Login />)
    
    const trustContainer = document.querySelector('.flex.justify-center.space-x-6')
    expect(trustContainer).toBeInTheDocument()
  })

  it('renders without crashing', () => {
    expect(() => render(<Login />)).not.toThrow()
  })

  it('has proper responsive design', () => {
    render(<Login />)
    
    const container = document.querySelector('.w-full.max-w-md')
    expect(container).toBeInTheDocument()
  })

  it('displays all icons properly', () => {
    render(<Login />)
    
    expect(screen.getAllByTestId('mail-icon')).toHaveLength(1)
    expect(screen.getAllByTestId('lock-icon')).toHaveLength(1)
    expect(screen.getAllByTestId('eye-icon')).toHaveLength(1)
  })

  it('renders the component with all required elements', () => {
    render(<Login />)
    
    // Check for all major sections
    expect(screen.getByText('SevakAI 🙌')).toBeInTheDocument()
    expect(screen.getByText('Welcome Back')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument()
    expect(screen.getByText('Sign up here')).toBeInTheDocument()
  })
})

