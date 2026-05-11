export default function CampaignsLoading() {
  return (
    <main
      className="min-h-screen"
      style={{
        backgroundColor: 'var(--sk-background)',
        paddingTop: '80px',
      }}
    >
      {/* Hero Band Skeleton */}
      <section
        className="px-6 py-16 text-center"
        style={{
          backgroundColor: 'var(--sk-surface-1)',
          borderBottom: '0.5px solid var(--sk-border)',
        }}
      >
        <div className="mx-auto max-w-4xl">
          {/* Title Skeleton */}
          <div
            className="mx-auto mb-4 h-12 animate-pulse"
            style={{
              backgroundColor: 'var(--sk-surface-3)',
              borderRadius: 'var(--sk-radius-md)',
              maxWidth: '400px',
            }}
          />
          {/* Subtitle Skeleton */}
          <div
            className="mx-auto h-6 animate-pulse"
            style={{
              backgroundColor: 'var(--sk-surface-3)',
              borderRadius: 'var(--sk-radius-md)',
              maxWidth: '600px',
            }}
          />
        </div>
      </section>

      {/* Campaigns Section */}
      <section className="px-6 py-12">
        <div className="mx-auto max-w-7xl">
          {/* Filter Pills Skeleton */}
          <div className="mb-12 flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="h-10 w-24 animate-pulse"
                style={{
                  backgroundColor: 'var(--sk-surface-2)',
                  borderRadius: 'var(--sk-radius-full)',
                }}
              />
            ))}
          </div>

          {/* Campaigns Grid Skeleton */}
          <div
            className="grid gap-6"
            style={{
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            }}
          >
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="overflow-hidden"
                style={{
                  backgroundColor: 'var(--sk-surface-2)',
                  borderRadius: 'var(--sk-radius-lg)',
                  border: '0.5px solid var(--sk-border)',
                }}
              >
                {/* Image Skeleton */}
                <div
                  className="h-48 w-full animate-pulse"
                  style={{
                    backgroundColor: 'var(--sk-surface-3)',
                  }}
                />

                {/* Content Skeleton */}
                <div className="p-4">
                  {/* Brand Info Skeleton */}
                  <div className="mb-3 flex items-center gap-2">
                    <div
                      className="h-8 w-8 animate-pulse"
                      style={{
                        backgroundColor: 'var(--sk-surface-3)',
                        borderRadius: '50%',
                      }}
                    />
                    <div className="flex-1">
                      <div
                        className="mb-1 h-4 w-32 animate-pulse"
                        style={{
                          backgroundColor: 'var(--sk-surface-3)',
                          borderRadius: 'var(--sk-radius-sm)',
                        }}
                      />
                      <div
                        className="h-3 w-24 animate-pulse"
                        style={{
                          backgroundColor: 'var(--sk-surface-3)',
                          borderRadius: 'var(--sk-radius-sm)',
                        }}
                      />
                    </div>
                  </div>

                  {/* Badges Skeleton */}
                  <div className="mb-3 flex gap-2">
                    <div
                      className="h-6 w-16 animate-pulse"
                      style={{
                        backgroundColor: 'var(--sk-surface-3)',
                        borderRadius: 'var(--sk-radius-sm)',
                      }}
                    />
                    <div
                      className="h-6 w-20 animate-pulse"
                      style={{
                        backgroundColor: 'var(--sk-surface-3)',
                        borderRadius: 'var(--sk-radius-sm)',
                      }}
                    />
                  </div>

                  {/* Description Skeleton */}
                  <div className="mb-4 space-y-2">
                    <div
                      className="h-3 w-full animate-pulse"
                      style={{
                        backgroundColor: 'var(--sk-surface-3)',
                        borderRadius: 'var(--sk-radius-sm)',
                      }}
                    />
                    <div
                      className="h-3 w-full animate-pulse"
                      style={{
                        backgroundColor: 'var(--sk-surface-3)',
                        borderRadius: 'var(--sk-radius-sm)',
                      }}
                    />
                    <div
                      className="h-3 w-3/4 animate-pulse"
                      style={{
                        backgroundColor: 'var(--sk-surface-3)',
                        borderRadius: 'var(--sk-radius-sm)',
                      }}
                    />
                  </div>

                  {/* Footer Skeleton */}
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                      <div
                        className="h-5 w-24 animate-pulse"
                        style={{
                          backgroundColor: 'var(--sk-surface-3)',
                          borderRadius: 'var(--sk-radius-sm)',
                        }}
                      />
                      <div
                        className="h-3 w-20 animate-pulse"
                        style={{
                          backgroundColor: 'var(--sk-surface-3)',
                          borderRadius: 'var(--sk-radius-sm)',
                        }}
                      />
                    </div>
                    <div
                      className="h-9 w-20 animate-pulse"
                      style={{
                        backgroundColor: 'var(--sk-surface-3)',
                        borderRadius: 'var(--sk-radius-md)',
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
