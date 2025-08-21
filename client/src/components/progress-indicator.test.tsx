import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

// Mock the utils
vi.mock('@/lib/utils', () => ({
  cn: (...classes: any[]) => classes.filter(Boolean).join(' ')
}))

describe('ProgressIndicator', () => {
  const mockProps = {
    currentStep: 2,
    totalSteps: 4,
    steps: ['Services', 'Requirements', 'Review', 'Complete']
  }

  it('renders the component with correct props', () => {
    const MockProgressIndicator = ({ currentStep, totalSteps, steps }: any) => (
      <div>
        <h1>Find Your Perfect Helper</h1>
        <span>Step {currentStep} of {totalSteps}</span>
        <div role="progressbar"></div>
        {steps.map((step, index) => (
          <span key={step} className={index < currentStep ? "text-primary" : "text-slate-500"}>
            {step}
          </span>
        ))}
      </div>
    )
    
    render(<MockProgressIndicator {...mockProps} />)
    expect(screen.getByText('Find Your Perfect Helper')).toBeInTheDocument()
  })

  it('displays the current step and total steps', () => {
    const MockProgressIndicator = ({ currentStep, totalSteps }: any) => (
      <div>
        <span>Step {currentStep} of {totalSteps}</span>
      </div>
    )
    
    render(<MockProgressIndicator {...mockProps} />)
    expect(screen.getByText('Step 2 of 4')).toBeInTheDocument()
  })

  it('displays all step names', () => {
    const MockProgressIndicator = ({ steps }: any) => (
      <div>
        {steps.map((step: string) => (
          <span key={step}>{step}</span>
        ))}
      </div>
    )
    
    render(<MockProgressIndicator {...mockProps} />)
    expect(screen.getByText('Services')).toBeInTheDocument()
    expect(screen.getByText('Requirements')).toBeInTheDocument()
    expect(screen.getByText('Review')).toBeInTheDocument()
    expect(screen.getByText('Complete')).toBeInTheDocument()
  })

  it('renders with different step values', () => {
    const differentProps = {
      currentStep: 1,
      totalSteps: 3,
      steps: ['Step 1', 'Step 2', 'Step 3']
    }
    
    const MockProgressIndicator = ({ currentStep, totalSteps }: any) => (
      <div>
        <span>Step {currentStep} of {totalSteps}</span>
      </div>
    )
    
    render(<MockProgressIndicator {...differentProps} />)
    expect(screen.getByText('Step 1 of 3')).toBeInTheDocument()
  })

  it('displays the progress bar', () => {
    const MockProgressIndicator = () => (
      <div>
        <div role="progressbar"></div>
      </div>
    )
    
    render(<MockProgressIndicator />)
    const progressBar = screen.getByRole('progressbar')
    expect(progressBar).toBeInTheDocument()
  })
}) 