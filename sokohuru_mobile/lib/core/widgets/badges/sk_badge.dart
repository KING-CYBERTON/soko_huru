import 'package:flutter/material.dart';
import '../../theme/app_colors.dart';
import '../../theme/app_typography.dart';
import '../../constants/app_radius.dart';
import '../../constants/app_spacing.dart';

enum SkBadgeVariant {
  pink,
  success,
  warning,
  error,
  info,
  neutral,
}

/// Sokohuru Design System — Badge Component
/// Use for status indicators, campaign types, platform labels.
/// Never use Container + Text directly for badges.
///
/// Usage:
///   SkBadge(label: 'UGC')
///   SkBadge(label: 'Approved', variant: SkBadgeVariant.success)
///   SkBadge(label: 'Pending', variant: SkBadgeVariant.warning)
///   SkBadge.withDot(label: 'Live', variant: SkBadgeVariant.success)
class SkBadge extends StatelessWidget {
  const SkBadge({
    super.key,
    required this.label,
    this.variant  = SkBadgeVariant.pink,
    this.showDot  = false,
    this.pulseDot = false,
  });

  /// Convenience constructor with animated dot indicator
  const SkBadge.withDot({
    super.key,
    required this.label,
    this.variant  = SkBadgeVariant.success,
    this.pulseDot = true,
  }) : showDot = true;

  final String         label;
  final SkBadgeVariant variant;
  final bool           showDot;
  final bool           pulseDot;

  Color get _bg => switch (variant) {
    SkBadgeVariant.pink    => AppColors.pink50,
    SkBadgeVariant.success => AppColors.successSurface,
    SkBadgeVariant.warning => AppColors.warningSurface,
    SkBadgeVariant.error   => AppColors.errorSurface,
    SkBadgeVariant.info    => AppColors.infoSurface,
    SkBadgeVariant.neutral => AppColors.surface2,
  };

  Color get _fg => switch (variant) {
    SkBadgeVariant.pink    => AppColors.pink800,
    SkBadgeVariant.success => AppColors.successText,
    SkBadgeVariant.warning => AppColors.warningText,
    SkBadgeVariant.error   => AppColors.errorText,
    SkBadgeVariant.info    => AppColors.infoText,
    SkBadgeVariant.neutral => AppColors.textSecondary,
  };

  Color get _border => switch (variant) {
    SkBadgeVariant.pink    => AppColors.pink200,
    SkBadgeVariant.success => AppColors.success,
    SkBadgeVariant.warning => AppColors.warning,
    SkBadgeVariant.error   => AppColors.error,
    SkBadgeVariant.info    => AppColors.info,
    SkBadgeVariant.neutral => AppColors.border,
  };

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(
        horizontal: AppSpacing.sm + 1,
        vertical:   3,
      ),
      decoration: BoxDecoration(
        color:        _bg,
        borderRadius: AppRadius.chip,
        border:       Border.all(color: _border, width: 0.5),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          if (showDot) ...[
            _DotIndicator(color: _fg, pulse: pulseDot),
            const SizedBox(width: AppSpacing.xs),
          ],
          Text(
            label,
            style: AppTypography.micro.copyWith(
              color:      _fg,
              fontWeight: FontWeight.w500,
              fontSize:   11,
            ),
          ),
        ],
      ),
    );
  }
}

class _DotIndicator extends StatefulWidget {
  const _DotIndicator({required this.color, required this.pulse});
  final Color color;
  final bool  pulse;

  @override
  State<_DotIndicator> createState() => _DotIndicatorState();
}

class _DotIndicatorState extends State<_DotIndicator>
    with SingleTickerProviderStateMixin {
  late AnimationController _ctrl;
  late Animation<double>   _anim;

  @override
  void initState() {
    super.initState();
    _ctrl = AnimationController(
      vsync:    this,
      duration: const Duration(milliseconds: 1200),
    );
    _anim = Tween<double>(begin: 1.0, end: 0.3).animate(
      CurvedAnimation(parent: _ctrl, curve: Curves.easeInOut),
    );
    if (widget.pulse) _ctrl.repeat(reverse: true);
  }

  @override
  void dispose() {
    _ctrl.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return FadeTransition(
      opacity: widget.pulse ? _anim : const AlwaysStoppedAnimation(1.0),
      child: Container(
        width:  7,
        height: 7,
        decoration: BoxDecoration(
          color:  widget.color,
          shape:  BoxShape.circle,
        ),
      ),
    );
  }
}
