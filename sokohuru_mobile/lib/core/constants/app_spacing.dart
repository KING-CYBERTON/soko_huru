/// Sokohuru Design System — Spacing Tokens
/// 4px base grid. All spacing in multiples of 4.
/// NEVER use raw numbers for padding/margin/gap.
/// ALWAYS reference AppSpacing.*
abstract class AppSpacing {
  AppSpacing._();

  static const xs   = 4.0;
  static const sm   = 8.0;
  static const md   = 12.0;
  static const lg   = 16.0;
  static const xl   = 20.0;
  static const xxl  = 24.0;
  static const xxxl = 32.0;
  static const xxxxl = 48.0;

  // ─── Semantic aliases ─────────────────────────────────────────
  /// Standard screen horizontal padding
  static const screenH = lg;

  /// Standard card internal padding
  static const cardPadding = lg;

  /// Gap between form fields
  static const fieldGap = md;

  /// Gap between sections on a screen
  static const sectionGap = xxxl;

  /// Bottom nav height
  static const bottomNavHeight = 72.0;

  /// Top bar height
  static const topBarHeight = 56.0;

  /// Status bar safe area (approximate — use MediaQuery in code)
  static const statusBar = 44.0;
}
