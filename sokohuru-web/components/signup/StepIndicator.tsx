interface StepIndicatorProps {
  totalSteps: number;
  currentStep: number;
  stepLabels: string[];
}

export function StepIndicator({ totalSteps, currentStep, stepLabels }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center px-4 py-8">
      <div className="flex items-start">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isActive = stepNumber === currentStep;
          const isFuture = stepNumber > currentStep;

          return (
            <div key={stepNumber} className="flex items-start">
              {/* Step Circle and Label */}
              <div className="flex flex-col items-center" style={{ minWidth: '80px' }}>
                {/* Circle */}
                <div
                  className="flex items-center justify-center transition-all duration-200"
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    ...(isCompleted && {
                      backgroundColor: 'var(--sk-success)',
                      color: 'white',
                    }),
                    ...(isActive && {
                      backgroundColor: 'var(--sk-pink)',
                      color: 'white',
                    }),
                    ...(isFuture && {
                      backgroundColor: 'transparent',
                      border: '2px solid var(--sk-border)',
                      color: 'var(--sk-text-muted)',
                    }),
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '16px',
                    fontWeight: 600,
                  }}
                >
                  {isCompleted ? (
                    // Checkmark SVG
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.6667 5L7.50004 14.1667L3.33337 10"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    stepNumber
                  )}
                </div>

                {/* Label */}
                <div
                  className="mt-2 text-center"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '10px',
                    fontWeight: 500,
                    color: isActive ? 'var(--sk-text-primary)' : 'var(--sk-text-muted)',
                    maxWidth: '80px',
                    lineHeight: '1.2',
                  }}
                >
                  {stepLabels[index]}
                </div>
              </div>

              {/* Connector Line */}
              {stepNumber < totalSteps && (
                <div
                  className="transition-all duration-200"
                  style={{
                    width: '60px',
                    height: '2px',
                    marginTop: '19px',
                    marginLeft: '4px',
                    marginRight: '4px',
                    backgroundColor: isCompleted
                      ? 'var(--sk-success)'
                      : 'var(--sk-border)',
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
