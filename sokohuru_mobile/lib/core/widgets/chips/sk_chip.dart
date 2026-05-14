import 'package:flutter/material.dart';
import '../../theme/app_colors.dart';
import '../../theme/app_typography.dart';
import '../../constants/app_radius.dart';
import '../../constants/app_spacing.dart';

/// Sokohuru Design System — Chip / Filter Pill Component
/// Use for multi-select tags, filter pills, and preference selectors.
/// Never use FilterChip or Chip directly.
///
/// Usage:
///   SkChip(label: 'Hauls', selected: true, onTap: () {})
///   SkChip(label: 'UGC', selected: false, onTap: () {})
///
/// For a row of chips:
///   Wrap(
///     spacing: AppSpacing.sm,
///     runSpacing: AppSpacing.sm,
///     children: formats.map((f) => SkChip(
///       label: f,
///       selected: selectedFormats.contains(f),
///       onTap: () => toggle(f),
///     )).toList(),
///   )
class SkChip extends StatelessWidget {
  const SkChip({
    super.key,
    required this.label,
    required this.selected,
    required this.onTap,
    this.variant = SkChipVariant.pink,
  });

  final String        label;
  final bool          selected;
  final VoidCallback  onTap;
  final SkChipVariant variant;

  Color get _bg => selected
      ? switch (variant) {
          SkChipVariant.pink    => AppColors.pink50,
          SkChipVariant.success => AppColors.successSurface,
        }
      : AppColors.surface2;

  Color get _fg => selected
      ? switch (variant) {
          SkChipVariant.pink    => AppColors.pinkLight,
          SkChipVariant.success => AppColors.successText,
        }
      : AppColors.textSecondary;

  Color get _border => selected
      ? switch (variant) {
          SkChipVariant.pink    => AppColors.pink,
          SkChipVariant.success => AppColors.success,
        }
      : AppColors.border;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 150),
        padding:  const EdgeInsets.symmetric(
          horizontal: AppSpacing.sm + 3,
          vertical:   AppSpacing.xs + 1,
        ),
        decoration: BoxDecoration(
          color:        _bg,
          borderRadius: AppRadius.chip,
          border:       Border.all(color: _border, width: 0.5),
        ),
        child: Text(
          label,
          style: AppTypography.bodySm.copyWith(
            color:      _fg,
            fontWeight: selected ? FontWeight.w500 : FontWeight.w400,
            fontSize:   12,
          ),
        ),
      ),
    );
  }
}

enum SkChipVariant { pink, success }
