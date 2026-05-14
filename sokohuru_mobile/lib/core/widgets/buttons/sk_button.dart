import 'package:flutter/material.dart';
import '../../theme/app_colors.dart';
import '../../theme/app_typography.dart';
import '../../constants/app_radius.dart';
import '../../constants/app_spacing.dart';

enum SkButtonVariant { primary, secondary, ghost, destructive }
enum SkButtonSize    { sm, md, lg }

/// Sokohuru Design System — Button Component
/// Use this for ALL buttons in the app.
/// Never use ElevatedButton, TextButton, or OutlinedButton directly.
///
/// Usage:
///   SkButton(label: 'Apply now', onPressed: () {})
///   SkButton.secondary(label: 'Save draft', onPressed: () {})
///   SkButton(label: 'Loading', loading: true)
///   SkButton(label: 'Disabled', onPressed: null)
class SkButton extends StatelessWidget {
  const SkButton({
    super.key,
    required this.label,
    this.onPressed,
    this.variant  = SkButtonVariant.primary,
    this.size     = SkButtonSize.md,
    this.loading  = false,
    this.fullWidth = false,
    this.icon,
    this.iconTrailing = false,
  });

  /// Convenience constructors
  const SkButton.secondary({
    super.key,
    required this.label,
    this.onPressed,
    this.size     = SkButtonSize.md,
    this.loading  = false,
    this.fullWidth = false,
    this.icon,
    this.iconTrailing = false,
  }) : variant = SkButtonVariant.secondary;

  const SkButton.ghost({
    super.key,
    required this.label,
    this.onPressed,
    this.size     = SkButtonSize.md,
    this.loading  = false,
    this.fullWidth = false,
    this.icon,
    this.iconTrailing = false,
  }) : variant = SkButtonVariant.ghost;

  const SkButton.destructive({
    super.key,
    required this.label,
    this.onPressed,
    this.size     = SkButtonSize.md,
    this.loading  = false,
    this.fullWidth = false,
    this.icon,
    this.iconTrailing = false,
  }) : variant = SkButtonVariant.destructive;

  final String           label;
  final VoidCallback?    onPressed;
  final SkButtonVariant  variant;
  final SkButtonSize     size;
  final bool             loading;
  final bool             fullWidth;
  final IconData?        icon;
  final bool             iconTrailing;

  // ─── Style maps ─────────────────────────────────────────────
  Color get _bg => switch (variant) {
    SkButtonVariant.primary     => AppColors.pink,
    SkButtonVariant.secondary   => AppColors.surface2,
    SkButtonVariant.ghost       => AppColors.transparent,
    SkButtonVariant.destructive => AppColors.errorSurface,
  };

  Color get _fg => switch (variant) {
    SkButtonVariant.primary     => AppColors.white,
    SkButtonVariant.secondary   => AppColors.textPrimary,
    SkButtonVariant.ghost       => AppColors.pink,
    SkButtonVariant.destructive => AppColors.errorText,
  };

  Color? get _borderColor => switch (variant) {
    SkButtonVariant.secondary   => AppColors.border,
    SkButtonVariant.ghost       => AppColors.pink,
    SkButtonVariant.destructive => AppColors.error,
    _                           => null,
  };

  EdgeInsets get _padding => switch (size) {
    SkButtonSize.sm => const EdgeInsets.symmetric(
        horizontal: AppSpacing.md, vertical: AppSpacing.sm - 1),
    SkButtonSize.md => const EdgeInsets.symmetric(
        horizontal: AppSpacing.xl, vertical: AppSpacing.sm + 2),
    SkButtonSize.lg => const EdgeInsets.symmetric(
        horizontal: AppSpacing.xxl, vertical: AppSpacing.md + 2),
  };

  TextStyle get _textStyle => switch (size) {
    SkButtonSize.sm => AppTypography.labelMd.copyWith(
        color: _fg, fontSize: 12),
    SkButtonSize.md => AppTypography.labelMd.copyWith(
        color: _fg, fontSize: 14),
    SkButtonSize.lg => AppTypography.labelMd.copyWith(
        color: _fg, fontSize: 16),
  };

  double get _iconSize => switch (size) {
    SkButtonSize.sm => 14,
    SkButtonSize.md => 16,
    SkButtonSize.lg => 18,
  };

  @override
  Widget build(BuildContext context) {
    final isDisabled = onPressed == null && !loading;

    Widget content = loading
        ? SizedBox(
            width:  _iconSize,
            height: _iconSize,
            child:  CircularProgressIndicator(
              strokeWidth: 2,
              valueColor: AlwaysStoppedAnimation<Color>(_fg),
            ),
          )
        : Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              if (icon != null && !iconTrailing) ...[
                Icon(icon, size: _iconSize, color: _fg),
                const SizedBox(width: AppSpacing.sm),
              ],
              Text(label, style: _textStyle),
              if (icon != null && iconTrailing) ...[
                const SizedBox(width: AppSpacing.sm),
                Icon(icon, size: _iconSize, color: _fg),
              ],
            ],
          );

    final btn = AnimatedOpacity(
      opacity:  isDisabled || loading ? 0.6 : 1.0,
      duration: const Duration(milliseconds: 150),
      child: Material(
        color:        _bg,
        borderRadius: AppRadius.button,
        child: InkWell(
          onTap:        loading || isDisabled ? null : onPressed,
          borderRadius: AppRadius.button,
          child: Container(
            padding:    _padding,
            decoration: _borderColor != null
                ? BoxDecoration(
                    border:       Border.all(color: _borderColor!, width: 0.5),
                    borderRadius: AppRadius.button,
                  )
                : null,
            child: content,
          ),
        ),
      ),
    );

    return fullWidth
        ? SizedBox(width: double.infinity, child: Center(child: btn))
        : btn;
  }
}
