export function TrustedBy() {
  const brands = ['Vertex', 'Nexora', 'Pocket', 'Cloudage', 'Layers', 'Fluxor'];

  return (
    <section
      className="py-7 px-20 max-md:px-5"
      style={{
        background: 'var(--sk-surface-1)',
        borderTop: '0.5px solid var(--sk-border)',
        borderBottom: '0.5px solid var(--sk-border)',
      }}
    >
      <div className="flex items-center justify-between gap-8 max-md:flex-col max-md:items-start">
        {/* Left */}
        <span
          style={{
            fontSize: '11px',
            color: 'var(--sk-text-muted)',
            textTransform: 'uppercase',
            fontFamily: 'var(--sk-font-body)',
            letterSpacing: '.05em',
          }}
        >
          TRUSTED BY INNOVATIVE COMPANIES
        </span>

        {/* Right - Brand names */}
        <div className="flex items-center gap-8 max-md:overflow-x-auto max-md:w-full">
          {brands.map((brand) => (
            <span
              key={brand}
              style={{
                fontSize: '15px',
                fontWeight: 500,
                color: 'var(--sk-text-muted)',
                fontFamily: 'var(--sk-font-body)',
                whiteSpace: 'nowrap',
              }}
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
